//import type Pagination from "./Pagination";

export interface HealthInsight {
    id: number;
    content: string;
    isActive: string;
}

//Response
export interface HealthInsightResponse {
    success: boolean;
    data: HealthInsight;
}