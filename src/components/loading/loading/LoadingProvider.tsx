import { createContext, useState, type ReactNode } from 'react';
import LoadingOverlay from './LoadingView';

export interface LoadingContextType {
    showLoading: () => void;
    hideLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({
    children
}: {
    children: ReactNode
}) {
    
    const [isLoading, setIsLoading] = useState(false);

    const showLoading = () => setIsLoading(true);
    const hideLoading = () => setIsLoading(false);

    return (
        <LoadingContext.Provider value={{ showLoading, hideLoading }}>
            {children}
            {isLoading && <LoadingOverlay />}
        </LoadingContext.Provider>
    );
};
