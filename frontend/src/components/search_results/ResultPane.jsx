import React, { useContext, useEffect, useState, useRef } from 'react'; 
import axios from 'axios';
import SearchContext from './SearchContext'
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import queryString from 'query-string';

//layout purposes
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ConditionalSort from './ConditionalSort';
import ConditionalButtons from './ConditionalButtons';
import './SearchCard.css';

// testing purposes
import BookCard from './BookCard';
import ThesisCard from './ThesisCard';
import SpCard from './SpCard';
import { useLocation, useParams, useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  resultHeader: {
    minHeight: 50,
    display: 'flex'
  }
}));

function ResultPane(props){
  const searchContext = useContext(SearchContext);
  const classes = useStyles();
  const history = useHistory();
  const [books, setBooks] = useState([]);
  const [theses, setTheses] = useState([]);
  const [sp, setSp] = useState([]);
  const location = useLocation();
  const {id} = useParams();

  const resetStates = () =>{
      setBooks([]);
      setTheses([]);
      setSp([]);
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
        }else if(categories[i] === 'Special Problems'){
          const sp = await axios.get('/api//search/filter/sp' + "?search=" + (searchContext.state.query).toString().toLowerCase() + "&courseCode=" + (searchContext.state.courseCode).toString() + "&" + topicsQuery);
          setSp(sp.data);
        }else if(categories[i] === 'Theses'){
          const theses = await axios.get('/api//search/filter/thesis' + "?search=" + (searchContext.state.query).toString().toLowerCase() + "&courseCode=" + (searchContext.state.courseCode).toString() + "&" + topicsQuery);
          setTheses(theses.data);
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

  // Create reference to modal
	const addModal = useRef(null)
	const openAddModal = (user, props) => {addModal.current.open(user, props)}

  const handleAdd = () =>{
    console.log('[DOCUMENT] when add button clicked: ');
		openAddModal();
  }

  return(
    <Container className= {classes.container} >
      <div className= {classes.resultHeader}>
        <div className="sort-container">
          <Typography variant="body2">{(books.length+theses.length+sp.length) + ' results'}</Typography>
          <ConditionalSort/>
        </div>
        <ConditionalButtons/>
      </div>
      <GridList cellHeight={240} spacing={20} className={classes.gridList}>
        {books.map((result) => {
          return(
            <GridListTile key= {result.id}>
              <BookCard doc={result}/>
            </GridListTile>
          );
        })}
        {theses.map((result) => {
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
      </GridList>
    </Container>
  );
}


export default ResultPane;