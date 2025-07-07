import { pgTable, text, serial, integer, boolean, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const blocks = pgTable("blocks", {
  id: serial("id").primaryKey(),
  blockNumber: integer("block_number").notNull().unique(),
  hash: text("hash").notNull().unique(),
  parentHash: text("parent_hash").notNull(),
  miner: text("miner").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  transactionCount: integer("transaction_count").notNull().default(0),
  gasUsed: numeric("gas_used").notNull().default("0"),
  gasLimit: numeric("gas_limit").notNull().default("0"),
  size: integer("size").notNull().default(0),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  hash: text("hash").notNull().unique(),
  blockNumber: integer("block_number").notNull(),
  blockHash: text("block_hash").notNull(),
  transactionIndex: integer("transaction_index").notNull(),
  from: text("from").notNull(),
  to: text("to"),
  value: numeric("value").notNull().default("0"),
  gasPrice: numeric("gas_price").notNull().default("0"),
  gasUsed: numeric("gas_used").notNull().default("0"),
  gasLimit: numeric("gas_limit").notNull().default("0"),
  status: text("status").notNull().default("success"),
  method: text("method").notNull().default("transfer"),
  timestamp: timestamp("timestamp").notNull(),
});

export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  address: text("address").notNull().unique(),
  balance: numeric("balance").notNull().default("0"),
  transactionCount: integer("transaction_count").notNull().default(0),
  firstSeen: timestamp("first_seen").notNull(),
  lastSeen: timestamp("last_seen").notNull(),
  isContract: boolean("is_contract").notNull().default(false),
});

export const networkStats = pgTable("network_stats", {
  id: serial("id").primaryKey(),
  latestBlock: integer("latest_block").notNull(),
  totalTransactions: integer("total_transactions").notNull(),
  totalAccounts: integer("total_accounts").notNull(),
  olmPrice: numeric("olm_price").notNull(),
  priceChange24h: numeric("price_change_24h").notNull(),
  marketCap: numeric("market_cap").notNull(),
  tps: numeric("tps").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const insertBlockSchema = createInsertSchema(blocks).omit({
  id: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
});

export const insertAddressSchema = createInsertSchema(addresses).omit({
  id: true,
});

export const insertNetworkStatsSchema = createInsertSchema(networkStats).omit({
  id: true,
});

export type InsertBlock = z.infer<typeof insertBlockSchema>;
export type Block = typeof blocks.$inferSelect;

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

export type InsertAddress = z.infer<typeof insertAddressSchema>;
export type Address = typeof addresses.$inferSelect;

export type InsertNetworkStats = z.infer<typeof insertNetworkStatsSchema>;
export type NetworkStats = typeof networkStats.$inferSelect;
