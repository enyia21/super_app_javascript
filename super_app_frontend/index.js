document.addEventListener("DOMContentLoaded", callONLoad)
function callONLoad(){
    const sideNav = document.querySelector('.sidenav');
    M.Sidenav.init(sideNav, {});


    var sliderItem = document.querySelectorAll('.slider');
    var instances = M.Slider.init(sliderItem, {
        indicators: false,
        height: 600, 
        transition: 500,
        interval: 4000,
        
    });
    //Sliders to scroll on to the page
    const scrollSpy = document.querySelectorAll('.scrollspy')
    let scrolls = M.ScrollSpy.init(scrollSpy, {});

    const dropdown = document.querySelectorAll('.dropdow-trigger');
    let dropdowns = M.Dropdown.init(dropdown, {
        alignment: 'center'
    });

    const collapse = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapse, {});
    const carousel = document.querySelectorAll('.carousel');
    var carousels = M.Carousel.init(carousel, {
        duration: 500,
        numVisible: 5,
        dist: -100,
        fullWidth: true
    });

    
    signUp();
    logIn();
    signUpSideNav();
    logInSideNav();
    getAllUsers();
    loadHeroes();
    getHeroes();
}  

function callOnSlideCreation(){
    const sliderItem = document.querySelector('#team-slides');
    const slides = M.Slider.init(sliderItem, {
        height: 400, 
        transition: 500,
        interval: 4000,
        
    });
}

