/**
 * Avatar.jsx
 * - Circular user avatar image with fallback initials.
 * - Optional status badge (online/offline).
 */

import React from "react";
import PropTypes from "prop-types";

const getInitials = (name = "") =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const STATUS_COLORS = {
  online: "bg-green-500",
  offline: "bg-gray-400",
};

const Avatar = ({
  src,
  alt = "User avatar",
  initials,
  size = "md",
  status,
  className = "",
}) => {
  const SIZE_MAP = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-lg",
  };
  return (
    <span className={`relative inline-block ${SIZE_MAP[size]} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="rounded-full object-cover w-full h-full border-2 border-primary"
        />
      ) : (
        <span
          className="rounded-full bg-primary text-white flex items-center justify-center w-full h-full font-bold"
          aria-label={alt}
        >
          {initials || getInitials(alt)}
        </span>
      )}
      {status && (
        <span
          className={`absolute bottom-1 right-1 w-3 h-3 rounded-full border-2 border-card ${STATUS_COLORS[status]}`}
          aria-label={status}
        />
      )}
    </span>
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  initials: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  status: PropTypes.oneOf(["online", "offline"]),
  className: PropTypes.string,
};

export default Avatar;