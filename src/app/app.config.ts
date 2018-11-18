export enum Env {
  DEV = "DEV",
  STG = "STG",
  PRD = "PRD"
}

export const AppConfig = {
  env: Env.DEV,
  ver: "1.0.0-beta",
  rest: {
    rootUrl: 'https://yummy-backend.herokuapp.com/yummy/api'
  }
}

