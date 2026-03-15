

import axios from 'axios'

/**
 * Track visitor & page view
 * @param {string} pageName - Nama halaman yang dikunjungi
 */
export async function trackPageVisit (pageName) {
  try {
    // ✅ Validasi pageName
    if (!pageName || typeof pageName !== 'string') {
      console.warn('trackPageVisit: pageName wajib diisi sebagai string')
      return
    }

    let uid = localStorage.getItem('visitorUid')
    if (!uid) {
      uid = crypto.randomUUID() 
      localStorage.setItem('visitorUid', uid)
    }

    await axios.post(import.meta.env.VITE_API_URL + '/visitor', { uid })

    // 3️⃣ Catat pageView
    await axios.post(import.meta.env.VITE_API_URL + '/pageview', {
      page: pageName,
      visitorId: uid
    })

    console.log(`✅ Page view tercatat: ${pageName} (visitorId: ${uid})`)
  } catch (err) {
    if (err.response) {
      console.error('Gagal track visitor (dari server):', err.response.data)
    } else if (err.request) {
      console.error(
        'Gagal track visitor (tidak ada response dari server):',
        err.request
      )
    } else {
      console.error('Gagal track visitor (error lain):', err.message)
    }
  }
}
