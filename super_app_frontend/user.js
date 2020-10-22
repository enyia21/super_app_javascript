//user for information to get:
const get_first_name = () => document.getElementById("first_name");
const get_last_name = () => document.getElementById("last_name");
const get_email = () => document.getElementById('email');
const get_age = () => document.getElementById('age');
const serverUrl = 'http://localhost:3000/';

let appUsers = [];
let currentUser = null;
class User {
    
    static AllUsers = [];
    constructor(newUserHash){
        const {id, first_name, last_name, email, age, teams=[]} = newUserHash
        this._first_name = first_name;
        this._last_name = last_name;
        this._email = email;
        this._age = age;
        this._id = id;
        this._teams = teams;
        
        User.all = [];
        User.all.push(this);
    }
    get first_name(){
        this._first_name;
    }
    
    set first_name(first_name){
        this._first_name = first_name
    }
    
    get last_name(){
        this._last_name;
    }
    
    set last_name(last_name){
        this._last_name = last_name
    }
    get email(){
        this._email;
    }
    
    set email(email){
        this._email = email
    }
    get age(){
        this._age;
    }

    set age(age){
        this._age = age
    }
    get id(){
        this._id;
    }
    
    set id(id){
        this._id = id
    }
    get teams(){
        this._teams;
    }
    set teams(team){
        this._teams.push(team)
    }

    loggedInUser(){
        if (!!signupButton()){
            signupButton().parentElement.remove();
            signupButtonSideMenu().parentElement.remove();
        }
        this.displayLogInName();
        this.displayLogInNameSideMenu();
        Team.listOfTeams();
    }
    
    editUserButton(){
        const ulTopNavBar = document.querySelector('.right');
        //hide login in button
        //display Logout button
        const liLogOutButton = document.createElement('li');
        const aLogOutButton = document.createElement('a');
        aLogOutButton.href = "#EditUser";
        aLogOutButton.id= "editUser";
        aLogOutButton.innerHTML = `Edit Account`;
        aLogOutButton.addEventListener('click', this.editUser)
        liLogOutButton.appendChild(aLogOutButton);
        ulTopNavBar.appendChild(liLogOutButton);
    }
    editUserSideNavButton(){
        const ulSideNav = document.getElementById("mobile-nav");
        //hide login in button
        //display Logout button
        const liLogOutButton = document.createElement('li');
        const aLogOutButton = document.createElement('a');
        aLogOutButton.href = "#EditUser";
        aLogOutButton.id= "editUser";
        aLogOutButton.innerHTML = `Edit Account`;
        aLogOutButton.addEventListener('click', this.editUser)
        liLogOutButton.appendChild(aLogOutButton);
        ulSideNav.appendChild(liLogOutButton);
    }
    editUser(){
            Forms.editUserRegistration();
    }
    displayLogInName(){
        
        const ulTopNavBar = document.querySelector('.right');
        //hide login in button
        const navBarLogin = document.getElementById("login");
        navBarLogin.parentElement.remove();
        let userRegister; 
        userRegister = document.getElementById('user-registration');
        let myRow;
        myRow = userRegister.firstElementChild;
        userRegister.removeChild(myRow);
        this.editUserButton();
        
        //display Logout button
        const liLogOutButton = document.createElement('li');
        const aLogOutButton = document.createElement('a');
        aLogOutButton.href = "#LogOut";
        aLogOutButton.id= "logout";
        aLogOutButton.innerHTML = `${this._first_name} Log Out`;
        aLogOutButton.addEventListener('click', this.logOut)
        liLogOutButton.appendChild(aLogOutButton);
        ulTopNavBar.appendChild(liLogOutButton);
    }

