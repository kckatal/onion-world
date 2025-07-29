const menuBtn = document.querySelector('.mobile-menu');
const menu = document.querySelector('.nav-list');
function openNavigation() {
    menuBtn.setAttribute("aria-expanded", "true");
    menu.classList.add("active");
}
function closeNavigation() {
    menuBtn.setAttribute("aria-expanded", "false");
    menu.classList.remove("active");
}
function toggleNavigation() {
    const open = menuBtn.getAttribute("aria-expanded");
    open === "false" ? openNavigation() : closeNavigation();
}
menuBtn.addEventListener('click', toggleNavigation);
window.addEventListener("keyup", (e)=>{
    if (e.key === "Escape") {
        menuBtn.focus();
        closeNavigation();
    }
});
document.addEventListener('DOMContentLoaded', function() {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=onion').then((response)=>response.json()).then(function(dataResp) {
        let meals = dataResp.meals;
        let shuffled = meals.sort(()=>0.5 - Math.random());
        let selectedMeals = shuffled.slice(0, 3);
        selectedMeals.forEach(function(meal) {
            const mealId = meal.idMeal;
            // console.log(meal.idMeal);
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`).then((response)=>response.json()).then(function(mealExt) {
                const grid = document.querySelector('.recipe-card-grid');
                const fullMeal = mealExt.meals[0];
                console.log(fullMeal);
                //mealImgUrl = fullMeal.strMealThumb;
                // mealImg = document.createElement('img')
                // mealImg.src = mealImgUrl;
                // mealImg.alt = fullMeal.strMeal;
                // mealImg.classList.add('recipe-image');
                // grid.appendChild(mealImg);
                let mealHTML = `<div class="recipe-card">
            <img src="${fullMeal.strMealThumb}" alt="${fullMeal.strMeal}" class="recipe-image">
            <div class="recipe-content">
              <h3 class="recipe-title">${fullMeal.strMeal}</h3>
              <a href="${fullMeal.strSource}" class="recipe-link" target="_blank">View Recipe \u{2192}</a>
            </div>
          </div>`;
                const readyHTML = document.createRange().createContextualFragment(mealHTML);
                grid.appendChild(readyHTML);
            });
        });
    });
}); // fetch('https://api.giphy.com/v1/gifs/random?api_key=HZkPTkoQFPdacL4TXEBAUDMgbKRr9s7r&tag=chef+onion&rating=g')
 //   .then(response => response.json())
 //   .then(function(data) {
 //     let gif = data.data.images.original.url;
 //     const gifWrap = document.querySelector('.onion-gif');
 //     gifWrap.innerHTML = `<img src="${gif}" alt="Onion GIF">`;
 //   })

//# sourceMappingURL=onion-world.672d4772.js.map
