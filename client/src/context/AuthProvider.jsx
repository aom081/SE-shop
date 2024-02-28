import React from 'react';
import { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';
import app from "../firebase/firebase.config";
export const AuthContext = React.createContext(null);
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const UpdateUserProfile = ({name, photoURL}) => {
        return UpdateUserProfile(auth.currentUser,  { 
            displayName: name, 
            photoURL :photoURL
        });
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    }

    const signUpWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    };

    const authInfo = {
        user,
        setUser,
        createUser,
        login,
        logout,
        signUpWithGoogle,
    };

    //check if user is logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currenUser) => {
            setUser(currenUser);
            if (currenUser) {
                setUser(currenUser);
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [auth])
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider
