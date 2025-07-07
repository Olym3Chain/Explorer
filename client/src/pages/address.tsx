import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { AddressOverview } from "@/components/address/address-overview";
import { TransactionHistory } from "@/components/address/transaction-history";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import type { Address } from "@shared/schema";

export default function AddressPage() {
  const { address } = useParams<{ address: string }>();

  const { data: addressData, isLoading, error } = useQuery<Address>({
    queryKey: ["/api/addresses", address],
    queryFn: async () => {
      const response = await fetch(`/api/addresses/${address}`);
      if (!response.ok) {
        throw new Error("Address not found");
      }
      return response.json();
    },
    enabled: !!address,
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !addressData) {
    return (
      <Card className="border-border shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 text-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <div>
              <h1 className="text-2xl font-bold">Address Not Found</h1>
              <p className="text-muted-foreground mt-2">
                The address {address} could not be found on the Olym3 Testnet.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <AddressOverview address={addressData} />
      <TransactionHistory address={address!} />
    </div>
  );
}
