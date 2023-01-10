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
        console.log("from+index.js "+localStorage.getItem("token"))
        let url = "http://192.168.43.203:5000/"

        fetch(url+'user/home', {
    
        method: 'POST', // or 'PUT'
        headers: {    
            'Authorization':'Bearer '+localStorage.getItem("token"),
                'Accept': 'application/json,text/plain,*/*',
                'Content-Type': 'application/json'      
            },
            body: jsonStringObj
    
        }).then((response) => response.json())
        .then((data) => {
            
                
                localStorage.setItem("response",data)
                console.log(data)
                // console.log(data[0]['time'])
                // localStorage.setItem('time',data[0]['time'])
                // window.location.href="/trains.html"
                // var dur=document.createElement('p');
                // dur.innerHTML='html'



            }).catch((error) => {
                console.dir('Error:', error);
        });
    



    }
}

// function showdata()
// {
//     let data  = localStorage.getItem("response")
//     const newNode = createElement("p")
//     newNode.id = "data"
//     const displayText = document.createTextNode(data)


// }


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