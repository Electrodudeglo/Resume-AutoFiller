chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'indexedCvs') {
        let inputData = request.data[0]['company_name'];
        const result = findInputField(inputData);
        sendResponse(result);
    }
    return true; // Keeps the message channel open for asynchronous response
});

function findInputField(inputData) {
    
    const companyName = document.querySelector('input[id="company_name_1"], input[name="company_name_1"]');

    companyName.value = inputData;
    
}