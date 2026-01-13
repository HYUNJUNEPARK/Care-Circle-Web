export interface SupplementsResponse {
    success: boolean;
    data: Supplement[];
}

export interface SearchSupplementsResponse {
    success: boolean;
    code: string;
    data: Supplement[];
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