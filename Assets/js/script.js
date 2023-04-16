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

  saveButton.on("click", function(){
    let buttonParent = $(this).parent();
    let eventClickedId = buttonParent.attr("id");
    let eventClickedText = buttonParent.children("textarea").val();

    curSchedule.text[eventClickedId.match(/\d+/)[0]] = eventClickedText;
    saveToLocal()
  });
});

function init(){
  getFromLocal();

  for(let i = 0; i < 24; i++){
    if(curSchedule.text[i] == undefined){
      curSchedule.text[i] = "";
    }

    if(curSchedule.era[i] == undefined){
      curSchedule.era[i] = checkEra(i);
    }
    
    displayEvent(i);
  }
}

function saveToLocal (){
  localStorage.setItem("schedule", JSON.stringify(curSchedule));
}

function getFromLocal (){
  let storedSchedule = JSON.parse(localStorage.getItem("schedule"));

  if(storedSchedule !== null){
    curSchedule = storedSchedule;
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

  textEl.val(curSchedule.text[timeslot]);
  hourEl.addClass(curSchedule.era[timeslot]);
}