import { baseCv } from './mycv.js';

let filledExperiences = [];

function updateButtonStatus(response) {
    if (response && response.filledExperiences) {
        filledExperiences = response.filledExperiences;
    }
    document.querySelectorAll('.insert-button').forEach((button, index) => {
        const experience = baseCv.cv_entries[index];
        if (filledExperiences.includes(experience.company_name)) {
            button.textContent = "Filled";
            button.classList.add("filled");
            button.disabled = true;
        } else {
            button.textContent = "Insert";
            button.classList.remove("filled");
            button.disabled = false;
        }
    });
}

function createMetaInfoSection() {
    const metaInfoDiv = document.createElement('div');
    metaInfoDiv.className = 'meta-info';
    metaInfoDiv.innerHTML = `
        <h2 class="meta-info-header">Personal Information</h2>
        <div class="info-item">
            <div class="info-label">Name:</div>
            <div class="info-value">${baseCv.name}</div>
        </div>
        <div class="info-item">
            <div class="info-label">Email:</div>
            <div class="info-value">${baseCv.email}</div>
        </div>
        <div class="info-item">
            <div class="info-label">Phone:</div>
            <div class="info-value">${baseCv.phone}</div>
        </div>
    `;
    return metaInfoDiv;
}

function createExperienceEntry(experience, index) {
    const entryDiv = document.createElement('div');
    entryDiv.className = 'experience-entry';
    entryDiv.id = `experience-${index}`;
    entryDiv.innerHTML = `
        <div class="experience-header">
            <span>${experience.job_title} at ${experience.company_name}</span>
            <span class="dropdown-arrow">▼</span>
        </div>
        <div class="experience-content">
            <div class="info-item">
                <div class="info-label">Company Name:</div>
                <div class="info-value">${experience.company_name}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Job Title:</div>
                <div class="info-value">${experience.job_title}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Location:</div>
                <div class="info-value">${experience.location}</div>
            </div>
            <div class="info-item">
                <div class="info-label">From:</div>
                <div class="info-value">${experience.from}</div>
            </div>
            <div class="info-item">
                <div class="info-label">To:</div>
                <div class="info-value">${experience.to}</div>
            </div>
            <div class="info-item">
                <div class="info-label">Experience:</div>
                <div class="info-value experience-value">${experience.experience}</div>
            </div>
            <button class="insert-button">Insert</button>
        </div>
    `;
    
    addEventListeners(entryDiv, experience);
    return entryDiv;
}

function addEventListeners(entryDiv, experience) {
    const header = entryDiv.querySelector('.experience-header');
    const content = entryDiv.querySelector('.experience-content');
    const dropdownArrow = entryDiv.querySelector('.dropdown-arrow');
    const insertButton = entryDiv.querySelector('.insert-button');

    header.addEventListener('click', () => {
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
        dropdownArrow.textContent = content.style.display === 'block' ? '▲' : '▼';
    });

    insertButton.addEventListener('click', () => {
        console.log('Insert button clicked for:', experience.company_name);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "fillForm",
                data: experience
            }, function(response) {
                if (response && response.success) {
                    insertButton.textContent = "Filled";
                    insertButton.classList.add("filled");
                    insertButton.disabled = true;
                    filledExperiences.push(experience.company_name);
                    updateButtonStatus({ filledExperiences: filledExperiences });
                } else if (response && response.message) {
                    console.log(response.message);
                }
            });
        });
    });
}

function displayContent() {
    const container = document.getElementById('container');
    
    // Create and append meta info section
    const metaInfoSection = createMetaInfoSection();
    container.appendChild(metaInfoSection);
    
    // Create and append experiences section
    const experiencesSection = document.createElement('div');
    experiencesSection.id = 'experiences';
    container.appendChild(experiencesSection);
    
    // Populate experiences
    baseCv.cv_entries.forEach((experience, index) => {
        const entryElement = createExperienceEntry(experience, index);
        experiencesSection.appendChild(entryElement);
    });

    // Check filled status
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "getGreeting"}, function(response) {
            if (chrome.runtime.lastError) {
                console.log("Error: ", chrome.runtime.lastError.message);
            } else if (response && response.greeting) {
                console.log(response.greeting);
                updateButtonStatus(response);
            }
        });
    });
}

// Call the function to display content when the popup is loaded
document.addEventListener('DOMContentLoaded', displayContent);

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "updateFilledStatus") {
        updateButtonStatus(message);
    }
});