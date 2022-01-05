# CteX Assignment for Ali Aghapour

## Endpoints

`POST /auth/register`

`POST /auth/login`

`GET /users/info/:id`

## USAGE

To register with `/auth/register` endpoint, provide all the information requested.

For loging in, you need to provide `mobile` and `password` elements. if successful you will be provided with `access_token`.

to show user information, you need to provide `access_token` in bearer token.
