import LogoIcon from '@/assets/icons/LogoIcon';
import React from 'react';
import styles from './styles.module.scss';


export const Footer: React.FC = () => {
 
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <LogoIcon />
      </div>
    </footer>
  );
};
