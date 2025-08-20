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
  http.get('/api/v1/recipes', ({ request }) => {
    const url = new URL(request.url)
    const term = url.searchParams.get('search')
    const recipes = [
      { id: 1, name: 'Pancakes', description: 'Fluffy breakfast treat' },
      { id: 2, name: 'Waffles', description: 'Crispy treat' },
    ]
    const filtered = term
      ? recipes.filter(r => r.name.toLowerCase().includes(term.toLowerCase()))
      : recipes
    return HttpResponse.json(filtered)
  }),
  http.get('/api/v1/recipes/:id', ({ params }) =>
    HttpResponse.json({ id: Number(params.id), name: 'Pancakes', description: 'Fluffy breakfast treat' }),
  ),
  http.post('/api/v1/recipes', async ({ request }) => {
    const body: any = await request.json()
    return HttpResponse.json({ id: 2, ...body.data?.attributes })
  }),
  http.patch('/api/v1/recipes/:id', async ({ params, request }) => {
    const body: any = await request.json()
    return HttpResponse.json({ id: Number(params.id), ...body.data?.attributes })
  }),
  http.delete('/api/v1/recipes/:id', () =>
    HttpResponse.json({ message: 'Recipe deleted' }),
  ),
  http.get('/api/v1/steps', () =>
    HttpResponse.json([
      { id: 1, step: 1, description: 'Mix dry ingredients', optional: false },
    ]),
  ),
]

export { handlers }
