import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../pages/HomePage/HomePage';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import emptyBooksReducer from '../__mocks__/emptyBooksReducer';
import booksReducer from '../__mocks__/booksReducer';

describe('HomePage', () => {
    it('HomePage should display list of books when books are present in the library', () => {
        const store = configureStore({
            reducer: booksReducer
        });

        render(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );
        const bookWrapperDivs = screen.getAllByTestId('book-wrapper-div');
        expect(bookWrapperDivs).toHaveLength(8);
    });

    it('HomePage should display empty list when no books are present in the library', () => {
        const store = configureStore({
            reducer: emptyBooksReducer
        });

        render(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );
        const bookWrapperDivs = screen.queryAllByTestId('book-wrapper-div');
        const emptyMessageDiv = screen.getByTestId('empty-message-div');
        expect(bookWrapperDivs).toHaveLength(0);
        expect(emptyMessageDiv).toBeVisible();
    });

    it('When user types something in searchbox, library should show books matching the search query', () => {
        const store = configureStore({
            reducer: booksReducer
        });

        render(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );

        const searchboxInput = screen.queryByTestId('searchbox-input');
        fireEvent.change(searchboxInput, { target: { value: 'mystery' } });

        const bookWrapperDivs = screen.queryAllByTestId('book-wrapper-div');
        expect(bookWrapperDivs).toHaveLength(2);
    })

    it('When user types something in searchbox, library should show books matching the search query', () => {
        const store = configureStore({
            reducer: booksReducer
        });

        render(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );

        const searchboxInput = screen.queryByTestId('searchbox-input');
        fireEvent.change(searchboxInput, { target: { value: 'mystery' } });

        const bookWrapperDivs = screen.queryAllByTestId('book-wrapper-div');
        expect(bookWrapperDivs).toHaveLength(2);
    })

    it('When user types something in searchbox which does not match any books, library should show empty library message', () => {
        const store = configureStore({
            reducer: booksReducer
        });

        render(
            <Provider store={store}>
                <HomePage />
            </Provider>
        );

        const searchboxInput = screen.queryByTestId('searchbox-input');
        fireEvent.change(searchboxInput, { target: { value: 'thriller' } });

        const bookWrapperDivs = screen.queryAllByTestId('book-wrapper-div');
        expect(bookWrapperDivs).toHaveLength(0);

        const emptyMessageDiv = screen.queryByTestId('empty-message-div');
        expect(emptyMessageDiv).toBeVisible();
    })
})
