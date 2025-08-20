<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getRecipes } from '@/services/recipeService'

defineOptions({ name: 'RecipeListView' })

interface Recipe {
  id: number
  name: string
  description: string
}

const recipes = ref<Recipe[]>([])

onMounted(async () => {
  const { data } = await getRecipes()
  recipes.value = data
})
</script>

<template>
  <div>
    <h1>Recipes</h1>
    <router-link to="/recipes/new">Create Recipe</router-link>
    <ul>
      <li v-for="recipe in recipes" :key="recipe.id">
        {{ recipe.name }}
        <router-link :to="`/recipes/${recipe.id}/edit`">Edit</router-link>
        <router-link :to="`/recipes/${recipe.id}/delete`">Delete</router-link>
      </li>
    </ul>
    <router-link to="/recipes/search">Search Recipes</router-link>
  </div>
</template>

<style scoped></style>
