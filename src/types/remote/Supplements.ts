import { type Pagination } from "./Pagination";

// Entity
export interface Supplement {
    id: number;
    code: string;
    name: string;
    description: string;
    imageUrl?: string;
    status: string;
    effectCode: string;
    effects: string;
}

export interface SupplementStatus {
    code: string;
    status: string;
}

// Request
export interface SearchSupplementsParams {
    effectCode?: string;
    page?: number;
    limit?: number;
}

// Response Base
export interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export interface ApiPaginationResponse<T> {
    success: boolean;
    data: T;
    pagination: Pagination;
}

// Response Types
export type SupplementsResponse = ApiPaginationResponse<Supplement[]>;

//export type SearchSupplementsByCodeResponse = ApiPaginationResponse<Supplement[]> & { effectCode: string; };

export type SearchSupplementsByKeywordResponse = ApiPaginationResponse<Supplement[]>;

export type UpdateSupplementStatusResponse = ApiResponse<SupplementStatus>;