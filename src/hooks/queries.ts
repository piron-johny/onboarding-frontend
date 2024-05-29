import { useMutation, useQuery } from '@tanstack/react-query'
import {
  CreateUserDto,
  CreateUserResponse,
  RemoveImageDto,
  ResponseMessage,
  UploadImageDto,
} from '../types'
import httpService from '../services/http'
import {
  GET_ALL_USER_IMAGE,
  REMOVE_IMAGE,
  SIGN_IN,
  SIGN_UP,
  UPLOAD,
} from '../constants'
import { useToast } from '@chakra-ui/react'

interface OnSuccess<T> {
  onSuccess?: (data: T) => void
}

interface UseGetImagesProps {
  isAuthenticated: boolean
}

export const useGetImages = ({ isAuthenticated }: UseGetImagesProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [GET_ALL_USER_IMAGE],
    queryFn: async () => httpService.getUserImages(),
    enabled: isAuthenticated,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  return { data, isLoading, error }
}

interface UseSignInProps extends OnSuccess<CreateUserResponse> {}

export const useSignIn = ({ onSuccess }: UseSignInProps) => {
  const toast = useToast()
  const {
    mutate: signIn,
    isPending: isPendingSignIn,
    error: errorSignIn,
  } = useMutation({
    mutationFn: async (user: CreateUserDto) => httpService.signIn(user),
    mutationKey: [SIGN_IN],
    onSuccess,
    onError: error => {
      toast({
        title: 'Something went wrong',
        description: error.message,
        status: 'error',
        duration: 2000,
      })
    },
  })

  return { signIn, isPendingSignIn, errorSignIn }
}

interface UseSignUpProps extends OnSuccess<CreateUserResponse> {}

export const useSignUp = ({ onSuccess }: UseSignUpProps) => {
  const toast = useToast()
  const {
    mutate: signUp,
    isPending: isPendingSignUp,
    error: errorSignUp,
  } = useMutation({
    mutationFn: async (user: CreateUserDto) => httpService.signUp(user),
    mutationKey: [SIGN_UP],
    onSuccess,
    onError: error => {
      toast({
        title: 'Something went wrong',
        description: error.message,
        status: 'error',
        duration: 2000,
      })
    },
  })

  return { signUp, isPendingSignUp, errorSignUp }
}

interface UseUploadProps extends OnSuccess<ResponseMessage> {}

export const useUpload = ({ onSuccess }: UseUploadProps) => {
  const toast = useToast()
  const {
    mutate: upload,
    isPending: isPendingUpload,
    error: errorUpload,
  } = useMutation({
    mutationFn: async (data: UploadImageDto) => httpService.upload(data),
    mutationKey: [UPLOAD],
    onSuccess: data => {
      toast({
        title: 'Upload success.',
        status: 'success',
        duration: 2000,
      })
      onSuccess?.(data)
    },
    onError: error => {
      toast({
        title: 'Something went wrong.',
        description: error.message,
        status: 'error',
        duration: 2000,
      })
    },
  })

  return { upload, isPendingUpload, errorUpload }
}

interface UseRemoveImageProps extends OnSuccess<ResponseMessage> {}

export const useRemoveImage = ({ onSuccess }: UseRemoveImageProps) => {
  const toast = useToast()
  const {
    mutate: removeImage,
    isPending: isPendingRemoveImage,
    error: errorRemoveImage,
  } = useMutation({
    mutationFn: async (data: RemoveImageDto) => httpService.removeImage(data),
    mutationKey: [REMOVE_IMAGE],
    onSuccess: data => {
      toast({
        title: 'Remove success',
        status: 'success',
        duration: 2000,
      })
      onSuccess?.(data)
    },
    onError: error => {
      toast({
        title: 'Something went wrong.',
        description: error.message,
        status: 'error',
        duration: 2000,
      })
    },
  })

  return { removeImage, isPendingRemoveImage, errorRemoveImage }
}
