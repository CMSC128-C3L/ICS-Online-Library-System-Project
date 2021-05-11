import Card from './Card'

function CardRow(props){
    return (
        <div className='card-row'>
            <Card>Advisory</Card>
            <Card>Featured</Card>
            <Card>ICS News</Card>
        </div>
        )
    }

export default CardRow