import { useMemo } from "react";

type Props = {
  page: number; // 현재 페이지 (1-based)
  totalPages: number;
  onChange: (nextPage: number) => void;
  maxButtons?: number; // 화면에 표시할 최대 버튼 수(시작 페이지(1), 마지막 페이지 제외)
};

function Pagination({
  page,
  totalPages,
  onChange,
  maxButtons = 3,
}: Props) {

  // 실제로 화면에 표시할 페이지 번호 목록 계산
  const pages = useMemo(() => {
    if (totalPages <= 0) return [];

    // 현재 페이지 기준으로 좌우에 몇 개씩 배치할지 계산
    const half = Math.floor(maxButtons / 2);
    // 시작 페이지 계산 (최소 1 보장)
    let start = Math.max(1, page - half);
    // 끝 페이지 계산 (totalPages 초과 방지)
    let end = Math.min(totalPages, start + maxButtons - 1);

    /**
     * end가 totalPages 때문에 줄어든 경우,
     * start를 다시 당겨서 버튼 개수를 맞춘다
     *
     * 예:
     * totalPages = 10
     * page = 9
     * maxButtons = 7
     */
    start = Math.max(1, end - maxButtons + 1);

    // start ~ end 범위의 페이지 번호 배열 생성
    const arr: number[] = [];
    for (let p = start; p <= end; p++) arr.push(p);
    return arr;
  }, [page, totalPages, maxButtons]);

  /**
   * 페이지가 1개 이하라면
   * 페이지네이션 UI 자체를 렌더링하지 않음
   */
  //if (totalPages <= 1) return null;

  /** 이전 / 다음 버튼 활성화 여부 */
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 16 }}>
      <button
        disabled={!canPrev}
        style={{
          opacity: canPrev ? 1.0 : 0.4,
          pointerEvents: canPrev ? 'auto' : 'none'
        }}
        onClick={() => onChange(Number(page) - 1)}
      >Prev</button>

      {/* 
        pages 배열의 첫 번째가 1이 아니라면
        "1" 버튼을 따로 표시하고 필요 시 ... 처리
      */}
      {pages[0] !== 1 && (
        <>
          <button onClick={() => onChange(1)}>1</button>
          {pages[0] > 2 && <span style={{ padding: "6px 4px" }}>…</span>}
        </>
      )}

      {/* 실제 페이지 번호 버튼 렌더링 */}
      {pages.map((p) => (
        <button
          key={p}
          disabled={p === page}
          onClick={() => onChange(p)}
          style={{
            background: p == page ? '#0077ff' : '#fff',
            color: p == page ? '#fff' : '#000000',
            fontWeight: p == page ? 700 : 400,
          }}
        >
          {p}
        </button>
      ))}

      {/* 
        마지막 페이지가 pages에 포함되지 않았다면
        ... + totalPages 버튼 추가
      */}
      {pages[pages.length - 1] !== totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span style={{ padding: "6px 4px" }}>…</span>
          )}
          <button onClick={() => onChange(totalPages)}>{totalPages}</button>
        </>
      )}

      <button
        disabled={!canNext}
        style={{
          opacity: canNext ? 1.0 : 0.4,
          pointerEvents: canNext ? 'auto' : 'none'
        }}
        onClick={() => onChange(Number(page) + 1)}
      >Next</button>
    </div>
  );
}

export default Pagination;