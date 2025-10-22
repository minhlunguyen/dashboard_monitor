import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'

// Cấu hình i18next
i18n
  .use(HttpApi) // Sử dụng HttpApi để tải file JSON
  .use(initReactI18next) // Kết nối với React
  .init({
    fallbackLng: 'vi', // Ngôn ngữ fallback
    supportedLngs: ['vi', 'en'], // Các ngôn ngữ hỗ trợ
    lng: 'vi', // Ngôn ngữ mặc định
    backend: {
      // Đường dẫn tới các file JSON dịch thuật, bao gồm cả namespace
      loadPath: '/locales/{{lng}}/{{ns}}.json' // Đường dẫn với ngôn ngữ và namespace động
    },
    ns: ['common'], // Namespace mặc định (ban đầu)
    defaultNS: 'common', // Namespace mặc định
    saveMissing: true, // Lưu lại các key dịch thuật còn thiếu (tuỳ chọn)
    interpolation: {
      escapeValue: false // Không cần escape cho React
    }
  })

export default i18n
