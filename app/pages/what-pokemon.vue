<template>
    <div class="bg-gray-100 min-h-screen p-8 ">
        <div class="max-w-3xl mx-auto bg-white p-6 mb-6 rounded-lg shadow-lg flex flex-col items-center ">
            <h1 class="tituloUnico text-3xl font-bold text-blue-600 mb-6 text-center">Qual é esse pokemon?</h1>
            <button @click="sortNewPokemon" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                Novo Pokemon
            </button>

            <img v-if="poke?.image" :src="poke.image" :alt="poke.name" class="w-32 h-32 mx-auto mb-4" />
            <div class="flex flex-row justify-around w-full mb-4">
                <button @click="quest" :id="poke?.name" >{{ poke?.name }}</button>
                <button @click="quest" :id="poke1?.name" >{{ poke1?.name }}</button>
                <button @click="quest" :id="poke2?.name" >{{ poke2?.name }}</button>


            </div>

            <div v-if="pending" class="text-gray-500">Carregando...</div>

        </div>
          

        
    </div>

    <Teleport to="body">
    <modal :show="showModal" @close="showModal = false">
      <template #header>
        <h3>cabeçalho personalizado</h3>
      </template>
    </modal>
  </Teleport>
    


    
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

 .tituloUnico {
    font-family: 'Press Start 2P', cursive;
}
</style>

<script setup>

import { computed, ref } from 'vue';

const showModal = ref(false)

const random = () =>{
    const randomid = Math.floor(Math.random() * 101) + 1;
    return randomid;
}

const sortPokemon = ref(random());
const randomName1 = ref(random());
const randomName2 = ref(random());

function sortNewPokemon() {
    sortPokemon.value = random();
    randomName1.value = random();
    randomName2.value = random();
    
}

function quest(event) {
    const escolhido = event.target.id;
    const certo = poke.value.name;

    if (escolhido === certo) {
        alert('Sim é esse') 
    } else{
        alert('errou')
    }
}


const endpoint = computed(() => `https://pokeapi.co/api/v2/pokemon/${sortPokemon.value}`);

const { data: poke, 
    pending, 
    error, 
    refresh,
} = await useAsyncData('pokemon-info',
    async () => {
        const [pokemonData, speciesData] = await Promise.all([
            $fetch(`https://pokeapi.co/api/v2/pokemon/${sortPokemon.value}`),
            $fetch(`https://pokeapi.co/api/v2/pokemon-species/${sortPokemon.value}`)
        ]);

        return {
            id: pokemonData.id,
            name: pokemonData.name,
            image: pokemonData.sprites.front_default,
            habitat: speciesData.habitat?.name,
            shape: speciesData.shape?.name,
        };
    },
    {
        watch: [sortPokemon],
        lazy: true,
    }
);

const { data: poke1, 
} = await useAsyncData('pokemon1',
    async () => {
        const [pokemon1] = await Promise.all([
            $fetch(`https://pokeapi.co/api/v2/pokemon/${randomName1.value}`),
        ]);

        return {
            id: pokemon1.id,
            name: pokemon1.name,           
        };
    },
    {
        watch: [randomName1],
        lazy: true,
    }
);

const { data: poke2, 
} = await useAsyncData('pokemon2',
    async () => {
        const [pokemon2] = await Promise.all([
            $fetch(`https://pokeapi.co/api/v2/pokemon/${randomName2.value}`),
        ]);

        return {
            id: pokemon2.id,
            name: pokemon2.name,           
        };
    },
    {
        watch: [randomName2],
        lazy: true,
    }
);



</script>