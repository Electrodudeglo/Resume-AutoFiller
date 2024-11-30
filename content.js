const fieldMappings = {
    companyName: ['company', 'employer', 'organization', 'business'],
    jobTitle: ['job', 'position', 'title', 'role', 'post'],
    from: ['start date', 'from', 'beginning', 'start'],
    to: ['end date', 'to', 'until', 'end'],
    experience: ['description', 'responsibilities', 'duties', 'details', 'experiences', 'work experience', 'experience'],
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'indexedCvs') {
        const experience = request.data;
        
        // Find the company name input field
        const companyInput = document.querySelector('input[name="company_name"], input[placeholder*="company"], input[id*="company"]');
        
        // If found, fill it with the company name
        if (companyInput) {
            companyInput.value = experience.company_name;
            
            // Trigger input event to notify any listeners
            const inputEvent = new Event('input', { bubbles: true });
            companyInput.dispatchEvent(inputEvent);
            
            console.log('Company name filled:', experience.company_name);
        } else {
            console.log('Company name input field not found');
        }
    }
});

