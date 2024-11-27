chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'testingMsg') {
        let testData = request.data;
        const result = findInputField(testData);
        sendResponse(result);
    }
    return true; // Keeps the message channel open for asynchronous response
});

function findInputField(testData) {
    const companyName = document.querySelector('input[id="company_name_1"], input[name="company_name_1]');

    if (companyName) {
        companyName.value = testData; // Use .value instead of .textContent for input fields
        console.log('Data inserted successfully:', testData);
        return { success: true, message: 'Data inserted successfully' };
    } else {
        console.log('Company name input field not found');
        return { success: false, message: 'Company name input field not found' };
    }
}