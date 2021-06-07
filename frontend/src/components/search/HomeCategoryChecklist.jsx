import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import SearchContext from '../search_results/SearchContext';
import updateQueryString from '../search_results/UpdateQueryString';

const useStyles = makeStyles((theme) =>({
	listContainer: {
		backgroundColor: 'transparent',
		marginTop: 10,
		marginBottom: 10,
		width: 210,
		marginRight: 40
	},
	list: {
		display: 'flex',
		flexDirection: 'row',
		maxHeight: 400,
	},
	listItem: {
		fontSize: 12,
		height: 'auto',
	},
	listIcon:{
		padding: 0,
		margin: 0,
	},
	listLabel: {
		margin: 0,
	},
}))



function HomeCategoryChecklist(props){
	const classes = useStyles();
	
	const searchContext = useContext(SearchContext);

	const handleChange = (item) =>{
		searchContext.dispatch({ type: props.action, item: item});	
		updateQueryString(searchContext);
	}

	return(
		
		<div className={classes.listContainer}>
			<List dense className={classes.list}>
				{props.list.map((item) => {
					return(
						<FormControlLabel 
							key={item}
							className={classes.listItem} style={{maxHeight: props.hlimit}}
							control={
								<Checkbox
									className={classes.checkbox} 
									onChange={() => 	
										handleChange(item)
									} 
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

export default HomeCategoryChecklist;