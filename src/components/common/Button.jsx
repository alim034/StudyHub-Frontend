/**
 * Button.jsx
 * - Responsive, accessible button component.
 * - Supports variants: primary, secondary, outline, ghost, destructive.
 * - Supports sizes: sm, md, lg, fullWidth.
 * - Shows focus ring, hover/active states, and transitions.
 * - Usage: <Button variant="primary" size="md" fullWidth>Click me</Button>
 */

import React from "react";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

const VARIANTS = {
  primary: "bg-primary text-white hover:bg-blue-700",
  secondary: "bg-accent text-white hover:bg-teal-500",
  outline: "border border-primary text-primary bg-white hover:bg-blue-50",
  ghost: "bg-transparent text-primary hover:bg-blue-50",
  destructive: "bg-danger text-white hover:bg-red-700",
};
const SIZES = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) => (
  <button
    type="button"
    className={`rounded-2xl shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary font-semibold
      ${VARIANTS[variant]} ${SIZES[size]} ${fullWidth ? "w-full" : ""} ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
      ${className}`}
    aria-disabled={disabled || loading}
    disabled={disabled || loading}
    {...props}
  >
    {loading ? <Spinner size={size} /> : children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.keys(VARIANTS)),
  size: PropTypes.oneOf(Object.keys(SIZES)),
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;