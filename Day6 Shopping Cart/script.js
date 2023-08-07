//funtion to reset the input and totals

function resetForm() {
    const quantity_num = document.querySelectorAll(".quantity_num");
    quantity_num.forEach((quantity) => {
        quantity.value = 0;
    });
    
}

resetForm();

//functon to calculate the total price of each product
function cart(id){
    const quantity_num = document.querySelectorAll(".quantity_num")[id].value;
    const quantity = (document.querySelectorAll(".quantity")[id].innerHTML).slice(1);
    document.querySelectorAll(".item_total")[id].innerHTML = `$${quantity_num * quantity}`;
    //total price of all products
    document.querySelector(".total").innerHTML +=`${(
        document.querySelectorAll(".item_total")[id].innerHTML
    ).slice(1)}`;
    
}

//button to calculate the total price of all products and the shipping cost
document.querySelector(".btn").addEventListener("click", () => {
    //get the selected shipping option
    const selected = document.querySelector('select')
    const selectedOption = selected.options[selected.selectedIndex].value;
    //add the shipping cost to the total price of all products
    document.querySelector(".total_cost").innerHTML = `$${parseInt(document.querySelector(".total").innerHTML.slice(1)) + parseInt(selectedOption)}`;
});

   

