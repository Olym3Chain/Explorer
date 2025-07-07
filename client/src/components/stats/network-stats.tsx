import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber, formatCurrency } from "@/lib/formatters";
import { TrendingUp, Box, ArrowRightLeft, Users } from "lucide-react";
import type { NetworkStats } from "@shared/schema";

export function NetworkStats() {
  const { data: stats, isLoading } = useQuery<NetworkStats>({
    queryKey: ["/api/network-stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-4 w-16" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Failed to load network statistics</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* OLM Price */}
      <Card className="border-border shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">OLM Price</h3>
            <div className="w-8 h-8 bg-olym-primary rounded-full flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold olym-primary">
            {formatCurrency(parseFloat(stats.olmPrice))}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Testnet Token
          </div>
        </CardContent>
      </Card>

      {/* Latest Block */}
      <Card className="border-border shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Latest Block</h3>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <Box className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {formatNumber(stats.latestBlock)}
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            {stats.tps} TPS
          </div>
        </CardContent>
      </Card>

      {/* Total Transactions */}
      <Card className="border-border shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Transactions</h3>
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <ArrowRightLeft className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {formatNumber(stats.totalTransactions)}
          </div>
          <div className="text-sm text-muted-foreground mt-1">All time</div>
        </CardContent>
      </Card>

      {/* Total Accounts */}
      <Card className="border-border shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Accounts</h3>
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground">
            {formatNumber(stats.totalAccounts)}
          </div>
          <div className="text-sm text-muted-foreground mt-1">Unique addresses</div>
        </CardContent>
      </Card>
    </div>
  );
}
