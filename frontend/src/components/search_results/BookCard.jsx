import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ConditionalIcon from "./ConditionalIcon";
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
	card: {
		display: 'flex',
		width: 550,
		height: 220,
		backgroundColor: '#F4F4F4',
	},
	cover: {
		padding: 10,
		width: 140,
		height: 200,
	},
	title: {
		maxWidth: 300,
		fontWeight: 600,
	},
	content: {
		maxWidth: 300,
	},
	yearCategory: {
		display: 'flex',
		flexDirection: 'row',
		color: '#848484',
		marginBottom: '0.5em',
	},
	year: {
		marginRight: '1.2em',
	},
	category: {
		fontWeight: 600,
	},
	details: {
		height: 120,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
	},
	author: {
		fontStyle: 'italic',
	},
	tags: {
		marginLeft: '0.5em',
	},
	filler: {
		flexGrow: 1,
	},

}));

//() => history.push(`/search/${props.id}`)
function BookCard(props) {
	const classes = useStyles();
	const history = useHistory();
	return(
		<Card className= {classes.card}>
			<CardMedia className={classes.cover} image={props.imgURL} title={props.title}/>
			<CardContent className={classes.content}>
				<CardActionArea onClick={() => history.push(`/search/${props._id}`)}>
					<Typography className={classes.title} noWrap={true} variant="h6">
						{props.title}
					</Typography>
				</CardActionArea>
				<div>
					<div className={classes.yearCategory}>
						<Typography className={classes.year} gutterBottom variant="subtitle2">
							{props.year}
						</Typography>
						<Typography className={classes.category} gutterBottom variant="subtitle2">
							BOOK
						</Typography>
					</div>
					<div className={classes.details}>
						<div>
							<Typography gutterBottom variant="body2">
								{props.author.map((author, index) => {
									return <span className={classes.author} key={author}>{ index ? (', ' + author) : author}</span>
								})}
							</Typography>
							<Typography gutterBottom variant="body2">
								ISBN: {props.isbn}
							</Typography>
						</div>
						<div>
							<Typography noWrap gutterBottom variant="body2">
								Reference for:
								{props.courseCode.map((course, index) => {
									return <span className= {classes.tags} key={course} >{ index? (', ' + course) : course}</span>
								})}
							</Typography>
							<Typography noWrap gutterBottom variant="body2">
								Topic: 
								{props.topic.map((topic, index) => {
									return <span className= {classes.tags} key={topic} >{ index? (', ' + topic) : topic}</span>
								})}
							</Typography>
						</div>
					</div>
				</div>
			</CardContent>
			<ConditionalIcon userType={props.userType} />
		</Card>
	);
}


export default BookCard;