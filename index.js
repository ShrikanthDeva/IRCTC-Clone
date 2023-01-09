const nextPage = () => {
    addMoveOutTransitionEffect();

    addPasswordField();
    addMoveInTransitionEffect();

    addButton('Back', 'M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z');
    removeNextButton();
    addSubmitButton();
}

const prevPage = () => {
    console.log('Hi')

    document.getElementById('username').classList.remove('move-out-left')
    document.getElementById('username').classList.remove('move-in-right')
    document.getElementById('username').classList.add('move-in-right')
    document.getElementById('password').classList.remove('move-in-left')
    document.getElementById('password').classList.add('move-out-right')

    // Remove Back Button
    const back = document.getElementById('Back')
    document.getElementById('button-container').removeChild(back)

    // Remove Submit Button
    const submit = document.getElementById('submit')
    document.getElementById('button-container').removeChild(submit)

    // Add Next Button
    addButton('Next', 'M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z')

    document.getElementById('button-container').classList.remove('justify-space-between')
    
}

const removeUsernameField = () => {
    const username = document.getElementById('username');
    document.getElementById('credentials-form').removeChild(username)
}

const addMoveOutTransitionEffect = () => {
    // document.getElementById('username').classList.remove('move-out-left')
    // document.getElementById('username').classList.remove('animation-delay')
    // document.getElementById('username').classList.remove('move-reverse')
    document.getElementById('username').classList.remove('move-in-right')
    document.getElementById('username').classList.add('move-out-left')


    // console.log(document.getElementById('username').classList)
}

const addMoveInTransitionEffect = () => {
    document.getElementById('password').classList.remove('move-out-right')
    document.getElementById('password').classList.remove('move-in-left')
    document.getElementById('password').classList.add('move-in-left')
}

const addPasswordField = () => {

    if (document.getElementById('password')) {
        console.log("Element already exists")
        return
    }
    const password = document.createElement('input')
    password.type = 'password';
    password.name = "password";
    password.id = "password";
    password.placeholder = "Enter password";
    
    document.getElementById('credentials-form').appendChild(password)
    
}

const addButton = (buttonType, pathForSvg) => {

    const primaryButtonClass = 'primary next-btn'
    const secondaryButtonClass = 'secondary back-btn'

    const button = document.createElement('button')
    button.className = buttonType == 'Next' ? primaryButtonClass : secondaryButtonClass 
    button.id = buttonType

    const text = document.createElement('span')
    text.innerHTML = buttonType

    // adding BACK ICON 
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('fill', 'currentColor')
    svg.setAttribute('height', '18')
    svg.setAttribute('width', '18')
    svg.setAttribute('viewBox', '0 0 16 16')

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path.setAttribute('d', pathForSvg)
    svg.appendChild(path)

    if (buttonType == 'Next') {
        svg.classList.add('margin-left-2')
        button.appendChild(text)
        button.appendChild(svg)
    } else {
        button.appendChild(svg)
        button.appendChild(text)
    }

    document.getElementById('button-container').appendChild(button)
    if (buttonType == 'Back') {
        document.getElementById('Back').addEventListener('click', prevPage)
    } else {
        document.getElementById('Next').addEventListener('click', nextPage)
    }
}

const removeNextButton = () => {
    const next = document.getElementById('Next')
    document.getElementById('button-container').removeChild(next)
}

const addSubmitButton = () => {
    const button = document.createElement('button')
    button.className = 'primary next-btn'
    button.id = "submit"
    button.type = "submit"
    button.value = "Submit"
    // button.setAttribute('form', 'credentials-form')
    button.innerHTML = 'Submit'

    document.getElementById('button-container').appendChild(button)
    document.getElementById('button-container').classList.add('justify-space-between')
}

const sendFormData = () => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://10.140.16.42:5000/user/login"); 

    // This fires up when the connection is successful
    xhr.onload = function(event){ 
        // alert("Success, server responded with: " + event.target.response);
        localStorage.clear() 
        const dataa = JSON.parse(xhr.response)
        localStorage.setItem("token", dataa.token)

        displayStatus()
        console.log(xhr.response)
    }; 

    var formData = new FormData(document.getElementById("credentials-form")); 
    xhr.send(formData);
}

