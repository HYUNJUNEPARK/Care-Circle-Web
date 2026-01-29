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

export interface SupplementWithMyFlag extends Supplement {
    isInList: boolean;
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

export interface UpdateHealthItemInListResult {
    code: string;
    id: number;
}  

// Response Types
export type SupplementsResponse = ApiPaginationResponse<Supplement[]>;

export type SupplementsWithMyFlagResponse = ApiPaginationResponse<SupplementWithMyFlag[]>;

export type SearchSupplementsByKeywordResponse = ApiPaginationResponse<Supplement[]>;

export type UpdateSupplementStatusResponse = ApiResponse<SupplementStatus>;

export type UpdateHealthItemInListResponse = ApiResponse<UpdateHealthItemInListResult>;