const signupButton = () => document.getElementById('signup');
const signupButtonSideMenu = () => document.getElementById("signup-side-nav")
const signUp = () => signupButton().addEventListener('click', registerUser);
const signUpSideNav = () => signupButtonSideMenu().addEventListener('click', registerUser);

const loginButton = () => document.getElementById('login');
const loginButtonSideNav = () => document.getElementById('login-side-nav');

const logIn = () => loginButton().addEventListener('click', loginCurrentUser);
const logInSideNav = () => loginButtonSideNav().addEventListener('click', loginCurrentUser);
let signUpFormPresent = false;
let loginFormPresent = false;
function registerUser(){
    // if (!signUpFormPresent){
    //     signUpFormPresent = true;
    //     return Forms.newUserRegistration();
    // }else{
    //     return null;
    // }
    return Forms.newUserRegistration();
}
function loginCurrentUser(){
//     if (!loginFormPresent){
//         loginFormPresent = true;
//         return Forms.buildLoginForm();
//     }else{
//         return null;
//     }
return Forms.buildLoginForm();
}


class Forms{
    static userPresent = false;
    
    static registrationBuildFirstNameField(){
    //first Name for form
    const divFirstNameInputField = document.createElement('div');
    divFirstNameInputField.className= 'input-field col s6';
    const firstNameLabel = document.createElement('label');
    firstNameLabel.setAttribute('for', 'first_name');
    firstNameLabel.innerHTML = 'First Name'
    const inputFirstNameInformation = document.createElement('input');
    if (this.userPresent){
        inputFirstNameInformation.value = `${currentUser._first_name}`;
    }
    inputFirstNameInformation.type='text';
    inputFirstNameInformation.placeholder= 'First Name';
    inputFirstNameInformation.className= "validate";
    inputFirstNameInformation.setAttribute('required', true);
    inputFirstNameInformation.id = 'first_name';
    
    //Adds name and label to the first name div for lookup later
    divFirstNameInputField.appendChild(firstNameLabel);
    divFirstNameInputField.appendChild(inputFirstNameInformation);
    return divFirstNameInputField;
    }
    static buildRegistrationForm(){
        const formPresent = document.getElementById('user-registration').firstElementChild;
        if (!!formPresent){
            formPresent.remove();
        }
        const formDiv = document.createElement("div");
        formDiv.className = "row";
        formDiv.appendChild(this.registrationBuildFullName());
        formDiv.appendChild(this.registrationBuildEmailField());
        formDiv.appendChild(this.registrationBuildAge());
        formDiv.appendChild(this.registrationSubmitButton());
        const registrationForm = document.createElement("form");
        registrationForm.className = "col s12";
        formDiv.appendChild(registrationForm);
    
        const registrationSection = document.getElementById('user-registration');
        registrationSection.appendChild(formDiv);
    
    }
    
    //build last name for row of new users registration form
    static registrationBuildLastNameField(){
        //last Name for form
        const divLastNameInputField = document.createElement('div');
        divLastNameInputField.className= 'input-field col s6';
        const lastNameLabel = document.createElement('label');
        lastNameLabel.setAttribute('for', 'last_name');
        lastNameLabel.innerHTML = 'Last Name'
        const inputLastNameInformation = document.createElement('input');
        /**Attention!!!!!!!!!!!!!!!!!!!! EDIT FORM MOD STARTS HERE */
        if (this.userPresent){
            inputLastNameInformation.value = `${currentUser._last_name}`;
        }
        inputLastNameInformation.type='text';
        inputLastNameInformation.placeholder= 'Last Name';
        inputLastNameInformation.className= "validate";
        inputLastNameInformation.setAttribute('required', true);
        inputLastNameInformation.id = 'last_name';
        
        //div adds the last name label and input into the last name div.
        divLastNameInputField.appendChild(lastNameLabel);
        divLastNameInputField.appendChild(inputLastNameInformation);
        return divLastNameInputField;
    };
    //build full name for row of new users registration form
    static registrationBuildFullName(){
        const divNewNameRow = document.createElement('div');
        divNewNameRow.className = 'row';   
        
        divNewNameRow.appendChild(this.registrationBuildFirstNameField());
        divNewNameRow.appendChild(this.registrationBuildLastNameField());
        return divNewNameRow;
    };
    //build email field for new users registration form
    static registrationBuildEmailField(){
        const divEmailRow = document.createElement('div');
        divEmailRow.className = 'row';
        
        
        const divEmailInputField = document.createElement('div');
        divEmailInputField.className= 'input-field col s12';
        const emailLabel = document.createElement('label');
        emailLabel.setAttribute('for', 'email');
        emailLabel.innerHTML = 'Email'
        const inputEmailInformation = document.createElement('input');
        if (this.userPresent){
            inputEmailInformation.value = `${currentUser._email}`;
        }
        inputEmailInformation.type='email';
        inputEmailInformation.placeholder= 'Email';
        inputEmailInformation.className= "validate";
        inputEmailInformation.setAttribute('required', true);
        inputEmailInformation.id = 'email';
        
        divEmailInputField.appendChild(emailLabel);
        divEmailInputField.appendChild(inputEmailInformation);
        divEmailRow.appendChild(divEmailInputField);
        return divEmailRow;
    };
    //build age field for new users registration form
    static registrationBuildAge(){
        const divAgeRow = document.createElement('div');
        divAgeRow.className = 'row';
        
        
        const divAgeInputField = document.createElement('div');
        divAgeInputField.className= 'input-field col s12';
        const ageLabel = document.createElement('label');
        ageLabel.setAttribute('for', 'age');
        ageLabel.innerHTML = 'Age'
        const inputAgeInformation = document.createElement('input');
        if (this.userPresent){
            inputAgeInformation.value = `${currentUser._age}`;
        }
        inputAgeInformation.type='number';
        inputAgeInformation.placeholder= 'Age';
        inputAgeInformation.className= "validate";
        inputAgeInformation.setAttribute('required', true);
        inputAgeInformation.id = 'age';
        
        divAgeInputField.appendChild(ageLabel);
        divAgeInputField.appendChild(inputAgeInformation);
        divAgeRow.appendChild(divAgeInputField);
        return divAgeRow;
    }
    //attach submit button to new users registration form
    static registrationSubmitButton(){
        const makeUserButton = document.createElement('button');
        makeUserButton.classList.add('btn');
        if (this.userPresent){
            makeUserButton.innerHTML = 'Update User';
            makeUserButton.addEventListener('click', editUser)
        }else{
            makeUserButton.innerHTML = 'Create User';
            makeUserButton.addEventListener('click', createUser);
        }
        return makeUserButton
    }

