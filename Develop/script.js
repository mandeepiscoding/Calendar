$(document).ready(function () {
  function updateTimeBlocks() {
    var currentHour = dayjs().hour();

    $(".time-block").each(function () {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);

      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  function displayCurrentDate() {
    var currentDate = dayjs().format("MMMM D, YYYY");
    $("#currentDay").text(currentDate);
  }

  function loadSavedInput() {
    $(".time-block").each(function () {
      var blockId = $(this).attr("id");
      var savedInput = localStorage.getItem(blockId);

      if (savedInput !== null) {
        $(this).find(".description").val(savedInput);
      }
    });
  }

  updateTimeBlocks();
  displayCurrentDate();
  loadSavedInput();

  $(".saveBtn").on("click", function () {
    var blockId = $(this).closest(".time-block").attr("id");
    var userInput = $(this).siblings(".description").val();

    localStorage.setItem(blockId, userInput);
  });
});