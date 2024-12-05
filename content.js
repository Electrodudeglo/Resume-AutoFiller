chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'indexedCvs') {
        const experience = request.data;
        findAllFields(experience);
    }
});



function findAllFields(experience) {
    
    const companyRelatedFields = [
        'company',
        'employer',
        'organization',
        'firm',
        'business',
        'workplace',
        'corporation',
        'enterprise'
    ];

    const inputFieldSelectors = companyRelatedFields.map(field => `input[name*="${field}" i]`);
    const inputFields = document.querySelectorAll(inputFieldSelectors.join(', '));

    inputFields.forEach(input => {
        if (experience) {
            input.value = experience.company_name;
        } else {
            input.value = "hello"; // fallback value if no company data
        }
    });
}



