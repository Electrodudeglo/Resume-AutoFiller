const fieldMappings = {
    company_name: ['company', 'employer', 'organization', 'business'],
    job_title: ['job', 'position', 'title', 'role', 'post'],
    from: ['start date', 'from', 'beginning', 'start'],
    to: ['end date', 'to', 'until', 'end'],
    experience: ['description', 'responsibilities', 'duties', 'details', 'experiences', 'work experience', 'experience'],
    location: ['location', 'place', 'city', 'country']
};

function convertNowToDate(experience) {
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    return {
        ...experience,
        to: experience.to === 'now' ? today : experience.to
    };
}

function findAllInputs(fieldName) {
    const possibleNames = fieldMappings[fieldName] || [fieldName];
    let inputs = [];
    
    for (const name of possibleNames) {
        // Look for input fields and textareas
        inputs = inputs.concat(Array.from(document.querySelectorAll(
            `input[name*="${name}" i], input[id*="${name}" i], 
            textarea[name*="${name}" i], textarea[id*="${name}" i]`
        )));
        
        // Look for labels and their associated inputs
        document.querySelectorAll('label').forEach(label => {
            if (label.textContent.toLowerCase().includes(name.toLowerCase())) {
                const input = document.getElementById(label.htmlFor) ||
                              label.querySelector('input') ||
                              label.querySelector('textarea');
                if (input && !inputs.includes(input)) inputs.push(input);
            }
        });
    }
    
    return inputs;
}

function fillField(input, value) {
    if (input && !input.value) {
        input.value = value;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
    }
    return false;
}

function fillForm(experience) {
    let fieldsInserted = false;
    
    Object.keys(fieldMappings).forEach(key => {
        if (experience && experience[key]) {
            const inputs = findAllInputs(key);
            for (let input of inputs) {
                if (fillField(input, experience[key])) {
                    fieldsInserted = true;
                    break;
                }
            }
        }
    });

    return fieldsInserted;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "fillForm") {
            const convertedExperience = convertNowToDate(request.data);
            const success = fillForm(convertedExperience);
            sendResponse({success: success});
        }
    }
);