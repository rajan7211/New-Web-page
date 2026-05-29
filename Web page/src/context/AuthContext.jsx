import { createContext, useEffect, useMemo, useState, useCallback } from "react";
import appData from "../data/appData";

export const AuthContext = createContext(null);

const STORAGE = {
  USERS: "rbac_users",
  CURRENT_USER: "rbac_current_user",
  TOKEN: "rbac_auth_token",
  IS_LOGGED_IN: "rbac_is_logged_in",
  REAL_USER: "rbac_real_user",
  IS_IMPERSONATING: "rbac_impersonating",
};

function getStorageItem(key, fallback = null) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function getStorageBool(key) {
  return localStorage.getItem(key) === "true";
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => getStorageItem(STORAGE.USERS, appData?.users || []));
  const [currentUser, setCurrentUser] = useState(() => getStorageItem(STORAGE.CURRENT_USER));
  const [realUser, setRealUser] = useState(() => getStorageItem(STORAGE.REAL_USER));
  const [isImpersonating, setIsImpersonating] = useState(() => getStorageBool(STORAGE.IS_IMPERSONATING));
  const [isAuthenticated, setIsAuthenticated] = useState(() => getStorageBool(STORAGE.IS_LOGGED_IN));

  useEffect(() => {
    localStorage.setItem(STORAGE.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE.CURRENT_USER, JSON.stringify(currentUser));
      localStorage.setItem(STORAGE.IS_LOGGED_IN, "true");
      localStorage.setItem(STORAGE.TOKEN, "demo-token-123");
    } else {
      localStorage.removeItem(STORAGE.CURRENT_USER);
      localStorage.setItem(STORAGE.IS_LOGGED_IN, "false");
      localStorage.removeItem(STORAGE.TOKEN);
    }
  }, [currentUser]);

  useEffect(() => {
    if (realUser) {
      localStorage.setItem(STORAGE.REAL_USER, JSON.stringify(realUser));
    } else {
      localStorage.removeItem(STORAGE.REAL_USER);
    }
    localStorage.setItem(STORAGE.IS_IMPERSONATING, String(isImpersonating));
  }, [realUser, isImpersonating]);

  const register = useCallback(({ firstName, lastName, email, password, role }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
        if (exists) {
          reject({ message: "This email is already registered." });
          return;
        }

        const newUser = {
          id: `user-${Date.now()}`,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          name: `${firstName.trim()} ${lastName.trim()}`,
          email: email.trim().toLowerCase(),
          password,
          role,
          status: "active",
          createdAt: new Date().toISOString(),
          managerId: role === "Customer" ? "admin-1" : null,
        };

        setUsers((prev) => [...prev, newUser]);

        if (role === "Customer") {
          const userForState = { ...newUser };
          delete userForState.password;
          setCurrentUser(userForState);
          setIsAuthenticated(true);
        }

        resolve(newUser);
      }, 500);
    });
  }, [users]);

  const login = useCallback(({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!found) {
          reject({ message: "Invalid email or password." });
          return;
        }

        const userForState = { ...found };
        delete userForState.password;

        setCurrentUser(userForState);
        setIsAuthenticated(true);
        resolve(userForState);
      }, 500);
    });
  }, [users]);

  const logout = useCallback(() => {
    if (isImpersonating && realUser) {
      setCurrentUser(realUser);
      setRealUser(null);
      setIsImpersonating(false);
      return;
    }
    setCurrentUser(null);
    setIsAuthenticated(false);
    setRealUser(null);
    setIsImpersonating(false);
  }, [isImpersonating, realUser]);

  const canImpersonate = useCallback((targetUser) => {
    const actor = realUser || currentUser;
    if (!actor || !targetUser || actor.id === targetUser.id) return false;

    if (actor.role === "Super Admin") return ["Admin", "Customer"].includes(targetUser.role);
    if (actor.role === "Admin") return targetUser.role === "Customer";
    return false;
  }, [realUser, currentUser]);

  const startImpersonating = useCallback((targetUser) => {
    const actor = realUser || currentUser;
    if (!canImpersonate(targetUser)) return;

    const safe = { ...targetUser };
    delete safe.password;

    setRealUser(actor);
    setCurrentUser(safe);
    setIsImpersonating(true);
  }, [realUser, currentUser, canImpersonate]);

  const stopImpersonating = useCallback(() => {
    if (!realUser) return;
    setCurrentUser(realUser);
    setRealUser(null);
    setIsImpersonating(false);
  }, [realUser]);

  const getDashboardRoute = useCallback((role) => {
    if (role === "Super Admin") return "/super-admin";
    if (role === "Admin") return "/admin";
    return "/";
  }, []);

  const getUsersByRole = useCallback((role) => users.filter((u) => u.role === role), [users]);
  const getManagedCustomers = useCallback(() => users.filter((u) => u.role === "Customer"), [users]);
  const getOrdersForCustomer = useCallback((customerId) => (appData?.orders || []).filter((o) => o.customerId === customerId), []);

  const stats = useMemo(() => ({
    totalAdmins: users.filter((u) => u.role === "Admin").length,
    totalCustomers: users.filter((u) => u.role === "Customer").length,
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "active").length,
  }), [users]);

  const value = useMemo(
    () => ({
      users,
      currentUser,
      isAuthenticated,
      realUser,
      isImpersonating,
      canImpersonate,
      startImpersonating,
      stopImpersonating,
      login,
      logout,
      register,
      getDashboardRoute,
      getUsersByRole,
      getManagedCustomers,
      getOrdersForCustomer,
      products: appData?.products || [],
      testimonials: appData?.testimonials || [],
      orders: appData?.orders || [],
      ...stats,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [users, currentUser, isAuthenticated, realUser, isImpersonating, stats, login, logout, register, canImpersonate, startImpersonating, stopImpersonating, getDashboardRoute, getUsersByRole, getManagedCustomers, getOrdersForCustomer]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}





