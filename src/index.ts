import express, { Request, Response } from 'express';
import { promises as fs } from 'fs';

interface Author {
  name: string;
  otherBooks: string[];
}

interface Book {
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  author: Author;
}

interface BookItem {
  book: Book;
}

const app = express();
const PORT = process.env.PORT || 3000;
let bookItems: BookItem[] = [];


// Function to fetch the books data from the JSON file
async function fetchBooksData(): Promise<void> {
  try {
    const data = await fs.readFile('./data.json', 'utf8');
    const lib = JSON.parse(data)
    bookItems = lib.library;
    console.log('Books data loaded.');
    } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Endpoint to get all the books
app.get('/books', (req: Request, res: Response) => {
  const books = bookItems.map(item => item.book);
  res.json(books);
});

// Endpoint to get books by author
app.get('/books/author', (req: Request, res: Response) => {
    const { search } = req.query;
  
    if (!search || typeof search !== 'string') {
      return res.status(400).json({ error: 'A valid author search parameter is required.' });
    }
  
    const filteredBooks = bookItems
      .filter(item => item.book.author.name.toLowerCase() === search.toLowerCase())
      .map(item => item.book);
  
    if (filteredBooks.length > 0) {
      res.json(filteredBooks);
    } else {
      res.status(404).json({ error: 'No books found for the specified author.' });
    }
});

// Endpoint to get a book by ISBN
app.get('/books/:isbn', (req: Request, res: Response) => {
  const { isbn } = req.params;
  const found = bookItems.find(item => item.book.ISBN === isbn);
  
  if (found) {
    res.json(found.book);
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
});

  

// Start the server and load the books data
app.listen(PORT, async () => {
  console.log(`Server Running on http://localhost:${PORT}`);
  await fetchBooksData();
});
