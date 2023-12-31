import React, { useMemo, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from './BorrowedBooks.module.css';
import { filter, get, includes, isEmpty, map } from 'lodash';
import { returnBook } from '../../redux/reducers/booksReducer';

const BorrowedBooks = ({ setShowBorrowedBooks }) => {
    const allBooks = useSelector(state => get(state, 'allBooks', []));
    const borrowedBooks = useSelector(state => get(state, 'borrowedBooks', []));

    const dispatch = useDispatch();
    const ref = useRef(null);

    const borrowedBooksData = useMemo(() => {
        return filter(allBooks, book => includes(borrowedBooks, book.id))
    }, [allBooks, borrowedBooks])

    const handleReturn = (id) => {
        dispatch(returnBook({ id }));
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setShowBorrowedBooks(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);

    return (
        <div className={styles.wrapper} ref={ref}>
            {!isEmpty(borrowedBooks) ?
                map(borrowedBooksData, book => (
                    <div data-testid="borrowed-book-div" key={book.id} className={styles.bookWrapper}>
                        <img src={book.cover} alt={book.name} className={styles.cover} />
                        <div className={styles.info}>
                            <div>{book.name}</div>
                            <button data-testid="return-button" className={styles.button} onClick={() => handleReturn(book.id)}>Return</button>
                        </div>
                    </div>
                )) :
                <div className={styles.emptyMessage}>No books borrowed yet</div>}
        </div>
    )
}

export default BorrowedBooks;