import { Component } from 'react'
import Card from './Card'

class CardRow extends Component{
    render() {
        return (
            <div className='card-row'>
                <Card>Advisory</Card>
                <Card>Featured</Card>
                <Card>ICS News</Card>
            </div>
        )
    }
}

export default CardRow