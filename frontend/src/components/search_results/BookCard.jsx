import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import DownloadIcon from '@material-ui/icons/GetApp';
import './SearchCard.css';

const useStyles = makeStyles((theme) => ({
	card: {
		display: 'flex',
		width: 550,
		height: 200,
	},
	cover: {
		padding: 10,
		width: 120,
		height: 180,
	},
	title: {
		display: 'block',
		maxWidth: 300,
	},
	content: {
		maxWidth: 300,
	},
	yearCategory: {
		display: 'flex',
		flexDirection: 'row',
		color: '#848484',
	},
	year: {
		marginRight: '1.2em',
	},
	category: {
		fontWeight: 600,
	},
	author: {
		fontStyle: 'italic',
		marginLeft: '0.5em',
	},
	topic: {
		marginLeft: '0.5em',
	},
	filler: {
		flexGrow: 1,
	},
	control: {
		marginTop: '2.5em',
		marginRight: '1em',
	},
	downloadButton: {
		"&:hover": {
			color: '#95D2EC',
		}
	}

}));

function BookCard(props) {
	const classes = useStyles();
	return(
		<Card className= {classes.card}>
			<CardMedia className={classes.cover} image={props.imgURL} title={props.title}/>
			<CardContent className={classes.content}>
				<CardActionArea>
					<Typography className={classes.title} noWrap={true} gutterBottom variant="h6">
						{props.title}
					</Typography>
				</CardActionArea>
				<div>
					<div className={classes.yearCategory}>
						<Typography className={classes.year} gutterBottom variant="subtitle2">
							{props.year}
						</Typography>
						<Typography className={classes.category} gutterBottom variant="subtitle2">
							{props.category.toUpperCase()}
						</Typography>
					</div>
					<div className={classes.details}>
						<Typography gutterBottom variant="body2">
							Author: 
							{props.author.map((author) => {
								return <span className={classes.author} key={author}>{author}</span>
							})}
						</Typography>
						<Typography gutterBottom variant="body2">
							ISBN: {props.isbn}
						</Typography>
						<Typography gutterBottom variant="body2">
							Reference for: {props.courseCode}
						</Typography>
						<Typography gutterBottom variant="body2">
							Topic: 
							{props.topic.map((topic) => {
								return <span className= {classes.topic} key={topic} >{topic}</span>
							})}
						</Typography>
					</div>
				</div>
			</CardContent>
			<div className={classes.control}>
				<IconButton className={classes.downloadButton} aria-label="download pdf">
					<DownloadIcon fontSize="large"/>
				</IconButton>
			</div>
		</Card>
	);
}


export default BookCard;