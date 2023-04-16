// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
let intervalID;
let curTimeDate;
let curSchedule = {
  text:[],
  era:[]
};
let timeEl = $("#currentDay");
let plannerEl = $("#planner");
let saveButton = $(".saveBtn");

$(function () {
  intervalID = setInterval(function(){
    curTimeDate = dayjs();
    timeEl.text(curTimeDate.format("dddd, MMMM DD, YYYY - hh:mm:ss A"));
  }, 1000);

  init();

  saveButton.on("click", function(event){
    
  });

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

});

function init(){
  getFromLocal();

  for(let i = 0; i < 24; i++){
    displayEvent(i);
  
    console.log(i);
    console.log(curSchedule.text[i]);
    console.log(curSchedule.era[i]);
  }
}

function saveToLocal (){
  localStorage.setItem("schedule", curSchedule);
}

function getFromLocal (){
  let storedSchedule = JSON.parse(localStorage.getItem("schedule"));

  if(storedSchedule !== null){
    curSchedule = storedSchedule;
    return true;
  }
  else{
    return false;
  }
}

function checkEra (timeslot){
  let curHour = dayjs().format("HH");

  if(curHour > timeslot){
    return "past";
  }
  else if(curHour < timeslot){
    return "future";
  }
  else{
    return "present";
  }
}

function displayEvent (timeslot){
  let curHour = "#hour-" + timeslot;
  let hourEl = plannerEl.children(curHour);
  let textEl = plannerEl.children(curHour).children("textarea");

    if(curSchedule.text[timeslot] == undefined){
      curSchedule.text[timeslot] = "";
    }

    if(curSchedule.era[timeslot] == undefined){
      curSchedule.era[timeslot] = checkEra(timeslot);
    }

    textEl.val(curSchedule.text[timeslot]);
    hourEl.addClass(curSchedule.era[timeslot]);
}