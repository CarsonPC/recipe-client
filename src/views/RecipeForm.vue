<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  getRecipe,
  createRecipe,
  updateRecipe,
} from "@/services/recipeService";

defineOptions({ name: "RecipeFormView" });

const route = useRoute();
const router = useRouter();

const id = route.params.id ? Number(route.params.id) : null;
const name = ref("");
const description = ref("");
const estimatedTime = ref<number | null>(null);
const steps = ref<string[]>([""]);
const ingredients = ref<string[]>([""]);

onMounted(async () => {
  if (id) {
    const { data } = await getRecipe(id, "steps,ingredients");
    name.value = data.name;
    description.value = data.description;
    estimatedTime.value = (data.estimated_time as number) ?? null;
    steps.value = data.steps?.map(
      (s: { description: string }) => s.description,
    ) || [""];
    ingredients.value = data.ingredients?.map(
      (i: { name: string }) => i.name,
    ) || [""];
  }
});

const addStep = () => steps.value.push("");
const addIngredient = () => ingredients.value.push("");

const submit = async () => {
  const payload = {
    data: {
      attributes: {
        name: name.value,
        description: description.value,
        estimated_time: estimatedTime.value ?? undefined,
        steps: steps.value.filter((s) => s.trim().length),
        ingredients: ingredients.value.filter((i) => i.trim().length),
      },
    },
  };

  if (id) {
    await updateRecipe(id, payload);
  } else {
    await createRecipe(payload);
  }

  router.push({ name: "recipes" });
};
</script>

<template>
  <div>
    <h1>{{ id ? "Edit" : "Create" }} Recipe</h1>
    <form @submit.prevent="submit">
      <div>
        <label for="name">Name</label>
        <input id="name" v-model="name" required />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="description"></textarea>
      </div>
      <div>
        <label for="estimatedTime">Estimated Time (minutes)</label>
        <input
          id="estimatedTime"
          type="number"
          min="0"
          v-model.number="estimatedTime"
        />
      </div>
      <div>
        <label>Ingredients</label>
        <div v-for="(ingredient, index) in ingredients" :key="index">
          <input
            :id="`ingredient-${index}`"
            v-model="ingredients[index]"
            placeholder="Ingredient"
          />
        </div>
        <button type="button" @click="addIngredient">Add Ingredient</button>
      </div>
      <div>
        <label>Steps</label>
        <div v-for="(step, index) in steps" :key="index">
          <input
            :id="`step-${index}`"
            v-model="steps[index]"
            placeholder="Step description"
          />
        </div>
        <button type="button" @click="addStep">Add Step</button>
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<style scoped></style>
