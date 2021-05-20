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
                    <span>{tag}</span>                    
                    <button 
                    className={classes.deleteIcon1} 
                    aria-label="clear" 
                    onClick={() => removeTags(index)} 
                    style={{ backgroundColor: 'transparent'}}><ClearIcon style={{ color: 'white' }}/>
                    </button>
                </li>
            ))}
            
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
    deleteIcon1: {
      '& svg': {
        fontSize: 15
      }
    }
  }));

export default TagsInput;