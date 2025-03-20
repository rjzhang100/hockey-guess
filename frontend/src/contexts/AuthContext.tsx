// import React, { createContext, useContext, useEffect, useState } from "react";
// import { trpc } from "../utils/trpc";
// import { useLocation } from "react-router-dom";

// interface AuthContextType {
//   isLoggedIn: boolean;
//   setLoginStatus: (newStatus: boolean) => void;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

//   useEffect(() => {
//     console.log("RESPONSE:");
//     console.log(response);
//     const checkLoginStatus = async () => {
//       try {
//         response.data?.loggedIn ? setIsLoggedIn(true) : setIsLoggedIn(false);
//       } catch (error) {
//         setIsLoggedIn(false);
//       }
//     };
//     checkLoginStatus();
//   }, [location.pathname]);

//   const setLoginStatus = (newStatus: boolean) => {
//     setIsLoggedIn(newStatus);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setLoginStatus }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
