// require the thesis model here in actual

module.exports = {
  sample,
}

async function sample(req, res) {
  try {
    // sample data only!, must get from db in actual 
    const thesis = {
      title: 'Parallelizing unit test execution on GPU',
      authors: ['Taghreed Bagies'],
      year: 2020,
      abstract:'Software testing is an important stage of the software development life cycle. However, the test execution is time-consuming and costly.'
    }

    // checks the user type
    if(req.user.type === 3) {
      // If user type is 3 (guest/not logged in)
      // get the info from sample data
      const {title, authors, year} = thesis;
      // send the info as an object
      res.status(200).send({title, authors, year});
    } else {
      // Since the user is at least 2(student), send everything including abstract
      res.status(200).send(thesis);
    }
    // If there are more limitations, change what to send back per user type
  } catch(error) {
    // console.log(error)
    res.status(500).send();
  }
}