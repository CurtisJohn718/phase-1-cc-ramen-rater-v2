// index.js
const baseURL = "http://localhost:3000/ramens";

// Callbacks
const handleClick = (ramen) => {
  // Add code
  document.querySelector("#ramen-detail .detail-image").src = ramen.image;
  document.querySelector("#ramen-detail .name").textContent = ramen.name;
  document.querySelector("#ramen-detail .restaurant").textContent = ramen.restaurant;
  document.getElementById("rating-display").textContent = ramen.rating;
  document.getElementById("comment-display").textContent = ramen.comment;
};

const addSubmitListener = () => {
  // Add code
  const form = document.querySelector("#new-ramen");
  if (!form) {
    console.error("❌ Form #new-ramen not found in the DOM.");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newRamen = {
      name: e.target["new-name"].value,
      restaurant: e.target["new-restaurant"].value,
      image: e.target["new-image"].value,
      rating: e.target["new-rating"].value,
      comment: e.target["new-comment"].value
    };

    console.log("✅ New ramen object:", newRamen); 

    const img = addRamenToMenu(newRamen);
    if (!img) {
      console.error("❌ New ramen image was not created.");
      return;
    }

    img.addEventListener("click", () => handleClick(newRamen)); 

    e.target.reset();
  });
};  

const displayRamens = () => {
  // Add code
  fetch(baseURL)
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.getElementById("ramen-menu");
      ramenMenu.innerHTML = ""; 

      ramens.forEach(ramen => addRamenToMenu(ramen));

      if (ramens.length > 0) {
        handleClick(ramens[0]);
      }
    })
    .catch(error => console.error("Error fetching ramens:", error));
};

const addRamenToMenu = (ramen) => {
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;
  
  img.addEventListener("click", () => handleClick(ramen));

  document.getElementById("ramen-menu").appendChild(img);

  console.log("✅ New ramen added to menu:", img.src);
  return img;
};

const main = () => {
  // Invoke displayRamens here
  // Invoke addSubmitListener here
  document.addEventListener("DOMContentLoaded", () => {
    displayRamens();
    addSubmitListener();
  });
};

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
