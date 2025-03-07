import { auth } from "@/lib/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

export const AuthService = {
    async register(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            return { user: userCredential.user, error: null };
        } catch (error) {
            return { user: null, error: AuthService._mapError(error) };
        }
    },

    async login(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            return { user: userCredential.user, error: null };
        } catch (error) {
            return { user: null, error: AuthService._mapError(error) };
        }
    },

    async logout() {
        try {
            await signOut(auth);
            return { error: null };
        } catch (error) {
            return { error: AuthService._mapError(error) };
        }
    },

    _mapError(error) {
        const messages = {
            "auth/email-already-in-use": "Email is already in use",
            "auth/invalid-email": "Invalid email address",
            "auth/weak-password": "Password is too weak",
            "auth/user-not-found": "User not found",
            "auth/wrong-password": "Incorrect password",
            "auth/too-many-requests": "Too many attempts. Try again later",
        };

        return messages[error.code] || "Authentication error";
    },
};