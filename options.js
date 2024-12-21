document.addEventListener('DOMContentLoaded', function() {
    const cvDataTextarea = document.getElementById('cvData');
    const saveButton = document.getElementById('saveButton');
    const messageDiv = document.getElementById('message');

    // Load existing CV data if available
    chrome.storage.local.get('aiGeneratedCv', function(result) {
        if (result.aiGeneratedCv) {
            cvDataTextarea.value = result.aiGeneratedCv;
        }
    });

    saveButton.addEventListener('click', function() {
        const aiGeneratedCv = cvDataTextarea.value;
        chrome.storage.local.set({ aiGeneratedCv : aiGeneratedCv}, function() {
            messageDiv.textContent = 'CV data saved successfully!';
            messageDiv.style.color = 'green';
            console.log('Saved CV Data:', aiGeneratedCv);
        });
    });
});





