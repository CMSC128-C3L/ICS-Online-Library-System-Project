import React, { useContext } from 'react';
import List from '@material-ui/core/List';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import SearchContext from '../search_results/SearchContext';
import updateQueryString from '../search_results/UpdateQueryString';
import './Filter.css'

function CategoryChecklist(props){
	
	const searchContext = useContext(SearchContext);
	const handleChange = (item) =>{
		searchContext.dispatch({ type: props.action, item: item});	
		updateQueryString(searchContext);
	}

	return(
		
		<div className="filter-list-container">
			<Typography className="filter-list-label" variant="body1">{"Category"}</Typography>
			<List dense className="filter-category filter-list">
				{props.list.map((item) => {
					return(
						<FormControlLabel 
							key={item}
							className="filter-list-item" style={{maxHeight: props.hlimit}}
							control={
								<Checkbox
									className="filter-checkbox" 
									onChange={() => handleChange(item)} 
									checked={searchContext.state.category.indexOf(item) !== -1}
							/>}
							label={<Typography variant="body2" color="textPrimary">{item}</Typography>}
						/>
					)
				})}
			</List>
		</div>
	);
}

export default CategoryChecklist;