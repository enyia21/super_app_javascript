document.addEventListener("DOMContentLoaded", callOnLoad);
const first_name = () => document.getElementById("first_name");
const last_name = () => document.getElementById("last_name");
const email = () => document.getElementById('email');
const age = () => document.getElementById('age');

const newUser = () => document.getElementById('New User');
const selectUser = () => document.querySelector('a.btn.dropdown-button')
const heroList = () => document.getElementById('herolist');
const selectionAttempt = () => document.querySelector('.browser-default');
const getTeamName = () => document.getElementById('name-inline');

const serverUrl = 'http://localhost:3000/';
function callOnLoad(){
    loadHeroes();
    getAllUsers();
    registerNewUser();
    selectUser().addEventListener('click', listAllUsersOnScreen);
    heroList().addEventListener('click', displayHeroes(heroes))
}




let currentUser;

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



const heroes = [];
//build hero card
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


function displayHeroes(heroes){
    for(const hero of heroes){
        const liHeroes = document.createElement('li');
        const divVisibleHeader = document.createElement('div');


        divVisibleHeader.className= 'collapsible-header';
        const iSubClass = document.createElement('i');
        iSubClass.className= 'collapsible-header';
        const divVisibleBody = document.createElement('div');
        divVisibleBody.className = 'collapsible-body';
        divVisibleHeader.innerHTML = `${hero['name']}`;
        const divHero = buildCard(hero)
        
        divVisibleBody.appendChild(divHero);
        divVisibleHeader.appendChild(iSubClass);
        liHeroes.appendChild(divVisibleHeader);
        liHeroes.appendChild(divVisibleBody);
        
        const ul = document.querySelector('ul.collapsible');
        ul.appendChild(liHeroes);
    }
}
