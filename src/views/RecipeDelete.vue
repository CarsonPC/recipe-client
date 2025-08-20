<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { deleteRecipe } from '@/services/recipeService'

defineOptions({ name: 'RecipeDeleteView' })

const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)

const remove = async () => {
  await deleteRecipe(id)
  router.push({ name: 'recipes' })
}
</script>

<template>
  <div>
    <h1>Delete Recipe</h1>
    <p>Are you sure you want to delete this recipe?</p>
    <button @click="remove">Delete</button>
    <router-link :to="{ name: 'recipes' }">Cancel</router-link>
  </div>
</template>

<style scoped></style>
