import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./authClient";

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (userInfo) => {
      setUser(userInfo);
      setInitializing(false);
    });
    return () => unsub();
  }, []);

  return { user, initializing, isLoggedIn: !!user };
}