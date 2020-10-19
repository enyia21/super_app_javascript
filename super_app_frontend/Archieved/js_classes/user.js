const users = [];

function registerNewUser(){
    newUser().addEventListener('click', buildNewUsersForm);
}

//build user form works
function buildNewUsersForm(){
    
    const divNewNameRow = document.createElement('div');
    divNewNameRow.className = 'row';
    
    //first Name for form
    const divFirstNameInputField = document.createElement('div');
    divFirstNameInputField.className= 'input-field col s6';
    const firstNameLabel = document.createElement('label');
    firstNameLabel.setAttribute('for', 'first_name');
    firstNameLabel.innerHTML = 'First Name'
    const inputFirstNameInformation = document.createElement('input');
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
    inputAgeInformation.type='number';
    inputAgeInformation.placeholder= 'Age';
    inputAgeInformation.className= "validate";
    inputAgeInformation.setAttribute('required', true);
    inputAgeInformation.id = 'age';
    
    divAgeInputField.appendChild(ageLabel);
    divAgeInputField.appendChild(inputAgeInformation);
    divAgeRow.appendChild(divAgeInputField);
    formCreator.appendChild(divAgeRow);
    
    const makeNewUserButton = document.createElement('button');
    makeNewUserButton.classList.add('btn');
    makeNewUserButton.innerHTML = 'Create User';
    makeNewUserButton.addEventListener('click', createUser);
    formCreator.appendChild(makeNewUserButton);
}


function createUser(e) {
    e.preventDefault();
    user = {
            first_name: first_name().value,
            last_name: last_name().value,
            email: email().value,
            age: age().value
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
        appUsers.push(object);
        location.reload();
    });
}

function getAllUsers(){
    fetch(serverUrl + 'users')
    .then(resp => resp.json())
    .then(object => findAllUsers(object))
}

let appUsers = [];

function findAllUsers(users){
    for(const shaUser of users){
        appUsers.push(shaUser);
    }
}

//create the select 
function listAllUsersOnScreen(){
    const ulUserDropdown = document.querySelector('ul#dropdown');
    for(const appUser of appUsers){
        const presenceTest = document.getElementById(`${appUser['id']}`)
        if (!presenceTest){
            debugger;
            let {first_name, last_name, email, age, id} = appUser;
            const newUser = new User(first_name, last_name, email, age, id)
            let newLi = newUser.createDropDownField();
            ulUserDropdown.appendChild(newLi);
        }
    }
}

function deleteUser(e){
    debugger;
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
    debugger;
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
        first_name: first_name().value,
        last_name: last_name().value,
        email: email().value,
        age: age().value
    };
    
    fetch(serverUrl + 'users/' + this.id, { 
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    
    body: JSON.stringify({user})
})
.then(resp => resp.json())
.then(object => {
    const i = appUsers.findIndex(element => element.id == object.id);
    appUsers[i] = object;
    location.reload()
})
};

class User{
    constructor(firstName, lastName, email, age, id){
        this._firstName = firstName;
        this._lastName = lastName;
        this._email = email;
        this._age = age;
        this._id = id;
    }

    createDropDownField(){
        const liUsers = document.createElement('li');
        const aUsers = document.createElement('a');
        aUsers.id = this._id;
        aUsers.href = '#';
        aUsers.innerHTML = `${this._firstName} ${this._lastName}`
        aUsers.addEventListener('click', getUsersTeams)
        liUsers.appendChild(aUsers);
        
        const deleteUserButton = document.createElement('button');
        deleteUserButton.classList.add('btn');
        deleteUserButton.innerHTML = 'Delete User';
        deleteUserButton.addEventListener('click', deleteUser);
        deleteUserButton.id = this._id;
        
        const editUserButton = document.createElement('button');
        editUserButton.classList.add('btn')
        editUserButton.innerHTML = "Edit User";
        editUserButton.addEventListener('click', editUsersForm);
        editUserButton.id = this._id;
        
        liUsers.appendChild(deleteUserButton);
        liUsers.appendChild(editUserButton);
        return liUsers;
        
    }

    
}

