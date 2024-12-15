import { QueryClient } from "@tanstack/react-query";

export const formatDate = (date = "") => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const storeItem = (key, item) => {
  localStorage.setItem(key, item);
};

export const getItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const clearStore = (key) => {
  localStorage.removeItem(key);
};
export const queryClient = new QueryClient();
