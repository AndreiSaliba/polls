import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/toast";
import firebase from "./firebase";
import { createUser } from "./db";

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
                    createUser(user.uid, {
                        email: user.email,
                        pollsCreated: [],
                        pollsVoted: [],
                    });
                } else {
                    router.push("/");
                }
            })
            .catch((error) => {
                if (
                    error.code ==
                    "auth/account-exists-with-different-credential"
                ) {
                    toast({
                        title: "Your account is linked to a different Auth Provider",
                        description:
                            "Please sign in with the provider that is linked to your account.",
                        status: "error",
                        isClosable: true,
                        duration: 10000,
                    });
                }
            });
    };

    const signinWithTwitter = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.TwitterAuthProvider())
            .then((res) => {
                const user = res.user;
                if (user) {
                    setCurrentUser(user);
                    createUser(user.uid, {
                        email: user.email,
                        pollsCreated: [],
                        pollsVoted: [],
                    });
                }
                if (!user.emailVerified) {
                    firebase.auth().currentUser.sendEmailVerification();
                    router.push("/verify");
                } else if (user.emailVerified) {
                    router.push("/");
                }
            })
            .catch((error) => {
                if (
                    error.code ==
                    "auth/account-exists-with-different-credential"
                ) {
                    toast({
                        title: "Your account is linked to a different Auth Provider",
                        description:
                            "Please sign in with the provider that is linked to your account.",
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
                    createUser(user.uid, {
                        email: user.email,
                        pollsCreated: [],
                        pollsVoted: [],
                    });
                }
                if (!user.emailVerified) {
                    firebase.auth().currentUser.sendEmailVerification();
                    router.push("/verify");
                } else if (user.emailVerified) {
                    router.push("/");
                }
            })
            .catch((error) => {
                if (
                    error.code ==
                    "auth/account-exists-with-different-credential"
                ) {
                    toast({
                        title: "Your account is linked to a different Auth Provider",
                        description:
                            "Please sign in with the provider that is linked to your account.",
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
            value={{
                currentUser,
                signinWithGoogle,
                signinWithGithub,
                signinWithTwitter,
                signOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
