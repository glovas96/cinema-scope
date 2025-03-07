'use client';
import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const FavoritesContext = createContext();

// Small helper to avoid duplicates by imdbID
const byId = (id) => (m) => m.imdbID === id;

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    // Load on mount
    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem('favorites')) || [];
            setFavorites(Array.isArray(stored) ? stored : []);
        } catch {
            setFavorites([]); // guard against corrupted JSON
        }
    }, []);

    // Prevent duplicates
    const addFavorite = (movie) => {
        if (!movie?.imdbID) return; // guard: only valid items
        setFavorites((prev) => {
            if (prev.some(byId(movie.imdbID))) return prev;
            const updated = [...prev, movie];
            localStorage.setItem('favorites', JSON.stringify(updated));
            return updated;
        });
    };

    // Remove by id
    const removeFavorite = (id) => {
        setFavorites((prev) => {
            const updated = prev.filter((m) => m.imdbID !== id);
            localStorage.setItem('favorites', JSON.stringify(updated));
            return updated;
        });
    };

    // Memoize value to avoid needless re-renders
    const value = useMemo(() => ({ favorites, addFavorite, removeFavorite }), [favorites]);

    return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export const useFavorites = () => {
    const ctx = useContext(FavoritesContext);
    // Optional dev guard
    if (!ctx) {
        throw new Error('useFavorites must be used within FavoritesProvider');
    }
    return ctx;
};
