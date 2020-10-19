document.addEventListener("DOMContentLoaded", callONLoad)
function callONLoad(){
    const sideNav = document.querySelector('.sidenav');
    M.Sidenav.init(sideNav, {});


    const sliderItem = document.querySelectorAll('.slider');
    const instances = M.Slider.init(sliderItem, {
        indicators: false,
        height: 600, 
        transition: 500,
        interval: 4000,
        
    });
    //Sliders to scroll on to the page
    const scrollSpy = document.querySelectorAll('.scrollspy')
    let scrolls = M.ScrollSpy.init(scrollSpy, {});

    const dropdown = document.querySelectorAll('.dropdow-trigger');
    let dropdowns = M.Dropdown.init(dropdown, {});

    const collapse = document.querySelectorAll('.collapsible');
    M.Collapsible.init(collapse, {});
    // const carousel = document.querySelectorAll('.carousel');
    // let carousels = M.Carousel.init(carousel, {
    //     duration: 500,
    //     numVisible: 5
    // });

    
    signUp();
    logIn();
    signUpSideNav();
    logInSideNav();
    getAllUsers();
    loadHeroes();
    getHeroes();
}   

