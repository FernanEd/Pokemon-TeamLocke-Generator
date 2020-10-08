
var currentGeneration = 0;

var pokePicker = document.querySelector('#generate-picker');

pokePicker.addEventListener('change', e => {
    currentGeneration = parseInt(pokePicker.value);
});


function endLoading()
{
    document.querySelector("#mainpage").style.display = "block";
    console.log('Loaded');
}

function randomPokeNumb()
{
    switch (currentGeneration)
    {
        case 1:
            return Math.round(Math.random() * 151);
        case 2:
            return Math.round(Math.random() * 251);
        case 3:
            return Math.round(Math.random() * 386);
        case 4:
            return Math.round(Math.random() * 493);
        case 5:
            return Math.round(Math.random() * 649);
        case 6:
            return Math.round(Math.random() * 721);
        case 7:
        default:
            return Math.round(Math.random() * 809);
    }
}

function getGenSprite(data)
{
    switch (currentGeneration)
    {
        case 1:
            return data.sprites.versions['generation-i']['red-blue']
        case 2:
            return data.sprites.versions['generation-ii']['crystal']
        case 3:
            return data.sprites.versions['generation-iii']['emerald']
        case 4:
            return data.sprites.versions['generation-iv']['heartgold-soulsilver']
        case 5:
            return data.sprites.versions['generation-v']['black-white']
        case 6:
        case 7:
        default:
            return data.sprites.versions['generation-vii']['ultra-sun-ultra-moon']
    }
}

function shinyChance()
{
    return (Math.round(Math.random() * 8192)) > 8100;
}

generateTeam();

function generateTeam()
{
    //Change pokemon sprites
    let pokemons = document.querySelectorAll('.poke-container');
    pokemons.forEach(pokemon => {
        dexNumb = randomPokeNumb();
        //console.log(dexNumb);

        fetch(`https://pokeapi.co/api/v2/pokemon/${dexNumb}/`, {
            method: 'GET',
            cache: 'no-cache',
        })
        .then(response => {
            if(response.status != 200)
            {
                console.log('Expected status 200, instead got ' + response.statusText)
                return ;
            }
            response.json().then(data =>{
                if (shinyChance() && currentGeneration != 1)
                {
                    sprsource = getGenSprite(data).front_shiny;
                    pokemon.lastElementChild.innerHTML= strCapital(data.name);
                    pokemon.lastElementChild.style.color = 'red';
                }
                else
                {
                    sprsource = getGenSprite(data).front_default;
                    pokemon.lastElementChild.innerHTML= strCapital(data.name);
                    pokemon.lastElementChild.style.color = 'initial';
                }
                pokemon.firstElementChild.setAttribute('src', sprsource);
                pokemon.firstElementChild.setAttribute('alt', data.name);
                
            })
        });
    });

}

function strCapital(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

