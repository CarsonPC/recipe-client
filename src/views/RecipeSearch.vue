<script setup lang="ts">
import { ref } from 'vue'
import { getRecipes } from '@/services/recipeService'

defineOptions({ name: 'RecipeSearchView' })

interface Recipe {
  id: number
  name: string
  description: string
}

const query = ref('')
const results = ref<Recipe[]>([])

const search = async () => {
  if (!query.value) {
    results.value = []
    return
  }
  const { data } = await getRecipes(query.value)
  results.value = data
}
</script>

<template>
  <div>
    <h1>Search Recipes</h1>
    <input v-model="query" placeholder="Search by name" />
    <button @click="search">Search</button>
    <ul>
      <li v-for="recipe in results" :key="recipe.id">
        {{ recipe.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
