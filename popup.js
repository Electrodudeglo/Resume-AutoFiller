import {baseCv} from './mycv.js'

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

    // Add event listener for insert button
    const insertButton = entryDiv.querySelector('.insert-button');
    insertButton.addEventListener('click', () => {
        // Placeholder for insert functionality
        console.log('Insert button clicked for:', experience.company_name);
        // We'll implement the actual insert functionality later
    });

    return entryDiv;
}

function displayExperiences() {
    const experiencesContainer = document.getElementById('experiences');
    baseCv.cv_entries.forEach((experience, index) => {
        const entryElement = createExperienceEntry(experience, index);
        experiencesContainer.appendChild(entryElement);
    });
}

// Call the function to display experiences when the popup is loaded
document.addEventListener('DOMContentLoaded', displayExperiences);