    static newUserRegistration(){
        this.buildRegistrationForm();
    }
    static editUserRegistration(){
        this.userPresent = true;
        this.buildRegistrationForm()
    }
    static buildLoginSubmitButton(){
        const makeUserButton = document.createElement('button');
        makeUserButton.classList.add('btn');
        makeUserButton.innerHTML = 'Submit';
        makeUserButton.addEventListener('click', loginUser);
        return makeUserButton;
    }
    static buildLoginForm(){
        const formPresent = document.getElementById('user-registration').firstElementChild;
        if (!!formPresent){
            formPresent.remove();
        }

        const formDiv = document.createElement("div");
        formDiv.className = "row"; 
        const createHeading = document.createElement('h4');
        createHeading.className = "brand-logo";
        createHeading.innerHTML="Login"
        formDiv.appendChild(createHeading);
        formDiv.appendChild(this.registrationBuildEmailField());
        formDiv.appendChild(this.registrationBuildAge());
        formDiv.appendChild(this.buildLoginSubmitButton());
        const registrationForm = document.createElement("form");
        registrationForm.className = "col s12";
        formDiv.appendChild(registrationForm);
        
        const registrationSection = document.getElementById('user-registration');
        registrationSection.appendChild(formDiv);
    }

    static createNewTeam(){
        const divCreateTeamRow = document.getElementById('add-team');
    
        const formCreateNewTeam = document.createElement('form');
        formCreateNewTeam.className = "col s12";
        const divCreateFormRow = document.createElement('div');
        divCreateFormRow.className = 'row';
        const divCreateColumnRow = document.createElement('div');
        divCreateColumnRow.className = 'col s12'
        divCreateColumnRow.innerHTML = "Please input the team name: ";
        const divCreateNameInputField = document.createElement('div');
        divCreateNameInputField.className = "input-field inline"
    
        const inputCreateTeamName = document.createElement('input');
        inputCreateTeamName.id = 'name-inline';
        inputCreateTeamName.type = 'text';
        inputCreateTeamName.class = 'validate'
        divCreateNameInputField.appendChild(inputCreateTeamName);
    
        const labelCreateTeamName = document.createElement('label');
        labelCreateTeamName.setAttribute('for', "name-inline");
        labelCreateTeamName.innerHTML =  "here!!";
        divCreateNameInputField.appendChild(labelCreateTeamName);
        
        const createSubmitButton = document.createElement('button');
        createSubmitButton.classList.add('btn');
        createSubmitButton.innerHTML = "Create Team!!"
        createSubmitButton.addEventListener('click', Team.addTeam);
        
        divCreateColumnRow.appendChild(divCreateNameInputField);
        divCreateColumnRow.appendChild(createSubmitButton);
        divCreateFormRow.appendChild(divCreateColumnRow);
        formCreateNewTeam.appendChild(divCreateFormRow);
        divCreateTeamRow.appendChild(formCreateNewTeam);
    }

    static successfulFormSubmition(){
        const createAcknowledgement = document.querySelector(".brand-logo");
        createAcknowledgement.innerHTML = `Welcome ${get_first_name().value}`

        const userRegistrationSection = document.getElementById('user-registration');
        const divUserRegistrationForm  = userRegistrationSection.firstElementChild;
        userRegistrationSection.removeChild(divUserRegistrationForm);
        return;
    }
}
