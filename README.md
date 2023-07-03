# Library Management App

## Overview

Welcome to the Library Management App repository! In this README, I will cover important architectural decisions, thoughts, and assumptions made during the development process.

## Architecture

- **HomePage**: This component contains the header and wrapper for showing books list. The header consists of app name, searchbox for filtering books, and a cart button
- **Book**: This component displays all info about a book consistsing of title, author, genre and description with borrow action button
- **BorrowedBook**: This component shows list of borrowed books by user in a popup
- **Toast**: This component is for displaying toast messages for informing user

### Technologies Used

- **Frontend**: The user interface is built with **ReactJS**. 
## Key Architectural Decisions

## Assumptions

1. **User can filter books**: Searchbox is added in the header. User can enter either the title of the book or author or genre of the book and all matching books will be filtered and displayed in the library
2. **Toast message**: Toast message is added for informing user when he/she tries to borrow a book after reaching borrow limit of max 2 books
3. **Only 1 user is present**: I am assuming that only 1 user is present. If needed register and login page can be added along with authReducer for user management.

