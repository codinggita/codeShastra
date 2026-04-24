import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Card Component
 * A flexible container for presenting content, matching the dashed border or solid elevated design.
 */
export const Card = ({
  children,
  variant = 'elevated',
  padding = 'md',
  className,
  ...props
}) => {
  const variantStyles = {
    elevated: 'bg-white shadow-md border border-gray-100',
    outlined: 'bg-white border border-gray-200',
    dashed: 'bg-transparent border-2 border-dashed border-gray-300',
    flat: 'bg-gray-50 border-none',
  };

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  return (
    <div
      className={clsx(
        'rounded-xl overflow-hidden transition-all duration-200',
        variantStyles[variant],
        paddingStyles[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['elevated', 'outlined', 'dashed', 'flat']),
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

export default Card;
