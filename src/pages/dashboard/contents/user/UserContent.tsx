import Input from '../../../../components/inputs/Input';
import { useState, useEffect } from 'react';
import styles from "./UserContent.module.css";
import useAllUsers from './hook/useAllUsers';
import useChangeUserStatus from './hook/useChangeUserStatus';
import useResetPassword from './hook/useResetPassword';
import useSignOut from './hook/useSignOut';
import useLoading from '../../../../components/loading/loading/useLoading';

export default function UsersContent() {
  const { fetchAllUsers, users, isLoading: isUserLoading, error: userError } = useAllUsers();
  const { changeUserStatus, isLoading: isStatusLoading, error: statusError } = useChangeUserStatus();
  const { reset, isLoading: isResetLoading, error: resetError } = useResetPassword();
  const { signOutByUid, isLoading: isSignOutLoading, error: signOutError } = useSignOut();


  const { showLoading, hideLoading } = useLoading();


  const [searchUser, setSearchUser] = useState('');
  const tableHeads = ['이메일', '사용자 UID', '역할', '상태', '작업', '가입', '수정', '로그인', '로그아웃', '비밀번호 초기화',];

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (!userError) return
    alert(`${userError.message}`)
  }, [userError]);

  useEffect(() => {
    if (!statusError) return
    alert(`${statusError.message}`)
  }, [statusError]);

  useEffect(() => {
    if (!resetError) return
    alert(`${resetError.message}`)
  }, [resetError]);

  useEffect(() => {
    if (!signOutError) return
    alert(`${signOutError.message}`)
  }, [signOutError]);

  useEffect(() => {
    const tt = async () => {
      showLoading();
      try {
        // 비동기 작업 시뮬레이션
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('작업 완료!');
      } catch (error) {
        console.error('Error:', error);
      } finally {
        hideLoading();
      }
    }

    tt();

  }, []);



  return (
    <div>
      <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1.5rem' }}>
        사용자 관리
      </h1>

      <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', border: '1px solid #e5e7eb' }}>

        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937' }}>사용자 목록</h2>
          <Input
            inputType='plaintext'
            id="email"
            label={""}
            placeholder="사용자 검색"
            value={searchUser}
            onChange={(e) => {
              setSearchUser(e.target.value)
            }}
          />
        </div>

        <div style={{ padding: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            {/* 테이블 헤더 */}
            <thead>
              <tr>
                {tableHeads.map((thead, i) => (
                  <th
                    key={i}
                    className={styles.th}>
                    {thead}
                  </th>
                ))}
              </tr>
            </thead>

            {/* 테이블 바디 */}
            <tbody>
              {users?.map((user, index) => (
                <tr key={index}>
                  <td className={styles.td}>{user.email}</td>
                  <td className={styles.td}>{user.uid}</td>
                  <td className={styles.td}>{user.role}</td>

                  <td className={styles.td}>
                    <span className={styles.statusDisplay}>{user.status}</span>
                  </td>


                  <td className={styles.td}>
                    {/* 비밀번호 초기화 */}
                    <button
                      className={styles.roleButton}
                      style={{ backgroundColor: "#59b3eeff" }}
                      onClick={async () => {
                        await reset(user.uid)
                      }}>비밀번호 초기화
                    </button>

                    {/* 로그아웃 버튼 */}
                    <button
                      className={styles.roleButton}
                      style={{ margin: "4px", backgroundColor: "#b957f6ff" }}
                      onClick={async () => {
                        await signOutByUid(user.uid);
                      }}>로그아웃
                    </button>

                    {/* 활성화 버튼 */}
                    {user.status !== 'ACTIVE' &&
                      <button
                        className={styles.roleButton}
                        style={{ margin: "4px", backgroundColor: "#42d49aff" }}
                        onClick={async () => {
                          await changeUserStatus(user.uid, 'ACTIVE');
                        }}>활성화
                      </button>
                    }
                    {/* 비활성화 버튼 */}
                    {user.status !== 'INACTIVE' &&
                      <button
                        className={styles.roleButton}
                        style={{ margin: "4px", backgroundColor: "#7d7d7dff" }}
                        onClick={async () => {
                          await changeUserStatus(user.uid, 'INACTIVE');
                        }}>비활성화
                      </button>
                    }
                    {/* 계정 정지 버튼 */}
                    {user.status !== 'BLOCKED' &&
                      <button
                        className={styles.roleButton}
                        style={{ margin: "4px", backgroundColor: "#fe6334" }}
                        onClick={async () => {
                          await changeUserStatus(user.uid, 'BLOCKED');
                        }}>계정 정지
                      </button>
                    }
                    {/* 계정 삭제 버튼 */}
                    {user.status !== 'DELETED' &&
                      <button
                        className={styles.roleButton}
                        style={{ margin: "4px", backgroundColor: "#ff0000ff" }}
                        onClick={async () => {
                          await changeUserStatus(user.uid, 'DELETED');
                        }}>계정 삭제
                      </button>
                    }
                  </td>
                  <td className={styles.td}>{user.createdAt}</td>
                  <td className={styles.td}>{user.updatedAt}</td>
                  <td className={styles.td}>{user.lastLoginAt}</td>
                  <td className={styles.td}>{user.logoutAt}</td>
                  <td className={styles.td}>{user.lastLoginAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
