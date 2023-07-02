import { createSlice } from '@reduxjs/toolkit'

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        allBooks: [],
        borrowedBooks: []
    },
    reducers: {}
})

const { reducer } = booksSlice

export default reducer