import api from './api'

export interface RegisterPayload {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface LoginPayload {
  email: string
  password: string
}

export const register = (payload: RegisterPayload) => api.post('/api/register', payload)

export const login = (payload: LoginPayload) => api.post('/api/login', payload)

export const logout = () => api.post('/api/logout')
