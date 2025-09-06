# 🌾 AgroChain - Blockchain-Based Agricultural Supply Chain Transparency

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18.3.1-blue)](https://reactjs.org/)
[![Solidity](https://img.shields.io/badge/Solidity-v0.8.19-purple)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-v2.22.12-yellow)](https://hardhat.org/)

> A comprehensive blockchain-based solution for agricultural supply chain transparency, enabling farm-to-table traceability with immutable records and QR code verification.

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [📁 Repository Structure](#-repository-structure)
- [⚡ Quick Start](#-quick-start)
- [🔧 Installation](#-installation)
- [🚀 Usage](#-usage)
- [👥 User Roles](#-user-roles)
- [🔗 Blockchain Integration](#-blockchain-integration)
- [📱 QR Code System](#-qr-code-system)
- [🔒 Security](#-security)
- [📊 Smart Contract](#-smart-contract)
- [🎨 Frontend](#-frontend)
- [🔥 Firebase Integration](#-firebase-integration)
- [📈 Monitoring](#-monitoring)
- [🧪 Testing](#-testing)
- [📚 Documentation](#-documentation)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Overview

AgroChain is a revolutionary blockchain-based platform that brings complete transparency to agricultural supply chains. By leveraging smart contracts, QR codes, and real-time tracking, we enable consumers to trace their food from farm to table while ensuring authenticity and building trust throughout the supply chain.

### 🎯 Problem Statement
- Lack of transparency in food supply chains
- Difficulty in verifying product authenticity
- No way to track food journey from farm to consumer
- Price manipulation and unfair practices
- Food fraud and contamination issues

### 💡 Solution
- **Blockchain Technology**: Immutable record-keeping
- **Smart Contracts**: Automated and transparent transactions
- **QR Code Integration**: Easy product verification
- **Role-Based Access**: Farmers, Distributors, Retailers, Customers
- **Real-time Tracking**: Complete supply chain visibility

---

## ✨ Features

### 🌾 For Farmers
- ✅ Register crops on blockchain
- ✅ Generate QR codes for products
- ✅ Set base prices and quality grades
- ✅ Track product journey
- ✅ Receive fair compensation

### 🚛 For Distributors
- ✅ Scan and verify products
- ✅ Add transport and handling costs
- ✅ Update product status in real-time
- ✅ Maintain transport records
- ✅ Ensure cold chain integrity

### 🏪 For Retailers
- ✅ Verify product authenticity
- ✅ Add retail margins transparently
- ✅ Manage inventory with blockchain records
- ✅ Provide customers with complete history
- ✅ Build consumer trust

### 👥 For Customers
- ✅ Scan QR codes for instant verification
- ✅ View complete supply chain history
- ✅ Verify product authenticity
- ✅ See fair price breakdown
- ✅ Make informed purchasing decisions

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Blockchain    │    │   Services      │
│   (React)       │◄──►│   (Hardhat)     │◄──►│   (Firebase)    │
│                 │    │                 │    │                 │
│ • Dashboard     │    │ • Smart Contract│    │ • Authentication│
│ • QR Scanner    │    │ • Transactions  │    │ • Database      │
│ • User Roles    │    │ • Events        │    │ • Storage       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   QR System     │
                    │                 │
                    │ • Generation    │
                    │ • Scanning      │
                    │ • Verification  │
                    └─────────────────┘
```

---

## 📁 Repository Structure

```
AgroChain/
├── 📂 frontendNbackend/              # Main Frontend Application
│   ├── 📂 src/
│   │   ├── 📂 components/            # React Components
│   │   │   ├── FarmerDashboard.tsx
│   │   │   ├── DistributorDashboard.tsx
│   │   │   ├── RetailerDashboard.tsx
│   │   │   ├── CustomerQRScanner.tsx
│   │   │   └── ui/                   # Reusable UI Components
│   │   ├── 📂 services/              # Core Services
│   │   │   ├── blockchainService.ts  # Blockchain Integration
│   │   │   ├── firebaseService.ts    # Firebase Services
│   │   │   └── qrCodeService.ts      # QR Code Management
│   │   ├── 📂 lib/                   # Utilities
│   │   ├── 📂 styles/                # CSS Styles
│   │   └── App.tsx                   # Main App Component
│   ├── package.json                  # Dependencies
│   ├── vite.config.ts               # Vite Configuration
│   └── firebase.json                # Firebase Config
│
├── 📂 Blockchain/                    # Blockchain Components
│   └── 📂 seed-to-shelf-flow-main/
│       └── 📂 smart-contracts/       # Smart Contracts
│           ├── AgriChain.sol         # Main Smart Contract
│           ├── deploy.js             # Deployment Script
│           ├── hardhat.config.js     # Hardhat Config
│           └── package.json          # Contract Dependencies
│
├── 🚀 AgroChain-Launcher.ps1         # One-Click Launcher
├── 📊 flowchart.md                   # Process Flowcharts
├── 📖 BLOCKCHAIN_INTEGRATION_README.md # Integration Guide
├── 📝 README.md                      # This File
└── 📄 package-lock.json             # Lock File
```

---

## ⚡ Quick Start

### 🎯 One-Click Launch (Recommended)

```powershell
# Clone the repository
git clone <your-repo-url>
cd AgroChain

# Run the launcher (Windows PowerShell)
.\AgroChain-Launcher.ps1
```

The launcher will automatically:
- ✅ Check prerequisites
- ✅ Install dependencies
- ✅ Start blockchain network
- ✅ Deploy smart contracts
- ✅ Launch frontend application
- ✅ Configure everything for you!

### 📋 Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **MetaMask** browser extension
- **Git** for version control
- **PowerShell** (Windows) or **Terminal** (Mac/Linux)

---

## 🔧 Installation

### 1️⃣ Clone Repository
```bash
git clone <your-repo-url>
cd AgroChain
```

### 2️⃣ Install Frontend Dependencies
```bash
cd frontendNbackend
npm install
```

### 3️⃣ Install Smart Contract Dependencies
```bash
cd ../Blockchain/seed-to-shelf-flow-main/smart-contracts
npm install
```

### 4️⃣ Install Global Tools
```bash
npm install -g hardhat
npm install -g firebase-tools
```

---

## 🚀 Usage

### 🔥 Manual Setup

#### Start Blockchain Network
```bash
cd Blockchain/seed-to-shelf-flow-main/smart-contracts
npm run node
```

#### Deploy Smart Contracts
```bash
# In a new terminal
npm run deploy:local
```

#### Start Frontend
```bash
cd frontendNbackend
npm run dev
```

### 🌐 Access the Application
- **Frontend**: http://localhost:3000
- **Blockchain RPC**: http://localhost:8545
- **Chain ID**: 31337 (for MetaMask)

---

## 👥 User Roles

### 👨‍🌾 Farmer
```typescript
interface FarmerActions {
  registerProduct: (productData: ProductData) => Promise<string>;
  generateQRCode: (productId: string) => Promise<string>;
  trackProduct: (productId: string) => Promise<ProductHistory[]>;
}
```

### 🚛 Distributor
```typescript
interface DistributorActions {
  scanProduct: (qrCode: string) => Promise<Product>;
  addTransportInfo: (productId: string, transportData: TransportData) => Promise<string>;
  updateBlockchain: (productId: string) => Promise<string>;
}
```

### 🏪 Retailer
```typescript
interface RetailerActions {
  receiveProduct: (productId: string) => Promise<Product>;
  addRetailInfo: (productId: string, retailData: RetailData) => Promise<string>;
  finalizeForSale: (productId: string) => Promise<string>;
}
```

### 👥 Customer
```typescript
interface CustomerActions {
  scanQRCode: (qrCode: string) => Promise<ProductHistory>;
  verifyAuthenticity: (productId: string) => Promise<boolean>;
  viewPriceBreakdown: (productId: string) => Promise<PriceBreakdown>;
}
```

---

## 🔗 Blockchain Integration

### 📝 Smart Contract Overview
```solidity
contract AgriChain {
    struct Product {
        string id;
        string name;
        uint256 quantity;
        uint256 basePrice;
        uint256 currentPrice;
        string harvestDate;
        string quality;
        string status;
        address farmer;
        address distributor;
        address retailer;
        string location;
        uint256 timestamp;
        bool exists;
    }
    
    // Core Functions
    function registerProduct(...) external;
    function updateAsDistributor(...) external;
    function updateAsRetailer(...) external;
    function getProduct(string memory _id) external view returns (Product memory);
    function verifyProduct(string memory _id) external view returns (...);
}
```

### 🔧 Network Configuration

#### Local Development
```javascript
{
  "networkName": "AgroChain Local",
  "rpcUrl": "http://localhost:8545",
  "chainId": 31337,
  "symbol": "ETH",
  "blockExplorer": "N/A (Local)"
}
```

#### MetaMask Setup
1. Open MetaMask
2. Add Custom Network
3. Use configuration above
4. Import test accounts from Hardhat

---

## 📱 QR Code System

### 🏗️ QR Code Structure
```json
{
  "productId": "AGRI-2024-001",
  "version": "1.0",
  "timestamp": "2024-01-15T10:30:00Z",
  "checksum": "abc123def456"
}
```

### 📊 Generation Process
```typescript
class QRCodeService {
  generateQR(productId: string): Promise<string> {
    const qrData = {
      productId,
      version: "1.0",
      timestamp: new Date().toISOString(),
      checksum: this.calculateChecksum(productId)
    };
    
    return QRCode.toDataURL(JSON.stringify(qrData));
  }
  
  scanQR(qrCodeData: string): Promise<ProductData> {
    const data = JSON.parse(qrCodeData);
    return this.verifyAndFetch(data.productId);
  }
}
```

---

## 🔒 Security

### 🛡️ Smart Contract Security
- ✅ **Access Control**: Role-based permissions
- ✅ **Input Validation**: All inputs sanitized
- ✅ **Overflow Protection**: SafeMath operations
- ✅ **Reentrancy Guards**: Protected functions
- ✅ **Event Logging**: Complete audit trail

### 🔐 Frontend Security
- ✅ **Wallet Integration**: MetaMask connection
- ✅ **Transaction Signing**: User approval required
- ✅ **Data Validation**: Client-side validation
- ✅ **Error Handling**: Graceful error management
- ✅ **Session Management**: Secure authentication

### 🚫 Attack Mitigation
- ✅ **Front-running Protection**: Commit-reveal scheme
- ✅ **DoS Resistance**: Gas limits and timeouts
- ✅ **Data Integrity**: Cryptographic verification
- ✅ **Network Security**: HTTPS/WSS connections

---

## 📊 Smart Contract

### 📈 Key Features

#### 🔄 State Management
```solidity
mapping(string => Product) public products;
mapping(string => Transaction[]) public productHistory;
mapping(address => string[]) public farmerProducts;
string[] public allProductIds;
```

#### 🎯 Core Functions
- `registerProduct()` - Farmer registers new product
- `updateAsDistributor()` - Distributor updates transport info
- `updateAsRetailer()` - Retailer adds retail information
- `getProduct()` - Retrieve product details
- `verifyProduct()` - Verify authenticity and history

#### 📡 Events
```solidity
event ProductRegistered(string indexed productId, address indexed farmer, ...);
event ProductUpdated(string indexed productId, address indexed actor, ...);
event SupplyChainStep(string indexed productId, address indexed from, ...);
```

---

## 🎨 Frontend

### ⚛️ Technology Stack
- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Hooks
- **Blockchain**: ethers.js 6.15.0
- **QR Codes**: qrcode + html5-qrcode
- **Charts**: Recharts

### 🎯 Key Components

#### 📊 Dashboard Components
```typescript
// Farmer Dashboard
const FarmerDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  
  const handleRegisterProduct = async (productData: ProductData) => {
    // Registration logic
  };
  
  return (
    // Dashboard UI
  );
};
```

#### 📱 QR Scanner
```typescript
const CustomerQRScanner: React.FC = () => {
  const handleQRScan = (result: string) => {
    // Process QR scan result
  };
  
  return (
    <QrScanner onScan={handleQRScan} />
  );
};
```

---

## 🔥 Firebase Integration

### 🏗️ Configuration
```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "agrochain-8d695.firebaseapp.com",
  projectId: "agrochain-8d695",
  storageBucket: "agrochain-8d695.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

### 📊 Services Used
- **🔐 Authentication**: User management
- **💾 Firestore**: Product drafts and user data
- **📁 Storage**: QR code images and documents
- **🌐 Hosting**: Frontend deployment

---

## 📈 Monitoring

### 📊 Metrics Tracked
- **👥 User Activity**: Registrations, logins, transactions
- **⛓️ Blockchain Metrics**: Gas usage, transaction times
- **🔄 Supply Chain**: Products tracked, verification rates
- **🚫 Error Rates**: Failed transactions, system errors

### 📱 Dashboards
```typescript
interface SystemMetrics {
  totalProducts: number;
  totalTransactions: number;
  activeUsers: number;
  verificationRate: number;
  averageTransactionTime: number;
}
```

---

## 🧪 Testing

### 🔬 Smart Contract Tests
```bash
cd Blockchain/seed-to-shelf-flow-main/smart-contracts
npm test
```

### 🌐 Frontend Tests
```bash
cd frontendNbackend
npm test
```

### 📊 Test Coverage
- **Smart Contracts**: >90% coverage
- **Frontend Components**: >85% coverage
- **Integration Tests**: End-to-end workflows
- **Performance Tests**: Load and stress testing

---

## 📚 Documentation

### 📖 Available Docs
- **📊 Process Flowcharts**: `flowchart.md`
- **⛓️ Blockchain Integration**: `BLOCKCHAIN_INTEGRATION_README.md`
- **🚀 Getting Started**: This README
- **📝 API Documentation**: Generated docs
- **🎯 User Guides**: Role-specific guides

### 🔗 External Links
- **Hardhat Docs**: https://hardhat.org/docs
- **React Docs**: https://reactjs.org/docs
- **ethers.js Docs**: https://docs.ethers.io/
- **Firebase Docs**: https://firebase.google.com/docs

---

## 🤝 Contributing

### 🎯 How to Contribute

1. **🍴 Fork** the repository
2. **🌿 Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **💻 Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **⬆️ Push** to the branch (`git push origin feature/amazing-feature`)
5. **🔄 Open** a Pull Request

### 📋 Development Guidelines

#### 📝 Code Style
- Follow existing patterns and conventions
- Use TypeScript for type safety
- Write clear, self-documenting code
- Include comprehensive comments

#### 🧪 Testing
- Write tests for new features
- Ensure all tests pass before committing
- Maintain test coverage above 80%

#### 📚 Documentation
- Update README for new features
- Document API changes
- Include code examples

### 🐛 Bug Reports
Please use the issue tracker to report bugs. Include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots if applicable
- Environment details

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 AgroChain Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🎉 Acknowledgments

- **🌾 Agricultural Community**: For inspiring this transparency solution
- **⛓️ Blockchain Community**: For the foundational technologies
- **👥 Open Source Contributors**: For the amazing tools and libraries
- **🏆 Competition Organizers**: For the opportunity to build this solution

---

## 📞 Support

- **📧 Email**: support@agrochain.dev
- **💬 Discord**: [Join our community](https://discord.gg/agrochain)
- **🐛 Issues**: [GitHub Issues](https://github.com/your-org/agrochain/issues)
- **📖 Wiki**: [Project Wiki](https://github.com/your-org/agrochain/wiki)

---

<div align="center">

### 🌟 Built with ❤️ for Agricultural Transparency 🌟

**[⭐ Star this repository](https://github.com/your-org/agrochain) if you found it helpful!**

[![GitHub stars](https://img.shields.io/github/stars/your-org/agrochain?style=social)](https://github.com/your-org/agrochain/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/your-org/agrochain?style=social)](https://github.com/your-org/agrochain/network)
[![GitHub issues](https://img.shields.io/github/issues/your-org/agrochain)](https://github.com/your-org/agrochain/issues)

</div>

---

*Made with 🌾 by the AgroChain Team - Bringing transparency to food supply chains worldwide*
