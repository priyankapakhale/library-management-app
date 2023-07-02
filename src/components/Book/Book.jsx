import { includes, size } from 'lodash';
import React from 'react';
import styles from './Book.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { borrowBook, returnBook } from '../../redux/reducers/booksReducer';

const Book = ({ id, name, author, cover, quantity, genre, description }) => {
    const { borrowedBooks } = useSelector(state => state);
    const dispatch = useDispatch();

    const isAvailable = quantity > 0;
    const isBorrowed = includes(borrowedBooks, id);
    const isDisabled = !isBorrowed && !isAvailable;
    const canBorrow = size(borrowedBooks) < 2;

    const handleBorrow = () => {
        if (canBorrow) {
            dispatch(borrowBook({ id }));
        }
    }

    const handleReturn = () => {
        dispatch(returnBook({ id }));
    }

    return (
        <div className={styles.wrapper}>
            <img className={styles.cover} src={cover} alt={name} />
            <div className={styles.info}>
                <div className={styles.title}>{name}</div>
                <div className={styles.author}>By {author}</div>
                <div className={styles.genre}>{genre}</div>
                <div className={styles.description}>{description}</div>
                <button className={`${styles.button} ${isDisabled ? styles.disabledButton : ''} ${isBorrowed ? styles.greenButton : ''}`} disabled={isDisabled} onClick={isBorrowed ? handleReturn : handleBorrow}>
                    {isBorrowed ? 'Return' : 'Borrow'}
                </button>
            </div>
        </div>
    )
}

export default Book;