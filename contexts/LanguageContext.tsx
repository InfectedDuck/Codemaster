import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export type Locale = 'en' | 'ru' | 'kk';

type Translations = Record<string, any>;
type TranslationCache = Record<string, Translations>;

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string>) => string;
  loadNamespace: (namespace: string) => Promise<void>;
  isLoaded: (namespace: string) => boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const SUPPORTED_LOCALES: Locale[] = ['en', 'ru', 'kk'];
const STORAGE_KEY = 'preferred-language';

function detectLocale(): Locale {
  if (typeof window === 'undefined') return 'en';

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && SUPPORTED_LOCALES.includes(stored as Locale)) {
    return stored as Locale;
  }

  const browserLang = navigator.language?.toLowerCase() || '';
  if (browserLang.startsWith('ru')) return 'ru';
  if (browserLang.startsWith('kk') || browserLang.startsWith('kz')) return 'kk';
  return 'en';
}

function getNestedValue(obj: any, path: string): string | undefined {
  const keys = path.split('.');
  let current = obj;
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined;
    current = current[key];
  }
  if (typeof current === 'string') return current;
  if (Array.isArray(current)) return undefined;
  return undefined;
}

function interpolate(text: string, params?: Record<string, string>): string {
  if (!params) return text;
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => params[key] ?? `{{${key}}}`);
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');
  const cacheRef = useRef<Record<Locale, TranslationCache>>({ en: {}, ru: {}, kk: {} });
  const [loadedNamespaces, setLoadedNamespaces] = useState<Record<string, boolean>>({});
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    const detected = detectLocale();
    setLocaleState(detected);
    loadTranslationFile(detected, 'common').then(() => {
      forceUpdate(n => n + 1);
    });
  }, []);

  const loadTranslationFile = useCallback(async (loc: Locale, namespace: string): Promise<void> => {
    const cacheKey = `${loc}:${namespace}`;
    if (cacheRef.current[loc][namespace]) {
      setLoadedNamespaces(prev => ({ ...prev, [cacheKey]: true }));
      return;
    }

    try {
      const response = await fetch(`/locales/${loc}/${namespace}.json`);
      if (response.ok) {
        const data = await response.json();
        cacheRef.current[loc][namespace] = data;
        setLoadedNamespaces(prev => ({ ...prev, [cacheKey]: true }));
      }
    } catch (e) {
      // Silently fail - will fallback to English or key
    }
  }, []);

  const loadNamespace = useCallback(async (namespace: string): Promise<void> => {
    const promises = [loadTranslationFile(locale, namespace)];
    if (locale !== 'en') {
      promises.push(loadTranslationFile('en', namespace));
    }
    await Promise.all(promises);
    forceUpdate(n => n + 1);
  }, [locale, loadTranslationFile]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;

    // Reload all currently loaded namespaces for the new locale
    const namespacesToLoad = new Set<string>();
    Object.keys(loadedNamespaces).forEach(key => {
      const ns = key.split(':')[1];
      if (ns) namespacesToLoad.add(ns);
    });

    Promise.all(
      Array.from(namespacesToLoad).map(ns => loadTranslationFile(newLocale, ns))
    ).then(() => {
      forceUpdate(n => n + 1);
    });
  }, [loadedNamespaces, loadTranslationFile]);

  const t = useCallback((key: string, params?: Record<string, string>): string => {
    // Try to find translation in all loaded namespaces for current locale
    const localeCache = cacheRef.current[locale];
    for (const ns of Object.keys(localeCache)) {
      const value = getNestedValue(localeCache[ns], key);
      if (value !== undefined) return interpolate(value, params);
    }

    // Fallback to English
    if (locale !== 'en') {
      const enCache = cacheRef.current['en'];
      for (const ns of Object.keys(enCache)) {
        const value = getNestedValue(enCache[ns], key);
        if (value !== undefined) return interpolate(value, params);
      }
    }

    return key;
  }, [locale, loadedNamespaces]); // loadedNamespaces dependency ensures re-render on load

  const isLoaded = useCallback((namespace: string): boolean => {
    return !!loadedNamespaces[`${locale}:${namespace}`];
  }, [locale, loadedNamespaces]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, loadNamespace, isLoaded }}>
      {children}
    </LanguageContext.Provider>
  );
};

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}

export function usePageTranslation(namespace: string) {
  const ctx = useTranslation();
  const { loadNamespace, isLoaded } = ctx;

  useEffect(() => {
    loadNamespace(namespace);
  }, [namespace, loadNamespace]);

  return { ...ctx, ready: isLoaded(namespace) };
}
