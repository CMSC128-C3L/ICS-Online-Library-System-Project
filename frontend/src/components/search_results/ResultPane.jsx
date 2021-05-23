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
 // removed other mock data
 {
  id: "1",
  imgURL: "", 
  title: "1My TitleMy TitleMy TitleMy TitleMy Title", 
  year: "Year",
  category: "book", 
  author: ["Author A", "Author B", "Author C"], 
  isbn: "ISBN-ISBN-ISBN",
  courseCode: "CMSC 128", 
  topic: ['Topic1', 'Topic2', 'Topic3']
},
]


function ResultPane(){
  const searchContext = useContext(SearchContext);
  const classes = useStyles();

  return(
    <Container className= {classes.container}>
      <div className= {classes.resultHeader}>
        <Typography variant="body2">No. of results</Typography>
      </div>
      <GridList cellHeight={240} spacing={20} className={classes.gridList}>
        {tempResults.map((result) => {
          return(
            <GridListTile key= {result.id}>
              <BookCard 
                //** userType temporarily filled */
                userType="Faculty"
                imgURL={result.imgURL}
                title={result.title} 
                year={result.year} 
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