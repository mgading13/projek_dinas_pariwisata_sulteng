// import axios from 'axios'

// export async function trackPageVisit (pageName) {
//   try {
//     // 1️⃣ Ambil UID visitor dari localStorage
//     let uid = localStorage.getItem('visitorUid')
//     if (!uid) {
//       uid = crypto.randomUUID() // generate UID unik
//       localStorage.setItem('visitorUid', uid)
//     }

//     const userAgent = navigator.userAgent

//     // 2️⃣ Daftar visitor (jika belum ada)
//     await axios.post('http://localhost:3000/api/visitor', { uid, userAgent })

//     // 3️⃣ Catat pageView
//     await axios.post('http://localhost:3000/api/pageview', {
//       page: pageName,
//       visitorId: uid
//     })
//   } catch (err) {
//     console.error('Gagal track visitor:', err)
//   }
// }

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

    // 1️⃣ Ambil UID visitor dari localStorage
    let uid = localStorage.getItem('visitorUid')
    if (!uid) {
      uid = crypto.randomUUID() // generate UID unik
      localStorage.setItem('visitorUid', uid)
    }

    // 2️⃣ Daftar visitor (jika belum ada)
    // Backend kamu hanya memerlukan { uid }
    await axios.post('http://localhost:3000/api/visitor', { uid })

    // 3️⃣ Catat pageView
    await axios.post('http://localhost:3000/api/pageview', {
      page: pageName,
      visitorId: uid
    })

    console.log(`✅ Page view tercatat: ${pageName} (visitorId: ${uid})`)
  } catch (err) {
    // Logging lebih lengkap untuk debugging
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
