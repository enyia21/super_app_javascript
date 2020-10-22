const createdTeams = [];
const userTeams = [];
const getTeamName = () => document.getElementById("name-inline");
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
    static currentTeam = null;
    static currentTeamMemberArray = [];
    static listOfTeams(){

        const rmUlTeamCollection = document.getElementById('ul team-collection-header');
        rmUlTeamCollection.remove();
        //create collection header
        const addToSection = document.getElementById("teams-section")
        const ulTeamCollection = document.createElement('ul')
        ulTeamCollection.className= "collection";
        ulTeamCollection.classList.add("with-header");
        ulTeamCollection.id = "ul team-collection-header";
        

        const liTeamHeader = document.createElement('li');
        liTeamHeader.className= 'collection-header';
        liTeamHeader.id = 'user-teams-collection'
        const hTeamHeader = document.createElement('h5');
        hTeamHeader.innerHTML = `${currentUser._first_name} ${currentUser._last_name}`;
        liTeamHeader.appendChild(hTeamHeader);
        //Create a new team option
        const liCreateANewTeam = document.createElement('li');
        liCreateANewTeam.className='collection-item';
        liCreateANewTeam.innerHTML="Create a New Team";
        liCreateANewTeam.addEventListener('click', Forms.createNewTeam) 
        ulTeamCollection.appendChild(liTeamHeader);
        ulTeamCollection.appendChild(liCreateANewTeam);
        
        if (!!currentUser._teams){
            let teams = currentUser._teams;
            for(const team of teams){
                    const liTeam = document.createElement('li');
                    liTeam.className='collection-item';
                    const teamNameDiv = document.createElement('div');
                    teamNameDiv.innerHTML = `${team['name']}`;
    
                    const aPlaceTeamButton = document.createElement('a');
                    aPlaceTeamButton.href='#!';
                    aPlaceTeamButton.className = "secondary-content";

                    //view a carosel of heroes
                    //modify team button
                    const modifyTeamButton = document.createElement('button');
                    modifyTeamButton.classList.add('btn');
                    modifyTeamButton.innerHTML="Modify"
                    modifyTeamButton.id = team['id'];
                    modifyTeamButton.addEventListener('click', this.selectSuperHeroTeams)
                    aPlaceTeamButton.appendChild(modifyTeamButton);
                    //delete team button
                    const deleteTeamButton = document.createElement('button');
                    deleteTeamButton.classList.add('btn');
                    deleteTeamButton.innerHTML="Delete";
                    deleteTeamButton.id = team['id'];
                    deleteTeamButton.addEventListener('click', this.deleteCurrentTeam)
                    aPlaceTeamButton.appendChild(deleteTeamButton);
                    teamNameDiv.appendChild(aPlaceTeamButton);
    
                    liTeam.appendChild(teamNameDiv);
                    ulTeamCollection.appendChild(liTeam);
                }
        }
        addToSection.appendChild(ulTeamCollection);
    }

    static selectSuperHeroTeams(e){
        e.preventDefault();
        Team.clearHeroesScreen();
        displayHeroes(heroes);
        let teams = currentUser._teams;
        fetch(serverUrl + 'teams/' + this.id)
        .then(resp=>resp.json())
        .then(object=> {
            return Team.buildCurrentTeam(object);
        })
        // buildCarouselOfHeroes(currentTeam, currentTeamMemberArray);
    }

    static buildCurrentTeam(team){
        this.buildCarouselOfHeroes(team, team['superheros']);
    }
        
    static buildCarouselOfHeroes(cTeam, cTMArray){
        this.currentTeam = cTeam;
        this.currentTeamMemberArray = cTMArray;
        

        const testChild =  document.querySelector('#team-slides').firstElementChild;
        if (!!testChild){
            const parent = document.querySelector('#team-slides');
            parent.removeChild(testChild)
        }
        const teamSection = document.querySelector('#team-slides');
        const ulCreateSlides = document.createElement('ul');
        ulCreateSlides.className = "slides";
        
        /***********Update Modification */
        const findUpdateButtonSection = document.getElementById("Update_Carousel");

        const createDivItem = document.createElement('div');
        createDivItem.className = "fixed-action-btn";
        const createAforUpdate = document.createElement('a');
        createAforUpdate.className = "btn-floating";
        createAforUpdate.classList.add("btn-large");
        createAforUpdate.classList.add("green");
        createAforUpdate.innerHTML = "Update";
        createAforUpdate.addEventListener('click', Team.modifyUsersTeam);
        const createIforIcon = document.createElement('i');
        createIforIcon.className = "large material-icons";
        createIforIcon.innerHTML = "sync";
        createAforUpdate.appendChild(createIforIcon);
        createDivItem.appendChild(createAforUpdate);
        findUpdateButtonSection.appendChild(createDivItem);
        /************************************ */
        for(const key in cTMArray){
            const liSuperHeroSlide = document.createElement('li');
            const imgOfHero = buildHeroImageTag(cTMArray[key]);
            liSuperHeroSlide.appendChild(imgOfHero)
            ulCreateSlides.appendChild(liSuperHeroSlide)
        }
        // const createUpdateButton = document.createElement('button');
        // createUpdateButton.innerHTML = "Update";
        // createUpdateButton.addEventListener('click', Team.modifyUsersTeam);
        // ulCreateSlides.appendChild(createUpdateButton);
        teamSection.appendChild(ulCreateSlides);
        callOnSlideCreation();

        
        // const imgOfHero = document
        // const divCarouselRow =  document.querySelector('#carousel-row');
        // const divCarousel = document.createElement('div');
        // divCarousel.className = "carousel";
        // for(const key in cTMArray){
        //     // const currentTeamHero = document.getElementById(`${cTMArray[key]['name']} ${cTMArray[key]['id']}`);
        //     // currentTeamHero.value = 'on'
        //     const aCarouselItem = document.createElement('a');
        //     aCarouselItem.className = "carousel-item";
        //     const keyString = this.keyToString(key);
        //     aCarouselItem.href = `#${keyString}`;
        //     const divHero = buildHeroImageTag(cTMArray[key]);
        //     aCarouselItem.appendChild(divHero);
        //     divCarousel.appendChild(aCarouselItem);
        // }
        // divCarouselRow.appendChild(divCarousel);
    }

