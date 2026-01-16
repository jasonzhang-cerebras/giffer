export class ImageSearcher {
  private unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY || ""

  async search(keywords: string[]): Promise<string[]> {
    if (!this.unsplashAccessKey) {
      throw new Error(
        "UNSPLASH_ACCESS_KEY environment variable is required. Get one from https://unsplash.com/developers",
      )
    }

    const query = keywords.join(" ")
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${this.unsplashAccessKey}`,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Failed to search images: ${response.statusText}`)
    }

    const data = await response.json()
    return data.results.map((photo: any) => photo.urls.regular)
  }
}
