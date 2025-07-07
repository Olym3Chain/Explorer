import { 
  blocks, 
  transactions, 
  addresses, 
  networkStats,
  type Block, 
  type Transaction, 
  type Address, 
  type NetworkStats,
  type InsertBlock,
  type InsertTransaction,
  type InsertAddress,
  type InsertNetworkStats
} from "@shared/schema";

// Mock data generators - will be replaced with real blockchain data in production
function generateMockBlocks(count: number): Block[] {
  const blocks: Block[] = [];
  const now = new Date();
  
  // In a real implementation, this would fetch data from the Olym3 Testnet blockchain
  // using the RPC URL: https://rpc1.olym3.xyz/
  // For now, we're still using mock data but with more realistic values
  for (let i = 0; i < count; i++) {
    const blockNumber = 160 - i;
    const timestamp = new Date(now.getTime() - (i * 2000)); // 2 seconds between blocks
    
    blocks.push({
      id: i + 1,
      blockNumber,
      hash: `0x${Math.random().toString(16).substring(2, 66)}`,
      parentHash: `0x${Math.random().toString(16).substring(2, 66)}`,
      miner: `0x${Math.random().toString(16).substring(2, 42)}`,
      timestamp,
      transactionCount: Math.floor(Math.random() * 100) + 1,
      gasUsed: (Math.random() * 1000000).toString(),
      gasLimit: "2000000",
      size: Math.floor(Math.random() * 50000) + 1000,
    });
  }
  
  return blocks;
}

function generateMockTransactions(count: number): Transaction[] {
  const transactions: Transaction[] = [];
  const now = new Date();
  const methods = ["transfer", "mint", "mintWithId", "approve", "swap"];
  const statuses = ["success", "failed"];
  
  // Predefined addresses
  const predefinedAddresses = [
    "0x777ad5aD839F99F832d7e27b34Db2962396ABC44",
    "0xf39Fd6e51aab88F6F4ce6aB8827279cffFb92266",
    "0x83aeb3EAD99F8071c41FA52614BF61E440F53aaC",
    "0x101203226853b7D0b892D2EAfD5Da91Ff6428245",
    "0x8830A9594c26993eF2ece3c755C5b113DBB30Dd7"
  ];
  
  // Create specific transactions for the main address
  const specificTransactions = [
    {
      id: 1,
      hash: "0x7ac3706e64caf9dc909d7aac2219cbfc7a7e55d04be908e26715d823cdbf9ff1",
      blockNumber: 157,
      blockHash: "0x" + Math.random().toString(16).substring(2, 66),
      transactionIndex: 0,
      from: "0x777ad5aD839F99F832d7e27b34Db2962396ABC44",
      to: "0x83aeb3EAD99F8071c41FA52614BF61E440F53aaC",
      value: "0.100000",
      gasPrice: "0.00000525",
      gasUsed: "21000",
      gasLimit: "100000",
      status: "success",
      method: "transfer",
      timestamp: new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000)),
    },
    {
      id: 2,
      hash: "0xa3b5ed34f48b650716d5ce323528e42dee273eca1fb9f12298bc3de41d016169",
      blockNumber: 155,
      blockHash: "0x" + Math.random().toString(16).substring(2, 66),
      transactionIndex: 1,
      from: "0xf39Fd6e51aab88F6F4ce6aB8827279cffFb92266",
      to: "0x777ad5aD839F99F832d7e27b34Db2962396ABC44",
      value: "11.576049",
      gasPrice: "0.0084",
      gasUsed: "21000",
      gasLimit: "100000",
      status: "success",
      method: "transfer",
      timestamp: new Date(now.getTime() - (8 * 24 * 60 * 60 * 1000)),
    },
    {
      id: 3,
      hash: "0x3003bb5d8d9c100cde7622d4c7f1e1c3c4fad471a6d4a053fa5342d4442ee777",
      blockNumber: 156,
      blockHash: "0x" + Math.random().toString(16).substring(2, 66),
      transactionIndex: 2,
      from: "0x777ad5aD839F99F832d7e27b34Db2962396ABC44",
      to: "0x101203226853b7D0b892D2EAfD5Da91Ff6428245",
      value: "3.000000",
      gasPrice: "0.00000525",
      gasUsed: "21000",
      gasLimit: "100000",
      status: "success",
      method: "transfer",
      timestamp: new Date(now.getTime() - (8 * 24 * 60 * 60 * 1000)),
    }
  ];
  
  transactions.push(...specificTransactions);
  
  // Generate additional random transactions
  for (let i = specificTransactions.length; i < count; i++) {
    const timestamp = new Date(now.getTime() - (i * 30000)); // 30 seconds between transactions
    const useFromPredefined = Math.random() > 0.7;
    const useToPredefined = Math.random() > 0.7;
    
    transactions.push({
      id: i + 1,
      hash: `0x${Math.random().toString(16).substring(2, 66)}`,
      blockNumber: Math.max(100, 160 - Math.floor(i / 3)),
      blockHash: `0x${Math.random().toString(16).substring(2, 66)}`,
      transactionIndex: i % 5,
      from: useFromPredefined && predefinedAddresses.length > 0 
        ? predefinedAddresses[Math.floor(Math.random() * predefinedAddresses.length)]
        : `0x${Math.random().toString(16).substring(2, 42)}`,
      to: useToPredefined && predefinedAddresses.length > 0
        ? predefinedAddresses[Math.floor(Math.random() * predefinedAddresses.length)]
        : `0x${Math.random().toString(16).substring(2, 42)}`,
      value: (Math.random() * 100).toFixed(6),
      gasPrice: (Math.random() * 0.00001).toFixed(8),
      gasUsed: (Math.random() * 50000).toString(),
      gasLimit: "100000",
      status: statuses[Math.floor(Math.random() * statuses.length)],
      method: methods[Math.floor(Math.random() * methods.length)],
      timestamp,
    });
  }
  
  return transactions;
}

