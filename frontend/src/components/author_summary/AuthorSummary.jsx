import React, { useState, useEffect } from 'react'
import SideDescription from '../side_description/SideDescriptionAuthor'
import BookResult from '../course_summary/BookCard'
import api from '../course_summary/FetchMaterials'
import './AuthorSummary.css'
import axios from 'axios'
import {useParams, useHistory} from 'react-router'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import {Button} from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp';
import { jsPDF } from "jspdf";
import logo from '../../assets/ics_logo.jpg';


function AuthorSummary(props){
    const history = useHistory();

    const goBack = () =>{
        history.push('/search')
    }

    let {name} = useParams();

    // Temporary values for code, name, description, prerequisites while no api
    let [summary, setSummary] = useState({
        name: name,

        documents: [],
    })

    const getPDF = async() =>{
  
         
        let doc = new jsPDF('p', 'pt');
        try{
            doc.setFont("helvetica");
            let doc_count = 0;
            let x = 50;
            let y = 50;
            let pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
            let pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
            let label = [
                {title: "TITLE", dataKey: "Title"}, 
                {title: "AUTHOR", dataKey: "Author"}, 
                {title: "YEAR", dataKey: "Year"}, 
                {title: "TYPE", dataKey: "Type"}, 
                {title: "TOPIC", dataKey: "Topic"}, 
            ];
            
            let data = [];
            let text = []

            text.push("SUMMARY REPORT")
            text.push("Author Summary")
            doc.text(text,pageWidth / 2,50,'center')
            text = []
            text.push(name)
            doc.setFont("helvetica","bold");          
            doc.text(text,pageWidth / 2,85,'center')

            summary.documents.map((item, i)=>{
                //limit 10 document per page
                if(doc_count >= 15){
                    doc.text(text,50,130)
                    doc.addPage()
                    doc_count = 0
                }
                var author = "";
                var topic = "";

                item.author.map((auth) => { author+= auth + ", " });
                author = author.slice(0,author.length-2);
                item.topic.map((tpc) => { topic+= tpc + ", " });
                topic = topic.slice(0,topic.length-2);

                var temp = [item.title,author,item.year,item.type,topic]
                data.push(temp);
                doc_count++;
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
                        Title: {columnWidth: 200}, 
                        Author:{columnWidth:100}, 
                        Year: {columnWidth: 60}, 
                        Type: {columnWidth: 50},
                        Topic: {columnWidth: 100}
                    }
                }); //add label and data to the table
        }catch(e){
            console.log(e)
        }

        const img = new Image();
        img.src = logo;
        img.onload = async function() {
            await doc.addImage(img,'JPG',110,30,60,60);
            doc.save(summary.name + "-Author-Summary-Report.pdf");
        };
        
    }

    const fetchSummary = async() =>{
        let docs = []
            try{
                let options = {headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}, }

                const res = await axios.get(`/api/authorSummary/${name}`, options);
                docs = res.data.summary

                console.log(docs)
            }catch(e){
                console.log(e);
            }
            
            
            
           setSummary(prevSummary=>({
               ...prevSummary,
                documents: docs
           }));

    }

    useEffect(() => {
        
        // Fetch books with course == props.query
        

        fetchSummary()
    }, [props.query])


    return(
        <div className="col-center">

            <div className="col-center">
                {/* Render course code depending on inquiry*/}
                {/* Placeholder profile image */}
                 <Button className="go-back" onClick={goBack}>
                    <ArrowBackIcon/>
                    BACK TO SEARCH PAGE
                 </Button>
                <img className="pfp" src="https://www.w3schools.com/howto/img_avatar.png"/>
                <h1 className="text title-case text-center space-0">{summary.name}</h1>
                 <Button variant="contained" style={{color: "white", backgroundColor: "#47abdb", marginTop: "4vh"}} disableElevation startIcon={<GetAppIcon style={{color: "white"}}/>}
                    onClick={getPDF}
                >
                    Generate summary report
                </Button>
                {/* Render course name depending on inquiry*/}
                <h4 className="text text-center space-0">{summary.title}</h4>
            </div>
            
            <div className="row content margin-3">
                <ResultsArea>{summary.documents}</ResultsArea>
               
            </div>
        </div>
    )
}

function ResultsArea(props){
    return(
        <div className="results-container">
            {
                props.children.map((book, i)=>{
                    return <BookResult
                        key={i}
                        isbn={book.isbn}
                        title={book.title}
                        author={book.author}
                        book_cover_img={book.book_cover_img}
                        year={book.year}
                        topic={book.topic}
                        category={book.type}
                    />
                })
            }
        </div>
    )
}

export default AuthorSummary