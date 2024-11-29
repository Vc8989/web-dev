async function loadCategories() {
    const apiUrl = "https://www.themealdb.com/api/json/v1/1/categories.php";
    const container = document.getElementById("category-container");
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch data");
  
      const data = await response.json();
  
      container.innerHTML = "";
  
      data.categories.forEach(category => {
        const card = document.createElement("div");
        card.className = "card";
  
        card.innerHTML = `
          <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
          <h3>${category.strCategory}</h3>
          <p>${category.strCategoryDescription.substring(0, 100)}...</p>
        `;
  
        container.appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      container.innerHTML = "<p>Something went wrong while loading categories.</p>";
    }
  }
  
  async function loadIngredientsDropdown() {
    const apiUrl = "https://www.themealdb.com/api/json/v1/1/list.php?i=list";
    const select = document.getElementById("ingredient-select");
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch ingredients");
  
      const data = await response.json();
  
      data.meals.forEach(ingredient => {
        const option = document.createElement("option");
        option.value = ingredient.strIngredient;
        option.textContent = ingredient.strIngredient;
        select.appendChild(option);
      });
    } catch (error) {
      console.error("Error loading ingredient dropdown:", error);
      select.innerHTML = "<option value=''>Failed to load ingredients</option>";
    }
  }
  
  async function loadMealsByIngredient() {
    const selectedIngredient = document.getElementById("ingredient-select").value;
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`;
    const container = document.getElementById("ingredient-container");
  
    container.innerHTML = "";
  
    if (!selectedIngredient) {
      container.innerHTML = "<p>Please select an ingredient.</p>";
      return;
    }
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch meals");
  
      const data = await response.json();
  
      data.meals.forEach(meal => {
        const card = document.createElement("div");
        card.className = "card";
  
        card.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
        `;
  
        container.appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching meals by ingredient:", error);
      container.innerHTML = "<p>Something went wrong while loading meals.</p>";
    }
  }
  
  document.getElementById("load-categories").addEventListener("click", loadCategories);
  document.getElementById("ingredient-select").addEventListener("change", loadMealsByIngredient);
  
  window.addEventListener("DOMContentLoaded", loadIngredientsDropdown);