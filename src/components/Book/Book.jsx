import { get, includes, size } from 'lodash';
import React, { useState, useEffect } from 'react';
import styles from './Book.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { borrowBook, returnBook } from '../../redux/reducers/booksReducer';
import Toast from '../Toast/Toast';

const Book = ({ id, name, author, cover, quantity, genre, description }) => {
    const borrowedBooks = useSelector(state => get(state, 'borrowedBooks', []));
    const dispatch = useDispatch();
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (showMessage) {
            setTimeout(() => setShowMessage(false), 3000);
        }
    }, [showMessage])

    const isAvailable = quantity > 0;
    const isBorrowed = includes(borrowedBooks, id);
    const isDisabled = !isBorrowed && !isAvailable;
    const canBorrow = size(borrowedBooks) < 2;

    const handleBorrow = () => {
        if (canBorrow) {
            dispatch(borrowBook({ id }));
        } else {
            setShowMessage(true);
        }
    }

    const handleReturn = () => {
        dispatch(returnBook({ id }));
    }

    return (
        <div data-testid='book-wrapper-div' className={styles.wrapper}>
            <img className={styles.cover} src={cover} alt={name} />
            <Toast show={showMessage} message={'You have already borrowed 2 books - borrow limit reached!'} />
            <div className={styles.info}>
                <div className={styles.title}>{name}</div>
                <div className={styles.author}>By {author}</div>
                <div className={styles.genre}>{genre}</div>
                <div className={styles.description}>{description}</div>
                <button data-testid='borrow-button' className={`${styles.button} ${isDisabled ? styles.disabledButton : ''} ${isBorrowed ? styles.greenButton : ''}`} disabled={isDisabled} onClick={isBorrowed ? handleReturn : handleBorrow}>
                    {isBorrowed ? 'Return' : 'Borrow'}
                </button>
            </div>
        </div>
    )
}

export default Book;