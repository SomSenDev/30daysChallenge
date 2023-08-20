// Define currentYear in the global scope and initialize it with the current year
let currentDate = new Date();
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get references to important elements
  const yearText = document.querySelector(".year-text");
  const monthElements = document.querySelectorAll(".months .month");
  const table = document.querySelector("table");
  const leftArrow = document.querySelector(".left");
  const rightArrow = document.querySelector(".right");
  const returnToToday = document.querySelector(".returnToToday");


  // day and month
  document.querySelector(".day").innerHTML = currentDate.getDate();
  document.querySelector(".month").innerHTML = currentDate.toLocaleString('default', { month: 'long' });
  let isToggle = false;
  //menu 
  document.querySelector(".menu").addEventListener("click", function () {
    if (!isToggle) {
      document.querySelector(".left-side").style.display = "block";
      isToggle = true;
    } else {
      document.querySelector(".left-side").style.display = "none";
      isToggle = false;
    }

  });
  

  // Function to update the calendar based on the current year and month
  function updateCalendar() {

    // Update the year text
    yearText.textContent = currentYear;

    // Loop through month elements and add a class to highlight the current month
    monthElements.forEach((monthElement, index) => {
      if (index === currentMonth) {
        monthElement.classList.add("current-month");
      } else {
        monthElement.classList.remove("current-month");
      }
    });

    // Clear the table
    table.innerHTML = "";

    // Create a new date object for the first day of the current month
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);

    // Get the number of days in the current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Get the day of the week for the first day of the month (0 = Sunday, 1 = Monday, ...)
    const startDayOfWeek = firstDayOfMonth.getDay();

    // Create the table headers (SUN, MON, TUE, ...)
    const headerRow = document.createElement("tr");
    for (let i = 0; i < 7; i++) {
      const headerCell = document.createElement("th");
      headerCell.textContent = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][i];
      headerRow.appendChild(headerCell);
    }
    table.appendChild(headerRow);

    // Create the rows and cells for the days in the month
    let currentDay = 1;
    for (let row = 0; row < 6; row++) {
      const newRow = document.createElement("tr");
      for (let col = 0; col < 7; col++) {
        const newCell = document.createElement("td");
        if (row === 0 && col < startDayOfWeek) {
          // Empty cells before the first day of the month
          newCell.textContent = "";
        } else if (currentDay <= daysInMonth) {
          newCell.textContent = currentDay;
          if (currentDay === currentDate.getDate() && currentYear === currentDate.getFullYear() && currentMonth === currentDate.getMonth()) {
            newCell.classList.add("today");
          }
          currentDay++;
        }
        newRow.appendChild(newCell);
      }
      table.appendChild(newRow);
    }
  }

  // Initial calendar update
  updateCalendar();

  // Event listener for clicking the left arrow
  leftArrow.addEventListener("click", function () {
    currentYear--;
    updateCalendar();
  });

  // Event listener for clicking the right arrow
  rightArrow.addEventListener("click", function () {
    currentYear++;
    updateCalendar();
  });

  // Event listener for clicking the return to today button
  returnToToday.addEventListener("click", function () {
    currentYear = new Date().getFullYear();
    currentMonth = new Date().getMonth();
    updateCalendar();
  });

  // Event listeners for clicking on month elements
  monthElements.forEach((monthElement, index) => {
    monthElement.addEventListener("click", function () {
      currentMonth = index;
      console.log(currentMonth);
      updateCalendar();
    });
  });
});