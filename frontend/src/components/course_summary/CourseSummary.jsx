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
import { jsPDF } from "jspdf";
import logo from '../../assets/ics_logo.jpg';
import autoTable from 'jspdf-autotable';

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
        let doc = new jsPDF('p', 'pt');
        try{
            doc.setFont("helvetica");
            let x = 50;
            let y = 50;
            let pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
            let pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
            let label = [
                {title: "TITLE", dataKey: "Title"}, 
                {title: "AUTHOR", dataKey: "Author"}, 
                {title: "ADVISER", dataKey: "Adviser"}, 
                {title: "DATE", dataKey: "Date"}, 
                {title: "TYPE", dataKey: "Type"}, 
                {title: "TOPIC", dataKey: "Topic"}, 
            ];
            
            let data = [];
            let text = []

            text.push("SUMMARY REPORT")
            text.push("Course Summary")
            doc.text(text,pageWidth / 2,50,'center')
            text = []
            text.push(id)
            doc.setFont("helvetica","bold");          
            doc.text(text,pageWidth / 2,85,'center')
            text = []

            const img = new Image();
            img.src = logo;
            await doc.addImage(img,'JPG',110,30,60,60);

            summary.documents.map((item, i)=>{
                var author = "";
                var adviser = "";
                var topic = "";
                if(item.type === "Book"){
                    item.author.map((auth) => { author+= auth + ", " });
                    author = author.slice(0,author.length-2);
                    item.topic.map((tpc) => { topic+= tpc + ", " });
                    topic = topic.slice(0,topic.length-2);

                    var temp = [item.title,author,"-",item.year,item.type,topic]
                }
                else if(item.type === "Special Problem" || item.type === "Thesis"){
                    item.author.map((auth) => { author+= auth + ", " });
                    author = author.slice(0,author.length-2);
                    item.adviser.map((adv) => { adviser+= adv + ", " });
                    adviser = adviser.slice(0,adviser.length-2);
                    item.topic.map((tpc) => { topic+= tpc + ", " });
                    topic = topic.slice(0,topic.length-2);

                    var temp = [item.title,author,adviser,item.pub_date,item.type,topic]
                }
                
                data.push(temp);
            })
            console.log(data)
            doc.autoTable(
                label,
                data,
                {
                    startY: 100,
                    styles: {
                        halign: "center"
                    },
                    columnStyles: {
                        Date: {columnWidth: 60}, 
                        Type: {columnWidth: 50}
                    }
                }); //add label and data to the table
        }catch(e){
            console.log(e)
        }

        doc.save(id + "-Course-Summary-Report.pdf");
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