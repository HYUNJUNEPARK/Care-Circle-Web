import { createContext, useState, type ReactNode } from 'react';
import LoadingOverlay from './LoadingView';

export interface LoadingContextType {
    updateLoading: (isLoading: boolean) => void;
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
    const updateLoading = (isLoading: boolean) => setIsLoading(isLoading);

    return (
        <LoadingContext.Provider value={{ showLoading, hideLoading, updateLoading }}>
            {children}
            {isLoading && <LoadingOverlay />}
        </LoadingContext.Provider>
    );
};
