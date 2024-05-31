import axios, { AxiosError, AxiosInstance } from 'axios'
import {
  CreateUserDto,
  CreateUserResponse,
  Image,
  RemoveImageDto,
  ResponseMessage,
  UploadImageDto,
} from '../types'
import { STORAGE_TOKEN } from '../constants'

class HttpService {
  private instance: AxiosInstance

  constructor(baseURL: string) {
    this.instance = axios.create({ baseURL })
    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      config => {
        const token = localStorage.getItem(STORAGE_TOKEN)
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

  async getUserImages() {
    try {
      const response = await this.instance.get<Image[]>('/image')
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  async upload(data: UploadImageDto) {
    try {
      const response = await this.instance.post<ResponseMessage>(
        '/image/upload',
        data,
      )
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  async removeImage(data: RemoveImageDto) {
    try {
      const response = await this.instance.delete<ResponseMessage>(
        '/image/remove',
        { data },
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

const httpService = new HttpService(
  import.meta.env.DEV
    ? 'http://localhost:4000/dev'
    : 'https://7evbr33441.execute-api.us-east-1.amazonaws.com/dev',
)

export default httpService
