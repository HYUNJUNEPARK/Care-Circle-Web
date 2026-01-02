import Input from '../../../../components/inputs/Input';
import { useState, useEffect } from 'react';
import styles from "./UserContent.module.css";
import useAllUsers from './hook/useAllUsers';
import useChangeUserStatus from './hook/useChangeUserStatus';
import useResetPassword from './hook/useResetPassword';
import useSignOut from './hook/useSignOut';
import useLoading from '../../../../components/loading/loading/useLoading';
import type { UserStatusType } from '../../../../types/UserStatusType';

export default function UsersContent() {
  const { fetchAllUsers, setUsers, users, error: userError } = useAllUsers();
  const { changeUserStatus, error: statusError } = useChangeUserStatus();
  const { reset, error: resetError } = useResetPassword();
  const { signOutByUid, error: signOutError } = useSignOut();


  const { showLoading, hideLoading } = useLoading();
  const [searchUser, setSearchUser] = useState('');
  const tableHeads = ['이메일', '사용자 UID', '역할', '상태', '작업', '가입', '수정', '로그인', '로그아웃', '비밀번호 초기화'];

  //사용자 관리 페이지 마운트 시, 사용자 리스트 조회
  useEffect(() => {
    const fetchUsers = async () => {
      showLoading();
      await fetchAllUsers();
      hideLoading();
    }

    fetchUsers();
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

  //사용사 상태 변경(활성화, 비활성화, 계정정지, 계정 삭제)
  const changeStatus = async (uid: string, status: UserStatusType) => {
    try {
      showLoading();

      const res = await changeUserStatus(uid, status)!;
      const rUid = res?.uid;
      const newStatus = res?.status;
      const updateAt = res?.timeStamp;
      if (!res || !rUid || !newStatus || !updateAt) {
        throw new Error("response is invalid");
      }

      //기존에 있던 사용자 리스트에서 변경된 리스트 업데이트
      setUsers(prev =>
        prev.map(user =>
          user.uid === rUid ? { ...user, status: newStatus, updatedAt: updateAt } : user
        )
      );
    } catch (error) {
      console.error('Error:', error);
    } finally {
      hideLoading();
    }
  }

  //로그아웃
  const signOut = async (uid: string) => {
    try {
      showLoading();

      const res = await signOutByUid(uid);
      const rUid = res?.uid;
      const logoutAt = res?.timeStamp;
      if (!res || !rUid || !logoutAt) {
        throw new Error("response is invalid");
      }

      //기존에 있던 사용자 리스트에서 변경된 리스트 업데이트
      setUsers(prev =>
        prev.map(user =>
          user.uid === rUid ? { ...user, logoutAt: logoutAt } : user
        )
      );
    } catch (error) {
      console.error('Error:', error);
    } finally {
      hideLoading();
    }
  }

  const getStatusClass = (status: string) => {
    try {
      const statusType = status as UserStatusType
      switch (statusType) {
        case "ACTIVE": return styles.active;
        case "INACTIVE": return styles.inactive;
        case "BLOCKED": return styles.blocked;
        case "DELETED": return styles.deleted;
        default: return "";
      }
    } catch (error) {
      console.error('getStatusClass error', error);
      return "";
    }
  };

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
                  {/* 사용자 상태 */}
                  <td className={styles.td}>
                    <span className={`${styles.statusDisplay} ${getStatusClass(user.status)}`}>{user.status}</span>
                  </td>
                  <td className={styles.td}>
                    {/* 활성화 버튼 */}
                    {user.status !== 'ACTIVE' &&
                      <button
                        className={styles.roleButton}
                        style={{ margin: "4px", backgroundColor: "#119762ff" }}
                        onClick={() => {
                          changeStatus(user.uid, 'ACTIVE');
                        }}>활성화
                      </button>
                    }
                    {/* 비활성화 버튼 */}
                    {user.status !== 'INACTIVE' &&
                      <button
                        className={styles.roleButton}
                        style={{ margin: "4px", backgroundColor: "#00a9bfff" }}
                        onClick={() => {
                          changeStatus(user.uid, 'INACTIVE');
                        }}>비활성화
                      </button>
                    }
                    {/* 계정 정지 버튼 */}
                    {user.status !== 'BLOCKED' &&
                      <button
                        className={styles.roleButton}
                        style={{ margin: "4px", backgroundColor: "#fe6334" }}
                        onClick={() => {
                          changeStatus(user.uid, 'BLOCKED');
                        }}>계정 정지
                      </button>
                    }
                    {/* 계정 삭제 버튼 */}
                    {user.status !== 'DELETED' &&
                      <button
                        className={styles.roleButton}
                        style={{ margin: "4px", backgroundColor: "#ff0000ff" }}
                        onClick={() => {
                          changeStatus(user.uid, 'DELETED');
                        }}>계정 삭제
                      </button>
                    }
                  </td>
                  {/* 가입일 */}
                  <td className={styles.td}>{user.createdAt}</td>
                  {/* 수정일 */}
                  <td className={styles.td}>{user.updatedAt}</td>
                  {/* 로그인 */}
                  <td className={styles.td}>{user.lastLoginAt}</td>
                  {/* 로그아웃 */}
                  <td className={styles.td} >
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      {/* 로그아웃 버튼 */}
                      <button
                        className={styles.roleButton}
                        style={{ backgroundColor: "#b957f6ff" }}
                        onClick={() => {
                          signOut(user.uid);
                        }}>로그아웃
                      </button>
                      {/* 로그아웃 시간 */}
                      <div style={{ textAlign: 'center', marginTop: '2px' }}>
                        {user.logoutAt}
                      </div>
                    </div>
                  </td>
                  {/* 비밀번호 초기화 */}
                  <td className={styles.td} >
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      {/* 비밀번호 버튼 */}
                      <button
                        className={styles.roleButton}
                        style={{ backgroundColor: "#59b3eeff" }}
                        onClick={async () => {
                          reset(user.uid)
                        }}>비밀번호 초기화
                      </button>
                      {/* 비밀번호 초기화 시간 */}
                      <div style={{ textAlign: 'center', marginTop: '2px' }}>
                        {user.lastLoginAt}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
