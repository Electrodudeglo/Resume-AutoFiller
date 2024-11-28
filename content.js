const fieldMappings = {
    companyName: ['company', 'employer', 'organization', 'business'],
    jobTitle: ['job', 'position', 'title', 'role','post'],
    from: ['start date', 'from', 'beginning', 'start'],
    to: ['end date', 'to', 'until', 'end'],
    experience: ['description', 'responsibilities', 'duties', 'details', 'experiences', 'work experience', 'experience'],
};


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'indexedCvs') {
        filloutFields(request.data)
            .then(result => {
                sendResponse({ success: true, message: result });
            })
            .catch(error => {
                sendResponse({ success: false, message: error.toString() });
            });
        return true; // Keeps the message channel open for asynchronous response
    }
});

function parseRequestData() {

// keep track of indexed json data. If index 0 is selected, if fills out the indexed input fields.

// then the json data 0 is no longer available to be used, unless the input fields are cleared.

// the 'insert' button defined in 'popup.js' is disable for that particular json data.

}


function indexInputFields() {

    // find all input fields and index them.

    // if user presses 'insert' then it fills out index 0 of the input fields.

    // any subsequent 'insert' buttons pressed, the script fills out the empty input fields.

}


function filloutFields() {

    // pass this function to the event listener.

}