const heroes = [];
const heroesSideNav = () => document.getElementById("pull-heroes-side-nav");
const getHeroes = () => heroesSideNav().addEventListener('click', showHeroList);
let heroListIsVisible = false;
function showHeroList(){
    if (!heroListIsVisible){
        heroListIsVisible = true;
        return displayHeroes(heroes);
    }
}
function createHero(heroData){
    const hero = {
        id: heroData["id"],
        name: heroData["name"],
        gender: heroData["gender"],
        power_level: heroData["power_level"],
        full_name: heroData["full_name"],
        place_of_birth: heroData["place_of_birth"],
        publisher: heroData["publisher"],
        alignment: heroData["alignment"],
        team_affiliation: heroData["team_affiliation"],
        image: heroData["image"]
    }
    heroes.push(hero);
}

function createHeroesArray(heroes){
    for(const hero of heroes){
        createHero(hero);
    }
}

function loadHeroes(){
    //fetch to get blog data 
    fetch(serverUrl + '/superheros')
    .then(resp =>{
        return resp.json();
    })
    .then(data => createHeroesArray(data))
}

function buildCard(hero){
    const divRow = document.createElement('div');
    divRow.className = "row"
    const divColumn = document.createElement('div');
    divColumn.className = "col s12 m6";
    const divCard = document.createElement('div');
    divCard.className = 'card';
    
    
    
    //append image to card
    const divImage = document.createElement('div');
    divImage.className = "card-image";
    const heroImage = document.createElement('img');
    console.log(hero['image']);
    heroImage.src = (!!hero['image']) ? hero['image'] : 'Print missing image';
    divImage.appendChild(heroImage);
    divCard.appendChild(divImage);
    //append attributes to card
    const divCardContent = document.createElement('div');
    divCardContent.className= 'card-content';
    const ulAttributes = document.createElement('ul');
    ulAttributes.className= 'collection';

    const liAlignment = document.createElement('li');
    liAlignment.className = 'collection-item';
    liAlignment.innerHTML = `Alignment ${hero['alignment']}`;
    ulAttributes.appendChild(liAlignment)

    const liPowerLevel = document.createElement('li');
    liPowerLevel.className = 'collection-item';
    liPowerLevel.innerHTML = `Power Level: ${hero['power_level']}`;
    ulAttributes.appendChild(liPowerLevel);

    const liGender = document.createElement('li');
    liGender.className = 'collection-item';
    liGender.innerHTML = `Gender: ${hero['gender']}`;
    ulAttributes.appendChild(liGender);

    const liPlaceOfBirth = document.createElement('li');
    liPlaceOfBirth.className = 'collection-item';
    liPlaceOfBirth.innerHTML = `Place of Birth: ${hero['place_of_birth']}`;
    ulAttributes.appendChild(liPlaceOfBirth);

    divCardContent.appendChild(ulAttributes);
    divCard.appendChild(divCardContent);
    //add card tabs class
    const divCardTab = document.createElement('div');
    divCardTab.className = 'card-tabs';
    const ulTabs = document.createElement('ul')
    ulTabs.className = 'tabs tabs-fixed-width';
    
    
    const aPublisher = document.createElement('a');
    aPublisher.href=`#test4`;
    aPublisher.innerHTML=`${hero['publisher']}`;
    const liPublisherTab = document.createElement('li');
    liPublisherTab.className = 'tab';
    liPublisherTab.appendChild(aPublisher);
    
    const aFullName = document.createElement('a');
    aFullName.href=`#test5`;
    aFullName.innerHTML=`${hero['full_name']}`;
    const lifullName = document.createElement('li');
    lifullName.className = 'tab';
    lifullName.appendChild(aFullName);

    const aTeamAffiliation = document.createElement('a');
    aTeamAffiliation.href=`#test6`;
    aTeamAffiliation.innerHTML=`${hero['team_affiliation']}`;
    const liTeamAffiliation = document.createElement('li');
    liTeamAffiliation.className = 'tab';
    liTeamAffiliation.appendChild(aTeamAffiliation);
    
    
    ulTabs.appendChild(lifullName);
    ulTabs.appendChild(liPublisherTab);
    ulTabs.appendChild(liTeamAffiliation);
    divCardTab.appendChild(ulTabs)
    divCard.appendChild(divCardTab);
    
    //append Card Content
    const divCardContentTab = document.createElement('div');
    divCardContentTab.className = 'card-content grey lighten-4';
    
    const divPublisher = document.createElement('div');
    divPublisher.id=`#test4`;
    divPublisher.innerHTML=`${hero['publisher']}`;
    
    const divFullName = document.createElement('div');
    divFullName.id=`#test5`;
    divFullName.innerHTML=`${hero['full_name']}`;
    
    const divTeamAffiliation = document.createElement('div');
    divTeamAffiliation.id=`#test6`;
    divTeamAffiliation.innerHTML=`${hero['team_affiliation']}`;
    //********************************************************* */
    
    
    const aClassAddFloatingButton = document.createElement("a");
    aClassAddFloatingButton.className = "btn-floating";
    aClassAddFloatingButton.classList.add("halfway-fab");
    aClassAddFloatingButton.classList.add("waves-effect");
    aClassAddFloatingButton.classList.add("waves-light");
    aClassAddFloatingButton.classList.add("red");
    aClassAddFloatingButton.classList.add("right");
    aClassAddFloatingButton.id = `add ${hero['name']} ${hero['id']}`;
    aClassAddFloatingButton.addEventListener('click', Team.addToUsersTeam)

    const iClassAddFloatingButton = document.createElement('i');
    iClassAddFloatingButton.className = "material-icons";
    iClassAddFloatingButton.innerHTML = "add";
    aClassAddFloatingButton.appendChild(iClassAddFloatingButton);
    divImage.appendChild(aClassAddFloatingButton);

    const aClassRemoveFloatingButton = document.createElement("a");
    aClassRemoveFloatingButton.className = "btn-floating";
    aClassRemoveFloatingButton.classList.add("halfway-fab");
    aClassRemoveFloatingButton.classList.add("waves-effect");
    aClassRemoveFloatingButton.classList.add("waves-light");
    aClassRemoveFloatingButton.classList.add("red");
    aClassRemoveFloatingButton.classList.add("left");
    aClassRemoveFloatingButton.addEventListener('click', Team.removeFromUsersTeam)
    aClassRemoveFloatingButton.id = `remove ${hero['name']} ${hero['id']}`;
    const iClassRemoveFloatingButton = document.createElement('i');
    iClassRemoveFloatingButton.className = "material-icons";
    iClassRemoveFloatingButton.innerHTML = "remove";
    aClassRemoveFloatingButton.appendChild(iClassRemoveFloatingButton);
    divImage.appendChild(aClassRemoveFloatingButton);

    divCardContentTab.appendChild(divFullName);
    divCardContentTab.appendChild(divPublisher);
    divCardContentTab.appendChild(divTeamAffiliation);
    divCard.appendChild(divCardContentTab);

    divColumn.appendChild(divCard);
    divRow.appendChild(divColumn);
    return divRow
}

