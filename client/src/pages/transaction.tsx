import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatHash, formatTime, formatOLM, formatNumber } from "@/lib/formatters";
import { CopyButton } from "@/components/common/copy-button";
import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import type { Transaction } from "@shared/schema";

export default function TransactionPage() {
  const { hash } = useParams<{ hash: string }>();

  const { data: transaction, isLoading, error } = useQuery<Transaction>({
    queryKey: ["/api/transactions", hash],
    queryFn: async () => {
      const response = await fetch(`/api/transactions/${hash}`);
      if (!response.ok) {
        throw new Error("Transaction not found");
      }
      return response.json();
    },
    enabled: !!hash,
  });

  if (isLoading) {
    return (
      <Card className="border-border shadow-lg">
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
    );
  }

  if (error || !transaction) {
    return (
      <Card className="border-border shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <div>
              <h1 className="text-2xl font-bold">Transaction Not Found</h1>
              <p className="text-muted-foreground mt-2">
                The transaction {hash} could not be found on the Olym3 Testnet.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border shadow-lg">
      <CardHeader>
        <CardTitle>Transaction Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Transaction Hash */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="font-medium text-muted-foreground">Transaction Hash</div>
            <div className="md:col-span-2 flex items-center gap-2">
              <span className="font-mono text-sm break-all">{transaction.hash}</span>
              <CopyButton text={transaction.hash} />
            </div>
          </div>

          {/* Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="font-medium text-muted-foreground">Status</div>
            <div className="md:col-span-2">
              <Badge 
                variant={transaction.status === 'success' ? 'default' : 'destructive'}
              >
                {transaction.status}
              </Badge>
            </div>
          </div>

          {/* Block */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="font-medium text-muted-foreground">Block</div>
            <div className="md:col-span-2">
              <Link href={`/block/${transaction.blockNumber}`}>
                <span className="font-mono text-sm olym-primary hover:underline">
                  #{formatNumber(transaction.blockNumber)}
                </span>
              </Link>
            </div>
          </div>

          {/* Timestamp */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="font-medium text-muted-foreground">Timestamp</div>
            <div className="md:col-span-2 text-sm">{formatTime(transaction.timestamp)}</div>
          </div>

          {/* From */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="font-medium text-muted-foreground">From</div>
            <div className="md:col-span-2 flex items-center gap-2">
              <Link href={`/address/${transaction.from}`}>
                <span className="font-mono text-sm olym-primary hover:underline break-all">
                  {transaction.from}
                </span>
              </Link>
              <CopyButton text={transaction.from} />
            </div>
          </div>

          {/* To */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="font-medium text-muted-foreground">To</div>
            <div className="md:col-span-2 flex items-center gap-2">
              {transaction.to ? (
                <>
                  <Link href={`/address/${transaction.to}`}>
                    <span className="font-mono text-sm olym-primary hover:underline break-all">
                      {transaction.to}
                    </span>
                  </Link>
                  <CopyButton text={transaction.to} />
                </>
              ) : (
                <span className="text-muted-foreground">Contract Creation</span>
              )}
            </div>
          </div>

          {/* Value */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="font-medium text-muted-foreground">Value</div>
            <div className="md:col-span-2 font-mono text-sm">
              {formatOLM(parseFloat(transaction.value))}
            </div>
          </div>

          {/* Method */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="font-medium text-muted-foreground">Method</div>
            <div className="md:col-span-2">
              <Badge variant="outline">{transaction.method}</Badge>
            </div>
          </div>

          {/* Gas Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="font-medium text-muted-foreground">Gas Used</div>
            <div className="md:col-span-2 font-mono text-sm">
              {formatNumber(parseInt(transaction.gasUsed))} / {formatNumber(parseInt(transaction.gasLimit))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="font-medium text-muted-foreground">Gas Price</div>
            <div className="md:col-span-2 font-mono text-sm">
              {formatOLM(parseFloat(transaction.gasPrice))}
            </div>
          </div>

          {/* Transaction Index */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="font-medium text-muted-foreground">Transaction Index</div>
            <div className="md:col-span-2 font-mono text-sm">
              {transaction.transactionIndex}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