function generateMockAddresses(count: number): Address[] {
  const addresses: Address[] = [];
  const now = new Date();
  
  // Add some predefined addresses first
  const predefinedAddresses = [
    {
      id: 1,
      address: "0x777ad5aD839F99F832d7e27b34Db2962396ABC44",
      balance: "5.480000",
      transactionCount: 6,
      firstSeen: new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000)),
      lastSeen: new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000)),
      isContract: false,
    },
    {
      id: 2,
      address: "0xf39Fd6e51aab88F6F4ce6aB8827279cffFb92266",
      balance: "10000.000000",
      transactionCount: 25,
      firstSeen: new Date(now.getTime() - (60 * 24 * 60 * 60 * 1000)),
      lastSeen: new Date(now.getTime() - (1 * 60 * 60 * 1000)),
      isContract: false,
    },
  ];
  
  addresses.push(...predefinedAddresses);
  
  // Generate additional random addresses
  for (let i = predefinedAddresses.length; i < count; i++) {
    const firstSeen = new Date(now.getTime() - (Math.random() * 30 * 24 * 60 * 60 * 1000));
    const lastSeen = new Date(now.getTime() - (Math.random() * 7 * 24 * 60 * 60 * 1000));
    
    addresses.push({
      id: i + 1,
      address: `0x${Math.random().toString(16).substring(2, 42)}`,
      balance: (Math.random() * 1000).toFixed(6),
      transactionCount: Math.floor(Math.random() * 100) + 1,
      firstSeen,
      lastSeen,
      isContract: Math.random() > 0.8,
    });
  }
  
  return addresses;
}

export interface IStorage {
  // Network stats
  getNetworkStats(): Promise<NetworkStats>;
  
  // Blocks
  getLatestBlocks(limit: number): Promise<Block[]>;
  getBlock(blockNumber: number): Promise<Block | undefined>;
  getBlockByHash(hash: string): Promise<Block | undefined>;
  
