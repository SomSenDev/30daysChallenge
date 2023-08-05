//get color-box and h3
const colorBox = document.querySelectorAll(".color-box");
const colorName = document.getElementsByTagName('h3');



//function to generate random color

function generateRandomColor(){
    for(let i = 0; i < colorBox.length; i++){
        //generate random color
        const  randomColor = Math.floor(Math.random()*16777215).toString(16);
        //assign random color to color-box
        colorBox[i].style.backgroundColor = `#${randomColor}`;
        //assign random color to h3
        colorName[i].textContent = `#${randomColor}`;
        //on touch of colorbox the color name will be copied to clipboard
        colorBox[i].addEventListener("click", function(){
            //copy the color name to clipboard
            if(colorName[i].innerHTML != "Copied!"){
                navigator.clipboard.writeText(colorName[i].innerHTML);           
             }
            //change the h3 text to copied
            colorName[i].innerHTML = "Copied!";

            //set timeout to change the text back to color name
            setTimeout(function(){
                colorName[i].innerHTML = "#" + randomColor;
            }, 1000);
        });
    }

}


//add event listener to button
const btn = document.querySelector(".btn");
btn.addEventListener("click", generateRandomColor);
