import { Link } from "wouter";
import { Box } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-olym-primary rounded-full flex items-center justify-center">
                <Box className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold olym-primary">Olym3</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Explore the Olym3 Testnet blockchain with real-time data and comprehensive analytics.
            </p>
            <div className="mt-4">
              <a 
                href="https://www.olym3.xyz/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-olym-primary hover:underline"
              >
                Olym3 Testnet Display
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Explorer</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/blocks" className="hover:text-primary transition-colors">
                  Latest Blocks
                </Link>
              </li>
              <li>
                <Link href="/transactions" className="hover:text-primary transition-colors">
                  Latest Transactions
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Top Accounts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contract Verification
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Developers</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  API Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contract Deployment
                </a>
              </li>
              <li>
                <a 
                  href="https://www.olym3.xyz/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Testnet Faucet
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Network Statistics
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Olym3 Explorer. Built with ❤️ for the Olym3 community.
          </p>
        </div>
      </div>
    </footer>
  );
}
