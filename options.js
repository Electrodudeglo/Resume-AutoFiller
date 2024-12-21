document.addEventListener('DOMContentLoaded', function() {
    const cvDataTextarea = document.getElementById('cvData');
    const saveButton = document.getElementById('saveButton');
    const clearButton = document.getElementById('clearButton'); // New clear button
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

    // New clear button functionality
    clearButton.addEventListener('click', function() {
        chrome.storage.local.remove('aiGeneratedCv', function() {
            cvDataTextarea.value = '';
            messageDiv.textContent = 'CV data cleared successfully!';
            messageDiv.style.color = 'blue';
            console.log('CV Data cleared');
        });
    });
});