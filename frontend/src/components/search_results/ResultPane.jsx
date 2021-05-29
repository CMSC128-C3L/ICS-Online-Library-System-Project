import React, { useContext, useEffect, useState } from 'react'; 
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import SearchContext from './SearchContext'
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

// testing purposes
import BookCard from './BookCard';
import ThesisCard from './ThesisCard';
import JournalCard from './JournalCard';
import SpCard from './SpCard';

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

  // sample get from api
  const getBook = async() =>{
    try{
      const books = await axios.get("/api/books");
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
        <Typography variant="body2">{books.length + ' results'}</Typography>
      </div>
      <GridList cellHeight={240} spacing={20} className={classes.gridList}>
        {books.map((result) => {
          return(
            <GridListTile key= {result.id}>
              <BookCard doc={result}/>
              {/* <ThesisCard doc={result}/> */}
              {/* <SpCard doc={result}/> */}
              {/* <JournalCard doc={result}/> */}
            </GridListTile>
          );
        })}
      </GridList>
    </Container>
  );
}


>>>>>>> feature03-book-controller
export default ResultPane;