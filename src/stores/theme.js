import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const currentTheme = ref('modern') // 'modern' veya 'classic'
  
  const themes = {
    modern: {
      primary: '#2C3E50', // Koyu gri-mavi
      secondary: '#34495E', // Biraz daha açık gri-mavi
      accent: '#E67E22', // Turuncu vurgu
      dark: '#1A1A1A', // Koyu arka plan
      background: '#F5F6FA', // Açık gri arka plan
      surface: '#FFFFFF', // Beyaz yüzey
      text: '#2C3E50', // Koyu metin
      textLight: '#7F8C8D', // Açık metin
      positive: '#27AE60', // Yeşil
      negative: '#E74C3C', // Kırmızı
      warning: '#F1C40F', // Sarı
      info: '#3498DB' // Mavi
    },
    classic: {
      primary: '#D4AF37', // Hardal altın
      secondary: '#B8860B', // Koyu altın
      accent: '#FFD700', // Parlak altın
      dark: '#1A1A1A', // Koyu arka plan
      background: '#FFF8E1', // Krem arka plan
      surface: '#FFFFFF', // Beyaz yüzey
      text: '#2C3E50', // Koyu metin
      textLight: '#7F8C8D', // Açık metin
      positive: '#27AE60', // Yeşil
      negative: '#E74C3C', // Kırmızı
      warning: '#F1C40F', // Sarı
      info: '#3498DB' // Mavi
    }
  }

  function setTheme(themeName) {
    if (themes[themeName]) {
      currentTheme.value = themeName
      applyTheme(themeName)
    }
  }

  function applyTheme(themeName) {
    const theme = themes[themeName]
    document.documentElement.style.setProperty('--q-primary', theme.primary)
    document.documentElement.style.setProperty('--q-secondary', theme.secondary)
    document.documentElement.style.setProperty('--q-accent', theme.accent)
    document.documentElement.style.setProperty('--q-dark', theme.dark)
    document.documentElement.style.setProperty('--q-background', theme.background)
    document.documentElement.style.setProperty('--q-surface', theme.surface)
    document.documentElement.style.setProperty('--q-text', theme.text)
    document.documentElement.style.setProperty('--q-text-light', theme.textLight)
  }

  // Sayfa yüklendiğinde varsayılan temayı uygula
  applyTheme(currentTheme.value)

  return {
    currentTheme,
    themes,
    setTheme
  }
}) 