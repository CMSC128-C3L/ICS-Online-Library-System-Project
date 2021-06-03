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
  const [results, setResults] = useState([]);
  const location = useLocation();
  const {id} = useParams();
  let promises = [];

  const TYPES = {
    book: {"dbType": "Book", "route": "book"},
    thesis: {"dbType": "Thesis", "route": "thesis"},
    sp: {"dbType": "Special Problem", "route": "sp"},
  }

  // get docs based on query and filters
  const getDocuments = async() =>{
    let categories = (searchContext.state.category).toString().split(',');
    let topicsQuery;

    //if user has yet to select any category, set to all
    if((searchContext.state.category).toString() === "") categories = ['Books', 'Special Problems', 'Theses'];
    console.log('categories: ', categories);
    console.log('course code: ', searchContext.state.courseCode)
    console.log('topics length: ', searchContext.state.topic.length)
    console.log('string: ', queryString.stringify({topic: searchContext.state.topic}))

    if(searchContext.state.topic.length === 0) topicsQuery = "topic="
    else{
      topicsQuery = queryString.stringify({topic: searchContext.state.topic})
    }

    // consolidate promises from get requests
    for(let i = 0; i < categories.length; i++){
      try{
        if(categories[i] === 'Books'){
          promises.push(axios.get('/api/search/filter/book' + "?search=" + (searchContext.state.query).toString().toLowerCase() + "&courseCode=" + (searchContext.state.courseCode).toString() + "&" + topicsQuery));
        }else if(categories[i] === 'Special Problems'){
          promises.push(axios.get('/api//search/filter/sp' + "?search=" + (searchContext.state.query).toString().toLowerCase() + "&courseCode=" + (searchContext.state.courseCode).toString() + "&" + topicsQuery));
        }else if(categories[i] === 'Theses'){
          promises.push(axios.get('/api//search/filter/thesis' + "?search=" + (searchContext.state.query).toString().toLowerCase() + "&courseCode=" + (searchContext.state.courseCode).toString() + "&" + topicsQuery));
        }
      }catch(err){
        console.log(err)
      }
    }

    try{
      // wait for promises to be resolved; extract data (array) from each res obj 
      const res = await Promise.all(promises)
      const data = res.map((res) => res.data)
      // flatten data array and sort alphabetically; then update results
      setResults(
        data.flat().sort(function(a, b) {
          return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
        })
      )
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() =>{
    setResults([]);
    getDocuments();
    
  }, [searchContext]);

  // Create reference to modal
	const addModal = useRef(null)
	const openAddModal = (user, props) => {addModal.current.open(user, props)}

  const handleAdd = () =>{
    console.log('[DOCUMENT] when add button clicked: ');
		openAddModal();
  }
  const renderCard = (result) =>{
    switch(result.type){
      case TYPES.book.dbType:
        return <BookCard doc={result}/>
      case TYPES.sp.dbType:
        return <SpCard doc={result}/>
      case TYPES.thesis.dbType:
        return <ThesisCard doc={result}/>
      default:
        return null
    }
  }
  return(
    <Container className= {classes.container} >
      <div className= {classes.resultHeader}>
        <div className="sort-container">
          <Typography variant="body2">{results.length + ' results'}</Typography>
          <ConditionalSort/>
        </div>
        <ConditionalButtons/>
      </div>
      <GridList cellHeight={240} spacing={20} className={classes.gridList}>
        {results.map((result, index) => {
          return(
            <GridListTile key= {index}>
              {renderCard(result)}
            </GridListTile>
          );
        })}
      </GridList>
    </Container>
  );
}


export default ResultPane;