import React, { useContext, useEffect, useState } from 'react'; 
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import SearchContext from './SearchContext'
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import queryString from 'query-string';
// testing purposes
import BookCard from './BookCard';
import ThesisCard from './ThesisCard';
import JournalCard from './JournalCard';
import SpCard from './SpCard';
import { useLocation, useParams } from 'react-router';
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  resultHeader: {
    minHeight: 50,
  },
}));

function ResultPane(props){
  const searchContext = useContext(SearchContext);
  const classes = useStyles();
  const [books, setBooks] = useState([]);
  const [thesis, setThesis] = useState([]);
  const [sp, setSp] = useState([]);
  const [journal, setJournal] = useState([]);
  const location = useLocation();
  const {id} = useParams();

  const resetStates = () =>{
      setBooks([]);
      setThesis([]);
      setSp([]);
      setJournal([]);
  }

  // sample get from api
  const getDocuments = async() =>{
    let categories = (searchContext.state.category).toString().split(',');
    let topicsQuery;
    //if user has yet to select any category, set to all
    if((searchContext.state.category).toString() === "") categories = ['Books', 'Journals', 'Special Problems', 'Theses'];
    console.log('categories: ', categories);
    console.log('course code: ', searchContext.state.courseCode)
    console.log('topics length: ', searchContext.state.topic.length)
    console.log('string: ', queryString.stringify({topic: searchContext.state.topic}))

    if(searchContext.state.topic.length === 0) topicsQuery = "topic="
    else{
      topicsQuery = queryString.stringify({topic: searchContext.state.topic})
    }
    for(let i = 0; i < categories.length; i++){
      try{
        if(categories[i] === 'Books'){
            const books = await axios.get('/api/search/filter/book' + "?search=" + (searchContext.state.query).toString().toLowerCase() + "&courseCode=" + (searchContext.state.courseCode).toString() + "&" + topicsQuery);
            setBooks(books.data);
          }else if(categories[i] === 'Journals'){
            const journals = await axios.get('/api//search/filter/journal' + "?search=" + (searchContext.state.query).toString().toLowerCase() + "&courseCode=" + (searchContext.state.courseCode).toString() + "&" + topicsQuery);
            setJournal(journals.data);
          }else if(categories[i] === 'Special Problems'){
            const sp = await axios.get('/api//search/filter/sp' + "?search=" + (searchContext.state.query).toString().toLowerCase() + "&courseCode=" + (searchContext.state.courseCode).toString() + "&" + topicsQuery);
            setSp(sp.data);
          }else if(categories[i] === 'Theses'){
            const theses = await axios.get('/api//search/filter/thesis' + "?search=" + (searchContext.state.query).toString().toLowerCase() + "&courseCode=" + (searchContext.state.courseCode).toString() + "&" + topicsQuery);
            setThesis(theses.data);
          }
      }catch(err){
        console.log(err)
      }
    }
    
  }

  useEffect(() =>{
    resetStates();
    getDocuments();
    
  }, [searchContext]);

  // window.scrollTo(0, 0);

  return(
    <Container className= {classes.container} >
      <div className= {classes.resultHeader}>
        <Typography variant="body2">{(books.length+thesis.length+sp.length+journal.length) + ' results'}</Typography>
      </div>
      <GridList cellHeight={240} spacing={20} className={classes.gridList}>
        {books.map((result) => {
          return(
            <GridListTile key= {result.id}>
              <BookCard doc={result}/>
            </GridListTile>
          );
        })}
        {thesis.map((result) => {
          return(
            <GridListTile key= {result.id}>
               <ThesisCard doc={result}/>
            </GridListTile>
          );
        })}
        {sp.map((result) => {
          return(
            <GridListTile key= {result.id}>
               <SpCard doc={result}/>
            </GridListTile>
          );
        })}
        {journal.map((result) => {
          return(
            <GridListTile key= {result.id}>
               <JournalCard doc={result}/> 
            </GridListTile>
          );
        })}
      </GridList>
    </Container>
  );
}


export default ResultPane;