/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineStore } from 'pinia'
import {
  getSteps,
  getStep,
  createStep,
  updateStep,
  deleteStep,
  type StepPayload,
} from '@/services/stepService'

export const useStepStore = defineStore('steps', {
  state: () => ({
    steps: [] as any[],
    stepMap: {} as Record<number, any>,
  }),
  actions: {
    async fetchSteps(force = false) {
      if (!force && this.steps.length) return this.steps
      const response = await getSteps()
      this.steps = response.data
      return this.steps
    },
    async fetchStep(id: number, force = false) {
      if (!force && this.stepMap[id]) return this.stepMap[id]
      const response = await getStep(id)
      this.stepMap[id] = response.data
      return response.data
    },
    async createStep(payload: StepPayload) {
      const response = await createStep(payload)
      const step = response.data
      const id = step.id || step?.data?.id
      if (id) this.stepMap[id] = step
      this.steps.push(step)
      return step
    },
    async updateStep(id: number, payload: StepPayload) {
      const response = await updateStep(id, payload)
      const step = response.data
      this.stepMap[id] = step
      this.steps = this.steps.map((s: any) =>
        (s.id || s?.data?.id) === id ? step : s
      )
      return step
    },
    async deleteStep(id: number) {
      await deleteStep(id)
      delete this.stepMap[id]
      this.steps = this.steps.filter(
        (s: any) => (s.id || s?.data?.id) !== id
      )
    },
  },
})
