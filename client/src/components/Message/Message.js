import React from 'react';

import styles from './Message.module.scss'

export const Message = ({ username, message }) => {
    return (
        <div className={styles.container}>
            <h4 className={styles.title}>{username}</h4>
            <span className={styles.message}>{message}</span>
        </div>
    )
}