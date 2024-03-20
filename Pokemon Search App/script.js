const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const spAttack = document.getElementById('special-attack');
const spDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const container = document.getElementById('sprite-container');

const pokemon = data => {
   
    pokemonName.innerHTML = `${(data.name).toUpperCase()}`;
    pokemonId.textContent = `#${data.id}`;
    weight.innerHTML = `Weight: ${data.weight}`;
    height.innerHTML = `Height: ${data.height}`;
    hp.textContent = `${data.stats[0].base_stat}`;
    attack.textContent = `${data.stats[1].base_stat}`;
    defense.textContent = `${data.stats[2].base_stat}`;
    spAttack.textContent = `${data.stats[3].base_stat}`;
    spDefense.textContent = `${data.stats[4].base_stat}`;
    speed.textContent = `${data.stats[5].base_stat}`;
    types.innerHTML = data.types
        .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
        .join('');
    container.innerHTML = `
        <img id="sprite" src="${data.sprites.front_default}" >`
    ;
}

const resetDisplay = () => {
    const sprite = document.getElementById('sprite');
    if (sprite) sprite.remove();
  
    pokemonName.textContent = '';
    pokemonId.textContent = '';
    types.innerHTML = '';
    height.textContent = '';
    weight.textContent = '';
    hp.textContent = '';
    attack.textContent = '';
    defense.textContent = '';
    spAttack.textContent = '';
    spDefense.textContent = '';
    speed.textContent = '';
  };

const fetchData = async () => {
    try {
        const search = searchInput.value.toLowerCase().trim();
        const res = await fetch (`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${search}/`);
        const data = await res.json();
        pokemon(data);
        
    } catch (err) {
        resetDisplay();
        alert("Pokémon not found");
        console.log(`Pokémon not found: ${err}`);
    }
};

searchBtn.addEventListener('click', () => {
    types.textContent = "";
    pokemonName.textContent = "";
    pokemonId.textContent = "";
    fetchData();
});