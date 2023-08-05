export enum AppLayoutsEnum {
  default = 'default',
  login = 'login'
}

export const AppLayoutToFileMap: Record<AppLayoutsEnum, string> = {
  default: 'default.vue',
  login: 'auth.vue'
}