    displayLogInNameSideMenu(){
        const sideNavBar = document.getElementById("mobile-nav");
        //hide login in button
        const navBarLogin = document.getElementById("login-side-nav");
        navBarLogin.parentElement.remove();
        let userRegister; 
        userRegister = document.getElementById('user-registration');
        if (!!userRegister.firstElementChild){
            let myRow;
            myRow = userRegister.firstElementChild;
            userRegister.removeChild(myRow)
        }
        this.editUserSideNavButton();
        //display Logout button
        const liLogOutButton = document.createElement('li');
        const aLogOutButton = document.createElement('a');
        aLogOutButton.href = "#LogOut";
        aLogOutButton.id= "logout";
        aLogOutButton.innerHTML = `${this._first_name} Log Out`;
        aLogOutButton.addEventListener('click', this.logOut)
        liLogOutButton.appendChild(aLogOutButton);
        sideNavBar.appendChild(liLogOutButton);
    }
    updateDisplayNameLogin(){
        const ulTopNavBar = document.querySelector('.right');
        //hide login in button
        const navBarLogin = document.getElementById("logout");
        navBarLogin.parentElement.remove();
        let userRegister; 
        userRegister = document.getElementById('user-registration');
        let myRow;
        myRow = userRegister.firstElementChild;
        userRegister.removeChild(myRow)
        //display Logout button
        const liLogOutButton = document.createElement('li');
        const aLogOutButton = document.createElement('a');
        aLogOutButton.href = "#LogOut";
        aLogOutButton.id= "logout";
        aLogOutButton.innerHTML = `${this._first_name} Log Out`;
        aLogOutButton.addEventListener('click', this.logOut)
        liLogOutButton.appendChild(aLogOutButton);
        ulTopNavBar.appendChild(liLogOutButton);
    }
    logOut(){
        location.reload();
    }

    updateCurrentUser(){
        
        fetch (serverUrl + "users/" + this._id)
        .then(resp=>resp.json())
        .then(object => {
            let temp = new User(object);
            currentUser = temp;
            Team.listOfTeams();
            // return currentUser;
        })
    }
    
}

function loginUser(){
    // e.preventDefault();
    user = {
        email: get_email().value,
        age: get_age().value
    }
    if (validLogin(user)){
        let current;
        current = findByEmail(user);
        modifyForLoggedInUser(current);
    }
    
}

function modifyForLoggedInUser(user){
    fetch (serverUrl + "users/" + user.id)
    .then(resp=>resp.json())
    .then(object => {
        currentUser = new User(object);
        return currentUser.loggedInUser();
    })
}

//valid login returns true or false depending on whether the user is 
//logged in or not

function validLogin(userToValidate){
    //checks whether user emailis fo
    let foundEmailUser; 
    foundEmailUser = findByEmail(userToValidate);
    let userCorrect
    userCorrect = (!!foundEmailUser) ? (foundEmailUser.age == userToValidate.age) : false;
    return userCorrect
 }

function findByEmail(user){
    return (appUsers.find(element => element.email == user['email']))
}


function createUser(e) {
    e.preventDefault();
    user = {
            first_name: get_first_name().value,
            last_name: get_last_name().value,
            email: get_email().value,
            age: get_age().value
        };
    // return user
    fetch(serverUrl + 'users', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        
        body: JSON.stringify({user})
    })
    .then(resp => resp.json())
    .then(object => {
        submissionWorked(object);
    });
}

function submissionWorked(user){
    appUsers.push(user);
    loginUser();
    // Forms.successfulFormSubmission();
}

function getAllUsers(){
    fetch(serverUrl + 'users')
    .then(resp => resp.json())
    .then(object => findAllUsers(object))
}

function findAllUsers(users){
    appUsers = [];
    for(const user of users){
        appUsers.push(user);
    }
}

function listAllUsersOnScreen(){
    const ulUserDropdown = document.querySelector('ul#dropdown');
    for(const appUser of appUsers){
        const presenceTest = document.getElementById(`${appUser['id']}`)
        if (!presenceTest){
            const liUsers = document.createElement('li');
            const aUsers = document.createElement('a');
            aUsers.id = appUser['id'];
            aUsers.href = '#';
            aUsers.innerHTML = `${appUser['first_name']} ${appUser['last_name']}`
            aUsers.addEventListener('click', getUsersTeams)
            liUsers.appendChild(aUsers);

            const deleteUserButton = document.createElement('button');
            deleteUserButton.classList.add('btn');
            deleteUserButton.innerHTML = 'Delete User';
            deleteUserButton.addEventListener('click', deleteUser);
            deleteUserButton.id = appUser.id;

            const editUserButton = document.createElement('button');
            editUserButton.classList.add('btn')
            editUserButton.innerHTML = "Edit User";
            editUserButton.addEventListener('click', editUsersForm);
            editUserButton.id = appUser.id;

            liUsers.appendChild(deleteUserButton);
            liUsers.appendChild(editUserButton);
            ulUserDropdown.appendChild(liUsers);
        }
    }
}

function deleteUser(e){
    this.id;
    fetch(serverUrl + 'users/' + this.id, {
        method: "DELETE"
    })
    .then(resp => resp.json())
    .then(object => {
        this.parentNode.remove();
    });
    
}

