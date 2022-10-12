import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const showSuccesAlert = ({ msg, id, autoClose }) => {
  toast.success(
    () => (
      <strong style={{ display: "block", textAlign: "center" }}>{msg}</strong>
    ),
    {
      autoClose,
      toastId: id,
    }
  );
};

export const showErrorAlert = ({ msg, id }) => {
  toast.error(
    () => (
      <strong style={{ display: "block", textAlign: "center" }}>{msg}</strong>
    ),
    {
      autoClose: false,
      toastId: id,
    }
  );
};

export const showInfoAlert = ({ msg, id, autoClose }) => {
  toast.info(
    () => (
      <strong style={{ display: "block", textAlign: "center" }}>{msg}</strong>
    ),
    {
      autoClose,
      toastId: id,
    }
  );
};

export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const initialize = (key) => {
    console.log("INIT");
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(initialize(key));
  useEffect(() => setStoredValue(initialize(key)), []);
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.

  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

export function isClient() {
  return typeof window !== "undefined";
}
