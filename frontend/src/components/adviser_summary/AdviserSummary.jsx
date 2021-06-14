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
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import logo from '../../assets/ics_logo.jpg';

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

    //generate PDF file
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
                {title: "DATE", dataKey: "Date"}, 
                {title: "TYPE", dataKey: "Type"}, 
                {title: "TOPIC", dataKey: "Topic"}, 
            ];
            
            let data = [];
            let text = []

            text.push("SUMMARY REPORT")
            text.push("Adviser Summary")
            doc.text(text,pageWidth / 2,50,'center')
            text = []
            text.push(name)
            doc.setFont("helvetica","bold");          
            doc.text(text,pageWidth / 2,85,'center')

            const img = new Image();
            img.src = logo;
            await doc.addImage(img,'JPG',110,30,60,60);

            summary.documents.map((item, i)=>{
                var author = "";
                var topic = "";

                item.author.map((auth) => { author+= auth + ", " });
                author = author.slice(0,author.length-2);
                item.topic.map((tpc) => { topic+= tpc + ", " });
                topic = topic.slice(0,topic.length-2);

                var temp = [item.title,author,item.pub_date,item.type,topic]
                data.push(temp);
            })

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

        doc.save(summary.name + "-Adviser-Summary-Report.pdf");
    }

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