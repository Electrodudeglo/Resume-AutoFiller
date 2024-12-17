chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "fillForm") {
            fillForm(request.data);
            sendResponse({success: true});
        }
    }
);

function fillForm(data) {
    // This function will handle the actual form filling
    // You'll need to customize this based on the specific form fields on the target website
    
    // Example:
    let companyNameField = document.querySelector('input[name="company_name"]');
    if (companyNameField) companyNameField.value = data.company_name;

    let jobTitleField = document.querySelector('input[name="job_title"]');
    if (jobTitleField) jobTitleField.value = data.job_title;

    let locationField = document.querySelector('input[name="location"]');
    if (locationField) locationField.value = data.location;

    let fromField = document.querySelector('input[name="from_date"]');
    if (fromField) fromField.value = data.from;

    let toField = document.querySelector('input[name="to_date"]');
    if (toField) toField.value = data.to;

    let experienceField = document.querySelector('textarea[name="experience"]');
    if (experienceField) experienceField.value = data.experience;

    // Add more fields as necessary
}