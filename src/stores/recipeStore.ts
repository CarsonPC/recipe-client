/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import {
  getRecipes,
  getRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  type RecipePayload,
} from '@/services/recipeService'

export const useRecipeStore = defineStore('recipes', {
  state: () => ({
    recipes: [] as any[],
    recipeMap: {} as Record<number, any>,
  }),
  actions: {
    async fetchRecipes(force = false) {
      if (!force && this.recipes.length) return this.recipes
      const response = await getRecipes()
      this.recipes = response.data
      return this.recipes
    },
    async fetchRecipe(id: number, force = false) {
      if (!force && this.recipeMap[id]) return this.recipeMap[id]
      const response = await getRecipe(id)
      this.recipeMap[id] = response.data
      return response.data
    },
    async createRecipe(payload: RecipePayload) {
      const response = await createRecipe(payload)
      const recipe = response.data
      const id = recipe.id || recipe?.data?.id
      if (id) this.recipeMap[id] = recipe
      this.recipes.push(recipe)
      return recipe
    },
    async updateRecipe(id: number, payload: RecipePayload) {
      const response = await updateRecipe(id, payload)
      const recipe = response.data
      this.recipeMap[id] = recipe
      this.recipes = this.recipes.map((r: any) =>
        (r.id || r?.data?.id) === id ? recipe : r
      )
      return recipe
    },
    async deleteRecipe(id: number) {
      await deleteRecipe(id)
      delete this.recipeMap[id]
      this.recipes = this.recipes.filter(
        (r: any) => (r.id || r?.data?.id) !== id
      )
    },
  },
})
