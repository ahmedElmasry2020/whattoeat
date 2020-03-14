import React from 'react';
import styles from './empty.module.scss';
import notFound from '../../assets/not-found.png';

const Empty = ({ingredient}) => {
    return (
        <div className={styles.empty}>
            <h2>No Results for <span className="bold">{ingredient}</span></h2>
            <p>Did you write your ingredients correctly?</p>
            <img src={notFound} alt="Recipes Not Found"/>
        </div>
    )
}

export default Empty;

