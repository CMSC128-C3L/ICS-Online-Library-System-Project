import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles((theme) =>({
	listContainer: {
		backgroundColor: 'transparent',
		marginTop: 10,
		marginBottom: 10,
		width: 210,
	},
	list: {
		maxHeight: 400,
		overflow: 'auto',
	},
	listItem: {
		height: 30,
	},
	listLabel: {
		margin: 0,
	}
}))

/*
expected properties: listName, list
*/
function CheckboxList(props){
	const classes = useStyles();

	/*
	default: none checked means no filter
	const [checked, setChecked] = React.useState()
	const handleChange
	*/

	return(
		<div className={classes.listContainer}>
			<h4 className={classes.listLabel}>{props.listName}</h4>
			<List className={classes.list}>
				{props.list.map((item) => {
					return(
						<ListItem dense button disableGutters className={classes.listItem} key={item}>
							<ListItemIcon>
								<Checkbox edge="start" />
							</ListItemIcon>
							<ListItemText primary={item} />
						</ListItem>
					)
				})}
			</List>
		</div>
	);
}

export default CheckboxList;