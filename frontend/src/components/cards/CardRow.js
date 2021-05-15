import Card from './Card'

function CardRow(props){
    return (
        <div className='flex-row'>
            <Card content={advisoryprop}/>
            <Card content={announcementsprop}/>
            <Card content={icsnewsprop}/>
        </div>
    )
}

const advisoryprop = {
    header : "Advisory",
    title : "Lorem ipsum dolor sit amet"
}

const announcementsprop = {
    header : "Featured",
    title : "Lorem ipsum dolor sit amet"
}

const icsnewsprop = {
    header : "ICS News",
    title : "Lorem ipsum dolor sit amet"
}

export default CardRow