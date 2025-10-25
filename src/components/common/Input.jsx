/**
 * Input.jsx
 * - Responsive, accessible input component.
 * - Supports label, error, leading/trailing icons.
 */

import React from "react";
import PropTypes from "prop-types";

const Input = ({
  label,
  error,
  icon,
  trailingIcon,
  className = "",
  ...props
}) => (
  <div className={`mb-4 w-full ${className}`}>
    {label && (
      <label className="block mb-1 text-neutral font-medium" htmlFor={props.id}>
        {label}
      </label>
    )}
    <div className="relative">
      {icon && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted pointer-events-none">
          {icon}
        </span>
      )}
      <input
        className={`w-full border rounded-2xl px-3 py-2 focus:ring-2 focus:ring-primary transition-all duration-200 shadow-sm
          ${icon ? "pl-10" : ""} ${trailingIcon ? "pr-10" : ""} ${error ? "border-danger" : ""}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${props.id}-error` : undefined}
        {...props}
      />
      {trailingIcon && (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted pointer-events-none">
          {trailingIcon}
        </span>
      )}
    </div>
    {error && (
      <div className="text-danger text-sm mt-1" id={`${props.id}-error`} role="alert">
        {error}
      </div>
    )}
  </div>
);

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.node,
  trailingIcon: PropTypes.node,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default Input;