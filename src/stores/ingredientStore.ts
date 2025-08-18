/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import {
  getIngredients,
  getIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  type IngredientPayload,
} from '@/services/ingredientService'

export const useIngredientStore = defineStore('ingredients', {
  state: () => ({
    ingredients: [] as any[],
    ingredientMap: {} as Record<number, any>,
  }),
  actions: {
    async fetchIngredients(force = false) {
      if (!force && this.ingredients.length) return this.ingredients
      const response = await getIngredients()
      this.ingredients = response.data
      return this.ingredients
    },
    async fetchIngredient(id: number, force = false) {
      if (!force && this.ingredientMap[id]) return this.ingredientMap[id]
      const response = await getIngredient(id)
      this.ingredientMap[id] = response.data
      return response.data
    },
    async createIngredient(payload: IngredientPayload) {
      const response = await createIngredient(payload)
      const ingredient = response.data
      const id = ingredient.id || ingredient?.data?.id
      if (id) this.ingredientMap[id] = ingredient
      this.ingredients.push(ingredient)
      return ingredient
    },
    async updateIngredient(id: number, payload: IngredientPayload) {
      const response = await updateIngredient(id, payload)
      const ingredient = response.data
      this.ingredientMap[id] = ingredient
      this.ingredients = this.ingredients.map((i: any) =>
        (i.id || i?.data?.id) === id ? ingredient : i
      )
      return ingredient
    },
    async deleteIngredient(id: number) {
      await deleteIngredient(id)
      delete this.ingredientMap[id]
      this.ingredients = this.ingredients.filter(
        (i: any) => (i.id || i?.data?.id) !== id
      )
    },
  },
})