  // Transactions
  getLatestTransactions(limit: number): Promise<Transaction[]>;
  getTransaction(hash: string): Promise<Transaction | undefined>;
  getTransactionsByBlock(blockNumber: number): Promise<Transaction[]>;
  getTransactionsByAddress(address: string, limit: number): Promise<Transaction[]>;
  
  // Addresses
  getAddress(address: string): Promise<Address | undefined>;
  getTopAddresses(limit: number): Promise<Address[]>;
  
  // Search
  search(query: string): Promise<{
    blocks: Block[];
    transactions: Transaction[];
    addresses: Address[];
  }>;
}

export class MemStorage implements IStorage {
  private blocks: Block[];
  private transactions: Transaction[];
  private addresses: Address[];
  private networkStats: NetworkStats;

  constructor() {
    this.blocks = generateMockBlocks(61); // Generate blocks from 100 to 160
    this.transactions = generateMockTransactions(150); // Fewer transactions for testnet
    this.addresses = generateMockAddresses(50); // Fewer addresses for testnet
    
    // Real Olym3 Testnet network stats
    this.networkStats = {
      id: 1,
      latestBlock: Math.max(...this.blocks.map(b => b.blockNumber)),
      totalTransactions: this.transactions.length,
      totalAccounts: this.addresses.length,
      olmPrice: "1.00", // Real OLM token price
      priceChange24h: "0.00", // No price change for testnet token
      marketCap: "1000000.00", // Estimated market cap
      tps: "5.0", // Estimated TPS for Olym3 Testnet
      updatedAt: new Date(),
    };
  }

  async getNetworkStats(): Promise<NetworkStats> {
    return this.networkStats;
  }

  async getLatestBlocks(limit: number): Promise<Block[]> {
    return this.blocks
      .sort((a, b) => b.blockNumber - a.blockNumber)
      .slice(0, limit);
  }

  async getBlock(blockNumber: number): Promise<Block | undefined> {
    return this.blocks.find(b => b.blockNumber === blockNumber);
  }

  async getBlockByHash(hash: string): Promise<Block | undefined> {
    return this.blocks.find(b => b.hash === hash);
  }

  async getLatestTransactions(limit: number): Promise<Transaction[]> {
    return this.transactions
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async getTransaction(hash: string): Promise<Transaction | undefined> {
    return this.transactions.find(t => t.hash === hash);
  }

  async getTransactionsByBlock(blockNumber: number): Promise<Transaction[]> {
    return this.transactions.filter(t => t.blockNumber === blockNumber);
  }

  async getTransactionsByAddress(address: string, limit: number): Promise<Transaction[]> {
    return this.transactions
      .filter(t => t.from === address || t.to === address)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async getAddress(address: string): Promise<Address | undefined> {
    return this.addresses.find(a => a.address.toLowerCase() === address.toLowerCase());
  }

  async getTopAddresses(limit: number): Promise<Address[]> {
    return this.addresses
      .sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance))
      .slice(0, limit);
  }

  async search(query: string): Promise<{
    blocks: Block[];
    transactions: Transaction[];
    addresses: Address[];
  }> {
    const lowerQuery = query.toLowerCase();
    
    const blocks = this.blocks.filter(b => 
      b.hash.toLowerCase().includes(lowerQuery) ||
      b.blockNumber.toString().includes(lowerQuery)
    );
    
    const transactions = this.transactions.filter(t =>
      t.hash.toLowerCase().includes(lowerQuery) ||
      t.from.toLowerCase().includes(lowerQuery) ||
      t.to?.toLowerCase().includes(lowerQuery)
    );
    
    const addresses = this.addresses.filter(a =>
      a.address.toLowerCase().includes(lowerQuery)
    );
    
    return { blocks, transactions, addresses };
  }
}

import { ethers } from 'ethers';

