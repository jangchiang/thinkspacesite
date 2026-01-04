import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface TranslationResult {
  title?: string;
  excerpt?: string;
  content?: string;
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
