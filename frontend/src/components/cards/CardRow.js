import Card from './Card'

function CardRow({advisory, featured, icsnews}){
    return (
        <div className='flex-row'>
            <Card content={advisory? advisory : advisoryprop}/>
            <Card content={featured? featured : featuredprop}/>
            <Card content={icsnews? icsnews : icsnewsprop}/>
        </div>
    )
}

// Default values for props while db not set
const advisoryprop = {
    header : "Advisory",
    title : "Lorem ipsum dolor sit amet",
    image : ""
}

const featuredprop = {
    header : "Featured",
    title : "Lorem ipsum dolor sit amet",
    image : ""
}

const icsnewsprop = {
    header : "ICS News",
    title : "Lorem ipsum dolor sit amet",
    image : ""
}

export default CardRow