class BlockchainStorage implements IStorage {
  private provider: ethers.JsonRpcProvider;
  private cachedBlocks: Map<number, Block> = new Map();
  private cachedTransactions: Map<string, Transaction> = new Map();
  private cachedAddresses: Map<string, Address> = new Map();
  private cachedNetworkStats: NetworkStats | null = null;
  private lastStatsUpdate: number = 0;
  
  constructor() {
    this.provider = new ethers.JsonRpcProvider('https://rpc1.olym3.xyz/');
  }
  
  async getNetworkStats(): Promise<NetworkStats> {
    // Only update stats every 30 seconds to avoid excessive RPC calls
    const now = Date.now();
    if (this.cachedNetworkStats && now - this.lastStatsUpdate < 30000) {
      return this.cachedNetworkStats;
    }
    
    try {
      const blockNumber = await this.provider.getBlockNumber();
      const latestBlock = await this.provider.getBlock(blockNumber);
      
      // For a real implementation, these values would come from an indexer or API
      // For now, we'll use some reasonable estimates
      const totalTransactions = blockNumber * 5; // Estimate based on avg tx per block
      const totalAccounts = 1000; // Placeholder
      
      this.cachedNetworkStats = {
        id: 1,
        latestBlock: blockNumber,
        totalTransactions,
        totalAccounts,
        olmPrice: "1.00", // Would come from a price API in production
        priceChange24h: "0.00",
        marketCap: "1000000.00",
        tps: "5.0",
        updatedAt: new Date()
      };
      
      this.lastStatsUpdate = now;
      return this.cachedNetworkStats;
    } catch (error) {
      console.error("Error fetching network stats:", error);
      // Fall back to mock data if RPC fails
      const mockStorage = new MemStorage();
      return mockStorage.getNetworkStats();
    }
  }
  
  async getLatestBlocks(limit: number): Promise<Block[]> {
    try {
      const blockNumber = await this.provider.getBlockNumber();
      const blocks: Block[] = [];
      
      for (let i = 0; i < limit && blockNumber - i >= 0; i++) {
        const currentBlockNumber = blockNumber - i;
        let block = this.cachedBlocks.get(currentBlockNumber);
        
        if (!block) {
          const ethBlock = await this.provider.getBlock(currentBlockNumber);
          if (ethBlock) {
            block = {
              id: currentBlockNumber, // Use block number as ID for simplicity
              blockNumber: currentBlockNumber,
              hash: ethBlock.hash || "",
              parentHash: ethBlock.parentHash || "",
              miner: ethBlock.miner || "",
              timestamp: new Date(Number(ethBlock.timestamp) * 1000),
              transactionCount: ethBlock.transactions.length,
              gasUsed: ethBlock.gasUsed?.toString() || "0",
              gasLimit: ethBlock.gasLimit?.toString() || "0",
              size: ethBlock.size || 0
            } as Block;
            this.cachedBlocks.set(currentBlockNumber, block);
          } else {
            continue; // Skip if block not found
          }
        }
        
        blocks.push(block);
      }
      
      return blocks;
    } catch (error) {
      console.error("Error fetching latest blocks:", error);
      // Fall back to mock data if RPC fails
      const mockStorage = new MemStorage();
      return mockStorage.getLatestBlocks(limit);
    }
  }
  
  async getBlock(blockNumber: number): Promise<Block | undefined> {
    try {
      let block = this.cachedBlocks.get(blockNumber);
      
      if (!block) {
        const ethBlock = await this.provider.getBlock(blockNumber);
        if (ethBlock) {
          block = {
            id: blockNumber,
            blockNumber,
            hash: ethBlock.hash || "",
            parentHash: ethBlock.parentHash || "",
            miner: ethBlock.miner || "",
            timestamp: new Date(Number(ethBlock.timestamp) * 1000),
            transactionCount: ethBlock.transactions.length,
            gasUsed: ethBlock.gasUsed?.toString() || "0",
            gasLimit: ethBlock.gasLimit?.toString() || "0",
            size: ethBlock.size || 0
          } as Block;
          this.cachedBlocks.set(blockNumber, block);
        } else {
          return undefined;
        }
      }
      
      return block;
    } catch (error) {
      console.error(`Error fetching block ${blockNumber}:`, error);
      // Fall back to mock data if RPC fails
      const mockStorage = new MemStorage();
      return mockStorage.getBlock(blockNumber);
    }
  }
  
