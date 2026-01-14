import type Pagination from "./Pagination";

export interface SupplementsResponse {
    success: boolean;
    data: Supplement[];
    pagination: Pagination
}

export interface SearchSupplementsByCodeResponse {
    success: boolean;
    code: string;
    data: Supplement[];
    pagination: Pagination
}

export interface SearchSupplementsByKeywordResponse {
    success: boolean;
    data: Supplement[];
    pagination: Pagination
}

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