function buildCardNoSwitch(hero){
    const divRow = document.createElement('div');
    divRow.className = "row"
    const divColumn = document.createElement('div');
    divColumn.className = "col s4";
    const divCard = document.createElement('div');
    divCard.className = 'card';
    divCard.classList.add='small';
    
    
    
    //append image to card
    const divImage = document.createElement('div');
    divImage.className = "card-image";
    const heroImage = document.createElement('img');
    console.log(hero['image']);
    heroImage.src = (!!hero['image']) ? hero['image'] : 'Print missing image';
    divImage.appendChild(heroImage);
    divCard.appendChild(divImage);
    //append attributes to card
    const divCardContent = document.createElement('div');
    divCardContent.className= 'card-content';
    const ulAttributes = document.createElement('ul');
    ulAttributes.className= 'collection';

    const liAlignment = document.createElement('li');
    liAlignment.className = 'collection-item';
    liAlignment.innerHTML = `Alignment ${hero['alignment']}`;
    ulAttributes.appendChild(liAlignment)

    const liPowerLevel = document.createElement('li');
    liPowerLevel.className = 'collection-item';
    liPowerLevel.innerHTML = `Power Level: ${hero['power_level']}`;
    ulAttributes.appendChild(liPowerLevel);

    const liGender = document.createElement('li');
    liGender.className = 'collection-item';
    liGender.innerHTML = `Gender: ${hero['gender']}`;
    ulAttributes.appendChild(liGender);

    const liPlaceOfBirth = document.createElement('li');
    liPlaceOfBirth.className = 'collection-item';
    liPlaceOfBirth.innerHTML = `Place of Birth: ${hero['place_of_birth']}`;
    ulAttributes.appendChild(liPlaceOfBirth);

    divCardContent.appendChild(ulAttributes);
    divCard.appendChild(divCardContent);
    //add card tabs class
    const divCardTab = document.createElement('div');
    divCardTab.className = 'card-tabs';
    const ulTabs = document.createElement('ul')
    ulTabs.className = 'tabs tabs-fixed-width';
    
    
    const aPublisher = document.createElement('a');
    aPublisher.href=`#test4`;
    aPublisher.innerHTML=`${hero['publisher']}`;
    const liPublisherTab = document.createElement('li');
    liPublisherTab.className = 'tab';
    liPublisherTab.appendChild(aPublisher);
    
    const aFullName = document.createElement('a');
    aFullName.href=`#test5`;
    aFullName.innerHTML=`${hero['full_name']}`;
    const lifullName = document.createElement('li');
    lifullName.className = 'tab';
    lifullName.appendChild(aFullName);

    const aTeamAffiliation = document.createElement('a');
    aTeamAffiliation.href=`#test6`;
    aTeamAffiliation.innerHTML=`${hero['team_affiliation']}`;
    const liTeamAffiliation = document.createElement('li');
    liTeamAffiliation.className = 'tab';
    liTeamAffiliation.appendChild(aTeamAffiliation);


    ulTabs.appendChild(lifullName);
    ulTabs.appendChild(liPublisherTab);
    ulTabs.appendChild(liTeamAffiliation);
    divCardTab.appendChild(ulTabs)
    divCard.appendChild(divCardTab);

    //append Card Content
    const divCardContentTab = document.createElement('div');
    divCardContentTab.className = 'card-content grey lighten-4';
    
    const divPublisher = document.createElement('div');
    divPublisher.id=`#test4`;
    divPublisher.innerHTML=`${hero['publisher']}`;

    const divFullName = document.createElement('div');
    divFullName.id=`#test5`;
    divFullName.innerHTML=`${hero['full_name']}`;

    const divTeamAffiliation = document.createElement('div');
    divTeamAffiliation.id=`#test6`;
    divTeamAffiliation.innerHTML=`${hero['team_affiliation']}`;

    divCardContentTab.appendChild(divFullName);
    divCardContentTab.appendChild(divPublisher);
    divCardContentTab.appendChild(divTeamAffiliation);
    divCard.appendChild(divCardContentTab);

    divColumn.appendChild(divCard);
    divRow.appendChild(divColumn);
    return divRow
}

function displayHeroes(heroes){
    for(const hero of heroes){
        const checkHero = document.getElementById(`${hero.name}-${hero.id}`);
        if (!checkHero){
            const liHeroes = document.createElement('li');
            const divVisibleHeader = document.createElement('div');
            liHeroes.id = `${hero.name}-${hero.id}`
    
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
}

function buildHeroImageTag(hero){
    const divImage = document.createElement('div');
    divImage.className = "card-image";
    const heroImage = document.createElement('img');
    heroImage.src = (!!hero['image']) ? hero['image'] : 'Print missing image';
    return heroImage
}

function buildHeroHeader(){
    const ulForHerodisplay = document.createElement('ul');
    ulForHerodisplay.className = "collapsible";
    ulForHerodisplay.setAttribute('data-collapsible', "expandable")
    const findHeroSection = document.getElementById('Superheroes');
    findHeroSection.appendChild(ulForHerodisplay);
}