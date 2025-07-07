import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatTime, formatNumber } from "@/lib/formatters";
import { Box } from "lucide-react";
import { Link } from "wouter";
import type { Block } from "@shared/schema";

export default function BlocksPage() {
  const { data: blocks, isLoading } = useQuery<Block[]>({
    queryKey: ["/api/blocks/latest?limit=50"],
  });

  if (isLoading) {
    return (
      <Card className="border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Box className="h-5 w-5 mr-2" />
            Latest Blocks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
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

  if (!blocks || blocks.length === 0) {
    return (
      <Card className="border-border shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Box className="h-5 w-5 mr-2" />
            Latest Blocks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No blocks found</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Box className="h-5 w-5 mr-2" />
          Latest Blocks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Block
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Time
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Transactions
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Miner
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Gas Used
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                  Size
                </th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((block) => (
                <tr key={block.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">
                    <Link href={`/block/${block.blockNumber}`}>
                      <div className="font-mono text-sm olym-primary hover:underline">
                        #{formatNumber(block.blockNumber)}
                      </div>
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-muted-foreground">
                      {formatTime(block.timestamp)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium">
                      {formatNumber(block.transactionCount)}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Link href={`/address/${block.miner}`}>
                      <div className="font-mono text-sm olym-primary hover:underline">
                        {block.miner.slice(0, 10)}...{block.miner.slice(-8)}
                      </div>
                    </Link>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm font-medium">
                      {formatNumber(parseInt(block.gasUsed))}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm">
                      {formatNumber(block.size)} bytes
                    </div>
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
