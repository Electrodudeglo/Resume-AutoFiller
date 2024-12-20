const fieldMappings = {
    company_name: ['company', 'employer', 'organization', 'business'],
    job_title: ['job', 'position', 'title', 'role', 'post'],
    from: ['start date', 'from', 'beginning', 'start'],
    to: ['end date', 'to', 'until', 'end'],
    experience: ['description', 'responsibilities', 'duties', 'details', 'experiences', 'work experience', 'experience'],
    location: ['location', 'place', 'city', 'country']
};

let filledExperiences = [];

function findAllInputs(fieldName) {
    const possibleNames = fieldMappings[fieldName] || [fieldName];
    let inputs = [];
    
    for (const name of possibleNames) {
        inputs = inputs.concat(Array.from(document.querySelectorAll(
            `input[name*="${name}" i], input[id*="${name}" i], 
            textarea[name*="${name}" i], textarea[id*="${name}" i]`
        )));
        
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

function findEmptyExperienceSection() {
    const sections = document.querySelectorAll('form, div[class*="experience"], section[class*="experience"]');
    for (let section of sections) {
        const inputs = section.querySelectorAll('input, textarea');
        if (Array.from(inputs).every(input => !input.value)) {
            return section;
        }
    }
    return null;
}

function fillForm(experience) {
    const emptySection = findEmptyExperienceSection();
    if (!emptySection) return false;

    let fieldsInserted = false;
    
    Object.keys(fieldMappings).forEach(key => {
        if (experience && experience[key]) {
            const inputs = findAllInputs(key).filter(input => emptySection.contains(input));
            for (let input of inputs) {
                if (fillField(input, experience[key])) {
                    fieldsInserted = true;
                    break;
                }
            }
        }
    });

    if (fieldsInserted) {
        filledExperiences.push(experience.company_name);
    }

    return fieldsInserted;
}

function checkFilledFields() {
    let filledFields = {};
    const sections = document.querySelectorAll('form, div[class*="experience"], section[class*="experience"]');
    
    sections.forEach((section, index) => {
        filledFields[index] = {};
        Object.keys(fieldMappings).forEach(key => {
            const inputs = findAllInputs(key).filter(input => section.contains(input));
            filledFields[index][key] = inputs.some(input => input.value.trim() !== '');
        });
    });

    const allFilled = Object.values(filledFields).every(section => 
        Object.values(section).every(filled => filled)
    );

    chrome.runtime.sendMessage({
        action: "updateFilledStatus",
        allFilled: allFilled,
        filledFields: filledFields,
        filledExperiences: filledExperiences
    });

    return allFilled;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "fillForm") {
            if (filledExperiences.includes(request.data.company_name)) {
                sendResponse({success: false, message: "This experience has already been filled."});
            } else {
                const success = fillForm(request.data);
                sendResponse({success: success});
                setTimeout(checkFilledFields, 500);
            }
        } else if (request.action === "getGreeting") {
            const allFilled = checkFilledFields();
            sendResponse({greeting: allFilled ? "All fields are filled!" : "Some fields are empty."});
        }
    }
);

// Check filled fields periodically
setInterval(checkFilledFields, 5000);