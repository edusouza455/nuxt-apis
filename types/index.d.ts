import type UserService from '../services/user'

declare module '#app' {
  interface NuxtApp {
    $http: {
      user: UserService
    }
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $http: {
      user: UserService
    }
  }
}

export {}
