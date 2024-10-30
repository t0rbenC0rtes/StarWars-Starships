const request = "https://swapi.dev/api/starships";
const starShips = document.querySelector(".starShips");
const modal = document.getElementById("ship-modal");
const closeModalBtn = document.getElementById("close-modal");

// Elements to display ship details in the modal
const shipName = document.getElementById("name");
const model = document.getElementById("model");
const manufacturer = document.getElementById("manufacturer");
const cost = document.getElementById("cost");
const crew = document.getElementById("crew");
const speed = document.getElementById("speed");

function openModal(shipData) {
  // Fill modal content with ship data
  shipName.textContent = `NAME: ${shipData.name}`;
  model.textContent = `MODEL: ${shipData.model}`;
  manufacturer.textContent = `MANUFACTURER: ${shipData.manufacturer}`;
  cost.textContent = `COST: ${shipData.cost_in_credits}$`;
  crew.textContent = `CREW CAPACITY: ${shipData.crew}`;
  speed.textContent = `MAX SPEED: ${shipData.max_atmosphering_speed}`;
  
  // Show the modal
  modal.classList.remove("hidden");
  modal.style.display = "block";
}

// Close modal function
function closeModal() {
  modal.classList.add("hidden");
  modal.style.display = "none";
}

// Fetch ships and set up click event listeners on each ship
function loadShips() {
  fetch(request)
    .then((res) => res.json())
    .then((data) => {
      const shipImages = document.querySelectorAll(".shipImg");

      // Loop through the ship images and assign the respective ship data
      shipImages.forEach((shipImg, index) => {
        const shipData = data.results[index];

        // Add click event listener to open modal with the specific ship data
        shipImg.addEventListener("click", () => openModal(shipData));
      });
    })
    .catch((error) => console.error("Error fetching starships:", error));
}

loadShips();

// Close modal when clicking outside modal content

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Close modal on ESC key press
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
  }
});