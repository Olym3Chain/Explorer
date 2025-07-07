// Module declarations for missing type definitions

declare module 'wouter' {
  import { ComponentType, ReactNode } from 'react';

  export function useLocation(): [string, (path: string) => void];
  export function useRoute(pattern: string): [boolean, Record<string, string>];
  export function useRouter(): { push: (path: string) => void };
  
  export interface LinkProps {
    href: string;
    children: ReactNode;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    [key: string]: any;
  }
  
  export const Link: ComponentType<LinkProps>;
  
  export interface RouteProps {
    path: string;
    component?: ComponentType<any>;
    children?: ReactNode;
  }
  
  export const Route: ComponentType<RouteProps>;
  
  export interface SwitchProps {
    children: ReactNode;
    location?: string;
  }
  
  export const Switch: ComponentType<SwitchProps>;
  
  export interface RouterProps {
    children: ReactNode;
    base?: string;
    hook?: typeof useLocation;
  }
  
  export const Router: ComponentType<RouterProps>;

  // Default export
  export default function Router(props: RouterProps): JSX.Element;
}

declare module 'lucide-react' {
  import { ComponentType } from 'react';

  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    strokeWidth?: number | string;
  }

  export const Activity: ComponentType<IconProps>;
  export const AlertCircle: ComponentType<IconProps>;
  export const ArrowRight: ComponentType<IconProps>;
  export const Check: ComponentType<IconProps>;
  export const ChevronDown: ComponentType<IconProps>;
  export const ChevronLeft: ComponentType<IconProps>;
  export const ChevronRight: ComponentType<IconProps>;
  export const ChevronUp: ComponentType<IconProps>;
  export const Copy: ComponentType<IconProps>;
  export const CreditCard: ComponentType<IconProps>;
  export const Download: ComponentType<IconProps>;
  export const ExternalLink: ComponentType<IconProps>;
  export const Eye: ComponentType<IconProps>;
  export const File: ComponentType<IconProps>;
  export const FileText: ComponentType<IconProps>;
  export const Filter: ComponentType<IconProps>;
  export const Home: ComponentType<IconProps>;
  export const Info: ComponentType<IconProps>;
  export const Link: ComponentType<IconProps>;
  export const Menu: ComponentType<IconProps>;
  export const MoreHorizontal: ComponentType<IconProps>;
  export const Plus: ComponentType<IconProps>;
  export const Search: ComponentType<IconProps>;
  export const Settings: ComponentType<IconProps>;
  export const Share: ComponentType<IconProps>;
  export const Trash: ComponentType<IconProps>;
  export const User: ComponentType<IconProps>;
  export const X: ComponentType<IconProps>;
  export const Wallet: ComponentType<IconProps>;
}

declare module '@tanstack/react-query' {
  export interface QueryClientConfig {
    defaultOptions?: DefaultOptions;
  }

  export interface DefaultOptions {
    queries?: QueryOptions;
  }

  export interface QueryOptions {
    retry?: boolean | number | ((failureCount: number, error: unknown) => boolean);
    retryDelay?: number | ((failureCount: number, error: unknown) => number);
    staleTime?: number;
    cacheTime?: number;
    refetchOnMount?: boolean | 'always';
    refetchOnWindowFocus?: boolean | 'always';
    refetchOnReconnect?: boolean | 'always';
    suspense?: boolean;
  }

  export class QueryClient {
    constructor(config?: QueryClientConfig);
  }

  export interface QueryClientProviderProps {
    client: QueryClient;
    children: React.ReactNode;
  }

  export function QueryClientProvider(props: QueryClientProviderProps): JSX.Element;

  export function useQuery<TData = unknown, TError = unknown>(
    queryKey: unknown[],
    queryFn: () => Promise<TData>,
    options?: QueryOptions
  ): {
    data: TData | undefined;
    error: TError | null;
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    refetch: () => Promise<any>;
  };
}