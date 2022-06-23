import React, {useState} from "react";
import styles from "./Pagination.module.css";


let Pagination = ({totalItemsCount, pageSize, onPageChanged, currentPage, portionSize}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let portionLeftPageNumber = (portionNumber - 1) * portionSize + 1;
    let portionRightPageNumber = portionNumber * portionSize;
    return (
        <div className={styles.pagination}>
            { portionNumber > 1 &&
             <button onClick={() => {setPortionNumber(portionNumber - 1)} }>Назад</button>}

            {pages
                .filter(p => p >= portionLeftPageNumber && p <= portionRightPageNumber)
                .map(p => {
                    return <span className={currentPage === p ? styles.selectedPage : 'standartPage'}
                                 key={p}
                                 onClick={(e) => onPageChanged(p)}> {p}
                    </span>
                })
            }

            { portionCount > portionNumber &&
            <button onClick={() => {setPortionNumber(portionNumber + 1)} }>Вперёд</button>}

        </div>
    )
}

export default Pagination;