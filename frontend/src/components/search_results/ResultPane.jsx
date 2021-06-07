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
import { UserContext } from '../user/UserContext';
import Modal from '../manage_user_popup/Modal';
import MultiDeleteDoc from './modal/MultiDeleteDoc';

//layout purposes
import { makeStyles, withStyles } from "@material-ui/core/styles";
import SortDropdown from './SortDropdown';
import AddIcon from '@material-ui/icons/ImportContacts'
import './SearchCard.css';

// testing purposes
import BookCard from './BookCard';
import ThesisCard from './ThesisCard';
import SpCard from './SpCard';
import { useLocation, useParams, useHistory} from 'react-router';
import { Link} from 'react-router-dom';

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
  const {loggedUser} = useContext(UserContext);
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
    console.log("to be deleted...", selected)
    openMultiDeleteModal(selected)
  }

  console.log(results)

  return(
    <Container className= "result-container">
      <Modal ref={multiDeleteModal}><MultiDeleteDoc selected={selected} getDocuments={getDocuments} setPage={setPage} resetSelected={() => setSelected([])}/></Modal>

      {/* add document only for admin */}
      {loggedUser.classification === "Admin" ?
        <IconButton className="add-doc-button" onClick={handleAdd}>
          <AddIcon style={{color: 'black'}}/>
        </IconButton>
        : null
      }

      <div className= "result-header">
        <div className="sub-header-container">
          <Typography className="total-results" variant="body1">{results.length + ' total results'}</Typography>
          <SortDropdown/>
        </div>

        {/* multiple select only for admin; if admin, button will change depending if mult select is active or not */}
        {loggedUser.classification === "Admin" ?
          (multSelect?
            <button className="tool-button mult-cancel" onClick={handleMultCancel}>CANCEL SELECTION</button> :
            <button className="tool-button" onClick={handleMultSelect}>MULTIPLE SELECT</button>
          )
          : null
        }
        <button className={selected.length > 0 ? "tool-button mult-del" : "tool-button hide-btn"} onClick={handleMultDelete}>DELETE SELECTED</button>
        
        <Pagination className="search-pagination" count={pageCount} page={page} onChange={handleChangePage}></Pagination>
      </div>

      <GridList cellHeight={240} spacing={20} className={classes.gridList}>
        {multSelect?
        // render cards with checkboxes if admin chose multiple select
          pageResults.map((result, index) => {
            return(
              <GridListTile key= {index} 
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