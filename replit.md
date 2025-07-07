# Olym3 Blockchain Explorer

## Overview

This is a full-stack blockchain explorer application built for the Olym3 Testnet. The application provides a comprehensive interface for exploring blockchain data including blocks, transactions, addresses, and network statistics. It features a modern React frontend with a Node.js/Express backend, utilizing realistic testnet data that reflects the current state of the Olym3 network (Block #160, OLM price $1.00).

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom theme variables
- **UI Components**: Radix UI primitives with shadcn/ui component system
- **Theme**: Light/dark mode support with custom Olym3 branding

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM (configured but using mock data)
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Development**: Hot reload with Vite middleware integration

### Project Structure
```
├── client/          # React frontend application
├── server/          # Express.js backend API
├── shared/          # Shared types and schemas
├── migrations/      # Database migration files
└── dist/           # Production build output
```

## Key Components

### Database Schema (shared/schema.ts)
- **Blocks**: Store blockchain block information (hash, miner, timestamp, etc.)
- **Transactions**: Store transaction details (hash, from/to addresses, value, gas, etc.)
- **Addresses**: Store address information (balance, transaction count, contract status)
- **NetworkStats**: Store network-wide statistics (latest block, total transactions, OLM price)

### API Endpoints (server/routes.ts)
- `/api/network-stats` - Network statistics
- `/api/blocks/latest` - Latest blocks with pagination
- `/api/blocks/:blockNumber` - Individual block details
- `/api/blocks/:blockNumber/transactions` - Block transactions
- `/api/transactions/latest` - Latest transactions
- `/api/transactions/:hash` - Transaction details
- `/api/addresses/:address` - Address details
- `/api/addresses/:address/transactions` - Address transaction history

### Frontend Pages
- **Home**: Network overview with statistics and latest blocks/transactions
- **Blocks**: Paginated list of all blocks
- **Transactions**: Paginated list of all transactions
- **Block Details**: Detailed view of individual blocks
- **Transaction Details**: Detailed view of individual transactions
- **Address Details**: Address overview and transaction history

### UI Components
- **Layout**: Header with navigation and search, responsive footer
- **Common**: Copy buttons, QR code generator, search bar, theme toggle
- **Data Display**: Formatted tables for blocks/transactions, statistics cards
- **Responsive**: Mobile-friendly design with collapsible navigation

## Data Flow

### Client-Server Communication
1. Frontend makes API requests using React Query
2. Express server handles requests and returns mock data
3. Data is cached client-side with automatic invalidation
4. Loading states and error handling throughout the UI

### Mock Data Generation
- Server generates realistic blockchain data on-the-fly
- Includes proper relationships between blocks, transactions, and addresses
- Simulates network statistics and pricing data
- Maintains consistency across related data points

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React, React DOM, React Query
- **UI Libraries**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Forms**: React Hook Form with Zod validation
- **Date Handling**: date-fns for date formatting
- **Carousels**: Embla Carousel for interactive components

### Backend Dependencies
- **Server**: Express.js with TypeScript support
- **Database**: Drizzle ORM with PostgreSQL driver
- **Development**: tsx for TypeScript execution, esbuild for production builds
- **Session Management**: connect-pg-simple for PostgreSQL sessions

### Development Tools
- **Build**: Vite with React plugin and runtime error overlay
- **TypeScript**: Strict type checking with path aliases
- **PostCSS**: Tailwind CSS processing with autoprefixer
- **Replit Integration**: Cartographer plugin for Replit development

## Deployment Strategy

### Development Environment
- **Server**: Node.js with tsx for TypeScript execution
- **Client**: Vite dev server with HMR
- **Database**: PostgreSQL via DATABASE_URL environment variable
- **Integration**: Vite middleware serves frontend through Express

### Production Build
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations via `db:push` command
- **Deployment**: Single Node.js process serves both API and static files

### Database Setup
- Drizzle ORM configured with PostgreSQL dialect
- Schema definitions in shared directory for type safety
- Migration files generated to `./migrations` directory
- Environment variable `DATABASE_URL` required for database connection

## User Preferences

Preferred communication style: Simple, everyday language.

## Changelog

Changelog:
- July 06, 2025: Initial setup with complete blockchain explorer functionality
- July 06, 2025: Updated with accurate Olym3 Testnet data (Block #160, OLM price $1.00, realistic testnet statistics)