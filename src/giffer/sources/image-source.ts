export interface ImageSource {
  name: string
  description: string
  generateImages(keywords: string[], count: number): Promise<string[]>
}
