import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Network stats
  app.get("/api/network-stats", async (req, res) => {
    try {
      const stats = await storage.getNetworkStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch network stats" });
    }
  });

  // Blocks
  app.get("/api/blocks/latest", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const blocks = await storage.getLatestBlocks(limit);
      res.json(blocks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest blocks" });
    }
  });

  app.get("/api/blocks/:blockNumber", async (req, res) => {
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

  app.get("/api/blocks/:blockNumber/transactions", async (req, res) => {
    try {
      const blockNumber = parseInt(req.params.blockNumber);
      const transactions = await storage.getTransactionsByBlock(blockNumber);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch block transactions" });
    }
  });

  // Transactions
  app.get("/api/transactions/latest", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const transactions = await storage.getLatestTransactions(limit);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch latest transactions" });
    }
  });

  app.get("/api/transactions/:hash", async (req, res) => {
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

  // Addresses
  app.get("/api/addresses/:address", async (req, res) => {
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

  app.get("/api/addresses/:address/transactions", async (req, res) => {
    try {
      const address = req.params.address;
      const limit = parseInt(req.query.limit as string) || 20;
      const transactions = await storage.getTransactionsByAddress(address, limit);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch address transactions" });
    }
  });

  // Search
  app.get("/api/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
      }
      
      const results = await storage.search(query);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Failed to perform search" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
