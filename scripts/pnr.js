const getData = () => {
    const pnr = document.getElementById('pnr-no').value
    
    const pnr_json = {
        'pnr': pnr
    }
    
    const value = JSON.stringify(pnr_json)
    sendJsonData(value);
}

const sendJsonData = (data) => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://192.168.43.203:5000/pnr"); 

    xhr.onload = function(event){ 
        const data1 = JSON.parse(xhr.response)
        // localStorage.setItem('response', xhr.response)

        if (xhr.status != 200) {
            displayErrorMessage(data1.status)
        }
        else {
            window.location.href = "pnr_result.html"
            console.log(data1)
        }
    }; 
    
    var res = localStorage.getItem('response')
    var token = JSON.parse(res).token
    
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Authorization', token)
    xhr.send(data);
}

const displayErrorMessage = (message) => {

    if (document.getElementById('error-message')) { 
        const m = document.getElementById('error-message')
        m.parentNode.removeChild(m)
    } 
        const msg = document.createElement('p')
        msg.id = "error-message"
        msg.textContent = message
        msg.classList.add('shake')


    document.querySelector('.pnr-container').appendChild(msg)
}

const submit = document.getElementById('submit');
submit.addEventListener('click', getData)