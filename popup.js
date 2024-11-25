
document.addEventListener('DOMContentLoaded', function(){

    
    document.getElementById('experiences').textContent = "hello"
    
    
    
})


function loadJson() {

fetch('mycv.json')
.then(response => response.json())
.then(data=> {

    experiences = data;
    return experiences;

})

}
