import { createContext, useCallback, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const login = useCallback(async function login(values) {
 
    const { username , password} = values;
    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username ,
          password,
          expiresInMins: 30,
        }),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      console.log("Login response:", data);

      if (data?.accessToken) {
        // احفظ التوكنات
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        // احفظ بيانات المستخدم فقط
        const { accessToken, refreshToken, ...userData } = data;
        localStorage.setItem("user", JSON.stringify(userData));

        setIsAuthenticated(true);
        setUser(userData);
      }
    } catch (err) {
      console.error("Login failed:", err.message);
    }
  }, []);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
