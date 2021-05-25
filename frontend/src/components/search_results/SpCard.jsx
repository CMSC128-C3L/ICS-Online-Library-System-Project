import React from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ConditionalIcon from "./ConditionalIcon";
import './SearchCard.css'

function SpCard(props) {

	return(
    
		<Card className= "doc-card" style={{backgroundColor: '#F4F4F4'}}>
			<CardMedia className="doc-cover" image={props.imgURL} title={props.title}/>
				<CardActionArea onClick={() => console.log('temporary BookCard onClick')}>
					<Typography className="doc-title" noWrap={true} variant="h6" style={{fontWeight: '600'}}>
						{props.title}
					</Typography>
				</CardActionArea>

				<div className="doc-content">
          
					<div className="doc-year-category">
            {/* pub date not rendered temporarily, date needs formatting */}
						{/* <Typography className="doc-year" variant="subtitle2">
							{props.pubDate}
						</Typography> */}
						<Typography className="doc-category" variant="subtitle2" style={{fontWeight: '600'}}>
							SPECIAL PROBLEM
						</Typography>
					</div>

					<div className="doc-other-details">
						<div>
							<Typography gutterBottom variant="body2">
							 {props.author.slice(0,4).map((author, index) => {
									return (index < 3)? 
									<span className="doc-author" key={author}>{ index ? (', ' + author) : author}</span> : 
									<span>{", et al."}</span>
								})}
							</Typography>
							<Typography gutterBottom variant="body2">
								{'Adviser: ' + props.adviser}
							</Typography>
						</div>           
						<div>
							<Typography noWrap gutterBottom variant="body2">
								{'Topic: '} 
								{props.topic.map((topic, index) => {
									return <span className= "doc-tags" key={topic} >{ index? (', ' + topic) : topic}</span>
								})}
							</Typography>
						</div>
				  </div>
          
			  </div>

			<ConditionalIcon className="doc-icons" userType={props.userType} />
		</Card>
	);
}


export default SpCard;