import React, {Component} from 'react';
import axios from 'axios';
import Navbar from "../navigation_bar/Navbar";
import BookList from './BookList';

class Books extends Component{
    constructor(props){
        super(props);
        this.state = {
            books: [],
            searchField: ''
        }
    }

    searchBook = (e) => {
        e.preventDefault()
        const url = "https://www.googleapis.com/books/v1/volumes?q="
        axios.get(url + this.state.searchField)
          .then(data => console.log(data))
          .catch((error) => console.log(error))
    };

    handleSearch = (e) =>{
        this.setState({ searchField: e.target.value})
    }

    handleClick () {
        this.handleSearch();
    }

    render(){
        return(
            <div>
                <Navbar searchBook= {this.searchBook} handleSearch={this.handleSearch} />
                <BookList books={this.state.books}/>
            </div>
        );
    }
}

export default Books;