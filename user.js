//the following will create an object constructor function (this way of creating an object is like a blueprint)
function user (name,password,balance)  {
    this.name,
    this.password,
    this.balance,
    this.getName = function (name){
        alert("The user's firstname is: " + name)
    }
}


//the following will be used to demonstrate the creation of an object literal (where an object is made as an once off)
const Person = {
    name: "Piet",
    role: "Student",
    greet: function () {
        alert("Hello, I am "+ this.name);
    }
};