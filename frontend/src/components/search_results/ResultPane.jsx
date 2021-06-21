import React, { useContext, useEffect, useState, useRef } from 'react'; 
import axios from 'axios';
import SearchContext from './SearchContext'
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Checkbox from '@material-ui/core/Checkbox';
import Pagination from '@material-ui/lab/Pagination';
import IconButton from '@material-ui/core/IconButton';
import queryString from 'query-string';
import Modal from '../manage_user_popup/Modal';
import MultiDeleteDoc from './modal/MultiDeleteDoc';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import decode from 'jwt-decode';

//layout purposes
import { makeStyles } from "@material-ui/core/styles";
import SortDropdown from './SortDropdown';
import AddIcon from '@material-ui/icons/ImportContacts'
import './SearchCard.css';

// testing purposes
import BookCard from './BookCard';
import ThesisCard from './ThesisCard';
import SpCard from './SpCard';
import { useHistory } from 'react-router';

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
  const [sortType, setSortType] = useState("");
  const twoColumnView = useMediaQuery('(min-width:1024px)');

  // Sorting
  const handleSortChange = (event) =>{
    setSortType(event.target.value)
  }

  const getYear = (doc) => {
    return doc.pub_date != null? doc.pub_date.split('-')[0] : doc.year
  }

  const sortResults = (results) => {
    const docs = [...results]
    if(sortType == "oldest"){
      setResults(docs.sort(function(a, b) {
        return getYear(a) - getYear(b)
      }))
    }
    else if(sortType == "newest"){
      setResults(docs.sort(function(a, b) {
        return getYear(b) - getYear(a)
      }))
    }
    else{
      setResults(docs.sort(function(a, b) {
        return a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      }))
    }
  }

  useEffect(() => {
    sortResults(results)
  }, [sortType])

  // get docs based on query and filters
  const getDocuments = async() =>{
    let categories = (searchContext.state.category).toString().split(',');
    let topicsQuery;
    let promises = [];

    //if user has yet to select any category, set to all

    if((searchContext.state.category).toString() === "") categories = ['Books', 'Special Problems', 'Theses'];


    if(searchContext.state.topic.length === 0) topicsQuery = "topic="
    else{
      topicsQuery = queryString.stringify({topic: searchContext.state.topic})
    }

    // consolidate promises from get requests
    for(let i = 0; i < categories.length; i++){
      let typeRoute;
      try{
        if(categories[i] === "Books") typeRoute = "book"
        else if(categories[i] === "Theses") typeRoute = "thesis"
        else typeRoute = "sp"

        promises.push(axios.get(`/api/search/filter/${typeRoute}` + "?search=" + (searchContext.state.query).toString().toLowerCase() + "&courseCode=" + (searchContext.state.courseCode).toString() + "&" + topicsQuery));
      
      }catch(err){
        console.log(err)
      }
    }

    try{
      // wait for promises to be resolved; extract data (array) from each res obj 
      const res = await Promise.all(promises)
      const data = res.map((res) => res.data)
      // flatten data array and sort results
      sortResults(data.flat())
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() =>{
    getDocuments();
    setPage(1)    
  }, [searchContext]);

  // Create reference to modal
	const addModal = useRef(null)
	const openAddModal = (user, props) => {addModal.current.open(user, props)}
  const multiDeleteModal = useRef(null)
  const openMultiDeleteModal = () => {multiDeleteModal.current.open()}

  const handleAdd = () =>{
    history.push(`/createDocument`);
  }

  // render card depending on type of doc
  const renderCard = (result) =>{
    switch(result.type){
      case "Book":
        return <BookCard doc={result}/>
      case "Special Problem":
        return <SpCard doc={result}/>
      case "Thesis":
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
  const uData = (localStorage.length != 0) ? decode(localStorage.getItem('token')) : '{}';

  const [selected, setSelected] = useState([])
  const [multSelect, setMultSelect] = useState(false)

  function handleSelect(selected, value) {
    const index = selected.indexOf(value)
    const newSelected = [...selected]

    if(index === -1){
      newSelected.push(value);
    }else{
      newSelected.splice(index, 1);
    } 
    setSelected(newSelected)
  }

  const handleMultSelect = () => {
    setMultSelect(prev => !prev)
  }

  const handleMultCancel = () => {
    setMultSelect(prev => !prev)
    setSelected([])
  }

  const handleMultDelete = () => {

    openMultiDeleteModal(selected)
  }



  return(
    <Container className= "result-container" maxWidth={false}>
      <Modal ref={multiDeleteModal}><MultiDeleteDoc selected={selected} getDocuments={getDocuments} setPage={setPage} resetSelected={() => setSelected([])}/></Modal>

      {/* add document only for admin */}
      {uData.classification === "Admin" ?
        <IconButton className="add-doc-button" onClick={handleAdd}>
          <AddIcon style={{color: 'black'}}/>
        </IconButton>
        : null
      }

      <div className= "result-header">
        <div className="sub-header-container">
          <Typography className="total-results" variant="body1">{results.length + ' total results'}</Typography>
          <SortDropdown handleChange={handleSortChange}/>
        </div>

        {/* multiple select only for admin; if admin, button will change depending if mult select is active or not */}
        {uData.classification === "Admin" ?
          (multSelect?
            <button className="tool-button mult-cancel" onClick={handleMultCancel}>CANCEL SELECTION</button> :
            <button className="tool-button" onClick={handleMultSelect}>MULTIPLE SELECT</button>
          )
          : null
        }
        <button className={selected.length > 0 ? "tool-button mult-del" : "tool-button hide-btn"} onClick={handleMultDelete}>DELETE SELECTED</button>
        
        {results.length > 0?
          <Pagination className="search-pagination" count={pageCount} page={page} onChange={handleChangePage}></Pagination>
          : null
        }
      </div>

      <GridList className="result-grid-list" cellHeight={240} spacing={20} cols={twoColumnView? 2 : 1}>
        {multSelect?
        // render cards with checkboxes if admin chose multiple select
          pageResults.map((result, index) => {
            return(
              <GridListTile key= {index} className="grid-list-tile"
                classes = {{
                  tile: selected.indexOf(result) !== -1? `${classes.tile} ${classes.tileGlow}` : classes.tile
                }}>
                <Checkbox 
                  checked={selected.indexOf(result) !== -1} 
                  className={classes.cbox} value={result} 
                  onChange={() => handleSelect(selected, result)}/>
                {renderCard(result)}
              </GridListTile>
            )
          }) :
        // render cards w/o checkboxes, for all users including admin if mult select not chosen
          pageResults.map((result, index) => {
            return(
              <GridListTile key= {index} classes={{tile: classes.tile}}>
                {renderCard(result)}
              </GridListTile>
            )
          })
        }
      </GridList>
      
      {results.length > 0 ? 
        <Pagination className="bottom-pg search-pagination" count={pageCount} page={page} onChange={handleChangePage}></Pagination>
        : null
      }
    </Container>
  );
}


export default ResultPane;
