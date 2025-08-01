<template>
    <div class="bg-gray-100 min-h-screen p-8 ">
        <div class="max-w-3xl mx-auto bg-white p-6 mb-6 rounded-lg shadow-lg flex flex-col items-center ">
            <h1 class="text-3xl font-bold text-blue-600 mb-6 text-center">Use async Page</h1>
            <button @click="refresh" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                recarregar dados
            </button>

            <p class="bg-white p-4 rounded shadow mb-6 max-w-2xl  mx-auto">{{ ampharos }}</p>

            <div v-if="pending" class="text-lg text-gray-600">carregando...</div>
            <div v-else-if="error" class="text-red-500 bg-red-100 p-4 rounded">
            Erro ao carregar dados: {{ error.message }}
            </div>

        </div>
          

        


        <div class="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h1 class="text-2xl font-bold text-center mb-4 text-purple-600">Meus pokemons favoritos</h1>
            <img v-if="ampharos?.image" :src="ampharos.image" :alt="ampharos.name" class="w-32 h-32 mx-auto mb-4" />
            <h2 class="text-xl font-semibold text-center mb-4" :id="ampharos?.name">{{ ampharos?.name }}</h2>

            <div class="mb-4">
                <select v-model='selectdPokemon' class="w-full p-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                    <option value="ampharos">1 - Ampharos</option>
                    <option value="altaria">2 - Altaria</option>
                    <option value="flygon">3 - Flygon</option>
                    <option value="charizard">4 - Charizard</option>
                    <option value="gengar">5 - Gengar</option>
                    <option value="breloom">6 - Breloom</option>
                </select>
            </div>
        </div>
    </div>
    


    
</template>

<script setup>

import { computed, ref } from 'vue';

const selectdPokemon = ref('ampharos');
const endpoint = computed(() => `https://pokeapi.co/api/v2/pokemon/${selectdPokemon.value}`);

const { data: ampharos, 
    pending, 
    error, 
    refresh,
} = await useAsyncData('pokemon-info',
    async () => {
        const [pokemonData, speciesData] = await Promise.all([
            $fetch(`https://pokeapi.co/api/v2/pokemon/${selectdPokemon.value}`),
            $fetch(`https://pokeapi.co/api/v2/pokemon-species/${selectdPokemon.value}`)
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
        watch: [selectdPokemon],
        lazy: true,
    }
);



</script>