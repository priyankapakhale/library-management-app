import { createSlice } from '@reduxjs/toolkit'
import booksData from '../data/books.json';

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        allBooks: booksData,
        borrowedBooks: []
    },
    reducers: {}
})

const { reducer } = booksSlice

export default reducer