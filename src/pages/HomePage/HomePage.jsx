import React, { useState, useMemo } from 'react';
import Book from '../../components/Book/Book';
import styles from './HomePage.module.css';
import { useSelector } from 'react-redux';
import { isEmpty, map, filter, includes, toLower, size } from 'lodash';
import cartIcon from '../../assets/icons/cart.svg';
import BorrowedBooks from '../../components/BorrowedBooks/BorrowedBooks';

const HomePage = () => {
    const { allBooks, borrowedBooks } = useSelector(state => state);
    const [searchText, setSearchText] = useState('');
    const [showBorrowedBooks, setShowBorrowedBooks] = useState(false);

    const filteredBooks = useMemo(() => {
        const query = toLower(searchText);
        return filter(allBooks, book => {
            const { name, author, genre } = book;
            return includes(toLower(name), query) || includes(toLower(author), query) || includes(toLower(genre), query);
        })
    }, [allBooks, searchText])

    const handleChange = (e) => {
        setSearchText(e.target.value);
    }

    return (
        <>
            <div className={styles.header}>
                <div className={styles.title}>Rent a book</div>
                <div className={styles.rightContainer}>
                    <div className={styles.searchbox}>
                        <input type="text" placeholder='Type title, author, genre' onChange={handleChange} value={searchText} />
                    </div>
                    <div className={styles.cartWrapper} onClick={() => setShowBorrowedBooks(true)}>
                        {size(borrowedBooks) > 0 && <div className={styles.count}>{size(borrowedBooks)}</div>}
                        <img className={styles.cartIcon} src={cartIcon} alt="cart" />
                        {showBorrowedBooks && <BorrowedBooks setShowBorrowedBooks={setShowBorrowedBooks} />}
                    </div>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.booksWrapper}>
                    {!isEmpty(filteredBooks) ?
                        map(filteredBooks, book => (
                            <Book key={book.id} {...book} />
                        )) :
                        <div className={styles.emptyBooksWrapper}>No matching books found</div>}
                </div>

            </div>
        </>
    )
}

export default HomePage;