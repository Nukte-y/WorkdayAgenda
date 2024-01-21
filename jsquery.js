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
    hourEl.text(hoursOfDay[key]);                    //get content from the hoursOfDay object
    
        if(Number(key)<currentHour){                     //creating colorcode with related classes
            textInput.addClass("past")                   
        }                                                //days.hour returns number and object property key is string
        else if(Number(key) === currentHour){            //so to compare them first convert string to Number 
            textInput.addClass("present")
        }
        else{
            textInput.addClass("future");
        }

    var saveIcon=$("<i>").appendTo(saveButton);
    saveIcon.addClass("bi bi-floppy");
    textInput.text(localStorage.getItem(hoursOfDay[key]))    // get stored texts from localstorage
        
}  
    
    $(".bi").on("click",function(event) {                  // added click event to button class
        
        event.preventDefault();
        var clickedEvent=$(event.target).parents().eq(1)        //get parent of clicked element
        var inputValue=clickedEvent.find("textarea").val();         
        var hourValue=clickedEvent.find(".hour").text();
        localStorage.setItem(hourValue,inputValue);         //storing to localstorage

    })
   