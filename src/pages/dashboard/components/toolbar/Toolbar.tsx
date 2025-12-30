import styles from './Toolbar.module.css';
import { useState, useRef, useEffect } from 'react';
import Dropdown from './Dropdown';
import { IoIosMenu } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import useSignOut from '../../../../hook/useSignOut';
import { useAuth } from "../../../../features/auth/AuthProvider"
import { useAlert } from "../../../../components/alert/AlertProvider"
import strings from "../../../../res/strings"

function Toolbar({
  sidebarOpen,
  setSidebarOpen
}: {
  sidebarOpen: boolean,
  setSidebarOpen: (v: boolean) => void
}) {
  const { showAlert } = useAlert();

  const { user } = useAuth(); //const { user, isLoggedIn } = useAuth();
  const dropdownItems = [`${user?.email}`, strings.signOut];
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userButtonRef = useRef<HTMLButtonElement>(null);
  const { userSignOut, error } = useSignOut();

  // 드롭다운 아이템 클릭 핸들러
  const handleDropdownItem = (index: number) => {
    switch (index) {
      case 0: break; //이메일
      case 1: { //로그아웃
        showAlert({
          title: strings.signOut,
          message: null,
          onConfirmAction: () => {
            userSignOut();
          }
        });
      }
    }
    setDropdownOpen(false);
  }

  useEffect(() => {
    if (!error) return
    alert(`${error.message}`)
  }, [error]);

  return (
    <div className={styles.toolbar}>
      {/* 좌측 상단 아이콘: 메뉴 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={styles.menuButton}>
          <IoIosMenu size={24} />
        </button>
      </div>

      {/* 우측 상단 아이콘: 로그인 사용자 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
          <button
            className={styles.userButton}
            onClick={() => setDropdownOpen((open) => !open)}
            ref={userButtonRef}
          >
            <FaRegUser color="white" size={20} />
          </button>
          {/* 우측 상단 아이콘: 드롭다운 */}
          {dropdownOpen &&
            (
              <Dropdown
                top="3rem"
                itemList={dropdownItems}
                onItemClick={handleDropdownItem}
              />
            )}
        </div>
      </div>
    </div>
  );
}

export default Toolbar;