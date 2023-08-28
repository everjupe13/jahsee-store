/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  // AfterFetchContext,
  BeforeFetchContext,
  createFetch,
  MaybeRefOrGetter,
  // OnFetchErrorContext,
  UseFetchOptions
} from '@vueuse/core'
// import { isReactive, reactive } from 'vue'

// import store from '@/store/index.js'

export const API_URL = import.meta.env.VITE_APP_BASE_URL

interface IFetchParameters {
  url: MaybeRefOrGetter<string>
  option: RequestInit
  useFetchOptions: UseFetchOptions
}

const useAppFetch = (
  url: IFetchParameters['url'],
  _option?: IFetchParameters['option'],
  _useFetchOptions?: IFetchParameters['useFetchOptions']
) => {
  // const refStore = isReactive(store) ? store : reactive(store)

  const interceptors: UseFetchOptions = {
    // async onFetchError(_ctx: OnFetchErrorContext): Promise<any> {
    //   console.log('onFetchError', _ctx)
    //   return
    // },
    // async afterFetch(_ctx: AfterFetchContext): Promise<any> {
    //   console.log('404 not found @:', _ctx.response.url)
    //   console.log('afterFetch', _ctx)
    //   return

    //   // if (response.status === 200) {
    //   //   console.log('Successfully fetched data @:', response.url);
    //   // } else if (response.status === 404) {
    //   //   console.log('404 not found @:', response.url);
    //   //   console.log(response.response)
    //   // }
    // },
    async beforeFetch(ctx: BeforeFetchContext): Promise<any> {
      // const token = refStore.getters['auth/getToken']
      const token = 'asdasd'
      if (token !== null) {
        ctx.options.headers = { Authorization: `Bearer ${token}` }
      }

      return { options: ctx.options }
    }
  }

  const useAppFetchFn = createFetch({
    baseUrl: API_URL,
    options: interceptors,
    fetchOptions: {
      mode: 'cors'
    }
  })

  return useAppFetchFn(url as IFetchParameters['url'], { timeout: 5000 })
}

export { useAppFetch }
