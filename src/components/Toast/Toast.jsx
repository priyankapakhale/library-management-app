import React from 'react';
import styles from './Toast.module.css';

const Toast = ({ show, message }) => {
    return show ? (
        <div className={styles.wrapper}>{message}</div>
    ) : null;
}

export default Toast;