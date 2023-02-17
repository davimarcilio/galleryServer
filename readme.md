# Guia de execução

- Digite os comandos

```js
npm install
npx prisma db seed
npm run build
npm start
```

## Após isso voce pode usar a aplicação frontend

# Rotas da aplicação

> Host: http://localhost:3000

## Usuário

`// Registrar usuário`

- POST /user/register

```js
//BODY EXAMPLE
{
	"login": string,
	"name": string,
	"password": string
}
```

`// Logar usuário`

- POST /user/login

```js
//BODY EXAMPLE
{
	"login": string,
	"password": string
}
```

`// Todos usuários`

- GET /user/all

```js
//Header required
{
	"authorization-token": JWT,
}
```

`// Único usuário`

- GET /user/:id

```js
//Header required
{
	"authorization-token": JWT,
}
```

`// Atualizar usuário`

- PATCH /user/:id

```js
//Header required
{
	"authorization-token": JWT,
}
```

`// DELETAR usuário`

- DELETE /user/:id

```js
//Header required
{
	"authorization-token": JWT,
}
```

`// VERIFICAR JWT`

- GET /auth/

```js
//Header required
{
	"authorization-token": JWT,
}
```

## Image

`// Upload image`

- POST /image/upload

```js
//Header required
{
	"authorization-token": JWT,
}

// Body example

{
	"name": string,
	"size": number,
	"src": string,
	"userId": number
}
```

`// All images from userID`

- GET /image/:id

```js
//Header required
{
	"authorization-token": JWT,
}
```

`// DELETE image from ID`

- DELETE /image/:id

```js
//Header required
{
	"authorization-token": JWT,
}
```
