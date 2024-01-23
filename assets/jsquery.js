$("#currentDay").text(dayjs().format('dddd, MMMM D[th]'));  // current day on the header
var currentHour=dayjs().hour();
var container=$(".container");
var hoursOfDay= {9:"9AM", 10:"10AM", 11:"11AM", 12:"12PM", 13:"1PM", 14:"2PM", 15:"3PM", 16:"4PM", 17:"5PM" };
var messageBox = $("<h3>").css({ display: "none", justifyContent: "center"}).text("!!Saved to LocalStorage!!💾").appendTo($(container));

for (var key in hoursOfDay){              // creating timeblocks 

    var timeBlock=$("<div>").addClass("row")
    var hourEl=$("<div>");                      
    var textInput=$("<textarea>").attr("data-hour",key);     // embeded custom data to <texarea> element      
    var saveButton=$("<button>");             
    
    hourEl.addClass("hour").css({display:"flex",flex:"1",justifyContent:"center",paddingTop:"20px"});         //added relevant classes to timeblock elements    
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

function timeChecker() {
    currentHour=dayjs().hour();                              //to get current hour dynamically after each min
    $("textarea").each(                                      // added function works for each textarea
        function (){
            let hour = this.dataset.hour;                    //with data-hour attribute now I can get hour value of the textarea
            let textArea = $(this);
            textArea.removeClass("past present future");      //prevent adding classes repeatedly
            
            if(Number(hour)<currentHour){                     
                textArea.addClass("past")                  
            }                                                
            else if(Number(hour) === currentHour){             
                textArea.addClass("present")
            }
            else{
                textArea.addClass("future");
            }
        }
    );
}
setInterval(timeChecker,60000)                              //each min will check the blocks colors

function messageTimer(){                                     //clear message displaying after 800msec
    var timer = setInterval(function() {
            messageBox.css({display: "none"});
            clearInterval(timer);
        }, 800) 
}        
    
    $(".bi").on("click",function(event) {                  // added click event to button class
        event.preventDefault();
        var clickedEvent=$(event.target).parents().eq(1)        //get parent of clicked element
        var inputValue=clickedEvent.find("textarea").val();         
        var hourValue=clickedEvent.find(".hour").text();
        localStorage.setItem(hourValue,inputValue);         //storing to localstorage
        messageBox.css({display:"flex"});   
        messageTimer();
    })
   