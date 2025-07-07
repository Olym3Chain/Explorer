import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatHash, formatTime, formatNumber } from "@/lib/formatters";
import { CopyButton } from "@/components/common/copy-button";
import { Link } from "wouter";
import { AlertCircle, ArrowRightLeft } from "lucide-react";
import type { Block, Transaction } from "@shared/schema";

export default function BlockPage() {
  const { blockNumber } = useParams<{ blockNumber: string }>();

  const { data: block, isLoading: blockLoading, error: blockError } = useQuery<Block>({
    queryKey: ["/api/blocks", blockNumber],
    queryFn: async () => {
      const response = await fetch(`/api/blocks/${blockNumber}`);
      if (!response.ok) {
        throw new Error("Block not found");
      }
      return response.json();
    },
    enabled: !!blockNumber,
  });

  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/blocks", blockNumber, "transactions"],
    queryFn: async () => {
      const response = await fetch(`/api/blocks/${blockNumber}/transactions`);
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      return response.json();
    },
    enabled: !!blockNumber,
  });

  if (blockLoading) {
    return (
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-full md:col-span-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (blockError || !block) {
    return (
      <Card className="border-border shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <div>
              <h1 className="text-2xl font-bold">Block Not Found</h1>
              <p className="text-muted-foreground mt-2">
                The block #{blockNumber} could not be found on the Olym3 Testnet.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Block Details */}
      <Card className="border-border shadow-lg">
        <CardHeader>
          <CardTitle>Block #{formatNumber(block.blockNumber)}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Block Hash */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-medium text-muted-foreground">Block Hash</div>
              <div className="md:col-span-2 flex items-center gap-2">
                <span className="font-mono text-sm break-all">{block.hash}</span>
                <CopyButton text={block.hash} />
              </div>
            </div>

            {/* Parent Hash */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-medium text-muted-foreground">Parent Hash</div>
              <div className="md:col-span-2 flex items-center gap-2">
                <span className="font-mono text-sm break-all">{block.parentHash}</span>
                <CopyButton text={block.parentHash} />
              </div>
            </div>

            {/* Timestamp */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-medium text-muted-foreground">Timestamp</div>
              <div className="md:col-span-2 text-sm">{formatTime(block.timestamp)}</div>
            </div>

            {/* Miner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-medium text-muted-foreground">Miner</div>
              <div className="md:col-span-2 flex items-center gap-2">
                <Link href={`/address/${block.miner}`}>
                  <span className="font-mono text-sm olym-primary hover:underline break-all">
                    {block.miner}
                  </span>
                </Link>
                <CopyButton text={block.miner} />
              </div>
            </div>

            {/* Transaction Count */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-medium text-muted-foreground">Transactions</div>
              <div className="md:col-span-2 font-mono text-sm">
                {formatNumber(block.transactionCount)} transactions
              </div>
            </div>

            {/* Gas Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-medium text-muted-foreground">Gas Used</div>
              <div className="md:col-span-2 font-mono text-sm">
                {formatNumber(parseInt(block.gasUsed))} / {formatNumber(parseInt(block.gasLimit))}
              </div>
            </div>

            {/* Size */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="font-medium text-muted-foreground">Size</div>
              <div className="md:col-span-2 font-mono text-sm">
                {formatNumber(block.size)} bytes
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Block Transactions */}
      <Card className="border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowRightLeft className="h-5 w-5 mr-2" />
            Block Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactionsLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : !transactions || transactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transactions found in this block</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Transaction Hash
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      From
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      To
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Value
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Method
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4">
                        <Link href={`/tx/${transaction.hash}`}>
                          <div className="font-mono text-sm olym-primary hover:underline">
                            {formatHash(transaction.hash)}
                          </div>
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        <Link href={`/address/${transaction.from}`}>
                          <div className="font-mono text-sm olym-primary hover:underline">
                            {formatHash(transaction.from)}
                          </div>
                        </Link>
                      </td>
                      <td className="py-3 px-4">
                        {transaction.to ? (
                          <Link href={`/address/${transaction.to}`}>
                            <div className="font-mono text-sm olym-primary hover:underline">
                              {formatHash(transaction.to)}
                            </div>
                          </Link>
                        ) : (
                          <span className="text-muted-foreground text-sm">Contract Creation</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm font-medium">
                          {parseFloat(transaction.value).toFixed(6)} OLM
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-xs">
                          {transaction.method}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={transaction.status === 'success' ? 'default' : 'destructive'}
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
