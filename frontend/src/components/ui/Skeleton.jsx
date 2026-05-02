import React from 'react';
import { clsx } from 'clsx';

/**
 * Basic Skeleton loader component.
 * @param {string} className - Additional Tailwind classes for sizing and styling.
 * @param {string} variant - 'rectangular' | 'circular' | 'text'
 */
const Skeleton = ({ className, variant = 'rectangular' }) => {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200',
        {
          'rounded-xl': variant === 'rectangular',
          'rounded-full': variant === 'circular',
          'rounded-md': variant === 'text',
        },
        className
      )}
    />
  );
};

export default Skeleton;