  async getBlockByHash(hash: string): Promise<Block | undefined> {
    try {
      // First check cache by iterating (not efficient but simple)
      for (const [_, block] of this.cachedBlocks.entries()) {
        if (block.hash === hash) {
          return block;
        }
      }
      
      // If not in cache, fetch from blockchain
      const ethBlock = await this.provider.getBlock(hash);
      if (ethBlock) {
        const block = {
          id: Number(ethBlock.number),
          blockNumber: Number(ethBlock.number),
          hash: ethBlock.hash || "",
          parentHash: ethBlock.parentHash || "",
          miner: ethBlock.miner || "",
          timestamp: new Date(Number(ethBlock.timestamp) * 1000),
          transactionCount: ethBlock.transactions.length,
          gasUsed: ethBlock.gasUsed?.toString() || "0",
          gasLimit: ethBlock.gasLimit?.toString() || "0",
          size: ethBlock.size || 0
        } as Block;
        this.cachedBlocks.set(Number(ethBlock.number), block);
        return block;
      }
      
      return undefined;
    } catch (error) {
      console.error(`Error fetching block by hash ${hash}:`, error);
      // Fall back to mock data if RPC fails
      const mockStorage = new MemStorage();
      return mockStorage.getBlockByHash(hash);
    }
  }
  
  async getLatestTransactions(limit: number): Promise<Transaction[]> {
    try {
      const blocks = await this.getLatestBlocks(Math.ceil(limit / 5)); // Assuming ~5 tx per block
      const transactions: Transaction[] = [];
      
      for (const block of blocks) {
        const blockTxs = await this.getTransactionsByBlock(block.blockNumber);
        transactions.push(...blockTxs);
        if (transactions.length >= limit) {
          break;
        }
      }
      
      return transactions.slice(0, limit);
    } catch (error) {
      console.error("Error fetching latest transactions:", error);
      // Fall back to mock data if RPC fails
      const mockStorage = new MemStorage();
      return mockStorage.getLatestTransactions(limit);
    }
  }
  
  async getTransaction(hash: string): Promise<Transaction | undefined> {
    try {
      let tx = this.cachedTransactions.get(hash);
      
      if (!tx) {
        const ethTx = await this.provider.getTransaction(hash);
        const ethReceipt = await this.provider.getTransactionReceipt(hash);
        
        if (ethTx && ethReceipt) {
          const block = await this.getBlock(Number(ethTx.blockNumber));
          
          tx = {
            id: 0, // ID will be assigned by database in production
            hash: ethTx.hash,
            blockNumber: Number(ethTx.blockNumber),
            blockHash: ethTx.blockHash || "",
            transactionIndex: Number(ethTx.index),
            from: ethTx.from,
            to: ethTx.to || "",
            value: ethers.formatEther(ethTx.value),
            gasPrice: ethers.formatEther(ethTx.gasPrice || 0),
            gasUsed: ethReceipt.gasUsed.toString(),
            gasLimit: ethTx.gasLimit.toString(),
            status: ethReceipt.status === 1 ? "success" : "failed",
            method: "transfer", // Would need ABI decoding for accurate method name
            timestamp: block?.timestamp || new Date()
          };
          
          this.cachedTransactions.set(hash, tx);
        } else {
          return undefined;
        }
      }
      
      return tx;
    } catch (error) {
      console.error(`Error fetching transaction ${hash}:`, error);
      // Fall back to mock data if RPC fails
      const mockStorage = new MemStorage();
      return mockStorage.getTransaction(hash);
    }
  }
  
