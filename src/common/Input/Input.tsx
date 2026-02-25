import React from 'react';
import { InputProps } from '@/types';
import styles from './styles.module.scss';

export const Input: React.FC<InputProps> = ({
  placeholderText,
  onChange,
  labelText,
  value,
  id,
  name,
  type = 'text', 
  ...rest
}) => {
  const inputId = id || `input-${labelText.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={inputId} className={styles.label}>
        {labelText}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholderText}
        onChange={onChange}
        value={value}
        className={styles.input}
        {...rest} 
      />
    </div>
  );
};
