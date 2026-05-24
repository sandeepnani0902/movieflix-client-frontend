import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState(null);
  const [webSeries, setWebSeries] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [favorites, setFavorites] = useState(null);

  const [loadingMovies, setLoadingMovies] = useState(false);
  const [loadingWebSeries, setLoadingWebSeries] = useState(false);
  const [loadingLanguages, setLoadingLanguages] = useState(false);
  const [loadingSubscription, setLoadingSubscription] = useState(false);
  const [loadingFavorites, setLoadingFavorites] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:2025";

  // Check if token exists before making API requests
  const hasToken = () => !!localStorage.getItem("token");

  // 1. Fetch Movies with Cache
  const fetchMovies = async (force = false) => {
    if (movies && !force) return movies;
    try {
      setLoadingMovies(true);
      const response = await fetch(`${BASE_URL}/movieflix/movies`);
      if (!response.ok) throw new Error("Failed to fetch movies");
      const data = await response.json();
      setMovies(data.data || []);
      return data.data || [];
    } catch (err) {
      console.error("Error fetching movies:", err);
      throw err;
    } finally {
      setLoadingMovies(false);
    }
  };

  // 2. Fetch Web Series with Cache
  const fetchWebSeries = async (force = false) => {
    if (webSeries && !force) return webSeries;
    try {
      setLoadingWebSeries(true);
      const response = await fetch(`${BASE_URL}/movieflix/webseries`);
      if (!response.ok) throw new Error("Failed to fetch web series");
      const data = await response.json();
      setWebSeries(data.data || []);
      return data.data || [];
    } catch (err) {
      console.error("Error fetching web series:", err);
      throw err;
    } finally {
      setLoadingWebSeries(false);
    }
  };

  // 3. Fetch Languages with Cache
  const fetchLanguages = async (force = false) => {
    if (languages && !force) return languages;
    try {
      setLoadingLanguages(true);
      const response = await fetch(`${BASE_URL}/movieflix/languages`);
      if (!response.ok) throw new Error("Failed to fetch languages");
      const data = await response.json();
      setLanguages(data.data || []);
      return data.data || [];
    } catch (err) {
      console.error("Error fetching languages:", err);
      throw err;
    } finally {
      setLoadingLanguages(false);
    }
  };

  // 4. Fetch Subscription Status with Cache
  const fetchSubscriptionStatus = async (force = false) => {
    if (!hasToken()) return null;
    if (subscription && !force) return subscription;
    try {
      setLoadingSubscription(true);
      const response = await api.get("/subscription/status");
      setSubscription(response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching subscription status:", err);
      return null;
    } finally {
      setLoadingSubscription(false);
    }
  };

  // 5. Fetch Favorites with Cache
  const fetchFavorites = async (force = false) => {
    if (!hasToken()) return [];
    if (favorites && !force) return favorites;
    try {
      setLoadingFavorites(true);
      const response = await api.get("/favorites");
      setFavorites(response.data.favorites || []);
      return response.data.favorites || [];
    } catch (err) {
      console.error("Error fetching favorites:", err);
      return [];
    } finally {
      setLoadingFavorites(false);
    }
  };

  // Helper: Toggle Favorite in cache and API
  const toggleFavoriteItem = async (mediaItem, mediaType) => {
    if (!hasToken()) return;
    try {
      const response = await api.post("/favorites/toggle", {
        mediaId: mediaItem._id,
        mediaType,
        title: mediaItem.title,
        image: mediaItem.image,
        genre: mediaItem.genre,
        language: mediaItem.language,
      });

      const isAdded = response.data.favorited;

      if (favorites) {
        if (isAdded) {
          // Reconstruct favorite object
          const newFav = {
            _id: response.data.favorite?._id || Date.now().toString(),
            mediaId: mediaItem._id,
            mediaType,
            title: mediaItem.title,
            image: mediaItem.image,
            genre: mediaItem.genre,
            language: mediaItem.language,
          };
          setFavorites((prev) => [newFav, ...prev]);
        } else {
          setFavorites((prev) => prev.filter((fav) => fav.mediaId !== mediaItem._id));
        }
      } else {
        fetchFavorites(true);
      }
      return isAdded;
    } catch (err) {
      console.error("Error toggling favorite in context:", err);
      throw err;
    }
  };

  // Helper: Purchase subscription
  const subscribeUser = async (paymentId) => {
    try {
      const response = await api.post("/subscription", {
        planName: "PREMIUM",
        amount: 199,
        paymentId,
      });
      if (response.data.success) {
        setSubscription({
          subscribed: true,
          subscription: response.data.subscription,
        });
        return true;
      }
      return false;
    } catch (err) {
      console.error("Subscription payment context error:", err);
      throw err;
    }
  };

  // Reset Cache on logout
  const resetCache = () => {
    setMovies(null);
    setWebSeries(null);
    setLanguages(null);
    setSubscription(null);
    setFavorites(null);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        webSeries,
        languages,
        subscription,
        favorites,
        loadingMovies,
        loadingWebSeries,
        loadingLanguages,
        loadingSubscription,
        loadingFavorites,
        fetchMovies,
        fetchWebSeries,
        fetchLanguages,
        fetchSubscriptionStatus,
        fetchFavorites,
        toggleFavoriteItem,
        subscribeUser,
        resetCache,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
};
