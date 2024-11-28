import { createContext, ReactNode, useEffect, useState } from "react";
import { UserType } from "../types/commonTypes";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { Login } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";

type AuthContextProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  user: UserType | null;
  setUser: (a: UserType) => void;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loader: boolean;
};

// 2 Define context initial value
const AuthContextInitialValue = {
  user: {} as UserType,
  setUser: () => {
    throw new Error("Context not initialized");
  },
  register: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => {
    throw new Error("Context not initialized");
  },
  loader: true,
};

// 1 create context
export const AuthContext = createContext<AuthContextType>(
  AuthContextInitialValue
);

// 4 define the provider for our context
export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loader, setLoader] = useState(true);

  //const navigateToCountryPage = useNavigate();

  const register = async (email: string, password: string) => {
    localStorage.setItem("email", email);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userObject = userCredential.user;

      console.log("user from login:>> ", userObject);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = (error as Error).message;
      console.log("errorMessage :>> ", errorMessage);
      console.log("errorCode :>> ", errorCode);
    } finally {
      setLoader(false);
    }
  };

  const login = async (email: string, password: string, location: string) => {
    try {
      const userVerification = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userObject = userVerification.user;
      console.log("USER LOG IN SUCCESFUL :>> ", userObject);
      if (userObject.uid && userObject.email) {
        setUser({ uid: userObject.uid, email: userObject.email });

        //Redirect to the country page
        // const locationPath = location.state.prevPath;
        // console.log("locationPath :>> ", locationPath);
        // if (locationPath) {
        //   console.log("REDIRECTION TO THE COUNTRY PAGE MUST BE HEAR:>> ");
        // }
      } else {
        console.log("EMAIL DOES NOT EXIST :>> ");
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = (error as Error).message;
      console.log("errorMessage from method login:>> ", errorMessage);
      console.log("errorCode from method login:>> ", errorCode);
    }
  };

  const checkUserStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        if (user.email) {
          setUser({ email: user.email, uid: user.uid });
          setLoader(false);
          console.log("user is loged in:>> ", user);
        }
        // ...
      } else {
        // User is signed out
        // ...
        setLoader(false);
      }
    });
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign-out successful. ");
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, register, login, loader, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// const commentsCollection = [
//   {
//     id: "spain",
//     comments: [
//       {
//         text: "asdad",
//         email:"asdasd"
//       },
//       {
//         text: "asdad",
//         email:"asdasd"
//       },
//     ]
//   },
//   {
//     id: "germany",
//     comments: [
//       {
//         text: "asdad",
//         email:"asdasd"
//       },
//       {
//         text: "asdad",
//         email:"asdasd"
//       },
//     ]
//   },
// ]
