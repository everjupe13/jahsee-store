// import { createFetch } from "@vueuse/core"
// import { isReactive, reactive } from "vue"
// import store from '@/store/index.js'

// export const API_URL = 'https://localhost:8080'

// const useAppFetch = (...args) => {
//   const refStore = !isReactive(store) ? reactive(store) : store

//   const interceptors = {
//     async beforeFetch({ options }) {
//       const token = refStore.getters['auth/getToken']
//       if (token !== null) {
//         options.headers.Authorization = `Bearer ${token}`
//       }

//       return { options }
//     }
//   }

//   const useAppFetchFn = createFetch({
//     baseUrl: API_URL,
//     options: interceptors,
//     fetchOptions: {
//       mode: 'cors',
//     }
//   })

//   return useAppFetchFn(...args)
// }

// export default useAppFetch
