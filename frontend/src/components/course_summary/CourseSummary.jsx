import React, { useState, useEffect } from 'react'
import SideDescription from '../side_description/SideDescription'
import BookResult from './BookCard'
import api from './FetchMaterials'
import './CourseSummary.css'
import {Button} from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {useParams, useHistory} from 'react-router'
import axios from 'axios'
function CourseSummary(){
    const history = useHistory();
    let {id} = useParams();
    const goBack = () =>{
        history.push('/search')
    }
    // Temporary values for code, name, description, prerequisites while no api
    let [summary, setSummary] = useState({
        code: id,
        documents: [],
    })

    const fetchSummary = async() => {
          let docs = []
            try{
                let options = {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, }

                const res = await axios.get(`/api/courseSummary/${id}`, options);
                docs = res.data.summary

               setSummary(prevSummary=>({
                   ...prevSummary,
                   documents: docs
               }))
            }catch(e){
                console.log(e);
            }
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
    }, [])


    return(
        <div className="col-center">

            <div>
                {/* Render course code depending on inquiry*/}

                <Button className="go-back" onClick={goBack}>
                    <ArrowBackIcon/>
                    BACK TO SEARCH PAGE
                 </Button>
                <h1 className="text title-case text-center space-0">{summary.code}</h1>

                {/* Render course name depending on inquiry*/}
                <h4 className="text text-center space-0">{summary.name}</h4>

                <Button variant="contained" style={{color: "white", backgroundColor: "#47abdb", marginTop: "4vh"}} disableElevation startIcon={<GetAppIcon style={{color: "white"}}/>}
                    onClick={getPDF}
                >
                    Generate summary report
                </Button>
            </div>
            
            <div className="row content margin-3">
                <ResultsArea>{summary.documents}</ResultsArea>
                {/* <SideDescription description={summary.description}>{summary.prerequisites}</SideDescription> */}
            </div>
        </div>
    )
}

function ResultsArea(props){
    return(
        <div className="results-container">
            {
                props.children.map((doc, i)=>{
                   if(doc.type === "Book"){
                        return (<BookResult
                        key={i}
                        isbn={doc.isbn}
                        title={doc.title}
                        author={doc.author}
                        book_cover_img={doc.book_cover_img}
                        year={doc.year}
                        topic={doc.topic}
                        category={doc.type}
                    />)
                   }else{
                        return(<BookResult
                            key={i}
                            title={doc.title}
                            author={doc.author}
                            category={doc.type}
                            year={doc.year}
                            topic={doc.topic}
                        />
                        )
                   }
                })
            }
        </div>
    )
}

export default CourseSummary