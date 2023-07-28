$(function () {
    // Function to display the current day at the top of the calendar
    function displayCurrentDay() {
      var currentDay = dayjs().format('dddd, MMMM D, YYYY');
      $('#currentDay').text(currentDay);
    }

    // Function to update the color of each time block based on the current hour
    function updateColor() {
      var currentHour = dayjs().hour();

      $('.time-block').each(function () {
        var timeBlockHour = parseInt($(this).attr('data-hour'), 10);//Updated HTML with data- attribute

        if (timeBlockHour < currentHour) {
          $(this).addClass('past').removeClass('present future');
        } else if (timeBlockHour === currentHour) {
          $(this).addClass('present').removeClass('past future');
        } else {
          $(this).addClass('future').removeClass('past present');
        }
      });
    }

    // Function to load saved events from local storage
    function loadEvents() {
      $('.time-block').each(function () {
        var storeKey = $(this).attr('id');
        var storedVal = localStorage.getItem(storeKey);

        if (storedVal !== null) {
          $(this).find('.description').val(JSON.parse(storedVal));
        }
      });
    }

    // Function to handle saving events to local storage
    function saveEvent(event) {
      var button = $(event.target);
      var timeBlock = button.closest('.time-block');
      var storedVal = timeBlock.find('.description').val();
      var storeKey = timeBlock.attr('id');

      if (storeKey && storedVal !== '') {
        localStorage.setItem(storeKey, JSON.stringify(storedVal));
      }

      console.log(storedVal);
    }


    // Display the current day at the top of the calendar
    displayCurrentDay();

    // Load saved events from local storage
    loadEvents();

    // Update color coding initially and every minute to handle changes in time
    updateColor();
    setInterval(updateColor, 60000); // Update every minute

    // Attach event handler for save buttons
    $('.saveBtn').on('click', saveEvent);
  });