/*************************************************
 * 
 * 
 */
    static addTeam(e){
        if(!!e){
            e.preventDefault();
        }

       const team = {
            name: getTeamName().value,
            user_id: currentUser._id,       
            superhero_ids: [],
        };
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
            object
            Team.modifyFormForNewTeam();
        });
    }
    static modifyFormForNewTeam(){
        const go = document.getElementById('add-team');
        go.removeChild(go.firstElementChild);
        Team.clearHeroesScreen();
        currentUser.updateCurrentUser();
    }
    static deleteCurrentTeam(e){
        e.preventDefault();
        this.id;
        fetch(serverUrl + 'teams/' + this.id, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(object => {
            console.log(object);
            Team.modifyFormForDeletedTeam();
        });
    }

    static modifyFormForDeletedTeam(){
        Team.clearHeroesScreen();
        currentUser.updateCurrentUser();
    }
    
    static clearHeroesScreen(){
        const removeCarousel = document.querySelector('#team-slides').firstElementChild;
        if(!!removeCarousel){
            removeCarousel.remove();
        }
    }
    static modifyUsersTeam(e){
        e.preventDefault()
            const team = {
                name: Team.currentTeam["name"],
                user_id: Team.currentTeam["user"]["id"],
                superhero_ids: Team.convertTeamToIds(),
            };
            fetch(serverUrl + 'teams/' + Team.currentTeam['id'], { 
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                
                body: JSON.stringify({team})
            })
            .then(resp => resp.json())
            .then(object => {
                console.log(object);
            })
            //if on that means we are adding a team member 
            //if off that means that we are subtracting a team member           
        }
    static convertTeamToIds(){
        return Team.currentTeamMemberArray.map(element => element['id'])
    }
    static keyToString(key){
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
    
    static removeFromUsersTeam(){
        let idArray = this.id.split(" ");
        let remove = idArray[idArray.length-1];
        let currentHero = heroes.find(element => element.id == remove)
        if (!!(Team.currentTeamMemberArray.find(element => element.id == remove))){
            Team.currentTeamMemberArray = Team.currentTeamMemberArray.filter(element => !(element == currentHero));
            Team.buildCarouselOfHeroes(Team.currentTeam, Team.currentTeamMemberArray);
            this.disable = true;
        }
    }
    static addToUsersTeam(){
        let addArray = this.id.split(" ");
        let add =addArray[addArray.length-1];
        if (!(Team.currentTeamMemberArray.find(element => element.id ==add))){
            Team.currentTeamMemberArray.push(heroes.find(element => element.id ==add));
            this.disable = true;
            Team.buildCarouselOfHeroes(Team.currentTeam, Team.currentTeamMemberArray);
        } 
    }
}   


let currentTeamMemberArray = []
let currentTeam;

