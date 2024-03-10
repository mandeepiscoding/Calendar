$(document).ready(function () {
  
  // Function to update time blocks based on current time
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    // Loop through each time block
    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      // Check if block hour is in the past, present, or future relative to current time
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Function to display the current date in the header
  function displayCurrentDate() {
    var currentDate = dayjs().format("MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }

  // Function to load saved input from local storage into time blocks
  function loadSavedInput() {
    $(".time-block").each(function () {
      var blockId = $(this).attr("id");
      var savedInput = localStorage.getItem(blockId);

      // If there's saved input, load it into the corresponding time block
      if (savedInput !== null) {
        $(this).find(".description").val(savedInput);
      }
    });
  }

  // Initial setup: update time blocks, display current date, and load saved input
  updateTimeBlocks();
  displayCurrentDate();
  loadSavedInput();

  // Event listener for when Save button is clicked
  $(".saveBtn").on("click", function () {
    var blockId = $(this).closest(".time-block").attr("id");
    var userInput = $(this).siblings(".description").val();

    // Save user input to local storage with corresponding time block ID
    localStorage.setItem(blockId, userInput);
  });
});