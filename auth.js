//the 'submit' below refers to the state where the form reads the entire form's values and tries to send it away/use it
//async is used to perform the operation in the background so the page doesn't freeze while waiting for the operation to complete
//event is an object created by the browser that contains all the data regarding the event that occurred (in this case, the form submission)
async function submitRegistrationForm(event) {
    document.getElementById("registerForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form from submitting normally
    
        //client side validation (saves server resources)
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
    
        if(username !== "" && email !== "" && password !== "" && confirmPassword !== "") {
        if(password !== confirmPassword) {
            alert("Passwords do not match!\nPlease re-enter your password.");

        }
        else if(password.length < 8) {
            alert("Password must be at least 8 characters long!");

        }
        else if(username.length < 3 || username.length > 20) {
            alert("Username must be between 3 and 20 characters long!");

        }
        else if(!email.includes("@") || !email.includes(".")) {
            alert("Please enter a valid email address!");

        }
        else {
            //the following code will be used to send the form data to the server (currently just an alert for testing purposes)
            alert("Registration successful!"); // Placeholder for successful registration
        }
    }
    
        
    
        
    });
}



async function submitLoginForm(event){
    
}
