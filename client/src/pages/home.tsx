import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NetworkStats } from "@/components/stats/network-stats";
import { LatestBlocks } from "@/components/blocks/latest-blocks";
import { LatestTransactions } from "@/components/transactions/latest-transactions";
import { CopyButton } from "@/components/common/copy-button";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Network Statistics */}
      <NetworkStats />

      {/* Network Information */}
      <Card className="border-border shadow-lg">
        <CardHeader>
          <CardTitle>Network Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="text-sm text-muted-foreground mb-1">Network Name</div>
              <div className="font-mono text-sm font-medium">Olym3 Testnet</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Chain ID</div>
              <div className="font-mono text-sm font-medium">256000</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">Currency Symbol</div>
              <div className="font-mono text-sm font-medium">OLM</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground mb-1">RPC URL</div>
              <div className="font-mono text-sm font-medium flex items-center">
                <span className="truncate">https://rpc1.olym3.xyz/</span>
                <CopyButton text="https://rpc1.olym3.xyz/" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button 
              onClick={() => {
                if (window.ethereum) {
                  window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                      chainId: '0x3E800', // 256000 in hex
                      chainName: 'Olym3 Testnet',
                      nativeCurrency: {
                        name: 'OLM',
                        symbol: 'OLM',
                        decimals: 18
                      },
                      rpcUrls: ['https://rpc1.olym3.xyz/'],
                      blockExplorerUrls: ['https://www.olym3.xyz/']
                    }]
                  }).catch((error: any) => {
                    console.error(error);
                    alert('Failed to add network to MetaMask. Please try manually.');
                  });
                } else {
                  alert('MetaMask is not installed. Please install MetaMask to use this feature.');
                }
              }}
              className="bg-olym-primary text-white px-4 py-2 rounded-md hover:bg-olym-primary/90 transition-colors"
            >
              Add Olym3 Testnet to MetaMask
            </button>
            
            <a 
              href="https://www.olym3.xyz/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:bg-secondary/90 transition-colors flex items-center justify-center"
            >
              Visit Official Olym3 Website
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Latest Blocks and Transactions */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <LatestBlocks />
        <LatestTransactions />
      </div>
    </div>
  );
}