function editUsersForm(e){
    let editUserConst = appUsers.find(element => element.id == this.id);
    const divNewNameRow = document.createElement('div');
    divNewNameRow.className = 'row';

    //first Name for form
    const divFirstNameInputField = document.createElement('div');
    divFirstNameInputField.className= 'input-field col s6';
    const firstNameLabel = document.createElement('label');
    firstNameLabel.setAttribute('for', 'first_name');
    firstNameLabel.innerHTML = 'First Name'
    const inputFirstNameInformation = document.createElement('input');
    inputFirstNameInformation.value = `${editUserConst['first_name']}`;
    inputFirstNameInformation.type='text';
    inputFirstNameInformation.placeholder= 'First Name';
    inputFirstNameInformation.className= "validate";
    inputFirstNameInformation.setAttribute('required', true);
    inputFirstNameInformation.id = 'first_name';

    divFirstNameInputField.appendChild(firstNameLabel);
    divFirstNameInputField.appendChild(inputFirstNameInformation);

    //last Name for form
    const divLastNameInputField = document.createElement('div');
    divLastNameInputField.className= 'input-field col s6';
    const lastNameLabel = document.createElement('label');
    lastNameLabel.setAttribute('for', 'last_name');
    lastNameLabel.innerHTML = 'Last Name'
    const inputLastNameInformation = document.createElement('input');
    inputLastNameInformation.value = `${editUserConst['last_name']}`;
    inputLastNameInformation.type='text';
    inputLastNameInformation.placeholder= 'Last Name';
    inputLastNameInformation.className= "validate";
    inputLastNameInformation.setAttribute('required', true);
    inputLastNameInformation.id = 'last_name';

    divLastNameInputField.appendChild(lastNameLabel);
    divLastNameInputField.appendChild(inputLastNameInformation);
    
    divNewNameRow.appendChild(divFirstNameInputField);
    divNewNameRow.appendChild(divLastNameInputField);
    const formCreator = document.getElementById('create-or-edit-user');
    formCreator.appendChild(divNewNameRow);

    //email
    const divEmailRow = document.createElement('div');
    divEmailRow.className = 'row';


    const divEmailInputField = document.createElement('div');
    divEmailInputField.className= 'input-field col s12';
    const emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.innerHTML = 'Email'
    const inputEmailInformation = document.createElement('input');
    inputEmailInformation.value = `${editUserConst['email']}`;
    inputEmailInformation.type='email';
    inputEmailInformation.placeholder= 'Email';
    inputEmailInformation.className= "validate";
    inputEmailInformation.setAttribute('required', true);
    inputEmailInformation.id = 'email';

    divEmailInputField.appendChild(emailLabel);
    divEmailInputField.appendChild(inputEmailInformation);
    divEmailRow.appendChild(divEmailInputField);
    formCreator.appendChild(divEmailRow);

    //age
    const divAgeRow = document.createElement('div');
    divAgeRow.className = 'row';


    const divAgeInputField = document.createElement('div');
    divAgeInputField.className= 'input-field col s12';
    const ageLabel = document.createElement('label');
    ageLabel.setAttribute('for', 'age');
    ageLabel.innerHTML = 'Age'
    const inputAgeInformation = document.createElement('input');
    inputAgeInformation.value = `${editUserConst['age']}`;
    inputAgeInformation.type='number';
    inputAgeInformation.placeholder= 'Age';
    inputAgeInformation.className= "validate";
    inputAgeInformation.setAttribute('required', true);
    inputAgeInformation.id = 'age';

    divAgeInputField.appendChild(ageLabel);
    divAgeInputField.appendChild(inputAgeInformation);
    divAgeRow.appendChild(divAgeInputField);
    formCreator.appendChild(divAgeRow);

    const makeEditUserButton = document.createElement('button');
    makeEditUserButton.classList.add('btn');
    makeEditUserButton.innerHTML = 'Update User';
    makeEditUserButton.addEventListener('click', editUser);
    makeEditUserButton.id = this.id
    formCreator.appendChild(makeEditUserButton);
}
function editUser(e) {
    e.preventDefault();
    user = {
        first_name: get_first_name().value,
        last_name: get_last_name().value,
        email: get_email().value,
        age: get_age().value
    };
fetch(serverUrl + 'users/' + currentUser._id, { 
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    
    body: JSON.stringify({user})
})
.then(resp => resp.json())
.then(object => {
    let i;
    i = appUsers.findIndex(element => element.id == object.id);
    appUsers[i] = object;
    currentUser = new User(object);
    
    currentUser.updateDisplayNameLogin();
})
};
function getUsersTeams(){
    fetch(serverUrl + 'users/' + this.id)
    .then(resp => resp.json())
    .then(object=> listOfTeams(object));
}

