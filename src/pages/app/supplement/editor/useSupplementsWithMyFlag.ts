import { useState } from 'react';
import {
    getSupplementsWithMyFlag as getSupplementsWithMyFlagApi,
    addUserHealthItem as addUserHealthItemApi
} from '../../../../network/api/supplementApis';
import type { SupplementWithMyFlag } from '../../../../types/remote/Supplements';
import { type Pagination } from '../../../../types/remote/Pagination';

/**
 * 영양제 리스트 (내 리스트 포함 여부 플래그 포함) 데이터 로드 및 상태 관리 훅
 */
function useSupplementsWithMyFlag() {
    const [supplements, setSupplements] = useState<SupplementWithMyFlag[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    /**
     * 영양제 리스트 가져오기 (초기 로드 - 데이터 교체)
     * isInMyList 필드가 포함된 응답
     */
    const getSupplements = async (
        page: number,
        limit: number = 20
    ) => {
        try {
            setLoading(true);
            const resData = await getSupplementsWithMyFlagApi({ page, limit });
            const supplements = resData.data;
            const pagination = resData.pagination;
            setPagination(pagination);
            setSupplements(supplements);
            setCurrentPage(page);
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false);
        }
    }

    /**
     * 다음 페이지 영양제 더 불러오기 (무한 스크롤 - 데이터 추가)
     */
    const loadMoreSupplements = async (
        limit: number = 20
    ) => {
        if (!pagination?.hasNext || isLoading) return;

        try {
            setLoading(true);
            const nextPage = currentPage + 1;
            const resData = await getSupplementsWithMyFlagApi({ page: nextPage, limit });
            const newSupplements = resData.data;
            const newPagination = resData.pagination;

            setPagination(newPagination);
            setSupplements(prev => [...prev, ...newSupplements]);
            setCurrentPage(nextPage);
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false);
        }
    }

    /**
     * 사용자 영양제 리스트에 아이템 추가
     * @param supplementId 추가할 영양제 ID
     */
    const addUserHealthItem = async (supplementId: number) => {
        try {
            setLoading(true);
            const result = await addUserHealthItemApi(supplementId);
            
            // 로컬 상태 업데이트 - isInMyList를 true로 변경
            setSupplements(prev =>
                prev.map(supplement =>
                    supplement.id === supplementId
                        ? { ...supplement, isInMyList: true }
                        : supplement
                )
            );
            
            return result;
        } catch (error) {
            setError(error as Error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        supplements,
        pagination,
        currentPage,
        isLoading,
        error,
        getSupplements,
        loadMoreSupplements,
        addUserHealthItem,
    }
}

export default useSupplementsWithMyFlag;
