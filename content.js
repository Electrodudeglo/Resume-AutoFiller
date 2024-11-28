chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'indexedCvs') {
        findInputField(request.data)
            .then(result => {
                sendResponse({ success: true, message: result });
            })
            .catch(error => {
                sendResponse({ success: false, message: error.toString() });
            });
        return true; // Keeps the message channel open for asynchronous response
    }
});

function findInputField(inputData) {
    return new Promise((resolve, reject) => {
        try {
            const companyName = document.querySelector('input[id="company_name"], input[name="company_name"]');
            if (companyName) {
                companyName.value = inputData.company_name; // Assuming inputData is an object with company_name property
                resolve("Company name filled successfully");
            } else {
                reject("Company name input field not found");
            }
            
            // Add more field assignments here as needed
            // For example:
            // const jobTitle = document.querySelector('input[id="job_title_1"], input[name="job_title_1"]');
            // if (jobTitle) {
            //     jobTitle.value = inputData.job_title;
            // }
            
        } catch (error) {
            reject(`Error filling fields: ${error.toString()}`);
        }
    });
}