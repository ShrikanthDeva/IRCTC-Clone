let[month, date, year] = new Date().toLocaleDateString("en-IN").split("-");
document.getElementById("date_id").innerHTML = "Today's Date : "+month, date, year;

