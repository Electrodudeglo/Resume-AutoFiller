document.addEventListener('DOMContentLoaded', function() {
    const experiencesContainer = document.getElementById('experiences');
    loadCv();
});

function loadCv() {
    fetch('mycv.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.experiences && Array.isArray(data.experiences)) {
                displayExperiences(data.experiences);
            }
        })
        .catch(error => console.error('Error:', error));
}

function displayExperiences(experiences) {
    const experiencesContainer = document.getElementById('experiences');
    experiences.forEach((experience, index) => {
        const experienceElement = createExperienceEntry(experience, index);
        experiencesContainer.appendChild(experienceElement);
    });
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
    
    // Add event listener for dropdown functionality
    const header = entryDiv.querySelector('.experience-header');
    const content = entryDiv.querySelector('.experience-content');
    const dropdownArrow = entryDiv.querySelector('.dropdown-arrow');
    
    header.addEventListener('click', () => {
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
        dropdownArrow.textContent = content.style.display === 'block' ? '▲' : '▼';
    });
    
// Modify the insert button event listener in createExperienceEntry function
const insertBtn = entryDiv.querySelector('.insert-button');
    insertBtn.addEventListener('click', () => {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'indexedCvs',
                data: experience,
                experienceId: index
            });
        });
    });

    // Add a listener for the insertionComplete message
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === 'insertionComplete' && message.experienceId === index) {
            if (message.fieldsInserted) {
                insertBtn.textContent = 'Experience Data Filled';
                insertBtn.style.backgroundColor = 'yellow';
                insertBtn.style.color = 'black';
            }
        }
    });

    return entryDiv;
}

