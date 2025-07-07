// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { ethers } from "ethers";
function generateMockBlocks(count) {
  const blocks = [];
  const now = /* @__PURE__ */ new Date();
  for (let i = 0; i < count; i++) {
    const blockNumber = 160 - i;
    const timestamp = new Date(now.getTime() - i * 2e3);
    blocks.push({
      id: i + 1,
      blockNumber,
      hash: `0x${Math.random().toString(16).substring(2, 66)}`,
      parentHash: `0x${Math.random().toString(16).substring(2, 66)}`,
      miner: `0x${Math.random().toString(16).substring(2, 42)}`,
      timestamp,
      transactionCount: Math.floor(Math.random() * 100) + 1,
      gasUsed: (Math.random() * 1e6).toString(),
      gasLimit: "2000000",
      size: Math.floor(Math.random() * 5e4) + 1e3
    });
  }
  return blocks;
}
function generateMockTransactions(count) {
  const transactions = [];
  const now = /* @__PURE__ */ new Date();
  const methods = ["transfer", "mint", "mintWithId", "approve", "swap"];
  const statuses = ["success", "failed"];
  const predefinedAddresses = [
    "0x777ad5aD839F99F832d7e27b34Db2962396ABC44",
    "0xf39Fd6e51aab88F6F4ce6aB8827279cffFb92266",
    "0x83aeb3EAD99F8071c41FA52614BF61E440F53aaC",
    "0x101203226853b7D0b892D2EAfD5Da91Ff6428245",
    "0x8830A9594c26993eF2ece3c755C5b113DBB30Dd7"
  ];
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
      timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3)
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
      timestamp: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1e3)
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
      timestamp: new Date(now.getTime() - 8 * 24 * 60 * 60 * 1e3)
    }
  ];
  transactions.push(...specificTransactions);
  for (let i = specificTransactions.length; i < count; i++) {
    const timestamp = new Date(now.getTime() - i * 3e4);
    const useFromPredefined = Math.random() > 0.7;
    const useToPredefined = Math.random() > 0.7;
    transactions.push({
      id: i + 1,
      hash: `0x${Math.random().toString(16).substring(2, 66)}`,
      blockNumber: Math.max(100, 160 - Math.floor(i / 3)),
      blockHash: `0x${Math.random().toString(16).substring(2, 66)}`,
      transactionIndex: i % 5,
      from: useFromPredefined && predefinedAddresses.length > 0 ? predefinedAddresses[Math.floor(Math.random() * predefinedAddresses.length)] : `0x${Math.random().toString(16).substring(2, 42)}`,
      to: useToPredefined && predefinedAddresses.length > 0 ? predefinedAddresses[Math.floor(Math.random() * predefinedAddresses.length)] : `0x${Math.random().toString(16).substring(2, 42)}`,
      value: (Math.random() * 100).toFixed(6),
      gasPrice: (Math.random() * 1e-5).toFixed(8),
      gasUsed: (Math.random() * 5e4).toString(),
      gasLimit: "100000",
      status: statuses[Math.floor(Math.random() * statuses.length)],
      method: methods[Math.floor(Math.random() * methods.length)],
      timestamp
    });
  }
  return transactions;
}
function generateMockAddresses(count) {
  const addresses = [];
  const now = /* @__PURE__ */ new Date();
  const predefinedAddresses = [
    {
      id: 1,
      address: "0x777ad5aD839F99F832d7e27b34Db2962396ABC44",
      balance: "5.480000",
      transactionCount: 6,
      firstSeen: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3),
      lastSeen: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3),
      isContract: false
    },
    {
      id: 2,
      address: "0xf39Fd6e51aab88F6F4ce6aB8827279cffFb92266",
      balance: "10000.000000",
      transactionCount: 25,
      firstSeen: new Date(now.getTime() - 60 * 24 * 60 * 60 * 1e3),
      lastSeen: new Date(now.getTime() - 1 * 60 * 60 * 1e3),
      isContract: false
    }
  ];
  addresses.push(...predefinedAddresses);
  for (let i = predefinedAddresses.length; i < count; i++) {
    const firstSeen = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1e3);
    const lastSeen = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1e3);
    addresses.push({
      id: i + 1,
      address: `0x${Math.random().toString(16).substring(2, 42)}`,
      balance: (Math.random() * 1e3).toFixed(6),
      transactionCount: Math.floor(Math.random() * 100) + 1,
      firstSeen,
      lastSeen,
      isContract: Math.random() > 0.8
    });
  }
  return addresses;
}
var MemStorage = class {
  blocks;
  transactions;
  addresses;
  networkStats;
  constructor() {
    this.blocks = generateMockBlocks(61);
    this.transactions = generateMockTransactions(150);
    this.addresses = generateMockAddresses(50);
    this.networkStats = {
      id: 1,
      latestBlock: Math.max(...this.blocks.map((b) => b.blockNumber)),
      totalTransactions: this.transactions.length,
      totalAccounts: this.addresses.length,
      olmPrice: "1.00",
      // Real OLM token price
      priceChange24h: "0.00",
      // No price change for testnet token
      marketCap: "1000000.00",
      // Estimated market cap
      tps: "5.0",
      // Estimated TPS for Olym3 Testnet
      updatedAt: /* @__PURE__ */ new Date()
    };
  }
  async getNetworkStats() {
    return this.networkStats;
  }
  async getLatestBlocks(limit) {
    return this.blocks.sort((a, b) => b.blockNumber - a.blockNumber).slice(0, limit);
  }
  async getBlock(blockNumber) {
    return this.blocks.find((b) => b.blockNumber === blockNumber);
  }
  async getBlockByHash(hash) {
    return this.blocks.find((b) => b.hash === hash);
  }
  async getLatestTransactions(limit) {
    return this.transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, limit);
  }
  async getTransaction(hash) {
    return this.transactions.find((t) => t.hash === hash);
  }
  async getTransactionsByBlock(blockNumber) {
    return this.transactions.filter((t) => t.blockNumber === blockNumber);
  }
  async getTransactionsByAddress(address, limit) {
    return this.transactions.filter((t) => t.from === address || t.to === address).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, limit);
  }
  async getAddress(address) {
    return this.addresses.find((a) => a.address.toLowerCase() === address.toLowerCase());
  }
  async getTopAddresses(limit) {
    return this.addresses.sort((a, b) => parseFloat(b.balance) - parseFloat(a.balance)).slice(0, limit);
  }
  async search(query) {
    const lowerQuery = query.toLowerCase();
    const blocks = this.blocks.filter(
      (b) => b.hash.toLowerCase().includes(lowerQuery) || b.blockNumber.toString().includes(lowerQuery)
    );
    const transactions = this.transactions.filter(
      (t) => t.hash.toLowerCase().includes(lowerQuery) || t.from.toLowerCase().includes(lowerQuery) || t.to?.toLowerCase().includes(lowerQuery)
    );
    const addresses = this.addresses.filter(
      (a) => a.address.toLowerCase().includes(lowerQuery)
    );
    return { blocks, transactions, addresses };
  }
};
var BlockchainStorage = class {
  provider;
  cachedBlocks = /* @__PURE__ */ new Map();
  cachedTransactions = /* @__PURE__ */ new Map();
  cachedAddresses = /* @__PURE__ */ new Map();
  cachedNetworkStats = null;
  lastStatsUpdate = 0;
  constructor() {
    this.provider = new ethers.JsonRpcProvider("https://rpc1.olym3.xyz/");
  }
  async getNetworkStats() {
    const now = Date.now();
    if (this.cachedNetworkStats && now - this.lastStatsUpdate < 3e4) {
      return this.cachedNetworkStats;
    }
    try {
      const blockNumber = await this.provider.getBlockNumber();
      const latestBlock = await this.provider.getBlock(blockNumber);
      const totalTransactions = blockNumber * 5;
      const totalAccounts = 1e3;
      this.cachedNetworkStats = {
        id: 1,
        latestBlock: blockNumber,
        totalTransactions,
        totalAccounts,
        olmPrice: "1.00",
        // Would come from a price API in production
        priceChange24h: "0.00",
        marketCap: "1000000.00",
        tps: "5.0",
        updatedAt: /* @__PURE__ */ new Date()
      };
      this.lastStatsUpdate = now;
      return this.cachedNetworkStats;
    } catch (error) {
      console.error("Error fetching network stats:", error);
      const mockStorage = new MemStorage();
      return mockStorage.getNetworkStats();
    }
  }
  async getLatestBlocks(limit) {
    try {
      const blockNumber = await this.provider.getBlockNumber();
      const blocks = [];
      for (let i = 0; i < limit && blockNumber - i >= 0; i++) {
        const currentBlockNumber = blockNumber - i;
        let block = this.cachedBlocks.get(currentBlockNumber);
        if (!block) {
          const ethBlock = await this.provider.getBlock(currentBlockNumber);
          if (ethBlock) {
            block = {
              id: currentBlockNumber,
              // Use block number as ID for simplicity
              blockNumber: currentBlockNumber,
              hash: ethBlock.hash || "",
              parentHash: ethBlock.parentHash || "",
              miner: ethBlock.miner || "",
              timestamp: new Date(Number(ethBlock.timestamp) * 1e3),
              transactionCount: ethBlock.transactions.length,
              gasUsed: ethBlock.gasUsed?.toString() || "0",
              gasLimit: ethBlock.gasLimit?.toString() || "0",
              size: ethBlock.size || 0
            };
            this.cachedBlocks.set(currentBlockNumber, block);
          } else {
            continue;
          }
        }
        blocks.push(block);
      }
      return blocks;
    } catch (error) {
      console.error("Error fetching latest blocks:", error);
      const mockStorage = new MemStorage();
      return mockStorage.getLatestBlocks(limit);
    }
  }
  async getBlock(blockNumber) {
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
            timestamp: new Date(Number(ethBlock.timestamp) * 1e3),
            transactionCount: ethBlock.transactions.length,
            gasUsed: ethBlock.gasUsed?.toString() || "0",
            gasLimit: ethBlock.gasLimit?.toString() || "0",
            size: ethBlock.size || 0
          };
          this.cachedBlocks.set(blockNumber, block);
        } else {
          return void 0;
        }
      }
      return block;
    } catch (error) {
      console.error(`Error fetching block ${blockNumber}:`, error);
      const mockStorage = new MemStorage();
      return mockStorage.getBlock(blockNumber);
    }
  }
  async getBlockByHash(hash) {
    try {
      for (const [_, block] of this.cachedBlocks.entries()) {
        if (block.hash === hash) {
          return block;
        }
      }
      const ethBlock = await this.provider.getBlock(hash);
      if (ethBlock) {
        const block = {
          id: Number(ethBlock.number),
          blockNumber: Number(ethBlock.number),
          hash: ethBlock.hash || "",
          parentHash: ethBlock.parentHash || "",
          miner: ethBlock.miner || "",
          timestamp: new Date(Number(ethBlock.timestamp) * 1e3),
          transactionCount: ethBlock.transactions.length,
          gasUsed: ethBlock.gasUsed?.toString() || "0",
          gasLimit: ethBlock.gasLimit?.toString() || "0",
          size: ethBlock.size || 0
        };
        this.cachedBlocks.set(Number(ethBlock.number), block);
        return block;
      }
      return void 0;
    } catch (error) {
      console.error(`Error fetching block by hash ${hash}:`, error);
      const mockStorage = new MemStorage();
      return mockStorage.getBlockByHash(hash);
    }
  }
  async getLatestTransactions(limit) {
    try {
      const blocks = await this.getLatestBlocks(Math.ceil(limit / 5));
      const transactions = [];
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
      const mockStorage = new MemStorage();
      return mockStorage.getLatestTransactions(limit);
    }
  }
  async getTransaction(hash) {
    try {
      let tx = this.cachedTransactions.get(hash);
      if (!tx) {
        const ethTx = await this.provider.getTransaction(hash);
        const ethReceipt = await this.provider.getTransactionReceipt(hash);
        if (ethTx && ethReceipt) {
          const block = await this.getBlock(Number(ethTx.blockNumber));
          tx = {
            id: 0,
            // ID will be assigned by database in production
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
            method: "transfer",
            // Would need ABI decoding for accurate method name
            timestamp: block?.timestamp || /* @__PURE__ */ new Date()
          };
          this.cachedTransactions.set(hash, tx);
        } else {
          return void 0;
        }
      }
      return tx;
    } catch (error) {
      console.error(`Error fetching transaction ${hash}:`, error);
      const mockStorage = new MemStorage();
      return mockStorage.getTransaction(hash);
    }
  }
  async getTransactionsByBlock(blockNumber) {
    try {
      const block = await this.getBlock(blockNumber);
      if (!block) return [];
      const ethBlock = await this.provider.getBlock(blockNumber, true);
      if (!ethBlock || !ethBlock.transactions) return [];
      const transactions = [];
      for (const txHash of ethBlock.transactions) {
        if (typeof txHash === "string") {
          const tx = await this.getTransaction(txHash);
          if (tx) {
            transactions.push(tx);
          }
        } else if (txHash && typeof txHash === "object" && "hash" in txHash) {
          const tx = await this.getTransaction(txHash.hash);
          if (tx) {
            transactions.push(tx);
          }
        }
      }
      return transactions;
    } catch (error) {
      console.error(`Error fetching transactions for block ${blockNumber}:`, error);
      const mockStorage = new MemStorage();
      return mockStorage.getTransactionsByBlock(blockNumber);
    }
  }
  async getTransactionsByAddress(address, limit) {
    const mockStorage = new MemStorage();
    return mockStorage.getTransactionsByAddress(address, limit);
  }
  async getAddress(address) {
    try {
      let addressData = this.cachedAddresses.get(address.toLowerCase());
      if (!addressData) {
        const balance = await this.provider.getBalance(address);
        const code = await this.provider.getCode(address);
        const isContract = code !== "0x";
        addressData = {
          id: 0,
          // ID would be assigned by database
          address,
          balance: ethers.formatEther(balance),
          transactionCount: 0,
          // Would come from indexer
          firstSeen: /* @__PURE__ */ new Date(),
          // Would come from indexer
          lastSeen: /* @__PURE__ */ new Date(),
          // Would come from indexer
          isContract
        };
        this.cachedAddresses.set(address.toLowerCase(), addressData);
      }
      return addressData;
    } catch (error) {
      console.error(`Error fetching address ${address}:`, error);
      return void 0;
    }
  }
  async getTopAddresses(limit) {
    const mockStorage = new MemStorage();
    return mockStorage.getTopAddresses(limit);
  }
  async search(query) {
    const results = {
      blocks: [],
      transactions: [],
      addresses: []
    };
    if (/^\d+$/.test(query)) {
      const block = await this.getBlock(parseInt(query));
      if (block) results.blocks.push(block);
    }
    if (/^0x[a-fA-F0-9]{64}$/.test(query)) {
      const tx = await this.getTransaction(query);
      if (tx) results.transactions.push(tx);
      const block = await this.getBlockByHash(query);
      if (block) results.blocks.push(block);
    }
    if (/^0x[a-fA-F0-9]{40}$/.test(query)) {
      const address = await this.getAddress(query);
      if (address) results.addresses.push(address);
    }
    return results;
  }
};
var storage = new BlockchainStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/network-stats", async (req, res) => {
    try {
      const stats = await storage.getNetworkStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch network stats" });
    }
  });
  app2.get("/api/blocks/latest", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const blocks = await storage.getLatestBlocks(limit);
      res.json(blocks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest blocks" });
    }
  });
  app2.get("/api/blocks/:blockNumber", async (req, res) => {
    try {
      const blockNumber = parseInt(req.params.blockNumber);
      const block = await storage.getBlock(blockNumber);
      if (!block) {
        return res.status(404).json({ error: "Block not found" });
      }
      res.json(block);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch block" });
    }
  });
  app2.get("/api/blocks/:blockNumber/transactions", async (req, res) => {
    try {
      const blockNumber = parseInt(req.params.blockNumber);
      const transactions = await storage.getTransactionsByBlock(blockNumber);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch block transactions" });
    }
  });
  app2.get("/api/transactions/latest", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const transactions = await storage.getLatestTransactions(limit);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest transactions" });
    }
  });
  app2.get("/api/transactions/:hash", async (req, res) => {
    try {
      const hash = req.params.hash;
      const transaction = await storage.getTransaction(hash);
      if (!transaction) {
        return res.status(404).json({ error: "Transaction not found" });
      }
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch transaction" });
    }
  });
  app2.get("/api/addresses/:address", async (req, res) => {
    try {
      const address = req.params.address;
      const addressData = await storage.getAddress(address);
      if (!addressData) {
        return res.status(404).json({ error: "Address not found" });
      }
      res.json(addressData);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch address" });
    }
  });
  app2.get("/api/addresses/:address/transactions", async (req, res) => {
    try {
      const address = req.params.address;
      const limit = parseInt(req.query.limit) || 20;
      const transactions = await storage.getTransactionsByAddress(address, limit);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch address transactions" });
    }
  });
  app2.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q;
      if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
      }
      const results = await storage.search(query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to perform search" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { createServer as createServer2, createLogger as createLogger2 } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        process.cwd(),
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(process.cwd(), "dist/public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5111;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
