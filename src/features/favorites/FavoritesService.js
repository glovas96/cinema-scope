import { db } from "@/lib/firebase";
import {
    doc,
    getDoc,
    setDoc,
} from "firebase/firestore";

const COLLECTION = "favorites";

export const FavoritesService = {
    // Load favorites for user
    async loadFavorites(userId) {
        if (!userId) return []; // no user → no remote favorites

        const ref = doc(db, COLLECTION, userId);
        const snap = await getDoc(ref);

        // return movies array or empty
        return snap.exists() ? snap.data().movies || [] : [];
    },

    // Save favorites for user
    async saveFavorites(userId, movies) {
        if (!userId) return; // no user → skip remote save

        const ref = doc(db, COLLECTION, userId);

        // overwrite full list
        await setDoc(ref, { movies });
    },
};