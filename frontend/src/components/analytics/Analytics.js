import React, {useState} from 'react';
import AuthorSummary from '../author_summary/AuthorSummary';
import './Analytics.css'


function Analytics() {

    let [entry, setEntry] = useState({
        avatar:'*insert image*',
        id:'2018-XXXXX',
        name:'Juan Dela Cruz',
        logIn:'Insert info here',
        requestedBy:'Juana Dela Cruz',
    })

    return (
        <div className="body-container">
            <div className="label"><p/>Number of total online users:</div>
            <div className="label">AMOUNT<p/></div>
            <table className="analytics-table">
                <th>Avatar</th>
                <th>ID</th>
                <th>Name</th>
                <th>Last log-in</th>
                <th>Requested by</th>
                <tr>
                    <td>{entry.avatar}</td>
                    <td>{entry.id}</td>
                    <td>{entry.name}</td>
                    <td>{entry.logIn}</td>
                    <td>{entry.requestedBy}</td>                    
                </tr>
            </table>
            <div className="btn-container">
                <div className="btn-cell"><button className="btn-generate btn">Generate summary report</button></div>
                <div className="btn-cell"><button className="btn-edit-home btn">Edit home advisories</button></div>
            </div>
        </div>
    );
}

Analytics.propTypes = {};

export default Analytics;