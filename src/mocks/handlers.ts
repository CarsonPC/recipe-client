import { http, HttpResponse } from 'msw'

const handlers = [
  http.post('/api/register', () =>
    HttpResponse.json({ message: 'User registered', data: { token: 'mock-token' } }),
  ),
  http.post('/api/login', () =>
    HttpResponse.json({ message: 'Logged in', data: { token: 'mock-token' } }),
  ),
  http.post('/api/logout', () => HttpResponse.json({ message: 'Logged out' })),
  http.get('/api/v1/authors', () =>
    HttpResponse.json([
      { id: 1, name: 'Alice', email: 'alice@example.com' },
      { id: 2, name: 'Bob', email: 'bob@example.com' },
    ]),
  ),
  http.get('/api/v1/ingredients', () =>
    HttpResponse.json([
      { id: 1, name: 'Flour' },
      { id: 2, name: 'Sugar' },
    ]),
  ),
  http.get('/api/v1/recipes', () =>
    HttpResponse.json([
      { id: 1, name: 'Pancakes', description: 'Fluffy breakfast treat' },
    ]),
  ),
  http.get('/api/v1/steps', () =>
    HttpResponse.json([
      { id: 1, step: 1, description: 'Mix dry ingredients', optional: false },
    ]),
  ),
]

export { handlers }
