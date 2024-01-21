$("#currentDay").text(dayjs().format('dddd, MMMM D[th]'));  // current day on the header
var currentHour=dayjs().hour(); 
var container=$(".container");
var hoursOfDay= {9:"9AM", 10:"10AM", 11:"11AM", 12:"12PM", 13:"1PM", 14:"2PM", 15:"3PM", 16:"4PM", 17:"5PM" }

for (var key in hoursOfDay){              // creating timeblocks 

    var timeBlock=$("<div>").addClass("row")
    var hourEl=$("<h2>");                      
    var textInput=$("<textarea>");            
    var saveButton=$("<button>");             
    
    hourEl.addClass("hour").css({flex:"1"});         //added relevant classes to timeblock elements    
    textInput.css({flex:"10"});
    saveButton.addClass("saveBtn").css({flex:"1"});
    timeBlock.append(hourEl,textInput,saveButton);   //append timeblock elements under the parent element
    container.append(timeBlock);
}
 