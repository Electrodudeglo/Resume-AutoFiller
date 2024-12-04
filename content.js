chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'indexedCvs') {
        const experience = request.data;
        findAllFields(experience);
    }
});



function findAllFields(experience) {
    
    const inputFields = document.querySelectorAll('input[name^="company"]');

    inputFields.forEach(input => {
        if (experience && experience.company) {
            input.value = experience.company;
        } else {
            input.value = "hello"; // fallback value if no company data
        }
    });

   
}




