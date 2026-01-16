export class Translator {
  private languagePatterns: Record<string, RegExp> = {
    en: /^[a-zA-Z\s.,!?'"-]+$/,
    es: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s.,!?'"-]+$/,
    fr: /^[a-zA-ZàâäéèêëïîôùûüÿçÀÂÄÉÈÊËÏÎÔÙÛÜŸÇ\s.,!?'"-]+$/,
    de: /^[a-zA-ZäöüßÄÖÜ\s.,!?'"-]+$/,
    zh: /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/,
    ja: /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9fff]/,
    ko: /[\uac00-\ud7af\u1100-\u11ff]/,
    ru: /^[а-яА-ЯёЁ\s.,!?'"-]+$/,
    ar: /[\u0600-\u06ff]/,
  }

  detectLanguage(text: string): string {
    for (const [lang, pattern] of Object.entries(this.languagePatterns)) {
      if (pattern.test(text)) {
        return lang
      }
    }
    return "en"
  }

  async translate(text: string, targetLanguage: string): Promise<string> {
    if (this.detectLanguage(text) === targetLanguage) {
      return text
    }

    try {
      const response = await fetch("https://api.mymemory.translated.net/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          q: text,
          langpair: `en|${targetLanguage}`,
        }),
      })

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`)
      }

      const data = await response.json()
      return data.responseData.translatedText
    } catch (error) {
      console.warn("Translation failed, using original text:", error)
      return text
    }
  }
}
