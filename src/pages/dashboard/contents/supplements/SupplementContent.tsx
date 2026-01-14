import { useEffect } from "react";
import useSupplements from "./hook/useSupplements";
import useEffectCodes from "./hook/useEffectCodes";
import ToggleButton from "../../../../components/buttons/toggle/ToggleButton";
import handleError from "../../../../utils/error/handleError";
import Button from '../../../../components/buttons/Button';
import Pagination from "../../../../components/pagination/Pagination";


export default function SupplementContent() {
  const { getSupplements, searchSupplementsByEffectCode, supplements, pagination, error: supplementError } = useSupplements();
  const { getEffectCodes, updateEffectCodeClickState, effectCodes, error: effectCodeError } = useEffectCodes();

  useEffect(() => {
    getSupplements(1);
    getEffectCodes();
  }, []);

  /**
   * 영양제 효과 코드 클릭 핸들러
   */
  const handleEffectCodeClick = async (code: string) => {
    if (code === 'ALL') {
      await getSupplements(1);
      updateEffectCodeClickState(code);
      return;
    }
    await searchSupplementsByEffectCode(code, 1);
    updateEffectCodeClickState(code);
  };

  /**
   * 페이징 변경
   */
  const onChangePage = async (page: number) => {
    await getSupplements(page);
  }

  return (
    <div>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        marginBottom: '0.6rem'
      }}>
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>효과 목록</h2>

          {/* 효과코드 에러 */}
          {effectCodeError &&
            <div style={{ color: '#000000', textAlign: 'center', marginBottom: '24px' }}>{handleError(effectCodeError)}</div>}

          {/* 효과코드 리스트 */}
          {effectCodes.length > 0 && (
            <div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {effectCodes.map(code => (
                  <ToggleButton
                    key={code.code}
                    label={code.name}
                    isSelected={code.isClicked}
                    onClick={async () =>
                      await handleEffectCodeClick(code.code)
                    } />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>영양제 목록</h2>

          {/* 영양제 에러 */}
          {effectCodeError &&
            <div style={{ color: '#000000', textAlign: 'center', marginBottom: '24px' }}>{handleError(supplementError)}</div>}

          {/* 영양제 리스트 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 300px))',
            gap: '1.5rem'
          }}>
            {supplements.map(supplement => (
              <div key={supplement.code} style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* 영양제 이미지 */}
                <img
                  style={{
                    width: '100%',
                    minHeight: '220px',
                    height: 'auto',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}
                  src={supplement.imageUrl}
                  alt="thumbnail"
                />
                {/* 영양제 이름 */}
                <h3 style={{ fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>{supplement.name}</h3>
                {/* 영양제 코드 */}
                <h3 style={{ fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>{supplement.code}</h3>
                {/* 영양제 설명 */}
                <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>{supplement.description}</p>
                {/* 영양제 효과 */}
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>효과: {supplement.effects}</p>
                {/* 아이템 상태 */}
                {/* <h3 style={{ color: '#1f2937', marginBottom: '0.5rem' }}>{supplement.status}</h3> */}
                <Button
                  style={{ marginTop: 'auto' }}
                  buttonText="수정" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <Pagination
          page={pagination?.page ?? 1}
          totalPages={pagination?.totalPages ?? 1}
          onChange={(page) => {
            onChangePage(page)
          }}>
        </Pagination>
      </div>

    </div>
  );
}
