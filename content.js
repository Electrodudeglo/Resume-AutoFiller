const fieldMappings = {
    companyName: ['company', 'employer', 'organization', 'business'],
    jobTitle: ['job', 'position', 'title', 'role', 'post'],
    from: ['start date', 'from', 'beginning', 'start'],
    to: ['end date', 'to', 'until', 'end'],
    experience: ['description', 'responsibilities', 'duties', 'details', 'experiences', 'work experience', 'experience'],
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if(sender.action === 'indexedCvs') {

        const inputFields = request.data

        findAllInputFields(inputFields)
    }

});


function findAllInputFields(inputFields) {

    const inputFields = document.querySelectorAll('label, input[name="company_name"]');

    console.log(inputFields);

}

