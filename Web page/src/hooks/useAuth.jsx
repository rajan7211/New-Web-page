import { useState } from "react";

 function useAuth() {
    const [ isLoggedIn , setisloggedIn] = useState (
        localStorage.getItem("isLoggedIn") === "true"

    );

    const [user , setUser] = useState(()=> {
        const storeUser = localStorage.getItem("currentUser")
        return storeUser 
        ? JSON.parse(storeUser)
        : null;
    });


    
    // login 

    const login = (userData) => {
        localStorage.setItem("isLoggedIn" , "true");

        localStorage.setItem (
            "currentUser",
            JSON.stringify(userData)
        );

        localStorage.setItem(
            "token",
            "demo-token-123"
        );
        setisloggedIn(true);

        setUser(userData);

    };


    // logout 


    const logout = () => {
        localStorage.removeItem("isLoggedIn")
         
           localStorage.removeItem("currentUser");

           localStorage.removeItem("token")

           setUser(null);
    };


    return {
        isLoggedIn,
        user,
        login,
        logout,

    };

}



export default useAuth;











