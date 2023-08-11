const Horizantal = document.querySelector('.Horizantal');
const Vertical = document.querySelector('.Vertical');
const Blur = document.querySelector('.Blur');
const Spread = document.querySelector('.Spread');
const color = document.querySelector('.color');
const box__shadow = document.querySelector('#box');
const copy = document.querySelector('.copy');
const inset = document.querySelector('.inset');

let boxValue = '';
function changeBoxShadow() {
    const hor = Horizantal.value;
    const ver = Vertical.value;
    const blur = Blur.value;
    const spread = Spread.value;
    const colorValue = color.value;

    document.querySelector('.horNum').innerHTML = hor;
    document.querySelector('.verNum').innerHTML = ver;
    document.querySelector('.blurNum').innerHTML = blur;
    document.querySelector('.spreadNum').innerHTML = spread;
    
    if(inset.checked){
        boxValue = `${hor}px ${ver}px ${blur}px ${spread}px ${colorValue} inset`;
    }else{
        boxValue = `${hor}px ${ver}px ${blur}px ${spread}px ${colorValue}`;
    }
    box__shadow.style.boxShadow = boxValue;

}

Horizantal.addEventListener('input', changeBoxShadow);
Vertical.addEventListener('input', changeBoxShadow);
Blur.addEventListener('input', changeBoxShadow);
Spread.addEventListener('input', changeBoxShadow);
color.addEventListener('input', changeBoxShadow);
inset.addEventListener('input', changeBoxShadow);

//copy to clipboard
copy.addEventListener('click', () => {
    //copy boxValue to clipboard
    navigator.clipboard.writeText(
        `box-shadow: ${boxValue};
        -webkit-box-shadow: ${boxValue};
        -moz-box-shadow: ${boxValue};`
    );
    //then show copied in alert
    alert('Copied to clipboard');
})


//intialized update
changeBoxShadow();


