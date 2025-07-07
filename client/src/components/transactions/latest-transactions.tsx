import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { formatTime, formatHash, formatOLM } from "@/lib/formatters";
import { ArrowRightLeft, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import type { Transaction } from "@shared/schema";

export function LatestTransactions() {
  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions/latest"],
  });

  if (isLoading) {
    return (
      <Card className="border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ArrowRightLeft className="h-5 w-5 olym-primary mr-2" />
            Latest Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
                <div className="text-right">
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-3 w-12" />
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
          <CardTitle className="flex items-center">
            <ArrowRightLeft className="h-5 w-5 olym-primary mr-2" />
            Latest Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <ArrowRightLeft className="h-5 w-5 olym-primary mr-2" />
            Latest Transactions
          </CardTitle>
          <Link href="/transactions" className="text-sm olym-primary hover:underline flex items-center">
            View all <ExternalLink className="h-3 w-3 ml-1" />
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.slice(0, 5).map((transaction) => (
            <Link key={transaction.id} href={`/tx/${transaction.hash}`}>
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                    <ArrowRightLeft className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-mono text-sm olym-primary">
                      {formatHash(transaction.hash)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatTime(transaction.timestamp)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">
                    {formatOLM(parseFloat(transaction.value))}
                  </div>
                  <Badge 
                    variant={transaction.status === 'success' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
