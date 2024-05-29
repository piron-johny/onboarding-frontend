export interface Image {
  id: string
  url: string
  userId: string
  name: string
  description: string
}

interface ImageData {
  imageBase64: string
  fileType: string
}

export interface UploadImageDto {
  name: string
  description: string
  imageData: ImageData
}
