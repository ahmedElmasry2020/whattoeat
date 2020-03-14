import React from "react";
import styles from "./recipe.module.scss";

const Recipe = ({ title, img, calories, url, diet }) => {
    return (
        <div className={styles.recipe}>
            <a href={url} target="_blank" rel="noopener noreferrer">
                <div className={styles.image}>
                    <img src={img} alt={title} />
                </div>
                <div className={styles.info}>
                    <div className={styles.content}>
                        <h2 className={styles.title}>{title.split(' ').splice(0, 3).join(' ')}</h2>
                        <h4 className={styles.diet_type}>{diet} Diet</h4>
                        <h4 className={styles.calories}>{calories.toFixed(1)} Calories</h4>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default Recipe;
