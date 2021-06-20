import CategoryColumn from './CategoryColumn'
import icsLogo from '../../assets/ics_logo.png'
import './Footer.css'
export const ACTIONS = {
    updateQuery: 'UPDATE_QUERY',
    updateCategory: 'UPDATE_CATEGORY',
    updateCourseCode: 'UPDATE_COURSE_CODE',
    updateTopic: 'UPDATE_TOPIC',
    reset: 'RESET'
  }

function Footer(props) {
    return(
        <div className="footer-container">
            <div className="placeholder-ilib-logo">
            <img src={icsLogo} alt="logo" className="ics_icon"/> 
            EyeCS: Window to Knowledge
            </div>
            <div className="footer-row">
                <div className="category-row">
                    <CategoryColumn content={searchprop} action={ACTIONS.updateCategory} action2={ ACTIONS.updateQuery }></CategoryColumn>
                    <CategoryColumn content={contactprop}></CategoryColumn>
                    <CategoryColumn content={socialprop}></CategoryColumn>
                </div>
            </div>
        </div>
    )
}

const searchprop = {
    title: "Search",
    isNav: true,
    isSearch: true,
    links: ["Home", "Books", "SP", "Thesis"]
}

const contactprop = {
    title: "Contact Us",
    isNav: true,
    isSearch: false,
    links: ["About Us"]
}

const socialprop = {
    title: "Social Media",
    isNav: false
}

export default Footer