import { useContext } from "react";
// Ensure the path is correct and it matches the named export
import { AuthContext } from "../context/AuthContext"; 

function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export default useAuth;













