import { useEffect } from "react";
import useSupplements from "./hook/useSupplements";
import useEffectCodes from "./hook/useEffectCodes";
import ToggleButton from "../../../../components/buttons/toggle/ToggleButton";

export default function SupplementContent() {
  const { getSupplements, searchSupplementsByEffectCode, supplements } = useSupplements();
  const { getEffectCodes, updateEffectCodeClickState, effectCodes } = useEffectCodes();

  useEffect(() => {
    getSupplements();
    getEffectCodes();
  }, []);

  /**
   * 영양제 효과 코드 클릭 핸들러
   */
  const handleEffectCodeClick = async (code: string) => {
    if (code === 'ALL') {
      await getSupplements();
      updateEffectCodeClickState(code);
      return;
    }
    await searchSupplementsByEffectCode(code);
    updateEffectCodeClickState(code);
  };

  return (
    <div>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        marginBottom: '0.6rem'
      }}>
        {effectCodes.length > 0 && (
          <div style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
              효과 목록
            </h2>

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


      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
            영양제 목록
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 300px))',
            gap: '1.5rem'
          }}>
            {supplements.map(supplement => (
              <div key={supplement.code} style={{
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                padding: '1rem'
              }}>
                <img
                  style={{
                    width: '100%',
                    minHeight: '150px',
                    height: 'auto',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem'
                  }}
                  src={supplement.imageUrl}
                  alt="thumbnail"
                />
                <h3 style={{ fontWeight: 600, color: '#1f2937', marginBottom: '0.5rem' }}>{supplement.name}</h3>
                <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>{supplement.description}</p>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>효과: {supplement.effects}</p>
                <button style={{
                  width: '100%',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  편집
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
