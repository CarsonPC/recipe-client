import api from "./api";

export interface RecipePayload {
  data: {
    attributes: {
      name?: string;
      description?: string;
      estimated_time?: number;
      steps?: string[];
      ingredients?: string[];
    };
    relationships?: {
      author?: {
        data: {
          attributes: {
            id: number;
          };
        };
      };
    };
  };
}

export const getRecipes = (search?: string) =>
  api.get("/api/v1/recipes", { params: { search } });

export const getRecipe = (id: number, include?: string) =>
  api.get(`/api/v1/recipes/${id}`, { params: { include } });

export const createRecipe = (payload: RecipePayload) =>
  api.post("/api/v1/recipes", payload);

export const updateRecipe = (id: number, payload: RecipePayload) =>
  api.patch(`/api/v1/recipes/${id}`, payload);

export const deleteRecipe = (id: number) =>
  api.delete(`/api/v1/recipes/${id}`, { data: { id } });
