import Card from './Card'
import { useEffect, useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios'
import defaultAdvisoryImg from '../../assets/announcements/Advisory.png'
import defaultFeaturedImg from '../../assets/announcements/Featured.png'
import defaultNewsImg from '../../assets/announcements/News.png'
function CardRow({edit, handleEdit}){
    const [cards, setCards] = useState([])

    const imageExists = (image) =>{
        let img = new Image()
        img.src = image

        console.log(img.src)
        if(img.complete) {
            return true;
        }
        else return false;
    }
    useEffect(() => {
        let announcements;
        const getCards = async () => {
            try{
                announcements = await axios.get('/api/advisory/')
                for(let i = 0; i < 3; i++){
                    if(!imageExists(announcements.data[i].image)){
                        if(announcements.data[i].header === "Advisory") announcements.data[i].image = defaultAdvisoryImg
                        else if(announcements.data[i].header === "News") announcements.data[i].image = defaultNewsImg
                        else announcements.data[i].image = defaultFeaturedImg
                    }
                }
                setCards(announcements.data)
            }catch(e){}
        }
        getCards();
    }, [])

    return (
        <div className='flex-row margin-v'>
            {cards.map((card, index) => {
                return (
                    <div className='flex-col' key={index}>
                        {edit? <div className="edit-btn" onClick={() => handleEdit(index)}><EditIcon/></div> : null}
                        <Card content={card}/>
                    </div>
                )
            })}
        </div>
    )
}

export default CardRow