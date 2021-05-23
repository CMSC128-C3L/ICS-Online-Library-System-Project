import React, { useContext, useEffect, useState } from 'react'; 
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import SearchContext from './SearchContext'
import BookCard from './BookCard';
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  resultHeader: {
    minHeight: 50,
  },
}));

function ResultPane(){
  const searchContext = useContext(SearchContext);
  const classes = useStyles();
  const [books, setBooks] = useState([]);

  /**
   * temporary get request to a mock book api
   */
  const getBook = async() =>{
    try{
      const books = await axios.get("https://60a7910e3b1e13001717684a.mockapi.io/api/books/books");
      setBooks(books.data);
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() =>{
    getBook()
  }, []);


  return(
    <Container className= {classes.container}>
      <div className= {classes.resultHeader}>
        <Typography variant="body2">No. of results</Typography>
      </div>
      <GridList cellHeight={240} spacing={20} className={classes.gridList}>
        {books.map((result) => {
          return(
            <GridListTile key= {result.id}>
              <BookCard 
                //** userType temporarily filled */
                userType="Faculty"
                imgURL={result.book_cover_img}
                title={result.title} 
                year={result.year} 
                author={result.author} 
                isbn={result.isbn}
                courseCode={result.course_code} 
                topic={result.topic}/>
            </GridListTile>
          );
        })}
      </GridList>
    </Container>
  );
}


export default ResultPane;