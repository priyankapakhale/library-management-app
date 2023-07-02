import React, { useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import styles from './BorrowedBooks.module.css';
import { filter, includes, isEmpty, map } from 'lodash';
import { returnBook } from '../../redux/reducers/booksReducer';

const BorrowedBooks = ({ setShowBorrowedBooks }) => {
    const { allBooks, borrowedBooks } = useSelector(state => state);
    const dispatch = useDispatch();

    const borrowedBooksData = useMemo(() => {
        return filter(allBooks, book => includes(borrowedBooks, book.id))
    }, [allBooks, borrowedBooks])

    const handleReturn = (id) => {
        dispatch(returnBook({ id }));
    }

    return (
        <div className={styles.wrapper}>
            {!isEmpty(borrowedBooks) ?
                map(borrowedBooksData, book => (
                    <div key={book.id} className={styles.bookWrapper}>
                        <img src={book.cover} alt={book.name} className={styles.cover} />
                        <div className={styles.info}>
                            <div>{book.name}</div>
                            <button className={styles.button} onClick={() => handleReturn(book.id)}>Return</button>
                        </div>
                    </div>
                )) :
                <div className={styles.emptyMessage}>No books borrowed yet</div>}
        </div>
    )
}

export default BorrowedBooks;