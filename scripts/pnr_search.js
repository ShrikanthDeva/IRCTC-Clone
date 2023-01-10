let validpnr = 1234567890;

var form=document.getElementById('Form');


form.addEventListener('submit',function(event){
    event.preventDefault();
    let inputpnr = document.getElementById("pnr_input").value;
    console.log(inputpnr);

    if(inputpnr == validpnr){
        console.log("pnr match");
        window.location = "pnr_result.html";
        document.getElementById("pnr_number").innerHTML = "You Queried for : PNR number : "+inputpnr;
    }
    else{
        console.log("pnr not matching");
        alert("PNR number is not matching\nEnter correct PNR number");
    }
})

