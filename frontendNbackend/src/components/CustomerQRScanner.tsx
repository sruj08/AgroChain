import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { BackgroundWrapper } from './BackgroundWrapper';
import { Header } from './Header';
import { Timeline } from './ui/Timeline';
import { QrCode, Upload, Camera, ArrowLeft, CheckCircle, Package, User, Truck, Store, Shield, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { blockchainService, Product, Transaction, formatEther } from '../services/blockchainService';
import { qrCodeService, QRCodeData } from '../services/qrCodeService';
import { toast } from 'sonner';

interface CustomerQRScannerProps {
  onBack: () => void;
}

interface BlockchainProductData {
  product: Product;
  transactions: Transaction[];
  verification: {
    verified: boolean;
    totalSteps: number;
    actors: string[];
    actions: string[];
    timestamps: bigint[];
  };
}

export function CustomerQRScanner({ onBack }: CustomerQRScannerProps) {
  const [scannedData, setScannedData] = useState<BlockchainProductData | null>(null);
  const [manualCode, setManualCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlockchainConnected, setIsBlockchainConnected] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  // Initialize blockchain connection
  useEffect(() => {
    const initBlockchain = async () => {
      try {
        const connected = await blockchainService.connect();
        setIsBlockchainConnected(connected);
      } catch (error) {
        console.error('Failed to connect to blockchain:', error);
        // Don't show error for customers - blockchain connection is optional for viewing
      }
    };
    
    initBlockchain();
  }, []);

  // Mock blockchain data for demonstration
  const mockBlockchainData = {
    'QR001': {
      productName: 'Organic Rice',
      currentLocation: 'Fresh Mart Store, Delhi',
      status: 'Ready for Sale',
      trail: [
        {
          stage: 'Farmer',
          name: 'Raj Kumar',
          location: 'Village Rampur, Uttar Pradesh',
          date: '2024-01-15',
          blockchainId: 'BC001',
          details: {
            cropName: 'Rice',
            weight: '500 kg',
            harvestDate: '2024-01-15',
            expectedPrice: '₹25/kg'
          }
        },
        {
          stage: 'Distributor',
          name: 'AgriFlow Logistics',
          location: 'Warehouse Delhi',
          date: '2024-01-18',
          blockchainId: 'DIST001',
          details: {
            purchasePrice: '₹28/kg',
            qualityCheck: 'Passed',
            storageCondition: 'Temperature Controlled'
          }
        },
        {
          stage: 'Retailer',
          name: 'Fresh Mart',
          location: 'Connaught Place, Delhi',
          date: '2024-01-22',
          blockchainId: 'RET001',
          details: {
            finalPrice: '₹35/kg',
            expiryDate: '2024-06-15',
            certification: 'Organic Certified'
          }
        }
      ]
    },
    'QR002': {
      productName: 'Fresh Wheat',
      currentLocation: 'Super Bazaar, Mumbai',
      status: 'Ready for Sale',
      trail: [
        {
          stage: 'Farmer',
          name: 'Priya Sharma',
          location: 'Village Khetri, Rajasthan',
          date: '2024-01-20',
          blockchainId: 'BC002',
          details: {
            cropName: 'Wheat',
            weight: '300 kg',
            harvestDate: '2024-01-20',
            expectedPrice: '₹30/kg'
          }
        },
        {
          stage: 'Distributor',
          name: 'GrainFlow Solutions',
          location: 'Warehouse Mumbai',
          date: '2024-01-23',
          blockchainId: 'DIST002',
          details: {
            purchasePrice: '₹32/kg',
            qualityCheck: 'Grade A',
            processingDate: '2024-01-24'
          }
        },
        {
          stage: 'Retailer',
          name: 'Super Bazaar',
          location: 'Bandra, Mumbai',
          date: '2024-01-26',
          blockchainId: 'RET002',
          details: {
            finalPrice: '₹40/kg',
            expiryDate: '2024-07-20',
            packagingDate: '2024-01-25'
          }
        }
      ]
    }
  };

  // Fetch product data from blockchain
  const fetchProductFromBlockchain = async (productId: string) => {
    if (!isBlockchainConnected) {
      toast.error('Blockchain not connected. Showing mock data instead.');
      // Fallback to mock data if blockchain not connected
      const data = mockBlockchainData[productId as keyof typeof mockBlockchainData];
      if (data) {
        setScannedData(data as any);
      } else {
        toast.error('Product not found in mock data either.');
      }
      return;
    }

    setIsLoading(true);
    try {
      // Get product details
      const product = await blockchainService.getProduct(productId);
      if (!product || !product.exists) {
        toast.error('Product not found on blockchain. Please check the product ID.');
        return;
      }

      // Get transaction history
      const transactions = await blockchainService.getProductHistory(productId);
      
      // Get verification data
      const verification = await blockchainService.verifyProduct(productId);
      
      const blockchainData: BlockchainProductData = {
        product,
        transactions,
        verification
      };
      
      setScannedData(blockchainData);
      toast.success('Product data loaded from blockchain successfully!');
    } catch (error) {
      console.error('Failed to fetch product from blockchain:', error);
      toast.error('Failed to fetch product data from blockchain.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualScan = () => {
    if (manualCode.trim()) {
      fetchProductFromBlockchain(manualCode.trim());
    }
  };

  // Handle QR code scanning from camera or file
  const handleQRCodeScanned = async (qrData: QRCodeData | { rawText: string }) => {
    if ('productId' in qrData) {
      // Valid QR code data structure
      await fetchProductFromBlockchain(qrData.productId);
    } else if ('rawText' in qrData) {
      // Raw text, might be a product ID
      await fetchProductFromBlockchain(qrData.rawText);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        setIsLoading(true);
        const qrData = await qrCodeService.scanFromFile(file);
        await handleQRCodeScanned(qrData);
      } catch (error) {
        console.error('Failed to scan QR code from file:', error);
        toast.error('Failed to scan QR code from image. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'Farmer': return User;
      case 'Distributor': return Truck;
      case 'Retailer': return Store;
      default: return Package;
    }
  };

  const getStageColor = (action: string) => {
    if (action.includes('Registered')) return 'text-green-600';
    if (action.includes('Transportation')) return 'text-blue-600';
    if (action.includes('Store')) return 'text-purple-600';
    if (action.includes('Delivered')) return 'text-orange-600';
    return 'text-muted-foreground';
  };

  const getActionIcon = (action: string) => {
    if (action.includes('Registered')) return User;
    if (action.includes('Transportation')) return Truck;
    if (action.includes('Store')) return Store;
    if (action.includes('Delivered')) return Package;
    return Package;
  };

  const getActionBackground = (action: string) => {
    if (action.includes('Registered')) return 'bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-800';
    if (action.includes('Transportation')) return 'bg-blue-100 dark:bg-blue-900 border-blue-200 dark:border-blue-800';
    if (action.includes('Store')) return 'bg-purple-100 dark:bg-purple-900 border-purple-200 dark:border-purple-800';
    if (action.includes('Delivered')) return 'bg-orange-100 dark:bg-orange-900 border-orange-200 dark:border-orange-800';
    return 'bg-card border-border';
  };

  // Format timestamp to readable date
  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get current status based on latest transaction
  const getCurrentStatus = (transactions: Transaction[]) => {
    if (transactions.length === 0) return 'Unknown';
    const latest = transactions[transactions.length - 1];
    return latest.action;
  };

  if (scannedData) {
    return (
      <BackgroundWrapper type="customer">
        <Header />
        
        <div className="pt-20 px-4 pb-8">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={() => setScannedData(null)}
              className="mb-4 text-foreground hover:bg-card/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Scan Another QR
            </Button>

            {/* Product Summary */}
            <Card className="bg-card/90 backdrop-blur-sm border-border/50 mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-foreground">{scannedData.product.name}</CardTitle>
                    <p className="text-muted-foreground">{scannedData.product.location}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Harvest Date: {scannedData.product.harvestDate} • Quality: {scannedData.product.quality}
                    </p>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="flex items-center gap-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 rounded-full">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">{scannedData.product.status}</span>
                    </div>
                    <div className="text-sm">
                      <p className="text-muted-foreground">Current Price</p>
                      <p className="font-bold text-foreground">₹{formatEther(scannedData.product.currentPrice)} ETH</p>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Blockchain Verification */}
            <Card className="bg-card/90 backdrop-blur-sm border-border/50 mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Blockchain Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800 dark:text-green-200">Verified</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Product authenticity confirmed on blockchain</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-muted-foreground">Total Steps</p>
                    <p className="text-2xl font-bold text-blue-600">{scannedData.verification.totalSteps}</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <p className="text-sm text-muted-foreground">Product ID</p>
                    <p className="text-sm font-mono text-purple-600 break-all">{scannedData.product.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supply Chain Timeline */}
            <Card className="bg-card/90 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-green-600" />
                  Complete Supply Chain Trail
                </CardTitle>
                <p className="text-muted-foreground">Track the journey from farm to your table</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {scannedData.transactions.map((transaction: Transaction, index: number) => {
                    const ActionIcon = getActionIcon(transaction.action);
                    return (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${getActionBackground(transaction.action)} ${getStageColor(transaction.action)}`}>
                            <ActionIcon className="w-6 h-6" />
                          </div>
                          {index < scannedData.transactions.length - 1 && (
                            <div className="w-0.5 h-16 bg-gradient-to-b from-green-300 to-emerald-300 mt-2" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="bg-card/60 rounded-lg p-4 border border-border/50">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-foreground">{transaction.action}</h3>
                                <p className="text-sm font-medium text-muted-foreground">
                                  Actor: {transaction.actor.substring(0, 6)}...{transaction.actor.substring(38)}
                                </p>
                                <p className="text-xs text-muted-foreground">{transaction.details}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-muted-foreground">{formatTimestamp(transaction.timestamp)}</p>
                                <p className="text-xs font-mono text-primary">Block #{transaction.blockNumber.toString()}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                              <div className="bg-muted/50 rounded px-3 py-2">
                                <p className="text-xs text-muted-foreground">Price at this step</p>
                                <p className="text-sm font-medium text-foreground">₹{formatEther(transaction.newPrice)} ETH</p>
                              </div>
                              <div className="bg-muted/50 rounded px-3 py-2">
                                <p className="text-xs text-muted-foreground">Transaction Hash</p>
                                <p className="text-xs font-mono text-foreground break-all">
                                  {transaction.actor.substring(0, 10)}...
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Verification Footer */}
                <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-300 mb-2">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Blockchain Verified</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This product's authenticity and supply chain trail has been verified on the blockchain. 
                    All information is tamper-proof and transparent.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </BackgroundWrapper>
    );
  }

  return (
    <BackgroundWrapper type="customer">
      <Header />
      
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-foreground hover:bg-card/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <Card className="bg-card/90 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <QrCode className="w-6 h-6 text-green-600" />
                {t('scanQR')}
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Scan or upload QR code to trace product journey
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Camera Scan Button */}
              <Button
                onClick={() => setIsScanning(!isScanning)}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Camera className="w-4 h-4 mr-2" />
                )}
                {isLoading ? 'Processing...' : 'Open Camera Scanner'}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                {isBlockchainConnected 
                  ? 'Connected to blockchain for real-time verification'
                  : 'Camera access not available in this demo'
                }
              </p>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              {/* Upload QR Image */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full bg-card/80 border-green-200 dark:border-green-800 hover:bg-green-50 dark:hover:bg-green-950/20"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload QR Code Image
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              {/* Manual QR Code Entry */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Enter QR Code Manually</label>
                  <Input
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    placeholder="e.g., QR001"
                    className="bg-input-background"
                  />
                </div>
              <Button
                  onClick={handleManualScan}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white"
                  disabled={!manualCode.trim() || isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <QrCode className="w-4 h-4 mr-2" />
                  )}
                  {isLoading ? 'Loading...' : 'Trace Product'}
                </Button>
              </div>

              {/* Blockchain Status & Demo Codes */}
              <div className="space-y-3">
                <div className={`p-3 rounded-lg border ${isBlockchainConnected 
                  ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                  : 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800'
                }`}>
                  <div className="flex items-center gap-2">
                    {isBlockchainConnected ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-yellow-600" />
                    )}
                    <span className="text-sm font-medium">
                      Blockchain: {isBlockchainConnected ? 'Connected' : 'Using Mock Data'}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isBlockchainConnected 
                      ? 'Real-time blockchain verification active'
                      : 'Connect MetaMask for live blockchain data'
                    }
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    {isBlockchainConnected ? 'Try Product IDs:' : 'Demo QR Codes:'}
                  </h4>
                  <div className="space-y-1">
                    <button
                      onClick={() => setManualCode(isBlockchainConnected ? 'AGRI-' + Date.now() : 'QR001')}
                      className="block text-xs text-green-600 hover:underline"
                    >
                      {isBlockchainConnected ? 'Generate Test ID' : 'QR001 - Organic Rice 🌾'}
                    </button>
                    <button
                      onClick={() => setManualCode('QR002')}
                      className="block text-xs text-emerald-600 hover:underline"
                    >
                      QR002 - Fresh Wheat 🌾 (Mock)
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BackgroundWrapper>
  );
}