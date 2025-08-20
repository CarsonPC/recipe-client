<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getRecipe, createRecipe, updateRecipe } from '@/services/recipeService'

defineOptions({ name: 'RecipeFormView' })

const route = useRoute()
const router = useRouter()

const id = route.params.id ? Number(route.params.id) : null
const name = ref('')
const description = ref('')

onMounted(async () => {
  if (id) {
    const { data } = await getRecipe(id)
    name.value = data.name
    description.value = data.description
  }
})

const submit = async () => {
  const payload = {
    data: {
      attributes: {
        name: name.value,
        description: description.value,
      },
    },
  }

  if (id) {
    await updateRecipe(id, payload)
  } else {
    await createRecipe(payload)
  }

  router.push({ name: 'recipes' })
}
</script>

<template>
  <div>
    <h1>{{ id ? 'Edit' : 'Create' }} Recipe</h1>
    <form @submit.prevent="submit">
      <div>
        <label for="name">Name</label>
        <input id="name" v-model="name" required />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="description"></textarea>
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<style scoped></style>
