import React, { useContext, useEffect, useState, useRef } from 'react'; 
import axios from 'axios';
import SearchContext from './SearchContext'
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Checkbox from '@material-ui/core/Checkbox';
import Pagination from '@material-ui/lab/Pagination';
import queryString from 'query-string';
import { UserContext } from '../user/UserContext';

//layout purposes
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SortDropdown from './SortDropdown';
import AddIcon from '@material-ui/icons/ImportContacts'
import './SearchCard.css';

// testing purposes
import BookCard from './BookCard';
import ThesisCard from './ThesisCard';
import SpCard from './SpCard';
import { useLocation, useParams, useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  tile: {
    borderRadius: '0.5em',
    verticalAlign: 'middle',
    display:'flex',
    alignItems: 'center',
    "& .MuiCard-root": {
      flexGrow: 0.9
    },
  },
  tileGlow: {
    "& .MuiCard-root":{
      flexGrow: 0.85,
      boxShadow: '0 0 5px rgba(214, 50, 50, 0.7)',
    }
  },
  cbox: {
    alignSelf: 'start',
  },
}));

function ResultPane(props){
  const searchContext = useContext(SearchContext);
  const classes = useStyles();
  const history = useHistory();
  const [results, setResults] = useState([]);
  const location = useLocation();
  const {id} = useParams();

  const TYPES = {
    "Books": {"dbType": "Book", "route": "book"},
    "Theses": {"dbType": "Thesis", "route": "thesis"},
    "Special Problems": {"dbType": "Special Problem", "route": "sp"},
  }

  // get docs based on query and filters
  const getDocuments = async() =>{
    let categories = (searchContext.state.category).toString().split(',');
    let topicsQuery;
    let promises = [];

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
        promises.push(axios.get(`/api/search/filter/${TYPES[categories[i]].route}` + "?search=" + (searchContext.state.query).toString().toLowerCase() + "&courseCode=" + (searchContext.state.courseCode).toString() + "&" + topicsQuery));
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
    setPage(1)    
  }, [searchContext]);

  // Create reference to modal
	const addModal = useRef(null)
	const openAddModal = (user, props) => {addModal.current.open(user, props)}

  const handleAdd = () =>{
    console.log('[DOCUMENT] when add button clicked: ');
		// openAddModal();
  }

  // render card depending on type of doc
  const renderCard = (result) =>{
    switch(result.type){
      case TYPES["Books"].dbType:
        return <BookCard doc={result}/>
      case TYPES["Special Problems"].dbType:
        return <SpCard doc={result}/>
      case TYPES["Theses"].dbType:
        return <ThesisCard doc={result}/>
      default:
        return null
    }
  }

  // Pagination
  const cardsPerPage = 20
  const [page, setPage] = useState(1)
  const [pageResults, setPageResults] = useState([])
  const [pageCount, setPageCount] = useState(Math.ceil(pageResults/cardsPerPage))

  const handleChangePage = (event, value) => {
    setPage(value)
  }

  useEffect(() =>{
    setPageResults(
      results.slice(
        (page - 1) * cardsPerPage,
        (page - 1) * cardsPerPage + cardsPerPage
      )
    )
  }, [results, page])

  useEffect(() => {
    setPageCount(Math.ceil(results.length/cardsPerPage))
  }, [results, cardsPerPage])

  // Multiple Select for Deletion
  const {loggedUser} = useContext(UserContext);
  const [checked, setChecked] = useState([])
  const [multSelect, setMultSelect] = useState(false)

  function handleCheck(checked, value) {
    const index = checked.indexOf(value)
    const newChecked = [...checked]

    if(index === -1){
      newChecked.push(value);
    }else{
      newChecked.splice(index, 1);
    } 
    setChecked(newChecked)
  }

  const handleMultSelect = () => {
    setMultSelect(prev => !prev)
  }

  const handleMultCancel = () => {
    setMultSelect(prev => !prev)
    setChecked([])
  }

  const handleMultDelete = () => {
    // show pop up containing list of docs to be deleted
    // with delete all and cancel button similar to user popup
    // multiple delete requests
    console.log("To be deleted: ", checked)
  }
  console.log(results)
  return(
    <Container className= "result-container">
      <button className="add-doc-button" onClick={handleAdd}>
        <AddIcon className={classes.iconStyle}/>
      </button>
      <div className= "result-header">
        <div className="sub-header-container">
          <Typography className="total-results" variant="body1">{results.length + ' total results'}</Typography>
          <SortDropdown/>
        </div>
        {/* multiple select only for admin; if admin, button will change depending if mult select is active or not */}
        {loggedUser.classification === "Admin" ?
          multSelect?
            <button className="tool-button mult-cancel" onClick={handleMultCancel}>CANCEL SELECTION</button> :
            <button className="tool-button" onClick={handleMultSelect}>MULTIPLE SELECT</button>
          : null
        }
        <button className={multSelect? "tool-button mult-del" : "tool-button hide-btn"} onClick={handleMultDelete}>DELETE SELECTED</button>
        <Pagination className="search-pagination" count={pageCount} page={page} onChange={handleChangePage}></Pagination>
      </div>
      <GridList cellHeight={240} spacing={20} className={classes.gridList}>
        {multSelect?
        // render cards with checkboxes if admin chose multiple select
          pageResults.map((result, index) => {
            return(
              <GridListTile key= {index} 
                classes = {{
                  tile: checked.indexOf(result) !== -1? `${classes.tile} ${classes.tileGlow}` : classes.tile
                }}>
                <Checkbox 
                  checked={checked.indexOf(result) !== -1} 
                  className={classes.cbox} value={result} 
                  onChange={() => handleCheck(checked, result)}/>
                {renderCard(result)}
              </GridListTile>
            )
          }) :
        // render cards w/o checkboxes, for all users including admin if mutl select not chosen
          pageResults.map((result, index) => {
            return(
              <GridListTile key= {index} classes={{tile: classes.tile}}>
                {renderCard(result)}
              </GridListTile>
            )
          })
        }
      </GridList>
      <Pagination className="bottom-pg search-pagination" count={pageCount} page={page} onChange={handleChangePage}></Pagination>
    </Container>
  );
}


export default ResultPane;