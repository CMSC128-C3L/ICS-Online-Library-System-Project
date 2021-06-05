import React, { useContext } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './SearchCard.css';


function SortDropdown(props){

  return(
    <div className='sort'>
      <FormControl variant="outlined">
      <InputLabel for="sort-label" style={{fontSize:'15px', lineHeight:'1vh'}}>Sort By</InputLabel>
      <Select
        native
        id="sort-label"
        onChange={'temporaryHandleChange'}
        style={{height:'5vh'}}
        inputProps={{
          name: 'sort',
          id: 'outlined-sort',
        }}>
        <option value=""> </option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="alphabetical order">Alphabetical Order</option>
      </Select>
    </FormControl>
    </div>
  )
	
}

export default SortDropdown;