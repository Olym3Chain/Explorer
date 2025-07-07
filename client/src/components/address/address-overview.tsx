import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatOLM, formatCurrency, formatTime } from "@/lib/formatters";
import { CopyButton } from "@/components/common/copy-button";
import { QRCode } from "@/components/common/qr-code";
import type { Address } from "@shared/schema";

interface AddressOverviewProps {
  address: Address;
}

export function AddressOverview({ address }: AddressOverviewProps) {
  const olmPrice = 1.00; // Updated OLM price
  const totalValue = parseFloat(address.balance) * olmPrice;

  return (
    <Card className="border-border shadow-lg">
      <CardHeader>
        <CardTitle>Address Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Address */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
              <div className="flex items-center space-x-2">
                <CopyButton text={address.address} />
                <QRCode value={address.address} />
              </div>
            </div>
            <div className="font-mono text-sm bg-muted p-3 rounded-lg break-all">
              {address.address}
            </div>
          </div>

          {/* Balance Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Total Balance</div>
              <div className="text-lg font-semibold">
                {formatCurrency(totalValue)}
              </div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">OLM Balance</div>
              <div className="text-lg font-semibold">
                {formatOLM(parseFloat(address.balance))}
              </div>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Transaction Count</div>
              <div className="text-lg font-semibold">
                {address.transactionCount} txns
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">First Seen</div>
              <div className="text-sm font-medium">
                {formatTime(address.firstSeen)}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Last Seen</div>
              <div className="text-sm font-medium">
                {formatTime(address.lastSeen)}
              </div>
            </div>
          </div>

          {/* Contract Badge */}
          {address.isContract && (
            <div>
              <Badge variant="secondary">Contract Address</Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
