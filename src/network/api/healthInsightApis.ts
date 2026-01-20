import publicAxios from '../axios/publicAxios';
import type { HealthInsightResponse, HealthInsight } from '../../types/remote/HealthInsight';

const healthInsightApiUrl = `/api/health-insights`

/**
 * 전체 영양제 리스트 가져오기
 */
export async function getTodayHealthInsight(): Promise<HealthInsight> {
    const res = await publicAxios.get(
        `${healthInsightApiUrl}/today`,
    );
    const resData = res.data as HealthInsightResponse;
    const data = resData.data;
    return data;
}