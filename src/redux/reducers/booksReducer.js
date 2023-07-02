import { createSlice } from '@reduxjs/toolkit'
import { get, filter, map } from 'lodash';
import booksData from '../../data/books.json';

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        allBooks: booksData,
        borrowedBooks: []
    },
    reducers: {
        borrowBook(state, action) {
            const { id } = action.payload;
            const mappedBooks = map(get(state, 'allBooks', []), book => {
                if (get(book, 'id', null) === id) {
                    return {
                        ...book,
                        quantity: get(book, 'quantity', 0) - 1,
                    }
                } else return book;
            })
            const borrowedBooks = [...get(state, 'borrowedBooks', []), id];
            return {
                allBooks: mappedBooks,
                borrowedBooks
            }
        },
        returnBook(state, action) {
            const { id } = action.payload;
            const mappedBooks = map(get(state, 'allBooks', []), book => {
                if (get(book, 'id', null) === id) {
                    return {
                        ...book,
                        quantity: get(book, 'quantity', 0) + 1,
                    }
                } else return book;
            })
            const borrowedBooks = filter(get(state, 'borrowedBooks', []), bookId => bookId !== id);
            return {
                allBooks: mappedBooks,
                borrowedBooks
            }
        }
    }
})

const { actions, reducer } = booksSlice
export const { returnBook, borrowBook } = actions

export default reducer