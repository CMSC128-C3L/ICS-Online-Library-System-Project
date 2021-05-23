import CategoryColumn from './CategoryColumn'
import './Footer.css'

function Footer(props) {
    return(
        <div className="footer-container">
            <div className="placeholder-ilib-logo">eyeCS</div>
            <div className="footer-row">
                <div className="category-row">
                    <CategoryColumn content={searchprop}></CategoryColumn>
                    <CategoryColumn content={toolsprop}></CategoryColumn>
                </div>
                <div className="category-row">
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
    links: ["Home", "Books", "Journals", "SP", "Thesis"]
}

const toolsprop = {
    title: "Tools",
    isNav: true,
    links: ["Advanced Search", "Feature 1", "Feature 2"]
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