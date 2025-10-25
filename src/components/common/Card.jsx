/**
 * Card.jsx
 * - Responsive, accessible card component.
 * - Supports header, footer, hoverable, flexible children.
 */

import React from "react";
import PropTypes from "prop-types";

const Card = ({
  header,
  footer,
  hoverable = true,
  className = "",
  children,
  ...props
}) => (
  <section
    className={`bg-card rounded-2xl shadow-md p-6 mb-4 transition-all duration-200
      ${hoverable ? "hover:shadow-lg" : ""} ${className}`}
    tabIndex={0}
    {...props}
  >
    {header && <div className="mb-2 font-bold text-lg">{header}</div>}
    <div>{children}</div>
    {footer && <div className="mt-4">{footer}</div>}
  </section>
);

Card.propTypes = {
  header: PropTypes.node,
  footer: PropTypes.node,
  hoverable: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Card;