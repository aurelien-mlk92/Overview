import { createContext, useState, useMemo, useEffect } from "react";

const authContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.status === 200) {
          const currentUser = await response.json();
          setUser(currentUser);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    getCurrentUser();
  }, []);

  const auth = useMemo(
    () => ({ user, setUser, isLoading, setIsLoading }),
    [user, isLoading]
  );

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default authContext;
export { AuthProvider };
