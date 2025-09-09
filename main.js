/* category data */
// api links, fetching and showing all categories data from them
const categoriesData = async () => {
  const getCategoriesDataApi =
    "https://openapi.programming-hero.com/api/categories";
  const resPonse = await fetch(getCategoriesDataApi);
  const toJasonData = await resPonse.json();

  // api will pass the categories data
  displayCategory(toJasonData.categories);
};

// targeted container for showing categories
const displayCategory = (passCategoriesData) => {
  const targetCategoryContainerElement = document.getElementById(
    "categoriesDataContainer"
  );

  // clear all data before this element container
  targetCategoryContainerElement.innerHTML = "";

  // use forEach loop from api and new element creation dynamically
  passCategoriesData.forEach((loopingCategoryData) => {
    const createNewDiv = document.createElement("div");
    // targeting category when click use(onclick="filterByCategory()"") function
    createNewDiv.innerHTML = `
      <p
      onclick="filterByCategory('${loopingCategoryData.category_name}')"
      class="text-base hover:bg-[#15803D] px-3 py-1 rounded-md hover:text-white transition transform active:scale-95 cursor-pointer"
      >
        ${loopingCategoryData.category_name}
      </p>
    `;

    // add div to main container
    targetCategoryContainerElement.append(createNewDiv);
  });
};
categoriesData();

// "categories": [
// {
// "id": 1,
// "category_name": "Fruit Tree",
// "small_description": "Trees that bear edible fruits like mango."
// },

/* all plants data(make card section) */
// api links, fetching and showing all plants data from them
const allPlantsData = async () => {
  const getAllPlantsDataApi = "https://openapi.programming-hero.com/api/plants";
  const resPonse = await fetch(getAllPlantsDataApi);
  const toJasonData = await resPonse.json();
  // api will pass the image data
  displayAllPlants(toJasonData.plants);
};

// target container for showing plants
const displayAllPlants = (passAllPlantsData) => {
  const targetPlantsContainerElement = document.getElementById(
    "plantsDataContainer"
  );

  // clear all data before this container
  targetPlantsContainerElement.innerHTML = "";

  // use forEach loop from api and new card creation dynamically
  passAllPlantsData.forEach((loopingAllPlantsData) => {
    const createNewDiv = document.createElement("div");
    createNewDiv.innerHTML = `
      <div class="bg-white rounded-md shadow flex justify-between flex-col gap-3 h-full">
        <div class="">
          <img
          src="${loopingAllPlantsData.image}"
          alt=""
          class="w-full h-40 rounded-tl-md rounded-tr-md object-cover"
          />
        </div>
        <div class="flex flex-col gap-3 p-4">
            <h3 onclick="plantsNameClick('${loopingAllPlantsData.name}')" class="font-semibold self-start transition transform active:scale-95 cursor-pointer">${loopingAllPlantsData.name}</h3>
          <p class="text-xs text-gray-600 line-clamp-3">
            ${loopingAllPlantsData.description}
          </p>

          <div class="flex justify-between">
            <button
              class="bg-[#DCFCE7] text-[#15803D] rounded-3xl px-2 py-1 lg:px-3 lg:py-1 text-xs lg:text-xs"
            >
              ${loopingAllPlantsData.category}
            </button>
            <button class="text-base font-semibold">
              <span class="text-xs">৳</span>${loopingAllPlantsData.price}
            </button>
          </div>
          <button
            onclick="clickedForShownToYourCart('${loopingAllPlantsData.id}')"
            class="bg-[#15803D] text-[white] rounded-3xl lg:py-1 py-2 lg:px-4 text-xs lg:text-base transition transform active:scale-95 cursor-pointer w-full"
          >
            Add to Cart
          </button>
        </div>
      </div>
    `;

    // add div to the main container
    targetPlantsContainerElement.append(createNewDiv);
  });
};
allPlantsData();

