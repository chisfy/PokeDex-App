let apiUrl;

//main function
async function getandDisplayPokemonData() {
  const userSearch = document.querySelector("#search-name").value;
  apiUrl = `https://pokeapi.co/api/v2/pokemon/${userSearch}`;
  const stats = await retrievePokemonData();
  await updatingText(stats);
}

//function get data from api
async function retrievePokemonData() {
  const response = await fetch(apiUrl, {
    headers: {
      Accept: "application/json",
    },
  });

  // "https://pokeapi.co/api/v2/pokemon/pikachu"

  if (!response.ok) {
    console.log("Oh no, no pokemon could be found try again");
    console.log(`Status: ${response.status}`);
    console.log(`Text: ${await response.text()}`);
    return;
  }

  const pokemonData = await response.json();

  return pokemonData;
}

//function to format data into captialised words

// function to apply to all data

//variables related to the function below
let pokeName = document.querySelector(".pokemon-name");
let pokeType = document.querySelector(".pokemon-type");
let pokeWeight = document.querySelector(".pokemon-weight");
let pokeHeight = document.querySelector(".pokemon-height");
let pokeMoves = document.querySelector(".pokemon-moves");
let pokeHealth = document.querySelector(".pokemon-health-stat");
let pokeAttack = document.querySelector(".pokemon-attack-stat");
let pokeSpecAttack = document.querySelector(".pokemon-special-attack-stat");
let pokeImage = document.getElementById("img-box-container");
const imgElement = document.createElement("img");
//function that actions what we do with the data
function updatingText(stats) {
  let pokname = stats.name.toString();
  pokname = pokname.charAt(0).toUpperCase() + pokname.slice(1).toLowerCase();
  pokeName.textContent = "Name: " + pokname;
  let poktype = stats.types[0].type.name.toString();
  poktype = poktype.charAt(0).toUpperCase() + poktype.slice(1).toLowerCase();
  pokeType.textContent = "Type: " + poktype;
  pokeWeight.textContent = `Weight: ${stats.weight / 100}KG`;
  pokeHeight.textContent = `Height: ${stats.height / 10}M`;
  listOfMoves(stats);
  pokeHealth.textContent = `Health:  ${stats.stats[0].base_stat} HP`;
  pokeHealth.textContent = `Health:  ${stats.stats[0].base_stat} HP`;
  pokeAttack.textContent = `Attack:  ${stats.stats[1].base_stat} Damage`;
  pokeSpecAttack.textContent = `Special Attack:  ${stats.stats[3].base_stat} Damage`;
  imgElement.src = stats.sprites["front_default"];
  pokeImage.appendChild(imgElement);
}

//turn the moves into a list of string
function listOfMoves(stats) {
  let listofNames = [];
  for (let i = 0; i < stats.moves.length; i++) {
    if (i < stats.moves.length) {
      listofNames.push(capitalizeWords(stats.moves[i].move.name));
    }
  }

  let stringedList = listofNames.toString();
  let spacedOutList = stringedList.replace(/,/g, ", ");

  return (pokeMoves.textContent = `Moves: ${spacedOutList}`);
}

//function to capitalize the word in the api
function capitalizeWords(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// function capitalize(str) {
//   return str.replace(/\b\w/g, (char) => char.toUpperCase());
// }

// variable to select the button
let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", getandDisplayPokemonData);

function displayurl() {
  console.log(apiUrl);
}
