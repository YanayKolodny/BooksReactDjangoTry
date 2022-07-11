import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';


function App() {
  const SERVER = "http://127.0.0.1:8000/books"
  const [books, setbooks] = useState([])
  const [title, setTitle] = useState("")
  const [auothor, setAuothor] = useState("")
  const [publishYear, setPublishYear] = useState(0)

  useEffect(() => {
    showBooks()
  }, [])

  const showBooks = () => {
    axios.get(SERVER).then(response => setbooks(response.data));
  }

  console.log(books)

  const addBook = () => {
    const book = {
      "title": title,
      "auothor": auothor,
      "publishYear": publishYear
    };
    axios.post(SERVER, book)
      .then(response => console.log(response.data));
    showBooks()
  }

  const delBook = (id) => {
    axios.delete(`${SERVER}/${id}`).then(() => console.log("Succesful delete"));
    showBooks()
  }

  const updBook = (id) => {
    const book = {
      "title": title,
      "auothor": auothor,
      "publishYear": publishYear
    }
    axios.put(`${SERVER}/${id}`, book)
      .then(response => console.log(response));
    showBooks()
  }

  return (
    <div className="App">

      <div className='Inputs'>
        Title: <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
        Auothor: <input value={auothor} onChange={(e) => setAuothor(e.target.value)}></input>
        Year of Publish: <input value={publishYear} onChange={(e) => setPublishYear(e.target.value)}></input>
      </div>

      <div className='Buttons'>
        <button onClick={() => addBook()}>Add Book</button>
      </div>
      <hr />

      <div className='View'>
        Total Books: {books.length}<br /><br />
        {books.map((book, ind) => <div key={ind}>
          <h3><b>Title:</b> {book.title}</h3>
          <h5><b>Auothor:</b> {book.auothor}</h5>
          <h5><b>Year of Publish:</b> {book.publishYear}</h5>
          <button onClick={() => delBook(book.id)}>Delete</button>
          <button onClick={() => updBook(book.id)}>Update</button>
          <br /></div>)}
      </div>
    </div>
  );
}

export default App;
