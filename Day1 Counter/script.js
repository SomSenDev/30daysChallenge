const increase = document.querySelector(".increase");
const decrease = document.querySelector(".decrease");
const reset = document.querySelector(".reset");
const counter = document.querySelector(".counter");

let count = 0;

increase.addEventListener("click", () => {
    count++;
    counter.textContent = count;
    if (count > 0) {
        counter.style.color = "blue";
    } else if (count === 0) {
        counter.style.color = "black";
        
    }
    }
);

decrease.addEventListener("click", () => {
    count--;
    counter.textContent = count;
    if (count < 0) {
        counter.style.color = "red";
    } else if (count === 0) {
        counter.style.color = "black";
    }
    }
);

reset.addEventListener("click", () => {
    count = 0;
    counter.textContent = count;
    counter.style.color = "black";
    }
);

