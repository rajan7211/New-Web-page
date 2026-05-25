import { createContext, useEffect, useMemo, useState } from "react";
import appData from "../data/appData";

export const AuthContext = createContext(null);

const STORAGE_USERS = "rbac_users";
const STORAGE_CURRENT_USER = "rbac_current_user";
const STORAGE_TOKEN = "rbac_auth_token";
const STORAGE_IS_LOGGED_IN = "rbac_is_logged_in";

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USERS);
      return saved ? JSON.parse(saved) : (appData?.users || []);
    } catch (error) {
      return appData?.users || [];
    }
  });


  

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CURRENT_USER);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(STORAGE_IS_LOGGED_IN) === "true";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_USERS, JSON.stringify(users));
  }, [users]);

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

  const register = async ({ firstName, lastName, email, password, confirmPassword, role }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
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
            // FIX: Assign managerId if needed (optional - for admin assignment)
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
        } catch (err) {
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
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const getDashboardRoute = (role) => {
    if (role === "Super Admin") return "/super-admin";
    if (role === "Admin") return "/admin";
    return "/";
  };

  const getUsersByRole = (role) => users.filter((u) => u.role === role);

  // FIX: Removed managerId filter so Admins can see ALL customers
  const getManagedCustomers = () => {
    if (!currentUser || currentUser.role !== "Admin") return [];
    return users.filter((u) => u.role === "Customer");
  };

  const getOrdersForCustomer = (customerId) => {
    return (appData?.orders || []).filter((o) => o.customerId === customerId);
  };

  const value = useMemo(
    () => ({
      users,
      currentUser,
      isAuthenticated,
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
    [users, currentUser, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}




