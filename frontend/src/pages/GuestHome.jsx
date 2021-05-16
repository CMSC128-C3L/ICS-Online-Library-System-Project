import React, { Component } from 'react'
import Header from '../components/header/Header'
import Search from '../components/search/Search'
import CardRow from '../components/cards/CardRow'

export default class GuestHome extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Search/>
                <CardRow/>
            </div>
        )
    }
}
