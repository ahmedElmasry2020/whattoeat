import React from "react";
import styles from "./pagination.module.scss";

const Pagination = ({ recipesPerPage, totalRecipes, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.pagination}>
            <ul>
                {pageNumbers.map(number => (
                    <button
                        onClick={() => paginate(number)}
                        className={styles.page_link}
                        key={number}
                    >
                        <li key={number} className={styles.page_number}>{number}</li>
                    </button>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
