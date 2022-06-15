const form = document.querySelector('#firstForm');
let pokemonData = null;
const formInput = document.querySelector('#search');

form.addEventListener("submit", function(e){ //when the submit button is clicked.
    e.preventDefault(); //prevent default behavior.
    console.log("Form clicked.") //log the form being clicked.
    let userInput = formInput.value.toLowerCase(); //lowercase the form input & save it to a variable.
    fetchPokemonData(userInput);
}
)

const fetchPokemonData = async(userInput) => {
    try{
        clearContainer();
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon/" + userInput)
        pokemonData = res.data 
        formInput.value = "";
        createPokemonCard();
    }
    catch(err){
        console.log("ERROR!", err)
        formInput.value = "";
        const pokemonName = document.querySelector('#pokemon-name');
        pokemonName.innerText = `${err}`;
        const pokemonType = document.querySelector('#pokemon-type');
        pokemonType.innerText = `Check your spelling!`;
    }
}

const createPokemonCard = (pokemon) =>{
    const pokemonName = document.querySelector('#pokemon-name');
    pokemonName.innerText = capitalize(pokemonData.name);

    const pokemonSprite = document.querySelector('#pokemon-sprite');
    pokemonSprite.src = pokemonData.sprites.front_default;

    const pokemonType = document.querySelector('#pokemon-type');
    pokemonType.innerText = capitalize(pokemonData.types[0].type.name);
}

function clearContainer(){
    const pokemonName = document.querySelector('#pokemon-name');
    pokemonName.innerText = "";

    const pokemonSprite = document.querySelector('#pokemon-sprite');
    pokemonSprite.src = "";

    const pokemonType = document.querySelector('#pokemon-type');
    pokemonType.innerText = "";
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }