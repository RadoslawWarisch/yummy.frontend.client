export enum Env {
  DEV = "DEV",
  STG = "STG",
  PRD = "PRD"
}

export const AppConfig = {
  env: Env.DEV,
  ver: "0.7.3",
  rest: {
    rootUrl: 'https://yummy-backend.herokuapp.com/yummy/api'
  }
}

