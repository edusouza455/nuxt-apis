<template>
    <div class="bg-gray-100 min-h-screen p-8 ">
        <div class="max-w-3xl mx-auto bg-white p-6 mb-6 rounded-lg shadow-lg flex flex-col items-center ">
             <h1>Use Fetch Page</h1>
            <button @click="refresh">recarregar dados</button>   

            <div v-if="pending">carregando...</div>
            <div v-else-if="error">Erro ao carregar dados: {{ error.message }}</div>

            
            <p class='bg-gray-200 p-8 m-4' v-else>        
                {{ charmander }}
            </p>

            <div>
                <select v-model='selectdPokemon'>
                    <option value="charmander">Charmander</option>
                    <option value="bulbasaur">Bulbasaur</option>
                    <option value="squirtle">Squirtle</option>
                </select>
            </div>
            
        </div>
       

    </div>
    

    

</template>

<script setup>
import { computed } from 'vue';
const selectdPokemon = ref('charmander');
const endpoint = computed(() => `https://pokeapi.co/api/v2/pokemon/${selectdPokemon.value}`);

const { data: charmander, 
    pending, 
    error, refresh} = await useFetch(endpoint, {
    metthod: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    transform:(data)=> ({
        id: data.id,
        name: data.name,
        Image: data.sprites.front_default,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map(ability => ability.ability.name)
    }),

});

</script>