import { ethers } from 'ethers';

// AgriChain Contract ABI - extracted from the smart contract
export const AGRICHAIN_ABI = [
  "function registerProduct(string memory _id, string memory _name, uint256 _quantity, uint256 _basePrice, string memory _harvestDate, string memory _quality, string memory _location) public",
  "function updateAsDistributor(string memory _productId, uint256 _handlingCost, string memory _transportDetails) public",
  "function updateAsRetailer(string memory _productId, uint256 _retailMargin, string memory _storeDetails) public",
  "function getProduct(string memory _productId) public view returns (tuple(string id, string name, uint256 quantity, uint256 basePrice, uint256 currentPrice, string harvestDate, string quality, string status, address farmer, address distributor, address retailer, string location, uint256 timestamp, bool exists))",
  "function getProductHistory(string memory _productId) public view returns (tuple(string productId, address actor, string action, uint256 newPrice, string details, uint256 timestamp, uint256 blockNumber)[])",
  "function verifyProduct(string memory _productId) public view returns (bool verified, uint256 totalSteps, address[] memory actors, string[] memory actions, uint256[] memory timestamps)",
  "function getAllProductIds() public view returns (string[] memory)",
  "function getContractStats() public view returns (uint256 _totalProducts, uint256 _totalTransactions, uint256 _totalValue, uint256 _activeProducts)",
  "event ProductRegistered(string indexed productId, address indexed farmer, string name, uint256 quantity, uint256 basePrice, string quality, string location)",
  "event ProductUpdated(string indexed productId, address indexed actor, string action, uint256 newPrice, string status)",
  "event SupplyChainStep(string indexed productId, address indexed from, address indexed to, string step, uint256 timestamp)"
];

// Contract address - Updated with fresh deployment
export const AGRICHAIN_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Fresh deployment address

// Product interface matching the smart contract struct
export interface Product {
  id: string;
  name: string;
  quantity: bigint;
  basePrice: bigint;
  currentPrice: bigint;
  harvestDate: string;
  quality: string;
  status: string;
  farmer: string;
  distributor: string;
  retailer: string;
  location: string;
  timestamp: bigint;
  exists: boolean;
}

// Transaction interface matching the smart contract struct
export interface Transaction {
  productId: string;
  actor: string;
  action: string;
  newPrice: bigint;
  details: string;
  timestamp: bigint;
  blockNumber: bigint;
}

// Suppress common MetaMask warnings in development
if (process.env.NODE_ENV === 'development') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const message = args.join(' ');
    // Filter out known MetaMask warnings
    if (
      message.includes('ObjectMultiplex') ||
      message.includes('StreamMiddleware') ||
      message.includes('malformed chunk')
    ) {
      return; // Suppress these warnings
    }
    originalWarn.apply(console, args);
  };
}

// Blockchain service class
export class BlockchainService {
  private provider: ethers.BrowserProvider | null = null;
  private contract: ethers.Contract | null = null;
  private signer: ethers.Signer | null = null;
  private isConnecting: boolean = false;

  // Initialize connection to MetaMask/Web3 wallet
  async connect(): Promise<boolean> {
    // Prevent multiple simultaneous connection attempts
    if (this.isConnecting) {
      console.log('Connection already in progress...');
      return false;
    }
    
    this.isConnecting = true;
    
    try {
      if (typeof window.ethereum !== 'undefined') {
        // Check if already connected to avoid duplicate requests
        if (this.isConnected()) {
          console.log('Already connected to blockchain');
          this.isConnecting = false;
          return true;
        }

        // Request account access with timeout
        const accounts = await Promise.race([
          window.ethereum.request({ method: 'eth_requestAccounts' }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Connection timeout')), 10000)
          )
        ]) as string[];
        
        if (!accounts || accounts.length === 0) {
          throw new Error('No accounts found');
        }
        
        // Create provider and signer
        this.provider = new ethers.BrowserProvider(window.ethereum);
        this.signer = await this.provider.getSigner();
        
        // Verify network
        const network = await this.provider.getNetwork();
        if (network.chainId !== 31337n && network.chainId !== 1337n) {
          throw new Error('Please connect to AgroChain Local network (Chain ID: 31337)');
        }
        
        // Create contract instance
        this.contract = new ethers.Contract(
          AGRICHAIN_CONTRACT_ADDRESS,
          AGRICHAIN_ABI,
          this.signer
        );

        console.log('Connected to blockchain successfully');
        this.isConnecting = false;
        return true;
      } else {
        console.warn('MetaMask not detected');
        alert('Please install MetaMask or another Web3 wallet!');
        this.isConnecting = false;
        return false;
      }
    } catch (error: any) {
      console.error('Failed to connect to blockchain:', error.message);
      this.isConnecting = false;
      
      if (error.message.includes('User rejected')) {
        alert('Connection cancelled by user');
      } else if (error.message.includes('network')) {
        alert('Please switch to AgroChain Local network in MetaMask');
      } else if (error.message.includes('timeout')) {
        alert('Connection timed out. Please try again.');
      } else {
        alert(`Connection failed: ${error.message}`);
      }
      return false;
    }
  }

  // Check if wallet is connected
  isConnected(): boolean {
    return this.provider !== null && this.contract !== null;
  }

