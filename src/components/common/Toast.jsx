/**
 * Toast.jsx
 * - Accessible, animated toast notification.
 * - Supports variants: success, error, warning, info.
 * - Auto-dismiss, stacked top-right.
 * - Usage: useToast().show("Message", "success")
 */

import React, { createContext, useContext, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const VARIANTS = {
  success: "bg-green-500 text-white",
  error: "bg-danger text-white",
  warning: "bg-yellow-400 text-neutral",
  info: "bg-primary text-white",
};

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((msg, variant = "info", timeout = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, variant }]);
    setTimeout(() => setToasts((prev) => prev.filter(t => t.id !== id)), timeout);
  }, []);

  const hide = (id) => setToasts((prev) => prev.filter(t => t.id !== id));

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 items-end">
        <AnimatePresence>
          {toasts.map(({ id, msg, variant }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`rounded-2xl shadow-md px-4 py-2 ${VARIANTS[variant]} transition-all`}
              role="status"
              aria-live="polite"
            >
              {msg}
              <button
                className="ml-2 text-white/70"
                onClick={() => hide(id)}
                aria-label="Close toast"
              >×</button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

ToastProvider.propTypes = {
  children: PropTypes.node,
};