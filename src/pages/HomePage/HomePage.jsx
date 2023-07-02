import React from 'react';
import Book from '../../components/Book/Book';
import styles from './HomePage.module.css';
import { useSelector } from 'react-redux';
import { isEmpty, map } from 'lodash';

const HomePage = () => {
    const { allBooks } = useSelector(state => state);
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.booksWrapper}>
                    {!isEmpty(allBooks) ?
                        map(allBooks, book => (
                            <Book key={book.id} {...book} />
                        )) :
                        <div className={styles.emptyBooksWrapper}>No matching books found</div>}
                </div>

            </div>
        </>
    )
}

export default HomePage;