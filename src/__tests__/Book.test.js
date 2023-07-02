import { fireEvent, render, screen,  } from '@testing-library/react';
import Book from '../components/Book/Book';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../redux/reducers/booksReducer';

describe('Book', () => {
    it('Book shows borrow button when it is available and not borrowed by current user', () => {
        const store = configureStore({
            reducer: booksReducer
        });

        const bookData = {
            "id": 1,
            "name": "Hitchhiker's guide to the galaxy",
            "author": "Douglas Adams",
            "cover": "https://m.media-amazon.com/images/I/81AAMH2S0LL._AC_UF1000,1000_QL80_.jpg",
            "quantity": 2,
            "genre": "Science fiction",
            "description": "The Hitchhiker's Guide to the Galaxy is the first book in the Hitchhiker's Guide to the Galaxy comedy science fiction \"trilogy of five books\" by Douglas Adams, with a sixth book written by Eoin Colfer. The novel is an adaptation of the first four parts of Adams's radio series of the same name, centering on the adventures of the only man to survive the destruction of Earth; while roaming outer space, he comes to learn the truth behind Earth's existence."
        }
        render(
            <Provider store={store}>
                <Book {...bookData} />
            </Provider>
        );
        const button = screen.getByTestId('borrow-button');
        expect(button.innerHTML).toBe('Borrow');
    });

    it('Book shows disabled borrow button when it is not available', () => {
        const store = configureStore({
            reducer: booksReducer
        });

        const bookData = {
            "id": 1,
            "name": "Hitchhiker's guide to the galaxy",
            "author": "Douglas Adams",
            "cover": "https://m.media-amazon.com/images/I/81AAMH2S0LL._AC_UF1000,1000_QL80_.jpg",
            "quantity": 0,
            "genre": "Science fiction",
            "description": "The Hitchhiker's Guide to the Galaxy is the first book in the Hitchhiker's Guide to the Galaxy comedy science fiction \"trilogy of five books\" by Douglas Adams, with a sixth book written by Eoin Colfer. The novel is an adaptation of the first four parts of Adams's radio series of the same name, centering on the adventures of the only man to survive the destruction of Earth; while roaming outer space, he comes to learn the truth behind Earth's existence."
        }
        render(
            <Provider store={store}>
                <Book {...bookData} />
            </Provider>
        );
        const button = screen.getByTestId('borrow-button');
        expect(button).toBeDisabled();
    });

    it('Book shows return button when it is borrowed but some copies are available in library', () => {
        const store = configureStore({
            reducer: booksReducer
        });

        const bookData = {
            "id": 1,
            "name": "Hitchhiker's guide to the galaxy",
            "author": "Douglas Adams",
            "cover": "https://m.media-amazon.com/images/I/81AAMH2S0LL._AC_UF1000,1000_QL80_.jpg",
            "quantity": 1,
            "genre": "Science fiction",
            "description": "The Hitchhiker's Guide to the Galaxy is the first book in the Hitchhiker's Guide to the Galaxy comedy science fiction \"trilogy of five books\" by Douglas Adams, with a sixth book written by Eoin Colfer. The novel is an adaptation of the first four parts of Adams's radio series of the same name, centering on the adventures of the only man to survive the destruction of Earth; while roaming outer space, he comes to learn the truth behind Earth's existence."
        }
        render(
            <Provider store={store}>
                <Book {...bookData} />
            </Provider>
        );
        let button = screen.getByTestId('borrow-button');
        expect(button.innerHTML).toBe('Borrow');

        fireEvent(
            button,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            }),
        )
        button = screen.getByTestId('borrow-button');
        expect(button.innerHTML).toBe('Return')
    });
})
