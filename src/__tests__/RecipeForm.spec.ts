import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import RecipeForm from "@/views/RecipeForm.vue";

vi.mock("vue-router", () => ({
  useRoute: () => ({ params: {} }),
  useRouter: () => ({ push: vi.fn() }),
}));

describe("RecipeForm", () => {
  it("renders fields for estimated time, ingredients and steps", () => {
    const wrapper = mount(RecipeForm);
    expect(wrapper.find("#estimatedTime").exists()).toBe(true);
    expect(wrapper.find("#ingredient-0").exists()).toBe(true);
    expect(wrapper.find("#step-0").exists()).toBe(true);
  });
});
