const createdTeams = [];
const userTeams = [];
function getUsersTeams(){
    fetch(serverUrl + 'users/' + currentUser._id)
    .then(resp => resp.json())
    .then(object=> listOfTeams(object));
}

class Team{
    constructor(name, user_id){
        this._name = name;
        this._user_id = user_id;
        this._superheros = [];
    }
}   
function listOfTeams(){
    const ulTeamCollection = document.getElementById('ul team-collection-header');
    
    //create collection header
    const liTeamHeader = document.createElement('li');
    liTeamHeader.className= 'collection-header';
    hTeamHeader = document.createElement('h5');
    hTeamHeader.innerHTML = `${currentUser._first_name} ${currentUser._last_name}`;
    liTeamHeader.appendChild(hTeamHeader);
    debugger;
    //Create a new team option
    const liCreateANewTeam = document.createElement('li');
    liCreateANewTeam.className='collection-item';
    liCreateANewTeam.innerHTML="Create a New Team"
    // const aCreateTeam = document.createElement('a');
    // aCreateTeam.href='#!';
    // aCreateTeam.className = "collection-item";
    // aCreateTeam.innerText = "Create New Team"
    // aCreateTeam.addEventListener('click', createNewTeam);
    // liCreateANewTeam.appendChild(aCreateTeam);
    liCreateANewTeam.addEventListener('click', createNewTeam)
    ulTeamCollection.appendChild(liTeamHeader);
    ulTeamCollection.appendChild(liCreateANewTeam);
    
    if (!!currentUser._teams){
        let teams = currentUser._teams;
        // for(const team of teams){
        //     userTeams.push(team);
        // }
        debugger;
        for(const team of teams){
            // ulBrowserDefault.value = `${team['id']}`;
            // ulBrowserDefault.innerHTML=;
            
            // //create a modify button
                // //create a delete team button
                const liTeam = document.createElement('li');
                liTeam.className='collection-item';
                const teamNameDiv = document.createElement('div');
                teamNameDiv.innerHTML = `${team['name']}`;

                const aPlaceTeamButton = document.createElement('a');
                aPlaceTeamButton.href='#!';
                aPlaceTeamButton.className = "secondary-content";
                //modify team button
                
                const modifyTeamButton = document.createElement('button');
                modifyTeamButton.classList.add('btn');
                modifyTeamButton.innerHTML="Modify"
                modifyTeamButton.id = team['id'];
                modifyTeamButton.addEventListener('click', selectSuperHeroTeams)
                aPlaceTeamButton.appendChild(modifyTeamButton);
                //delete team button
                const deleteTeamButton = document.createElement('button');
                deleteTeamButton.classList.add('btn');
                deleteTeamButton.innerHTML="Delete";
                deleteTeamButton.id = team['id'];
                deleteTeamButton.addEventListener('click', deleteCurrentTeam)
                aPlaceTeamButton.appendChild(deleteTeamButton);
                teamNameDiv.appendChild(aPlaceTeamButton);

                liTeam.appendChild(teamNameDiv);
                ulTeamCollection.appendChild(liTeam);
            }
    }
}
function deleteCurrentTeam(e){
        this.id;
        fetch(serverUrl + 'teams/' + this.id, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(object => {
            this.parentNode.remove();
        });
}
function createNewTeam(){
    debugger;
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
    createSubmitButton.addEventListener('click', addTeam);
    
    divCreateColumnRow.appendChild(divCreateNameInputField);
    divCreateColumnRow.appendChild(createSubmitButton);
    divCreateFormRow.appendChild(divCreateColumnRow);
    formCreateNewTeam.appendChild(divCreateFormRow);
    divCreateTeamRow.appendChild(formCreateNewTeam);


    
}
let currentTeamMemberArray = []
let currentTeam;
function selectSuperHeroTeams(){
    displayHeroes(heroes);
    let teams = currentUser._teams;
    fetch(serverUrl + 'teams/' + currentUser._id)
    .then(resp=>resp.json())
    .then(object=> {
        return buildCurrentTeam(object);
    })
    // buildCarouselOfHeroes(currentTeam, currentTeamMemberArray);
}
function buildCurrentTeam(team){
    debugger;
    buildCarouselOfHeroes(team, team['superheros']);
}

function buildCarouselOfHeroes(cTeam, cTMArray){
    currentTeam = cTeam;
    currentTeamMemberArray = cTMArray;

    const testChild = document.querySelector('.carousel');
    if (!!testChild){
        const parent = document.querySelector('#carousel-row');
        parent.removeChild(testChild)
    }
    const divCarouselRow =  document.querySelector('#carousel-row');
    const divCarousel = document.createElement('div');
    divCarousel.className = "carousel";
    for(const key in cTMArray){
        debugger;
        // const currentTeamHero = document.getElementById(`${cTMArray[key]['name']} ${cTMArray[key]['id']}`);
        // currentTeamHero.value = 'on'
        const aCarouselItem = document.createElement('a');
        aCarouselItem.className = "carousel-item";
        const keyString = keyToString(key);
        aCarouselItem.href = `#${keyString}`;
        debugger;
        const divHero = buildCardNoSwitch(cTMArray[key]);
        aCarouselItem.appendChild(divHero);
        divCarousel.appendChild(aCarouselItem);
    }
    divCarouselRow.appendChild(divCarousel);
    
    const updateTeamButton = document.createElement('button');
    updateTeamButton.classList.add('btn');
    updateTeamButton.innerHTML="update"
    updateTeamButton.id = cTeam['id'];
    updateTeamButton.addEventListener('click', modifyUsersTeam)
    divCarouselRow.appendChild(updateTeamButton);

}
function modifyUsersTeam(e){
        debugger;

        e.preventDefault();
        team = {
            name: currentTeam["name"],
            user_id: currentTeam["user"]["id"],
            superhero_ids: convertTeamToIds(),
        };
        fetch(serverUrl + 'teams/' + currentTeam['id'], { 
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            
            body: JSON.stringify({team})
        })
        .then(resp => resp.json())
        .then(object => {
            location.reload()
        })
        //if on that means we are adding a team member 
        //if off that means that we are subtracting a team member
                
}

function convertTeamToIds(){
    return currentTeamMemberArray.map(element => element['id'])
}
function keyToString(key){
    switch (key){
        case '1':
            return 'one!';
        case '2':
            return 'two!';
        case '3': 
            return 'three!';
        case '4':
            return 'four!';
        case '5': 
            return 'five!';
        case '6':     
            return 'six!';
        case '7': 
            return 'seven!';
        case '8': 
            return 'eight!';
        case '9': 
            return 'nine!';
        case '10': 
            return 'ten!';
        case '11': 
            return 'eleven!';
        case '12': 
            return 'twelve!';
        case '13': 
            return 'thirteen!';
        default:
            return 'fourteen!';
    }
}
function addTeam(){
    team = {
        name: getTeamName().value,
        user_id: currentUser._id,       
        superhero_ids: [],
    };
    debugger;
    fetch(serverUrl + 'teams', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "appication/json"
        }, 
        body: JSON.stringify({team})

    })
    .then(resp => resp.json())
    .then(object => {
        location.reload();
    })
    return console.log('We made it');
}
function removeFromUsersTeam(){
    let idArray = this.id.split(" ");
    let id = idArray[idArray.length-1];
    let currentHero = heroes.find(element => element.id == id)
    if (!!(currentTeamMemberArray.find(element => element.id == id))){
        currentTeamMemberArray = currentTeamMemberArray.filter(element => !(element == currentHero));
        buildCarouselOfHeroes(currentTeam, currentTeamMemberArray);
        this.disable = true;
    }
}
function addToUsersTeam(){
    debugger;
    let idArray = this.id.split(" ");
    let id = idArray[idArray.length-1];
    if (!(currentTeamMemberArray.find(element => element.id == id))){
        currentTeamMemberArray.push(heroes.find(element => element.id == id));
        this.disable = true;
        buildCarouselOfHeroes(currentTeam, currentTeamMemberArray);
    } 
}