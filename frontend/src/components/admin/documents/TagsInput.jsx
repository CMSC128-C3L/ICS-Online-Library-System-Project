import React from "react";
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import './DocumentCard.css';

const TagsInput = (props) => {
    const [tags, setTags] = React.useState([]);
    const addTags = event => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };

    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };

    return (
        <div className="tags-input">
            <div className='tags'>
            <ul>
                {tags.map((tag, index) => (
                    <li key={index} className="tag">
                        <span>{tag}</span>                    
                        <IconButton aria-label="clear" onClick={() => removeTags(index)}><ClearIcon/></IconButton>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                onKeyUp={event => addTags(event)}
                placeholder="Press enter to add tags"
            />
            </div>
        </div>
    );
};
export default TagsInput;