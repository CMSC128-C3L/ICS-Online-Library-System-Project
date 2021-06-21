import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import SearchContext from '../search_results/SearchContext';
import updateQueryString from '../search_results/UpdateQueryString';

const useStyles = makeStyles((theme) =>({
	list: {
		display: 'flex',
		flexDirection: 'row',
		// maxHeight: 400,
	},
	listItem: {
		fontSize: 20,
		height: 'auto',
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
		
		<div>
			<List dense className={classes.list}>
				{props.list.map((item) => {
					return(
						<FormControlLabel 
							key={item}
							className={classes.listItem} style={{maxHeight: props.hlimit}}
							control={
								<Checkbox 
									icon={<CircleUnchecked />}
									checkedIcon={<CircleCheckedFilled />}
									style ={{
										color: "#47abd8"
									}}
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
