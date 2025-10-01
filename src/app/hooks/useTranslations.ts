import { useSimpleLanguage } from '../components/SimpleLanguageProvider'

// Unified translations hook using the simple language provider
export function useTranslations() {
  const simple = useSimpleLanguage();
  
  return {
    t: simple.t,
    locale: simple.language,
    setLocale: simple.setLanguage,
    isRTL: simple.isRTL,
  };
}
