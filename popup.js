import { baseCv } from './mycv.js';

function createMetaInfoSection() {
  const metaInfoDiv = document.createElement('div');
  metaInfoDiv.className = 'meta-info';
  metaInfoDiv.innerHTML = `
      <h2 class="meta-info-header">Meta Information</h2>
      <div class="info-item">
          <div class="info-label">CV Type:</div>
          <div class="info-value">${baseCv.meta_tag.cv_type}</div>
      </div>
      <div class="info-item">
          <div class="info-label">AI Explanation:</div>
          <div class="info-value">${baseCv.meta_tag.ai_explanation}</div>
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
}

// Call the function to display content when the popup is loaded
document.addEventListener('DOMContentLoaded', displayContent);