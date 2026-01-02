import { useContext } from 'react';
import { type LoadingContextType, LoadingContext } from './LoadingProvider'

const useLoading = (): LoadingContextType => {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
};

export default useLoading;