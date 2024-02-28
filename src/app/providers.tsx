'use client'
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from 'recoil';

export const NextProviders = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient();
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevtools />
            </QueryClientProvider>
        </RecoilRoot>
    )
}