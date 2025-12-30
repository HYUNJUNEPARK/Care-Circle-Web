import Input from '../../../../components/inputs/Input';
import { useState, useEffect } from 'react';
import styles from "./UserContent.module.css";

export default function UsersContent() {

  const [searchUser, setSearchUser] = useState('');

  const tableHeads = ['이메일', '사용자 UID', '역할', '상태', '작업', '가입일', '수정일', '마지막 로그인']

  const users = [
    { uid: "IsMbDvqC8CW5mge0B4MClqn8e4W2", email: 'kim@example.com', role: '관리자', status: '활성', createAt: '2025-12-12', updateAt: '2025-12-12', lastLoginAt: '2026-01-01' },
    { uid: "IsMbDvqC8CW5mge0B4MClqn8e4W2", email: 'lee@example.com', role: '사용자', status: '비활성', createAt: '2025-12-12', updateAt: '2025-12-12', lastLoginAt: '2026-01-01' },
  ];

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
              {users.map((u, i) => (
                <tr key={i}>
                  <td className={styles.td}>{u.email}</td>
                  <td className={styles.td}>{u.uid}</td>
                  <td className={styles.td}>{u.role}</td>

                  <td className={styles.td}>
                    <span className={styles.statusDisplay}>{u.status}</span>
                  </td>

                  <td className={styles.td}>
                    <button className={styles.roleButton} style={{backgroundColor:"#59b3eeff" }}>비밀번호 초기화</button>
                    <button className={styles.roleButton} style={{marginLeft:"10px", backgroundColor:"#e83e3eff" }}>계정 삭제</button>
                  </td>

                  <td className={styles.td}>{u.createAt}</td>
                  <td className={styles.td}>{u.updateAt}</td>
                  <td className={styles.td}>{u.lastLoginAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
