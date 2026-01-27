import { useState } from 'react';
import {
    getSupplements as getSupplementsApi,
    searchSupplementsByKeyword as searchByKeywordApi,
    getUserSupplements as getUserSupplementsApi,
    addUserHealthItem as addUserHealthItemApi
} from '../../../network/api/supplementApis';
import { updateSupplementStatus as updateSupplementStatusApi } from '../../../network/api/adminApis';
import type { Supplement } from '../../../types/remote/Supplements';
import { type Pagination } from '../../../types/remote/Pagination';

/**
 * 영양제 관련 데이터 로드 및 상태 관리 훅
 */
function useSupplements() {
    const [supplements, setSupplements] = useState<Supplement[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    /**
     * 내 영양제 리스트 가져오기
     */
    const getUserSupplements = async (
        page: number,
        limit: number = 20
    ) => {
        try {
            setLoading(true);
            const resData = await getUserSupplementsApi({ page: page, limit: limit });

            const supplements = resData.data;
            const pagination = resData.pagination;
            setPagination(pagination);
            setSupplements(supplements);
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false);
        }
    }

    /**
     * 영양제 리스트 가져오기 (초기 로드 - 데이터 교체)
     */
    const getSupplements = async (
        page: number,
        limit: number = 20
    ) => {
        try {
            setLoading(true);
            const resData = await getSupplementsApi({ page: page, limit: limit });
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
            const resData = await getSupplementsApi({ page: nextPage, limit });
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
     * Effect 코드에 해당하는 영양제 검색
     */
    const searchSupplementsByEffectCode = async (
        effectCode: string,
        page?: number,
        limit?: number
    ) => {
        try {
            setLoading(true);
            const resData = await getSupplementsApi({
                effectCode: effectCode,
                page: page,
                limit: limit
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

    /**
     * 영양제 상태 변경
     * @param supplementCode 영양제 코드
     * @param newStatus 새로운 상태 ('ACTIVE' | 'INACTIVE')
     */
    const updateSupplementStatus = async (
        supplementCode: string,
        newStatus: 'ACTIVE' | 'INACTIVE'
    ) => {
        try {
            setLoading(true);
            const updateResult = await updateSupplementStatusApi(supplementCode, newStatus);

            // 로컬 상태 업데이트
            setSupplements(prev =>
                prev.map(supplement =>
                    (supplement.code === supplementCode)
                        ? { ...supplement, status: updateResult.status }
                        : supplement
                )
            );
        } catch (error) {
            setError(error as Error);
            throw error;
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
            return result;
        } catch (error) {
            setError(error as Error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        getSupplements,
        getUserSupplements,
        loadMoreSupplements,
        searchSupplementsByEffectCode,
        searchSupplementsByKeyword,
        updateSupplementStatus,
        addUserHealthItem,
        supplements,
        pagination,
        currentPage,
        isLoading,
        error
    }

}

export default useSupplements;