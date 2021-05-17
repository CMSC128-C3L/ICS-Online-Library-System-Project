// use this for event triggered timers: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
// You can still change the functions if deemed necessary
// Get User from Database
var user;
var activity;
var logCount;
var logTime;
var logTimeState = false;

const recordActivity = () => {
    // Enter methods here
    // Add to log count

}

const setLogTime = (logTime) => {
    if(!logTimeState){
        // start timer
    }
    else{
        // stop timer
    }
}

// For setting number of users logged in
const setLogCount = () => {
    if(!logTimeState){
        logCount++
    }
    else{
        logCount--
    }
}