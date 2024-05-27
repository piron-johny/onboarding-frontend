import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'
import { CreateUserDto, CreateUserResponse } from '../types'

class HttpService {
  private instance: AxiosInstance

  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL })
    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      error => {
        return Promise.reject(error)
      },
    )
  }

  async signUp(user: CreateUserDto) {
    try {
      const response = await this.instance.post<CreateUserResponse>(
        '/user/create',
        user,
      )
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  async signIn(user: CreateUserDto) {
    try {
      const response = await this.instance.post<CreateUserResponse>(
        '/user/login',
        user,
      )
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  private handleError(error: unknown) {
    if (error instanceof AxiosError) {
      if (error.response) {
        console.error('Error response:', error.response.data)
        throw error.response.data
      }
    }

    throw error
  }
}

const httpService = new HttpService('http://localhost:4000/dev')

export default httpService
