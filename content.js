chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'indexedCvs') {
        const experience = request.data;
        findAllFields(experience);
    }
});



function findAllFields(experience) {
    const fieldMappings = {
        company_name: ['company', 'employer', 'organization', 'business'],
        job_title: ['job', 'position', 'title', 'role', 'post'],
        from: ['start date', 'from', 'beginning', 'start'],
        to: ['end date', 'to', 'until', 'end'],
        experience: ['description', 'responsibilities', 'duties', 'details', 'experiences', 'work experience', 'experience'],
    };

    Object.entries(fieldMappings).forEach(([key, relatedFields]) => {
        const inputFieldSelectors = relatedFields.map(field => `input[name*="${field}" i], textarea[name*="${field}" i]`);
        const inputFields = document.querySelectorAll(inputFieldSelectors.join(', '));

        inputFields.forEach(input => {
            if (experience && experience[key]) {
                input.value = experience[key];
            } else {
                input.value = ""; // Clear the field if no data available
            }
        });
    });
}



