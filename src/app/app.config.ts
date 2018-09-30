export enum Env {
  DEV = "DEV",
  STG = "STG",
  PRD = "PRD"
}

export const AppConfig = {
  env: Env.DEV,
  rest: {
    rootUrl: 'http://yummy-backend.herokuapp.com/yummy/api'
  }
}

