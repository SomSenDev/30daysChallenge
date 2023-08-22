//https://github.com/swapnilsparsh/30DaysOfJavaScript/tree/master/04%20-%20Digital%20Clock 
//thanks to swapnilsparsh for the code and inspiration to make this clock


// Selecting all the elements
const hour = document.querySelector(".hour");
const minute = document.querySelector(".min");
const seconds = document.querySelector(".sec");
const ampm = document.querySelector(".pmam");

// Add 0 to the begining of number if less than 10
function formatTime(time) {
  return time.toString().padStart(2, "0");
}


// Check if it is AM or PM
function isAmPm(hours) {
  return hours >= 12 ? "PM" : "AM";
}

// Clock function
function clock() {

  const date = new Date();


  let h = date.getHours() % 12;
  h = h ? h : 12;
  let m = date.getMinutes();
  let s = date.getSeconds();

  hour.textContent = formatTime(h);
  minute.textContent = formatTime(m);
  seconds.textContent = formatTime(s);
  ampm.textContent = isAmPm(date.getHours());
}

// Calling clock function every 1 second

setInterval(clock, 1000);