/* work with plants title and modal (on title click for showing modal) */
// when card items button clicked, its item add and shown
const plantsNameClick = async (plantNameData) => {
  const getAllPlantsDataApi = "https://openapi.programming-hero.com/api/plants";
  const resPonse = await fetch(getAllPlantsDataApi);
  const toJasonData = await resPonse.json();

  // clicked any plants name
  const selectedPlant = toJasonData.plants.find(
    (plant) => plant.name === plantNameData
  );

  // add plant to cart section
  plantNameClickFunction(selectedPlant);
};

// plants name clicked then showing modal
const plantNameClickFunction = (passPlantsName) => {
  // plants name clicked then showing modal
  // modal data setting
  document.getElementById("modalName").innerText = passPlantsName.name;
  document.getElementById("modalImage").src = passPlantsName.image;
  document.getElementById("modalCategory").innerText = passPlantsName.category;
  document.getElementById("modalPrice").innerText = passPlantsName.price;
  document.getElementById("modalDescription").innerText =
    passPlantsName.description;

  // modal open with (showModal method of DaisyUI )
  document.getElementById("plantClickedShowingModal").showModal();
};

/* work between category data and card items */
// when category clicked, its item are shown
const filterByCategory = async (categoryName) => {
  const getAllPlantsDataApi = "https://openapi.programming-hero.com/api/plants";
  const resPonse = await fetch(getAllPlantsDataApi);
  const toJasonData = await resPonse.json();

  // filter plants
  const filtered = toJasonData.plants.filter(
    (plants) => plants.category === categoryName
  );

  // filtered plants showing
  displayAllPlants(filtered);
};

/* work between card items button and "your cart" data (your cart section) */
// total calculation array
let totalCartPlantsPrice = 0;

// by default total section of the cart section is hidden
const totalSectionWrapper = document.getElementById("totalSectionShowHide"); // total wrapper
totalSectionWrapper.style.display = "none";

// when card items button clicked, its item add and shown
const clickedForShownToYourCart = async (plantIdForBtn) => {
  const getAllPlantsDataApi = "https://openapi.programming-hero.com/api/plants";
  const resPonse = await fetch(getAllPlantsDataApi);
  const toJasonData = await resPonse.json();

  // clicked any plants button
  const selectedPlant = toJasonData.plants.find(
    (plant) => plant.id === Number(plantIdForBtn)
  );

  // add plant to cart section
  plantsNamePriceToYourCart(selectedPlant);
};

// target your cart container for showing plants name and price
const plantsNamePriceToYourCart = (passPlantsNamePriceData) => {
  const targetYourCartContainer = document.getElementById("yourCartContainer");

  // use forEach loop from api and new cart items creation dynamically
  const createNewDiv = document.createElement("div");
  createNewDiv.innerHTML = `
      <div
        class="bg-[#F0FDF4] flex items-center justify-between rounded-lg px-3 py-2"
      >
        <div class="flex flex-col gap-1">
          <h2 class="text-sm font-medium">${passPlantsNamePriceData.name}</h2>
          <p class="text-base text-[#889396]">
            <span class="text-xs">৳</span>${passPlantsNamePriceData.price}
          </p>
        </div>
        <div>
          <button
            class="transition transform active:scale-95 cursor-pointer removeXmarkBtn"
          >
            <i
              class="fa-solid fa-xmark text-red-600 flex justify-center"
            ></i>
          </button>
        </div>
      </div>
    `;
  targetYourCartContainer.appendChild(createNewDiv);

  // total showing function
  const updateCartTotal = () => {
    // target: plants total price showing element
    const targetTotalShowingElement = document.getElementById(
      "totalPlantPriceShowing"
    );
    targetTotalShowingElement.innerText = `${
      totalCartPlantsPrice /* this variable is global */
    }`;

    // hide/show total section depending on cart items
    if (totalCartPlantsPrice > 0) {
      totalSectionWrapper.style.display = "block"; // show total
    }
  };

  // remove button function for cart items
  createNewDiv
    .querySelector(".removeXmarkBtn")
    .addEventListener("click", () => {
      // when items will remove then remove from total
      totalCartPlantsPrice -= passPlantsNamePriceData.price;
      updateCartTotal();
      // item remove method
      createNewDiv.remove();
    });

  // add new plant price to total
  totalCartPlantsPrice += passPlantsNamePriceData.price;
  updateCartTotal();
};
