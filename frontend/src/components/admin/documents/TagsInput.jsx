import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import './DocumentCard.css';

const TagsInput = (props) => {
    const [tags, setTags] = React.useState([]);
    const addTags = event => {
        event.preventDefault();
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };

    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };

    const addInput = event => {
        console.log("this should show");
        <input
            type="text"
            onKeyUp={event => addTags(event)}
            placeholder="Press enter to add tags"
        />
    };

    const classes = useStyles();

    return (
        <div>
            <p className="main-text-tags">ADD TAG</p>
            <div className='tags'>
            {tags.map((tag, index) => (
                <li key={index} className="tag">
                    <div className="tag-content">
                        <span>{tag}</span>                    
                        <button 
                        className={classes.deleteStyle} 
                        aria-label="clear" 
                        onClick={() => removeTags(index)} 
                        style={{ backgroundColor: 'transparent',width:'1vh', height:'1vh', margin:'0'}}><ClearIcon style={{ color: 'white'}}/>
                        </button>
                    </div>
                </li>
            ))}

            {/* <button 
            className={classes.addStyle} 
            aria-label="clear" 
            onClick={(event) => addInput(event)}><AddIcon style={{ color: 'black'}}/>
            </button> */}
            <input
                type="text"
                onKeyUp={event => addTags(event)}
                placeholder="Press enter"
            />
            </div>
        </div>
    );
};

const useStyles = makeStyles(() => ({
    deleteStyle: {
      '& svg': {
        fontSize: 15
      }
    },
    addStyle:{ 
        backgroundColor: 'transparent',
        width:'1vh', 
        height:'1vh', 
    }
  }));

export default TagsInput;