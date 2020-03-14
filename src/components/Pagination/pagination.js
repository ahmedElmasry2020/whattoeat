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
                    <a
                        onClick={() => paginate(number)}
                        href="!#"
                        className={styles.page_link}
                    >
                        <li key={number} className={styles.page_number}>{number}</li>
                    </a>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
