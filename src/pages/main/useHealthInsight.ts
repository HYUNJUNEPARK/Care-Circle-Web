import { useState } from 'react';
import { getTodayHealthInsight } from '../../network/api/healthInsightApis';
import type { HealthInsight } from '../../types/remote/HealthInsight';

/**
 * 로그인 사용자 정보 로드
 */
function useHealthInsight() {
    const [isLoading, setLoading] = useState(false);
    const [healthInsight, setHealthInsight] = useState<HealthInsight | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const fetchHealthInsight = async () => {
        try {
            setLoading(true);
            const healthInsight = await getTodayHealthInsight();
            setHealthInsight(healthInsight);
        } catch (error) {
            console.error('fetchTodayHealthInsight()', error)
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }

    return {
        fetchHealthInsight,
        healthInsight,
        isLoading,
        error,
    }
}

export default useHealthInsight;