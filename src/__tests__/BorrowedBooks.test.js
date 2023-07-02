import { screen, render, fireEvent } from '@testing-library/react';
import BorrowedBooks from '../components/BorrowedBooks/BorrowedBooks';
import HomePage from '../pages/HomePage/HomePage';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../redux/reducers/booksReducer';

describe('BorrowedBooks', () => {
    it('When user clicks on borrow button, book is added to borrowedList', () => {
        const store = configureStore({
            reducer: booksReducer
        });

        render(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );

        const borrowButtons = screen.getAllByTestId('borrow-button');
        expect(borrowButtons).toHaveLength(8);
        fireEvent(
            borrowButtons[0],
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )
        const cartButtonDiv = screen.getByTestId('cart-button-div');
        fireEvent(
            cartButtonDiv,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )
        const borrowedBookDivs = screen.getAllByTestId('borrowed-book-div');
        expect(borrowedBookDivs).toHaveLength(1);
    });

    it('When user clicks on borrow button, book is removed from the library if no copies are remaining', () => {
        const store = configureStore({
            reducer: booksReducer
        });

        render(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );

        const borrowButtons = screen.getAllByTestId('borrow-button');
        expect(borrowButtons).toHaveLength(8);
        fireEvent(
            borrowButtons[1],
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )
        
        const bookWrapperDivs = screen.getAllByTestId('book-wrapper-div');
        expect(bookWrapperDivs).toHaveLength(7);
    });

    it('When user clicks on borrow button, book is not removed from the library if at least 1 copy is remaining', () => {
        const store = configureStore({
            reducer: booksReducer
        });

        render(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );

        const borrowButtons = screen.getAllByTestId('borrow-button');
        expect(borrowButtons).toHaveLength(8);
        fireEvent(
            borrowButtons[0],
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )
        
        const bookWrapperDivs = screen.getAllByTestId('book-wrapper-div');
        expect(bookWrapperDivs).toHaveLength(8);
    });

    it('If user has borrowed 2 books and tries to borrow another book, it should show alert message', () => {
        const store = configureStore({
            reducer: booksReducer
        });

        render(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );

        const borrowButtons = screen.getAllByTestId('borrow-button');
        expect(borrowButtons).toHaveLength(8);
        fireEvent(
            borrowButtons[0],
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )

        fireEvent(
            borrowButtons[3],
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )

        let toastMessageDiv = screen.queryByTestId('toast-message-div');
        expect(toastMessageDiv).toBeNull();

        fireEvent(
            borrowButtons[4],
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )
    
        toastMessageDiv = screen.queryByTestId('toast-message-div');
        expect(toastMessageDiv).not.toBeNull();

        const cartButtonDiv = screen.getByTestId('cart-button-div');
        
        fireEvent(
            cartButtonDiv,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )
        const borrowedBookDivs = screen.getAllByTestId('borrowed-book-div');
        expect(borrowedBookDivs).toHaveLength(2);
    });

    it('When user borrows 2 books from library and returns 1 book, only 1 book should remain in borrowed list', () => {
        const store = configureStore({
            reducer: booksReducer
        });

        render(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );

        const borrowButtons = screen.getAllByTestId('borrow-button');
        expect(borrowButtons).toHaveLength(8);

        fireEvent(
            borrowButtons[0],
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )

        fireEvent(
            borrowButtons[1],
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )

        const cartButtonDiv = screen.getByTestId('cart-button-div');
        
        fireEvent(
            cartButtonDiv,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )
        let returnButtons = screen.getAllByTestId('return-button');
        expect(returnButtons).toHaveLength(2);

        fireEvent(
            returnButtons[0],
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )

        returnButtons = screen.getAllByTestId('return-button');
        expect(returnButtons).toHaveLength(1);
    });

    it('When user borrows 2 books from library and returns 1 book which is not present in library, the book is showing up in library', () => {
        const store = configureStore({
            reducer: booksReducer
        });

        render(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );

        let borrowButtons = screen.getAllByTestId('borrow-button');
        expect(borrowButtons).toHaveLength(8);

        fireEvent(
            borrowButtons[0],
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )

        fireEvent(
            borrowButtons[1],
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )

        const cartButtonDiv = screen.getByTestId('cart-button-div');
        borrowButtons = screen.getAllByTestId('borrow-button');
        expect(borrowButtons).toHaveLength(7);

        fireEvent(
            cartButtonDiv,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )
        let returnButtons = screen.getAllByTestId('return-button');
        expect(returnButtons).toHaveLength(2);

        fireEvent(
            returnButtons[1],
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )

        borrowButtons = screen.getAllByTestId('borrow-button');
        expect(borrowButtons).toHaveLength(8);
    });
})
