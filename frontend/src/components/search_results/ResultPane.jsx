import React, { useContext } from 'react'; 
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

const tempResults = [
 // removed the mock data
]


function ResultPane(){
  const searchContext = useContext(SearchContext);
  const classes = useStyles();

  return(
    <Container className= {classes.container}>
      <div className= {classes.resultHeader}>
        <Typography variant="body2">No. of results</Typography>
      </div>
      {/* TEMPORARY STUFF HERE. SOLELY FOR CHECKING. */}
      <GridList cellHeight={240} spacing={20} className={classes.gridList}>
        {tempResults.map((result) => {
          return(
            <GridListTile key= {result.id}>
              <BookCard 
                imgURL={result.imgURL}
                title={result.title} 
                year={result.year} 
                category={result.category} 
                author={result.author} 
                isbn={result.isbn}
                courseCode={result.courseCode} 
                topic={result.topic}/>
            </GridListTile>
          );
        })}
      </GridList>
    </Container>
  );
}


export default ResultPane;