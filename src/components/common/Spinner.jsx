/**
 * Spinner.jsx
 * - Accessible, animated loading spinner.
 * - Supports sizes: sm, md, lg.
 * - Usage: <Spinner size="md" />
 */

import React from "react";
import PropTypes from "prop-types";

const SIZES = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const Spinner = ({ size = "md", className = "" }) => (
  <span
    className={`inline-block animate-spin rounded-full border-2 border-primary border-t-transparent ${SIZES[size]} ${className}`}
    aria-label="Loading"
    role="status"
  />
);

Spinner.propTypes = {
  size: PropTypes.oneOf(Object.keys(SIZES)),
  className: PropTypes.string,
};

export default Spinner;