const displayStatus = () => {
    const res = localStorage.getItem("token")
    console.log(res)
    const status = JSON.parse(res)

    if (document.getElementById('status')) {
        const displayMessage = document.getElementById('status')
        displayMessage.parentNode.removeChild(displayMessage)
    }
        const newNode = document.createElement('p')
        newNode.id = 'status'
        newNode.classList.add('shake') 
    
        const displayText = document.createTextNode(status)
        newNode.appendChild(displayText)
    
        const buttons = document.getElementById('button-container')   
        const parent = buttons.parentNode
    
        parent.insertBefore(newNode, buttons)

}

var next_pg = document.getElementById('Next')
if (next_pg)
{
    document.getElementById('Next').addEventListener('click', nextPage)
}



// This is because the normal event listener gets clicked automatically from the Next button because they are in the same position. Cannot use "document.getElementById('submit').addEventListener('click', sendFormData())"
document.addEventListener( "click", someListener );

function someListener(event){
    var element = event.target;
    if(element.id == 'submit' && element.type == "submit"){
        sendFormData()
    }
}

// details page js

// min date fixer for calender
var date_pick = document.getElementById("datePickerId")
if (date_pick)
{
    datePickerId.min = new Date().toISOString().split("T")[0];
    document.getElementById("datePickerId").valueAsDate = new Date()
}

// function display missing fields
function displayStatus2()
{
    var from = document.getElementById("From").value;
    var to = document.getElementById("To").value;
    if (from == "" || to == "")
    {
        var status2 = document.getElementById('status2') 
        if (status2) {
            const displayMessage = document.getElementById('status2')
            displayMessage.parentNode.removeChild(displayMessage)
        }
        
        var status2 = "*Missing Fields"
        const newNode = document.createElement('p')
        newNode.id = 'status2'
        newNode.classList.add('shake') 
    
        const displayText = document.createTextNode(status2)
        newNode.appendChild(displayText)
    
        const buttons = document.getElementById('search')   
        const parent = buttons.parentNode
        parent.insertBefore(newNode, buttons)
        return false
               
    }
    var status2 = document.getElementById('status2') 
    if (status2) {
        const displayMessage = document.getElementById('status2')
        displayMessage.parentNode.removeChild(displayMessage)
    }
    return true
}

// form to json serialize
function json_serialize()
{

    let val =  displayStatus2();
    if (val)
    {
        let form_result = {}
        form_result.trainfrom = document.getElementById("From").value;    
        form_result.trainto = document.getElementById("To").value;    
        form_result.type = document.getElementById("TicketType").value;    
        form_result.class = document.getElementById("TicketClass").value;    
        form_result.date = document.getElementById("datePickerId").value;  
        if (document.getElementById("AvailableTrain").checked)  
        {
            form_result.trainavailable = document.getElementById("AvailableTrain").value;  
        }
        else
        {
            form_result.AvailableTrain = "no";
        }
        // console.log(form_result);
        let jsonStringObj = JSON.stringify(form_result);
        console.log(jsonStringObj);
        console.log(localStorage.getItem("token"))

        fetch('http://10.140.11.221:5000/user/home', {
    
        method: 'POST', // or 'PUT'
        headers: {    
            'Authorization':'Bearer '+localStorage.getItem("token"),
                'Accept': 'application/json,text/plain,/',
                'Content-Type': 'application/json'      
            },
            body: jsonStringObj
    
        }).then((response) => response.json())
        .then((data) => {
            
                
                localStorage.setItem("response",data)
                console.log(data)
                showdata()
            })
            .catch((error) => {
                console.dir('Error:', error);
        });
        
    }
}

function showdata()
{
    let data  = localStorage.getItem("response")
    const newNode = createElement("p")
    newNode.id = "data"
    const displayText = document.createTextNode(data)
    

}


function switch_inputs()
{
    var from = document.getElementById("From").value;
    var to = document.getElementById("To").value;

    var temp = from;
    from = to;
    to = temp;

    document.getElementById("From").value = from;
    document.getElementById("To").value = to;
       
}
    


var switch_input = document.getElementById("switch_inputs")
if (switch_input)
{
    document.getElementById("switch_inputs").addEventListener('click',switch_inputs)  
}


var search_btn = document.getElementById("search")
if (search_btn)
{
    document.getElementById("search").addEventListener('click',json_serialize)    
    
}