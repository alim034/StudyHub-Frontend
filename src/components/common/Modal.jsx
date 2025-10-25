/**
 * Modal.jsx
 * - Accessible, animated modal dialog.
 * - Supports sizes: sm, md, lg.
 * - Closes on ESC or click outside.
 * - Usage: <Modal open={true} onClose={fn} size="md">Content</Modal>
 */

import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

const SIZES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

const Modal = ({
  open,
  onClose,
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const ref = useRef();

  // Focus trap and ESC close
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    ref.current?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
          onClick={onClose}
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className={`bg-card rounded-2xl shadow-lg p-6 ${SIZES[size]} w-full relative ${className}`}
            onClick={e => e.stopPropagation()}
            ref={ref}
            tabIndex={0}
            {...props}
          >
            <button
              className="absolute top-2 right-2 text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.oneOf(Object.keys(SIZES)),
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Modal;