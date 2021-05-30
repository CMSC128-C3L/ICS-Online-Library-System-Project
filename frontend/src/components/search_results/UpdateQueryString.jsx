import queryString from 'query-string'

const updateQueryString = (searchContext) =>{


    let url = "/search/filter";
    let stringify = (searchContext.state.category).toString();
    if(stringify === ""){
        url = url + "/all?search=" + (searchContext.state.query).toString().toLowerCase();
    }else{
        url = url + "/" + stringify.toLowerCase() + "?search=" + (searchContext.state.query).toString().toLowerCase();
    }

    url = url + "&courseCode=" + (searchContext.state.courseCode).toString().toLowerCase() + "&topic="
    console.log(url);
    return url;


}

export default updateQueryString;