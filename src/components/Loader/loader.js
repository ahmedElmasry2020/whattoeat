import React from 'react';
import styles from './loader.module.scss';

const Loader = () => {
    return (
        <div className={styles.loader}>
            <p>Loading...</p>
            <div></div>
            <div></div>
        </div>
    )
}

export default Loader;