  // Get current wallet address
  async getAddress(): Promise<string> {
    if (!this.signer) {
      throw new Error('Wallet not connected');
    }
    return await this.signer.getAddress();
  }

  // Register a new product (Farmer function)
  async registerProduct(
    id: string,
    name: string,
    quantity: number,
    basePrice: number,
    harvestDate: string,
    quality: string,
    location: string
  ): Promise<string> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      // Convert price to wei (assuming price is in ETH)
      const priceInWei = ethers.parseEther(basePrice.toString());
      
      const tx = await this.contract.registerProduct(
        id,
        name,
        quantity,
        priceInWei,
        harvestDate,
        quality,
        location
      );

      await tx.wait();
      console.log('Product registered successfully:', tx.hash);
      return tx.hash;
    } catch (error) {
      console.error('Failed to register product:', error);
      throw error;
    }
  }

  // Update product as distributor
  async updateAsDistributor(
    productId: string,
    handlingCost: number,
    transportDetails: string
  ): Promise<string> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const costInWei = ethers.parseEther(handlingCost.toString());
      
      const tx = await this.contract.updateAsDistributor(
        productId,
        costInWei,
        transportDetails
      );

      await tx.wait();
      console.log('Product updated by distributor:', tx.hash);
      return tx.hash;
    } catch (error) {
      console.error('Failed to update as distributor:', error);
      throw error;
    }
  }

  // Update product as retailer
  async updateAsRetailer(
    productId: string,
    retailMargin: number,
    storeDetails: string
  ): Promise<string> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const marginInWei = ethers.parseEther(retailMargin.toString());
      
      const tx = await this.contract.updateAsRetailer(
        productId,
        marginInWei,
        storeDetails
      );

      await tx.wait();
      console.log('Product updated by retailer:', tx.hash);
      return tx.hash;
    } catch (error) {
      console.error('Failed to update as retailer:', error);
      throw error;
    }
  }

  // Get product details
  async getProduct(productId: string): Promise<Product | null> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const result = await this.contract.getProduct(productId);
      return {
        id: result[0],
        name: result[1],
        quantity: result[2],
        basePrice: result[3],
        currentPrice: result[4],
        harvestDate: result[5],
        quality: result[6],
        status: result[7],
        farmer: result[8],
        distributor: result[9],
        retailer: result[10],
        location: result[11],
        timestamp: result[12],
        exists: result[13]
      };
    } catch (error) {
      console.error('Failed to get product:', error);
      return null;
    }
  }

  // Get product transaction history
  async getProductHistory(productId: string): Promise<Transaction[]> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const history = await this.contract.getProductHistory(productId);
      return history.map((tx: any) => ({
        productId: tx[0],
        actor: tx[1],
        action: tx[2],
        newPrice: tx[3],
        details: tx[4],
        timestamp: tx[5],
        blockNumber: tx[6]
      }));
    } catch (error) {
      console.error('Failed to get product history:', error);
      return [];
    }
  }

  // Verify product authenticity
  async verifyProduct(productId: string): Promise<{
    verified: boolean;
    totalSteps: number;
    actors: string[];
    actions: string[];
    timestamps: bigint[];
  }> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const result = await this.contract.verifyProduct(productId);
      return {
        verified: result[0],
        totalSteps: Number(result[1]),
        actors: result[2],
        actions: result[3],
        timestamps: result[4]
      };
    } catch (error) {
      console.error('Failed to verify product:', error);
      return {
        verified: false,
        totalSteps: 0,
        actors: [],
        actions: [],
        timestamps: []
      };
    }
  }

  // Get all product IDs
  async getAllProductIds(): Promise<string[]> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      return await this.contract.getAllProductIds();
    } catch (error) {
      console.error('Failed to get all product IDs:', error);
      return [];
    }
  }

  // Get contract statistics
  async getContractStats(): Promise<{
    totalProducts: number;
    totalTransactions: number;
    totalValue: bigint;
    activeProducts: number;
  }> {
    if (!this.contract) {
      throw new Error('Contract not initialized');
    }

    try {
      const stats = await this.contract.getContractStats();
      return {
        totalProducts: Number(stats[0]),
        totalTransactions: Number(stats[1]),
        totalValue: stats[2],
        activeProducts: Number(stats[3])
      };
    } catch (error) {
      console.error('Failed to get contract stats:', error);
      return {
        totalProducts: 0,
        totalTransactions: 0,
        totalValue: BigInt(0),
        activeProducts: 0
      };
    }
  }

  // Listen to contract events
  onProductRegistered(callback: (productId: string, farmer: string, name: string, quantity: bigint, basePrice: bigint, quality: string, location: string) => void) {
    if (!this.contract) return;

    this.contract.on('ProductRegistered', callback);
  }

  onProductUpdated(callback: (productId: string, actor: string, action: string, newPrice: bigint, status: string) => void) {
    if (!this.contract) return;

    this.contract.on('ProductUpdated', callback);
  }

  onSupplyChainStep(callback: (productId: string, from: string, to: string, step: string, timestamp: bigint) => void) {
    if (!this.contract) return;

    this.contract.on('SupplyChainStep', callback);
  }
}

// Create singleton instance
export const blockchainService = new BlockchainService();

// Utility functions
export const formatEther = ethers.formatEther;
export const parseEther = ethers.parseEther;

// Generate unique product ID
export const generateProductId = (): string => {
  return `AGRI-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};
