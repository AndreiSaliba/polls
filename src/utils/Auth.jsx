import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/toast";
import firebase from "./firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const router = useRouter();
    const toast = useToast();

    const signinWithGoogle = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((res) => {
                const user = res.user;
                if (user) {
                    setCurrentUser(user);
                    console.log(user);
                    router.push("/");
                }
            })
            .catch((error) => {
                if (
                    error.code ==
                    "auth/account-exists-with-different-credential"
                ) {
                    toast({
                        title: "Account already exists with other provider.",
                        description:
                            "Please Login with other provider and link new provider in your dashboard.",
                        status: "error",
                        isClosable: true,
                        duration: 10000,
                    });
                }
            });
    };

    const signinWithGithub = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then((res) => {
                const user = res.user;
                if (user) {
                    setCurrentUser(user);
                    console.log(user);
                    router.push("/");
                }
            })
            .then(() => {
                if (!firebase.auth().currentUser.emailVerified) {
                    firebase.auth().currentUser.sendEmailVerification();
                }
            })
            .catch((error) => {
                if (
                    error.code ==
                    "auth/account-exists-with-different-credential"
                ) {
                    toast({
                        title: "Account already exists with other provider.",
                        description:
                            "Please Login with other provider and link new provider in your dashboard.",
                        status: "error",
                        isClosable: true,
                        duration: 10000,
                    });
                }
            });
    };

    const signOut = () => {
        firebase
            .auth()
            .signOut()
            .then(() => setCurrentUser(null));
    };

    useEffect(() => {
        const unsubscribe = firebase
            .auth()
            .onAuthStateChanged((user) => setCurrentUser(user));
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider
            value={{ currentUser, signinWithGoogle, signinWithGithub, signOut }}
        >
            {children}
        </AuthContext.Provider>
    );
};
