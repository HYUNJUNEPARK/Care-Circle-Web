import { useState } from 'react';
import {
    getSupplements as getSupplementsApi,
    searchSupplementsByEffectCode as searchByCodeApi,
    searchSupplementsByKeyword as searchByKeywordApi,
} from '../network/api/supplementApis';
import type { Supplement } from '../types/remote/Supplements';
import type Pagination from '../types/remote/Pagination';

/**
 * 영양제 관련 데이터 로드 및 상태 관리 훅
 */
function useSupplements() {
    const [supplements, setSupplements] = useState<Supplement[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [pagination, setPagination] = useState<Pagination | null>(null);

    /**
     * 영양제 리스트 가져오기
     */
    const getSupplements = async (
        page: number,
        limit: number = 20
    ) => {
        try {
            setLoading(true);
            const resData = await getSupplementsApi(page, limit);
            const supplement = resData.data;
            const pagination = resData.pagination;
            setPagination(pagination);
            setSupplements(supplement);
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false);
        }
    }

    /**
     * Effect 코드에 해당하는 영양제 검색
     */
    const searchSupplementsByEffectCode = async (
        effectCode: string,
        page?: number,
        limit?: number
    ) => {
        try {
            setLoading(true);
            const resData = await searchByCodeApi({
                effectCode,
                page,
                limit
            });
            const supplement = resData.data;
            const pagination = resData.pagination;
            setPagination(pagination);
            setSupplements(supplement);
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false);
        }
    }

    /**
     * 키워드(이름, 코드)로 영양제 검색
     */
    const searchSupplementsByKeyword = async (
        keyword: string,
        page: number,
        limit: number = 20
    ) => {
        try {
            setLoading(true);
            const resData = await searchByKeywordApi(keyword, page, limit);
            const supplement = resData.data;
            const pagination = resData.pagination;
            setPagination(pagination);
            setSupplements(supplement);
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false);
        }
    }

    return {
        getSupplements,
        searchSupplementsByEffectCode,
        searchSupplementsByKeyword,
        supplements,
        pagination,
        isLoading,
        error
    }

}

export default useSupplements;