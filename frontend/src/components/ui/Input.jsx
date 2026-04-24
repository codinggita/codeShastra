import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Using react-icons for visibility toggle

/**
 * Input Component
 * A robust, accessible input component with support for labels, error messages, and icons.
 */
export const Input = React.forwardRef(
  (
    {
      id,
      label,
      type = 'text',
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className={clsx('flex flex-col', fullWidth && 'w-full', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={clsx(
              'block rounded-md border transition-colors focus:outline-none sm:text-sm',
              fullWidth ? 'w-full' : '',
              error
                ? 'border-red-500 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:border-primary focus:ring-1 focus:ring-primary',
              leftIcon ? 'pl-10' : 'pl-3',
              (rightIcon || isPassword) ? 'pr-10' : 'pr-3',
              'py-2.5', // consistent height
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />

          {isPassword && !rightIcon && (
            <button
              type="button"
              className="absolute right-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </button>
          )}

          {rightIcon && !isPassword && (
            <div className="absolute right-3 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="mt-1 text-sm text-red-600" id={`${inputId}-error`}>
            {error}
          </p>
        )}

        {!error && helperText && (
          <p className="mt-1 text-sm text-gray-500" id={`${inputId}-helper`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  helperText: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

export default Input;
