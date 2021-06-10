import React, { useState, useEffect } from 'react'
import SideDescription from '../side_description/SideDescriptionAuthor'
import BookResult from '../course_summary/BookCard'
import api from '../course_summary/FetchMaterials'
import './AdviserSummary.css'
import {useParams, useHistory} from 'react-router'
import axios from 'axios'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {Button} from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp';
import download from 'downloadjs';

function AdviserSummary(props){
    const history = useHistory();

    const goBack = () =>{
        history.push('/search')
    }

    let {name} = useParams();

    // Temporary values for code, name, description, prerequisites while no api
    let [summary, setSummary] = useState({
        name: name,
        title:'Institute of Computer Science',
        documents: []
    })

     // Fetch books with course == props.query
    const fetchSummary = async() =>{
            let docs = []
            try{
                let options = {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, }

                const res = await axios.get(`/api/adviserSummary/${name}`, options);
                docs = res.data.summary
            }catch(e){
                console.log(e);
            }
            
            
           setSummary(prevSummary=>({
               ...prevSummary,
               documents: docs
           }))
        }

        const getPDF = async() =>{
            try{
                let options = {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token'), 'Content-type': 'application/json', 'Accept': 'application/pdf'}, responseType: 'blob'}

  
               
            }catch(e){
                console.log(e)
            }
        }


    useEffect(() => {
        
       
        fetchSummary()
    }, [props.query])


    return(
        <div className="col-center">
            <div className="col-center">

                <Button className="go-back" onClick={goBack}>
                    <ArrowBackIcon/>
                    BACK TO SEARCH PAGE
                 </Button>
                <h1 className="text title-case text-center space-0">{summary.name}</h1>
                <h4 className="text text-center space-0">{summary.title}</h4>
               <Button variant="contained" style={{color: "white", backgroundColor: "#47abdb", marginTop: "4vh"}} disableElevation startIcon={<GetAppIcon style={{color: "white"}}/>}
                    onClick={getPDF}
                >
                    Generate summary report
                </Button>
            </div>
            
            <div className="row content ">
                <ResultsArea>{summary.documents}</ResultsArea>
                
            </div>
        </div>
    )
}

function ResultsArea(props){
    return(
        <div className="results-container">
            {
                props.children.map((doc, i)=>{
                    return <BookResult
                        key={i}
                      
                        title={doc.title}
                        author={doc.author}
                        category={doc.type}
                        year={doc.year}
                        topic={doc.topic}
                    />
                })
            }
        </div>
    )
}

export default AdviserSummary