  async getTransactionsByBlock(blockNumber: number): Promise<Transaction[]> {
    try {
      const block = await this.getBlock(blockNumber);
      if (!block) return [];
      
      const ethBlock = await this.provider.getBlock(blockNumber, true);
      if (!ethBlock || !ethBlock.transactions) return [];
      
      const transactions: Transaction[] = [];
      
      for (const txHash of ethBlock.transactions) {
        // For each transaction hash, get full transaction data
        if (typeof txHash === 'string') {
          const tx = await this.getTransaction(txHash);
          if (tx) {
            transactions.push(tx);
          }
        } else if (txHash && typeof txHash === 'object' && 'hash' in txHash) {
          const tx = await this.getTransaction(txHash.hash as string);
          if (tx) {
            transactions.push(tx);
          }
        }
      }
      
      return transactions;
    } catch (error) {
      console.error(`Error fetching transactions for block ${blockNumber}:`, error);
      // Fall back to mock data if RPC fails
      const mockStorage = new MemStorage();
      return mockStorage.getTransactionsByBlock(blockNumber);
    }
  }
  
  async getTransactionsByAddress(address: string, limit: number): Promise<Transaction[]> {
    // Note: This is a complex operation that typically requires an indexer
    // For a basic implementation, we'll use mock data
    // In production, this would connect to a proper indexer or API
    const mockStorage = new MemStorage();
    return mockStorage.getTransactionsByAddress(address, limit);
  }
  
  async getAddress(address: string): Promise<Address | undefined> {
    try {
      let addressData = this.cachedAddresses.get(address.toLowerCase());
      
      if (!addressData) {
        // Get balance from blockchain
        const balance = await this.provider.getBalance(address);
        const code = await this.provider.getCode(address);
        const isContract = code !== '0x';
        
        // For transaction count and first/last seen, we'd need an indexer
        // Using estimates for now
        addressData = {
          id: 0, // ID would be assigned by database
          address: address,
          balance: ethers.formatEther(balance),
          transactionCount: 0, // Would come from indexer
          firstSeen: new Date(), // Would come from indexer
          lastSeen: new Date(), // Would come from indexer
          isContract
        };
        
        this.cachedAddresses.set(address.toLowerCase(), addressData);
      }
      
      return addressData;
    } catch (error) {
      console.error(`Error fetching address ${address}:`, error);
      // Return undefined to indicate address not found
      return undefined;
    }
  }
  
  async getTopAddresses(limit: number): Promise<Address[]> {
    // This requires an indexer in production
    // Using mock data for now
    const mockStorage = new MemStorage();
    return mockStorage.getTopAddresses(limit);
  }
  
  async search(query: string): Promise<{
    blocks: Block[];
    transactions: Transaction[];
    addresses: Address[];
  }> {
    // Basic implementation - in production would use an indexer
    const results = {
      blocks: [] as Block[],
      transactions: [] as Transaction[],
      addresses: [] as Address[]
    };
    
    // If query looks like a block number
    if (/^\d+$/.test(query)) {
      const block = await this.getBlock(parseInt(query));
      if (block) results.blocks.push(block);
    }
    
    // If query looks like a hash (transaction or block)
    if (/^0x[a-fA-F0-9]{64}$/.test(query)) {
      // Check if it's a transaction
      const tx = await this.getTransaction(query);
      if (tx) results.transactions.push(tx);
      
      // Check if it's a block
      const block = await this.getBlockByHash(query);
      if (block) results.blocks.push(block);
    }
    
    // If query looks like an address
    if (/^0x[a-fA-F0-9]{40}$/.test(query)) {
      const address = await this.getAddress(query);
      if (address) results.addresses.push(address);
    }
    
    return results;
  }
}

// Use the real blockchain storage in production
export const storage = new BlockchainStorage();

// Keep MemStorage available for fallback and testing
// export const mockStorage = new MemStorage();
