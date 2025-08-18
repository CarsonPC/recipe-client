This app is a VUE TS app that is based on a Laravel based API.

- The goal of this app is to provide a clean user interface for creating and searching recipes.
- This app should support CRUD for a recipe, and when editing a recipe you should be able to add Steps and Ingredients as per the API specs.

## The API ENDPOINT

# Recipe API Documentation

This document describes how to interact with the Recipe API. All endpoints are prefixed with `/api/v1` unless noted otherwise.

## Authentication

Authentication uses Laravel Sanctum. Obtain a token by registering or logging in.

### Register
`POST /api/register`
```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "password": "secret",
  "password_confirmation": "secret"
}
```
**Response**
```json
{
  "message": "User registered",
  "data": {
    "token": "<access token>"
  }
}
```

### Login
`POST /api/login`
```json
{
  "email": "alice@example.com",
  "password": "secret"
}
```
**Response** mirrors the register endpoint.

Include the token in an `Authorization: Bearer <token>` header for requests that require authentication. Use `POST /api/logout` to revoke the current token.

## Authors
All author endpoints require authentication.

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/v1/authors` | List authors |
| POST | `/api/v1/authors` | Create an author |
| GET | `/api/v1/authors/{id}` | Retrieve a specific author |
| PATCH | `/api/v1/authors/{id}` | Update an author |
| DELETE | `/api/v1/authors/{id}` | Delete an author |

**Create example**
```json
{
  "data": {
    "attributes": {
      "name": "Alice",
      "email": "alice@example.com",
      "password": "secret"
    }
  }
}
```

## Ingredients
Ingredient endpoints are public.

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/v1/ingredients` | List ingredients |
| POST | `/api/v1/ingredients` | Create an ingredient |
| GET | `/api/v1/ingredients/{id}` | Retrieve an ingredient |
| PATCH | `/api/v1/ingredients/{id}` | Update an ingredient |
| DELETE | `/api/v1/ingredients/{id}` | Delete an ingredient |

**Create example**
```json
{
  "data": {
    "attributes": {
      "name": "Flour"
    }
  }
}
```

## Recipes
Recipe endpoints require authentication.

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/v1/recipes` | List recipes |
| POST | `/api/v1/recipes` | Create a recipe |
| GET | `/api/v1/recipes/{id}` | Retrieve a recipe |
| PATCH | `/api/v1/recipes/{id}` | Update a recipe |
| DELETE | `/api/v1/recipes/{id}` | Delete a recipe (body must include recipe id) |

**Create example**
```json
{
  "data": {
    "attributes": {
      "name": "Pancakes",
      "description": "Fluffy breakfast treat"
    },
    "relationships": {
      "author": {
        "data": {
          "attributes": {
            "id": 1
          }
        }
      }
    }
  }
}
```

Use the `include` query parameter to eager load relationships. For example:
```
GET /api/v1/recipes/1?include=author,steps
```

## Steps
`Step` endpoints require authentication for write operations.

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/v1/steps` | List steps |
| POST | `/api/v1/steps` | Create a step |
| GET | `/api/v1/steps/{id}` | Retrieve a step |
| PATCH | `/api/v1/steps/{id}` | Update a step |
| DELETE | `/api/v1/steps/{id}` | Delete a step |

**Create example**
```json
{
  "data": {
    "attributes": {
      "step": 1,
      "description": "Mix dry ingredients",
      "optional": false
    },
    "relationships": {
      "recipe": {
        "data": {
          "attributes": {
            "id": 1
          }
        }
      }
    }
  }
}
```

## Creating a Recipe from Scratch
1. **Register/Login** to obtain an access token.
2. **Create an author** or use the registered user's ID.
3. **Add ingredients** using the ingredient endpoints.
4. **Create a recipe** referencing the author ID.
5. **Add steps** referencing the recipe ID.
6. Retrieve the recipe with `?include=author,steps` to verify.

> **Note:** Endpoints to associate ingredients with recipes are not yet implemented. Ingredients currently exist independently of recipes.

