import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocation } from "wouter";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [, navigate] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Determine search type based on query format
      if (query.startsWith("0x") && query.length === 66) {
        // Transaction hash
        navigate(`/tx/${query}`);
      } else if (query.startsWith("0x") && query.length === 42) {
        // Address
        navigate(`/address/${query}`);
      } else if (/^\d+$/.test(query)) {
        // Block number
        navigate(`/block/${query}`);
      } else {
        // General search
        navigate(`/search?q=${encodeURIComponent(query)}`);
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <Input
        type="text"
        placeholder="Search by address, txn hash, block..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-64 pl-10 pr-4 bg-background"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </form>
  );
}
