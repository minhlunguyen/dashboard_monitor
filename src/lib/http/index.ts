import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import Storage from '@/lib/utils/storage'
import { STORAGE_KEY } from '@/lib/constants/common'
import Config from '@/config'
import JSONBig from 'json-bigint'

const TIMEOUT_REQUEST = 30000

interface ApiConfig {
  baseURL: string
  headers: Record<string, string>
  timeout?: number
}

const API_CONFIG: Record<string, ApiConfig> = {
  main: {
    baseURL: Config.URL_API,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Language': 'vi|en'
    }
  },
  external: {
    baseURL: '',
    headers: {
      Accept: '*',
      'Content-Type': 'image/png',
      'Accept-Language': 'vi|en'
    }
  }
}

class API {
  private static async handleUnauthorizedError(error: AxiosError): Promise<void> {
    if (error.response && [401, 403].includes(error.response.status)) {
      await API.refreshToken()
    } else {
      throw error
    }
  }

  private static async refreshToken(): Promise<void> {
    const refreshToken = Storage().get(STORAGE_KEY.REFRESH_TOKEN)
    if (!refreshToken) {
      API.logoutAndRedirect()
      return
    }

    try {
      const response = await axios.post(`${Config.URL_API}/auth/refresh`, {
        refresh_token: refreshToken
      })
      Storage().set(STORAGE_KEY.ACCESS_TOKEN, response.data.access_token)
    } catch (error) {
      console.error('Error refreshing token:', error)
      API.logoutAndRedirect()
      throw error
    }
  }

  private static logoutAndRedirect(): void {
    Storage().remove(STORAGE_KEY.ACCESS_TOKEN)
    Storage().remove(STORAGE_KEY.REFRESH_TOKEN)
    if (window.location.pathname !== '/login') {
      window.location.href = '/login'
    }
  }

  static getInstance(type = 'main', auth = false, timeout: number = TIMEOUT_REQUEST): AxiosInstance {
    const token = auth ? Storage().get(STORAGE_KEY.ACCESS_TOKEN) : undefined
    const axiosConfig = { ...API_CONFIG[type] }
    axiosConfig.timeout = timeout
    const axiosClient = axios.create(axiosConfig)
    if (type === 'main') {
      axiosClient.interceptors.response.use(
        function (res) {
          return res.data
        },
        function (error) {
          return API.handleUnauthorizedError(error)
        }
      )
    }

    if (auth && token) {
      axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    return axiosClient
  }

  static async request(method: string, url: string, data?: any, params?: any): Promise<any> {
    try {
      const response = await API.getInstance().request({ method, url, data, params })
      return response
    } catch (error) {
      await API.handleUnauthorizedError(error as any)
      throw error
    }
  }

  static get(url: string, params?: any): Promise<AxiosResponse<any>> {
    return API.request('GET', url, undefined, params)
  }

  static post(url: string, data: any, params?: any): Promise<AxiosResponse<any>> {
    return API.request('POST', url, data, params)
  }

  static put(url: string, data: any, params?: any): Promise<AxiosResponse<any>> {
    return API.request('PUT', url, data, params)
  }

  static delete(url: string, params?: any): Promise<AxiosResponse<any>> {
    return API.request('DELETE', url, undefined, params)
  }

  static download = (url: string, requestInfo: { method: string; headers: any }, data: any, responseType: any) => {
    API.getInstance('main', true).defaults.transformResponse = (dt: any) => dt

    const request = requestInfo?.method === 'POST' ? axios.post : axios.get
    if (requestInfo?.method === 'POST') {
      return request(Config.URL_API + url, data, {
        baseURL: Config.URL_API,
        ...requestInfo,
        headers: {
          ...API.getInstance('main', true).defaults.headers,
          ...requestInfo?.headers
        },
        responseType: 'blob'
      }).finally(() => {
        API.getInstance('main', true).defaults.transformResponse = (dt: string) => JSONBig.parse(dt)
      })
    }
    return request(Config.URL_API + url, {
      baseURL: Config.URL_API,
      ...requestInfo,
      headers: {
        ...API.getInstance('main', true).defaults.headers,
        ...requestInfo?.headers
      },
      responseType: responseType || 'blob'
    }).finally(() => {
      API.getInstance('main', true).defaults.transformResponse = (dt: string) => JSONBig.parse(dt)
    })
  }
}

export default API
