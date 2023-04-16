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

$(function () {
  intervalID = setInterval(function(){
    curTimeDate = dayjs();
    timeEl.text(curTimeDate.format("dddd, MMMM DD, YYYY - hh:mm:ss A"));
  }, 1000);

  init();

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

});

function init(){
  if(!getFromLocal()){
    for(let i = 0; i < 24; i++){
      curSchedule.text[i] = "";
      curSchedule.era[i] = checkEra(i);
      displayEvent(i);
  
      console.log(i);
      console.log(curSchedule.text[i]);
      console.log(curSchedule.era[i]);
    }
  }
  else{
    for(let i = 0; i < 24; i++){
      displayEvent(i);
  
      console.log(i);
      console.log(curSchedule.text[i]);
      console.log(curSchedule.era[i]);
    }
  }
}

function saveToLocal (info){
  localStorage.setItem("schedule", info);
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

  if(timeslot > 8 && timeslot < 18){
    plannerEl.children(curHour).children("textarea").val(curSchedule.text[timeslot]);
    plannerEl.children(curHour).addClass(curSchedule.era[timeslot]);
  }
}