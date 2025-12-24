import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./authClient";

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (userInfo) => {
      setUser(userInfo);
    });
    return () => unsub();
  }, []);

  return { user, isLoggedIn: !!user };
}