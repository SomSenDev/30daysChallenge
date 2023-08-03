//error fucntion
const error = (className, message) => {
    const error = document.querySelector(className)
    error.innerHTML = message
}

function formValidate(){
    //get the values from the form
    const fullname = document.getElementById('fullname').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const gender = document.querySelector('input[name="gender"]:checked');

    //set the error values
    var fullnameError = usernameError = emailError = phoneError = passwordError = confirmPasswordError = genderError = true; 

    //validate the values
    if(fullname === ''){
        error('.fullnameError', 'Please enter your fullname');
    }else{
        error('.fullnameError', '');
        fullnameError = false;
    }

    if(username === ''){
        error('.usernameError', 'Please enter your username');
    }else{
        error('.usernameError', '');
        usernameError = false;
    }

    if(email === ''){
        error('.emailError', 'Please enter your email');
    }else{
        error('.emailError', '');
        emailError = false;
    }

    if(phone === ''){
        error('.phoneError', 'Please enter your phone number');
    }else{
        if(phone.length < 11){
            error('.phoneError', 'Please enter a valid phone number');
        }else{
            error('.phoneError', '');
            phoneError = false;
        }
    }

    if(password === ''){
        error('.passwordError', 'Please enter your password');
    }else{
        if(password.length < 6){
            error('.passwordError', 'Password must be at least 6 characters');
        }else{
            error('.passwordError', '');
            passwordError = false;
        }
    }

    if(confirmPassword === ''){
        error('.confirmPasswordError', 'Please confirm your password');
    }else{
        if(confirmPassword !== password){
            error('.confirmPasswordError', 'Password does not match');
        }else{
            error('.confirmPasswordError', '');
            confirmPasswordError = false;
        }
    }
    if(gender == null){
        error('.genderError','please choose one them');
    }
    else{
        error('.genderError','');
        genderError = false;
    }
    //prevent the form from submitting if there is an error
    if(fullnameError || usernameError || emailError || phoneError || passwordError || confirmPasswordError || genderError){
        return false;
    }else{
        alert('Form submitted successfully');
    }


}
//formValidation function

