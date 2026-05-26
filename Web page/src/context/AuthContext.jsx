import { createContext, useEffect, useMemo, useState } from "react";
import appData from "../data/appData";

export const AuthContext = createContext(null);

const STORAGE_USERS = "rbac_users";
const STORAGE_CURRENT_USER = "rbac_current_user";
const STORAGE_TOKEN = "rbac_auth_token";
const STORAGE_IS_LOGGED_IN = "rbac_is_logged_in";
const STORAGE_REAL_USER = "rbac_real_user";          // who is actually logged in
const STORAGE_IS_IMPERSONATING = "rbac_impersonating"; // boolean flag

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USERS);
      return saved ? JSON.parse(saved) : (appData?.users || []);
    } catch {
      return appData?.users || [];
    }
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CURRENT_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [realUser, setRealUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_REAL_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isImpersonating, setIsImpersonating] = useState(() => {
    return localStorage.getItem(STORAGE_IS_IMPERSONATING) === "true";
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(STORAGE_IS_LOGGED_IN) === "true";
  });

  // Persist users
  useEffect(() => {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
  }, [users]);

  // Persist auth state
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_CURRENT_USER, JSON.stringify(currentUser));
      localStorage.setItem(STORAGE_IS_LOGGED_IN, "true");
      localStorage.setItem(STORAGE_TOKEN, "demo-token-123");
    } else {
      localStorage.removeItem(STORAGE_CURRENT_USER);
      localStorage.setItem(STORAGE_IS_LOGGED_IN, "false");
      localStorage.removeItem(STORAGE_TOKEN);
    }
  }, [currentUser]);

  // Persist realUser & impersonation flag
  useEffect(() => {
    if (realUser) {
      localStorage.setItem(STORAGE_REAL_USER, JSON.stringify(realUser));
    } else {
      localStorage.removeItem(STORAGE_REAL_USER);
    }
    localStorage.setItem(STORAGE_IS_IMPERSONATING, String(isImpersonating));
  }, [realUser, isImpersonating]);

  // ── Auth actions ───────────────────────────────────────────────
  const register = async ({ firstName, lastName, email, password, confirmPassword, role }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
          if (exists) { reject({ message: "This email is already registered." }); return; }

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
        } catch {
          reject({ message: "Registration failed." });
        }
      }, 500);
    });
  };

  const login = async ({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const found = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );

        if (!found) { reject({ message: "Invalid email or password." }); return; }

        const userForState = { ...found };
        delete userForState.password;

        setCurrentUser(userForState);
        setIsAuthenticated(true);
        resolve(userForState);
      }, 500);
    });
  };

  const logout = () => {
    // If impersonating, stop impersonation instead of full logout
    if (isImpersonating && realUser) {
      stopImpersonating();
      return;
    }
    setCurrentUser(null);
    setIsAuthenticated(false);
    setRealUser(null);
    setIsImpersonating(false);
  };

  // ── Impersonation actions ──────────────────────────────────────

  /**
   * Can the currently logged-in real user impersonate `targetUser`?
   * - Super Admin → can impersonate Admin or Customer
   * - Admin       → can impersonate Customer only
   */
  const canImpersonate = (targetUser) => {
    const actor = realUser || currentUser; // use real user if already impersonating
    if (!actor || !targetUser) return false;
    if (actor.id === targetUser.id) return false;          // can't impersonate yourself

    if (actor.role === "Super Admin") {
      return ["Admin", "Customer"].includes(targetUser.role);
    }
    if (actor.role === "Admin") {
      return targetUser.role === "Customer";
    }
    return false;
  };

  /**
   * Start impersonating targetUser.
   * Saves the current (real) user, switches currentUser to target.
   */
  const startImpersonating = (targetUser) => {
    const actor = realUser || currentUser;
    if (!canImpersonate(targetUser)) return;

    // Strip password just in case
    const safe = { ...targetUser };
    delete safe.password;

    setRealUser(actor);               // remember who we really are
    setCurrentUser(safe);             // switch to impersonated user
    setIsImpersonating(true);
  };

  /**
   * Stop impersonating — restore the real user's session.
   */
  const stopImpersonating = () => {
    if (!realUser) return;
    setCurrentUser(realUser);
    setRealUser(null);
    setIsImpersonating(false);
  };

  // ── Helpers ────────────────────────────────────────────────────
  const getDashboardRoute = (role) => {
    if (role === "Super Admin") return "/super-admin";
    if (role === "Admin") return "/admin";
    return "/";
  };

  const getUsersByRole = (role) => users.filter((u) => u.role === role);

  const getManagedCustomers = () => {
    if (!currentUser || currentUser.role !== "Admin") return [];
    return users.filter((u) => u.role === "Customer");
  };

  const getOrdersForCustomer = (customerId) =>
    (appData?.orders || []).filter((o) => o.customerId === customerId);

  const value = useMemo(
    () => ({
      users,
      currentUser,
      isAuthenticated,
      // impersonation
      realUser,
      isImpersonating,
      canImpersonate,
      startImpersonating,
      stopImpersonating,
      // auth
      login,
      logout,
      register,
      getDashboardRoute,
      getUsersByRole,
      getManagedCustomers,
      getOrdersForCustomer,
      products: appData?.products || [],
      categories: appData?.categories || [],
      testimonials: appData?.testimonials || [],
      orders: appData?.orders || [],
      totalAdmins: users.filter((u) => u.role === "Admin").length,
      totalCustomers: users.filter((u) => u.role === "Customer").length,
      totalUsers: users.length,
      activeUsers: users.filter((u) => u.status === "active").length,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [users, currentUser, isAuthenticated, realUser, isImpersonating]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}



