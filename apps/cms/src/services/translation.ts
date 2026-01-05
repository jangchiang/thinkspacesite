import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface TranslationResult {
  title?: string;
  excerpt?: string;
  content?: string;
}

interface ServiceTranslationResult {
  title?: string;
  description?: string;
  shortDescription?: string;
  features?: Array<{ title?: string; description?: string }>;
  useCases?: Array<{ title?: string; description?: string }>;
  processSteps?: Array<{ title?: string; description?: string }>;
}

async function translateText(text: string, fromLang: string, toLang: string): Promise<string> {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are a professional translator. Translate the following text from ${fromLang} to ${toLang}. Only return the translated text, nothing else. Preserve any HTML formatting or markdown.`,
      },
      {
        role: 'user',
        content: text,
      },
    ],
    model: 'openai/gpt-oss-120b',
    temperature: 0.3,
    max_completion_tokens: 4096,
    top_p: 1,
    stream: false,
  });

  return chatCompletion.choices[0]?.message?.content?.trim() || '';
}

export async function translateContent(
  content: { title?: string; excerpt?: string; content?: string },
  fromLocale: string,
  toLocale: string
): Promise<TranslationResult> {
  if (!process.env.GROQ_API_KEY) {
    console.warn('GROQ_API_KEY not set, skipping auto-translation');
    return {};
  }

  const languageMap: Record<string, string> = {
    en: 'English',
    th: 'Thai',
  };

  const fromLang = languageMap[fromLocale] || fromLocale;
  const toLang = languageMap[toLocale] || toLocale;

  const result: TranslationResult = {};

  try {
    // Translate title
    if (content.title) {
      result.title = await translateText(content.title, fromLang, toLang);
    }

    // Translate excerpt
    if (content.excerpt) {
      result.excerpt = await translateText(content.excerpt, fromLang, toLang);
    }

    // Translate content
    if (content.content) {
      result.content = await translateText(content.content, fromLang, toLang);
    }

    return result;
  } catch (error) {
    console.error('Translation error:', error);
    return {};
  }
}

// Translate service content including components
export async function translateServiceContent(
  content: {
    title?: string;
    description?: string;
    shortDescription?: string;
    features?: Array<{ title?: string; description?: string }>;
    useCases?: Array<{ title?: string; description?: string }>;
    processSteps?: Array<{ title?: string; description?: string }>;
  },
  fromLocale: string,
  toLocale: string
): Promise<ServiceTranslationResult> {
  if (!process.env.GROQ_API_KEY) {
    console.warn('GROQ_API_KEY not set, skipping auto-translation');
    return {};
  }

  const languageMap: Record<string, string> = {
    en: 'English',
    th: 'Thai',
  };

  const fromLang = languageMap[fromLocale] || fromLocale;
  const toLang = languageMap[toLocale] || toLocale;

  const result: ServiceTranslationResult = {};

  try {
    // Translate text fields
    if (content.title) {
      result.title = await translateText(content.title, fromLang, toLang);
    }

    if (content.description) {
      result.description = await translateText(content.description, fromLang, toLang);
    }

    if (content.shortDescription) {
      result.shortDescription = await translateText(content.shortDescription, fromLang, toLang);
    }

    // Translate features component
    if (content.features && content.features.length > 0) {
      result.features = [];
      for (const feature of content.features) {
        const translatedFeature: { title?: string; description?: string } = {};
        if (feature.title) {
          translatedFeature.title = await translateText(feature.title, fromLang, toLang);
        }
        if (feature.description) {
          translatedFeature.description = await translateText(feature.description, fromLang, toLang);
        }
        result.features.push(translatedFeature);
      }
    }

    // Translate useCases component
    if (content.useCases && content.useCases.length > 0) {
      result.useCases = [];
      for (const useCase of content.useCases) {
        const translatedUseCase: { title?: string; description?: string } = {};
        if (useCase.title) {
          translatedUseCase.title = await translateText(useCase.title, fromLang, toLang);
        }
        if (useCase.description) {
          translatedUseCase.description = await translateText(useCase.description, fromLang, toLang);
        }
        result.useCases.push(translatedUseCase);
      }
    }

    // Translate processSteps component
    if (content.processSteps && content.processSteps.length > 0) {
      result.processSteps = [];
      for (const step of content.processSteps) {
        const translatedStep: { title?: string; description?: string } = {};
        if (step.title) {
          translatedStep.title = await translateText(step.title, fromLang, toLang);
        }
        if (step.description) {
          translatedStep.description = await translateText(step.description, fromLang, toLang);
        }
        result.processSteps.push(translatedStep);
      }
    }

    return result;
  } catch (error) {
    console.error('Service translation error:', error);
    return {};
  }
}
