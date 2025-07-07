import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatHash, formatTime, formatOLM } from "@/lib/formatters";
import { Link } from "wouter";
import type { Transaction } from "@shared/schema";

interface TransactionHistoryProps {
  address: string;
}

export function TransactionHistory({ address }: TransactionHistoryProps) {
  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/addresses", address, "transactions"],
    queryFn: async () => {
      const response = await fetch(`/api/addresses/${address}/transactions`);
      if (!response.ok) {
        throw new Error("Failed to fetch transactions");
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <Card className="border-border shadow-lg">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Card className="border-border shadow-lg">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No transactions found for this address</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Transaction History</CardTitle>
          <div className="text-sm text-muted-foreground">
            Total {transactions.length} transactions
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Transaction Hash
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Method
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Block
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Time
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Value
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
                    <Badge variant="outline" className="text-xs">
                      {transaction.method}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <Link href={`/block/${transaction.blockNumber}`}>
                      <div className="font-mono text-sm olym-primary hover:underline">
                        #{transaction.blockNumber}
                      </div>
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-muted-foreground">
                      {formatTime(transaction.timestamp)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium">
                      {formatOLM(parseFloat(transaction.value))}
                    </div>
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
      </CardContent>
    </Card>
  );
}
