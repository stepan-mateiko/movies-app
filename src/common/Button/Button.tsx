import React from 'react';
import { ButtonProps } from '@/types';
import styles from './styles.module.scss';

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  fullWidth = false,
  type = 'button', 
  className,
  ...rest
}) => {
  const buttonClass = [
    styles.button,
    styles[variant], 
    fullWidth ? styles.fullWidth : '',
    className || '',
  ].join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClass}
      {...rest}
    >
      {children}
    </button>
  );
};
