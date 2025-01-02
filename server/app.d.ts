/// <reference types="lucia" />
declare namespace Lucia {
  type Auth = import('./utils/auth.js').Auth
  interface DdatabaseUserAttributes {
    name: string
    email: string
  }
  interface DatabaseSessionAttributes {}
}