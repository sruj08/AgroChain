# 🌾 AgroChain - Complete Full-Stack Project

A comprehensive agricultural supply chain management system built with blockchain technology, Firebase backend, and a modern React frontend.

## 🏗️ Project Architecture

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore Database, Hosting)
- **Blockchain**: Ethereum Smart Contracts + Ethers.js
- **Development**: Local Ganache blockchain for testing

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

1. **Open PowerShell as Administrator** in this directory
2. **Enable script execution** (if needed):
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
3. **Run the startup script**:
   ```powershell
   .\start-project.ps1
   ```

This script will automatically:
- ✅ Check all prerequisites
- ✅ Install missing tools (Ganache, Truffle)
- ✅ Set up local blockchain
- ✅ Start Firebase services
- ✅ Build and launch the frontend

### Option 2: Manual Setup

#### Prerequisites

1. **Node.js** (v18+ recommended)
   - Download from [nodejs.org](https://nodejs.org/)

2. **Git** (for version control)
   - Download from [git-scm.com](https://git-scm.com/)

3. **MetaMask Browser Extension**
   - Install from [metamask.io](https://metamask.io/)

#### Step-by-Step Setup

1. **Install Global Tools**:
   ```bash
   npm install -g firebase-tools ganache-cli truffle
   ```

2. **Install Project Dependencies**:
   ```bash
   npm install
   ```

3. **Start Local Blockchain** (Terminal 1):
   ```bash
   ganache-cli --host 0.0.0.0 --port 8545 --networkId 1337 --accounts 10 --mnemonic "test test test test test test test test test test test junk" --deterministic
   ```

4. **Build the Project**:
   ```bash
   npm run build
   ```

5. **Start Development Server** (Terminal 2):
   ```bash
   npm run dev
   ```

## 🔧 Service Configuration

### 🔗 Blockchain Setup

**Local Development (Ganache)**:
- RPC URL: `http://localhost:8545`
- Network ID: `1337`
- Contract Address: `0x5FbDB2315678afecb367f032d93F642f64180aa3`

**MetaMask Configuration**:
1. Open MetaMask extension
2. Click on network dropdown
3. Select "Add Network"
4. Enter the following details:
   - **Network Name**: AgroChain Local
   - **New RPC URL**: `http://localhost:8545`
   - **Chain ID**: `1337`
   - **Currency Symbol**: ETH

### 🔥 Firebase Configuration

**Services Enabled**:
- ✅ Authentication (Email/Password)
- ✅ Firestore Database
- ✅ Hosting
- ✅ Analytics

**Live URLs**:
- **Production**: https://sih-agro-chain.web.app
- **Firebase Console**: https://console.firebase.google.com/project/sih-agro-chain

### 📱 Application URLs

- **Development**: http://localhost:5173
- **Production**: https://sih-agro-chain.web.app
- **Firebase Console**: https://console.firebase.google.com/project/sih-agro-chain

## 🎯 Features

### 👨‍🌾 For Farmers
- Register crop products on blockchain
- Set pricing and quality information
- Track product journey
- Manage inventory

### 🚛 For Distributors
- View available products
- Update handling costs
- Add transport details
- Track supply chain

### 🏪 For Retailers
- Access product catalog
- Add retail margins
- Update store information
- Verify product authenticity

### 👥 For Customers
- Scan QR codes for product verification
- View complete supply chain history
- Check product authenticity
- Access product details

## 🔐 User Roles & Authentication

The system supports four user roles:
- **Farmer**: Primary producers
- **Distributor**: Middlemen and logistics
- **Retailer**: End-point sellers
- **Customer**: End consumers

Authentication is handled through Firebase Auth with email/password.

## 🛠️ Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Firebase
firebase deploy

# Start local blockchain
ganache-cli --port 8545

# Run tests (if implemented)
npm test
```

## 📦 Technology Stack

### Frontend
- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling framework
- **Radix UI**: Component primitives
- **Lucide React**: Icons
- **React Hook Form**: Form handling
- **Recharts**: Data visualization

### Backend
- **Firebase Auth**: User authentication
- **Firestore**: NoSQL database
- **Firebase Hosting**: Static site hosting
- **Firebase Analytics**: Usage analytics

### Blockchain
- **Ethers.js**: Ethereum interaction
- **Ganache**: Local blockchain
- **Truffle**: Development framework (optional)
- **MetaMask**: Wallet integration

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## 🚧 Project Structure

```
frontendNbackend/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components
│   │   ├── FarmerDashboard.tsx
│   │   ├── DistributorDashboard.tsx
│   │   ├── RetailerDashboard.tsx
│   │   └── ...
│   ├── services/           # Service layers
│   │   ├── firebaseService.ts
│   │   ├── blockchainService.ts
│   │   └── qrCodeService.ts
│   ├── lib/               # Utility functions
│   └── styles/            # Styling files
├── public/                # Static assets
├── firebase.js           # Firebase configuration
├── firebase.json         # Firebase project config
├── .firebaserc          # Firebase project ID
├── package.json         # Dependencies and scripts
├── vite.config.ts       # Vite configuration
└── start-project.ps1    # Automated startup script
```

## 🔍 Testing the Application

### 1. **Start All Services**
Run the startup script or follow manual setup

### 2. **Connect MetaMask**
- Configure MetaMask for local network
- Import test accounts from Ganache

### 3. **Test User Flows**
- Create accounts for different user roles
- Register products as farmer
- Update products as distributor/retailer
- Verify products as customer

### 4. **Verify Blockchain Integration**
- Check transaction hashes in Ganache
- Verify contract interactions
- Test product traceability

## 🐛 Troubleshooting

### Common Issues

**MetaMask Not Connecting**:
- Ensure MetaMask is installed and unlocked
- Check network configuration (RPC URL, Chain ID)
- Restart browser if needed

**Ganache Connection Failed**:
- Ensure Ganache is running on port 8545
- Check firewall settings
- Verify network configuration

**Firebase Authentication Issues**:
- Check internet connection
- Verify Firebase project configuration
- Check browser console for errors

**Build Errors**:
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript errors
- Verify all dependencies are installed

### 📞 Getting Help

1. Check the browser console for error messages
2. Verify all services are running
3. Check network configurations
4. Ensure all prerequisites are installed

## 🚀 Deployment

### Production Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**:
   ```bash
   firebase deploy
   ```

3. **Update blockchain configuration** for mainnet or testnet

## 📝 License

This project is developed for educational and demonstration purposes.

---

**Happy Coding! 🌾✨**

For questions or issues, check the troubleshooting section or review the console logs for detailed error information.
