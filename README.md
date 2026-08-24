# Drone Delivery Challenge

Game browser client-side untuk booth robotika. Pemain menggerakkan drone dengan posisi telapak tangan dari webcam, mengantar paket ke rumah dengan warna yang sesuai, dan menghindari zona larangan terbang.

## Menjalankan

Jalankan static server dari folder ini, lalu buka alamatnya di Chrome atau Edge. Kamera browser tidak berjalan konsisten dari `file://`.

```text
python -m http.server 8000
```

Buka `http://localhost:8000` dan izinkan akses kamera. Untuk pengujian tanpa kamera, tombol kalibrasi menyediakan mode mouse/touch.

## Struktur dan konfigurasi

Konfigurasi permainan ada di [src/config.js](src/config.js). Logic game, tracking, UI, dan storage dipisah agar mudah dituning sebelum acara.

Service worker meng-cache app shell dan mencoba menyimpan file MediaPipe dari jsDelivr setelah pertama kali berhasil dimuat. Jika deployment harus sepenuhnya offline sejak awal, vendor dua script MediaPipe ke folder lokal dan ubah dua tag script di [index.html](index.html).

## Pengujian operasional

- Uji di laptop booth dengan pencahayaan venue sebenarnya.
- Pastikan izin kamera dan static server sudah siap sebelum peserta bermain.
- Uji kehilangan tangan, refresh browser, leaderboard, serta mode pointer.
- Sesuaikan `GAME_DURATION_SECONDS`, `HAND_SENSITIVITY`, dan `DRONE_SMOOTHING` di `src/config.js` berdasarkan hasil uji lapangan.
