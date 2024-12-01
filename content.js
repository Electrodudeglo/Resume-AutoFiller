const fieldMappings = {
    companyName: ['company', 'employer', 'organization', 'business'],
    jobTitle: ['job', 'position', 'title', 'role', 'post'],
    from: ['start date', 'from', 'beginning', 'start'],
    to: ['end date', 'to', 'until', 'end'],
    experience: ['description', 'responsibilities', 'duties', 'details', 'experiences', 'work experience', 'experience'],
};


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'indexedCvs') {
        
        const experiences = request.data;

        sendResponse(findAllFields())
        
    }
});


function findAllFields() {
    const matchedFields = {};

    for (const [key, synonyms] of Object.entries(fieldMappings)) {
        const selector = synonyms.map(synonym => 
            `input[name*="${synonym}" i], input[id*="${synonym}" i], input[placeholder*="${synonym}" i], textarea[name*="${synonym}" i], textarea[id*="${synonym}" i], textarea[placeholder*="${synonym}" i]`
        ).join(', ');

        const fields = document.querySelectorAll(selector);
        
        if (fields.length > 0) {
            matchedFields[key] = Array.from(fields).map(field => ({
                element: field,
                name: field.name || field.id || '',
                type: field.type || 'textarea'
            }));
        }
    }

    return matchedFields;
}



