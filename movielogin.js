let loginForm = document.getElementById("signin-form")
let emailInput = document.getElementById("email")
let passwordInput = document.getElementById("password")
let emailAlert = document.getElementById("email-alert")
let passwordAlert = document.getElementById("password-alert")


// Email validation
emailInput.addEventListener("keyup", function(){
    emailValidation()
});
function emailValidation(){
    let userEmail = emailInput.value.trim()
    if(userEmail.length == 0){
        emailAlert.innerText = "Enter a valid email"
        emailInput.style.border = "1px solid red"
    } else if(!userEmail.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')){
        emailAlert.innerText = "You have to enter a correct email address"
    } else{
        emailAlert.innerText = ""
        emailInput.style.border = "1px solid green"
    }
}

// Password validation
passwordInput.addEventListener("keyup", function(){
    passwordValidation()
})
function passwordValidation(){
    let passwordEntered = passwordInput.value.trim()
    if(passwordEntered.length == 0){
        passwordAlert.innerText = "Enter a valid password"
        passwordInput.style.border = "1px solid red"
    } else {
        passwordAlert.innerText = ""
        passwordInput.style.border = "1px solid green"
    }
}

    let userArray = []

loginForm.addEventListener("submit", function(event){
    event.preventDefault()

    let userEmailEntered = emailInput.value.trim()
    let userPasswordEntered = passwordInput.value.trim()

    const userLiteral = {
        emailOfUser : userEmailEntered,
        passwordOfUser : userPasswordEntered
    }

    userArray.push(userLiteral)
    localStorage.setItem("StoredUser", JSON.stringify(userArray))

    
    setTimeout(() => {
        alert("Log in successful")
    }, 5000);
    
    loginForm.reset()
    window.location.href = "movie.html"
})