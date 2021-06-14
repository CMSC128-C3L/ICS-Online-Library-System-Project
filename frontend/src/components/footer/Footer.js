import CategoryColumn from './CategoryColumn'
import icsLogo from '../../assets/ics_logo.png'
import './Footer.css'
import { ACTIONS } from '../../pages/SearchPage';

function Footer(props) {
    return(
        <div className="footer-container">
            <div className="placeholder-ilib-logo">
            <img src={icsLogo} alt="logo" className="ics_icon"/> 
            EyeCS: Window to Knowledge
            </div>
            <div className="footer-row">
                <div className="category-row">
                    <CategoryColumn content={searchprop} action={ACTIONS.updateCategory}></CategoryColumn>
                    <CategoryColumn content={contactprop} action={ACTIONS.updateCategory}></CategoryColumn>
                    <CategoryColumn content={socialprop} action={ACTIONS.updateCategory}></CategoryColumn>
                </div>
            </div>
        </div>
    )
}

const searchprop = {
    title: "Search",
    isNav: true,
    links: ["Home", "Books", "Journals", "SP", "Thesis"]
}

const contactprop = {
    title: "Contact Us",
    isNav: true,
    links: ["Support", "About Us"]
}

const socialprop = {
    title: "Social Media",
    isNav: false
}

export default Footer