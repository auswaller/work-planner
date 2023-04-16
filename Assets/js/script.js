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
  //displays current time in header and updates every second
  intervalID = setInterval(function(){
    curTimeDate = dayjs();
    timeEl.text(curTimeDate.format("dddd, MMMM DD, YYYY - hh:mm:ss A"));
  }, 1000);

  init();

  //when a save button is clicked the text in the corresponding <textarea> is saved to the index of curSchedule.text that lines up to the index of the hour taken from the parent id
  saveButton.on("click", function(){
    let buttonParent = $(this).parent();
    let eventClickedId = buttonParent.attr("id");
    let eventClickedText = buttonParent.children("textarea").val();

    curSchedule.text[eventClickedId.match(/\d+/)[0]] = eventClickedText;
    saveToLocal()
  });
});

//runs on load and tries to load anything saved in local storage. Then verifies that there is data in the curSchedule object and if not adds an empty string and the proper era based on the current time
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

//checks the era of the timeslot that is passed into the function and returns the proper class name
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

//displays the text and changes the color of the current hour's timeslot on the schedule
function displayEvent (timeslot){
  let curHour = "#hour-" + timeslot;
  let hourEl = plannerEl.children(curHour);
  let textEl = plannerEl.children(curHour).children("textarea");

  textEl.val(curSchedule.text[timeslot]);
  hourEl.addClass(curSchedule.era[timeslot]);
}