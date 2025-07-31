//Global variables
const menuBtn = document.querySelector('.mobile-menu');
const menu = document.querySelector('.nav-list');
const newRecipesBtn = document.getElementById('newRecipesBtn');


// Open the navigation menu
function openNavigation() {
  menuBtn.setAttribute("aria-expanded", "true");
  menu.classList.add("active");
}

// Close the navigation menu
function closeNavigation() {
  menuBtn.setAttribute("aria-expanded", "false");
  menu.classList.remove("active");
}

// Toggle the navigation menu
function toggleNavigation() {
  const open = menuBtn.getAttribute("aria-expanded");
  open === "false" ? openNavigation() : closeNavigation();
}

// Add event listener to the menu button
menuBtn.addEventListener('click', toggleNavigation);

// Add event listener to the escape key
window.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    menuBtn.focus();
    closeNavigation();
  }
});

// Set the current year in the footer
let date = new Date().getFullYear();
document.getElementById("currentYear").textContent = date;


// Function to create a recipe card element
function createRecipeCard(fullMeal) {
  const recipeCard = document.createElement('div');
  recipeCard.className = 'recipe-card';
  
  const recipeImage = document.createElement('img');
  recipeImage.src = fullMeal.strMealThumb;
  recipeImage.alt = fullMeal.strMeal;
  recipeImage.className = 'recipe-image';
  
  const recipeContent = document.createElement('div');
  recipeContent.className = 'recipe-content';
  
  const recipeTitle = document.createElement('h3');
  recipeTitle.className = 'recipe-title';
  recipeTitle.textContent = fullMeal.strMeal;
  
  const recipeLink = document.createElement('a');
  recipeLink.href = fullMeal.strSource;
  recipeLink.className = 'recipe-link';
  recipeLink.target = '_blank';
  recipeLink.textContent = 'View Recipe →';
  
  // Append elements to build the structure
  recipeContent.appendChild(recipeTitle);
  recipeContent.appendChild(recipeLink);
  recipeCard.appendChild(recipeImage);
  recipeCard.appendChild(recipeContent);
  
  return recipeCard;
}

// Function to fetch and display random onion recipes
function loadRandomRecipes() {
  // Clear existing recipes
  const grid = document.querySelector('.recipe-card-grid');
  grid.innerHTML = '';
  
  fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=onion')
    .then(response => response.json())
    .then(function(dataResp) {
      let meals = dataResp.meals;
      let shuffled = meals.sort(() => 0.5 - Math.random());
      let selectedMeals = shuffled.slice(0, 3);
      
      selectedMeals.forEach(function(meal) {
        const mealId = meal.idMeal;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
          .then(response => response.json())
          .then(function(mealExt) {
            const fullMeal = mealExt.meals[0];
            console.log(fullMeal);
            
            // Create recipe card and add to grid
            const recipeCard = createRecipeCard(fullMeal);
            grid.appendChild(recipeCard);
          })
      })
    })
    .catch(error => {
      console.error('Error fetching recipes:', error);
    });
}

// Once the DOM is loaded, load initial recipes and set up button
document.addEventListener('DOMContentLoaded', function() {
  // Load initial recipes
  loadRandomRecipes();
  // Add event listener to "Get New Recipes" button
  newRecipesBtn.addEventListener('click', loadRandomRecipes);
});

