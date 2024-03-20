import { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';
import app from "../firebase/firebase.config";
export const AuthContext = createContext();
import useAxiosPublic from '../hook/useAxiosPublic';
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const auth = getAuth(app);
    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const UpdateUserProfile = ({ name, photoURL }) => {
        return UpdateUserProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
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
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/user/', userInfo).then((response) => {
                    if (response.date.token) {
                        localStorage.setItem('access_token', response.data.token);
                    }
                })
            } else {
                localStorage.removeItem("access_token");
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )
}

export default AuthProvider
