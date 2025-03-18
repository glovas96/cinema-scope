"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { useAuth } from "@/features/auth/AuthContext";
import { FavoritesService } from "@/features/favorites/FavoritesService";

const FavoritesContext = createContext();

// Helper
const byId = (id) => (m) => m.imdbID === id;

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);
    const { user } = useAuth();

    // Load from Firestore when user logs in
    useEffect(() => {
        if (!user) {
            setFavorites([]); // logout → clear local state
            return;
        }

        const load = async () => {
            const remote = await FavoritesService.loadFavorites(user.uid);
            setFavorites(remote);
        };

        load();
    }, [user]);

    // Save to Firestore when favorites change (but NOT if empty right after login)
    useEffect(() => {
        if (!user) return;

        // Prevent overwriting Firestore with empty array right after login
        if (favorites.length === 0) return;

        FavoritesService.saveFavorites(user.uid, favorites);
    }, [favorites, user]);

    // Add favorite
    const addFavorite = (movie) => {
        if (!movie?.imdbID) return;

        setFavorites((prev) => {
            if (prev.some(byId(movie.imdbID))) return prev;
            return [...prev, movie];
        });
    };

    // Remove favorite
    const removeFavorite = (id) => {
        setFavorites((prev) => prev.filter((m) => m.imdbID !== id));
    };

    const value = useMemo(
        () => ({ favorites, addFavorite, removeFavorite }),
        [favorites]
    );

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export const useFavorites = () => {
    const ctx = useContext(FavoritesContext);
    if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
    return ctx;
};
