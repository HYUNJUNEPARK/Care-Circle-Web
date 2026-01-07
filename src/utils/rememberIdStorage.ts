const STORAGE_KEY = "remembered_login_id";

export function loadRememberedId(): string {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return "";
    // 문자열만 저장하지만, 혹시 모를 타입 꼬임 방지
    return typeof raw === "string" ? raw : "";
  } catch {
    return "";
  }
}

export function saveRememberedId(id: string) {
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // storage quota / private mode 등 예외 무시
  }
}

export function clearRememberedId() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}