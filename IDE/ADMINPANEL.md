# 🛠️ Blueprint Desain Panel ADMIN - REBIKE

## 📐 Asumsi Umum

- **Layout**: Sidebar kiri, Header atas, dan Konten utama
- **Fokus**:
  - Pemantauan platform secara menyeluruh
  - Aksi cepat terhadap permasalahan
  - Navigasi dan data yang efisien

---

## 1️⃣ Menu: Dashboard

### 🎯 Tujuan:

Papan monitor utama untuk melihat kondisi platform secara real-time.

### 🧱 Struktur:

#### 🧑‍💼 Header:

- **Dashboard Platform Rebike**

#### 📊 KPI Cards (Platform Health):

1. **Mitra Menunggu Verifikasi**

   - 🔢 2 Mitra
   - 🔗 Lihat & Verifikasi Sekarang →

2. **Pengguna Baru (7 Hari Terakhir)**

   - 🔢 +58 Pengguna
   - 📌 55 Customer, 3 Mitra

3. **Total Pendapatan Platform (Oktober)**

   - 💰 Rp 1.250.000
   - 📌 Dari transaksi Rp 12.500.000

4. **Sengketa Aktif**
   - 🔢 1 Kasus
   - 🔗 Tinjau Kasus →

#### 📋 Antrian Tugas Utama (Admin's To-Do List):

- **Pendaftaran Mitra Baru**:

  - Kolom: Nama Rental, Pemilik, Tgl Daftar, Aksi
  - Contoh: Jaya Motor, Budi Santoso, 26/10/23, [Verifikasi]

- **Permintaan Pencairan Dana**:
  - Kolom: Mitra, Jumlah, Tgl Minta, Aksi
  - Contoh: Berkah Sewa, Rp 2.500.000, 25/10/23, [Proses]

#### 🔄 Aktivitas Terkini Platform (Live Feed):

- [👤] Berkah Sewa mendaftar – 5 menit lalu
- [🛒] Andi W. memesan Yamaha NMAX – 15 menit lalu
- [💸] Rental Asik minta pencairan dana – 1 jam lalu
- [🏍️] Maju Jaya menambah Honda PCX – 2 jam lalu

---

## 2️⃣ Menu: Manajemen Pengguna

### 🎯 Tujuan:

Mengelola seluruh akun pengguna di platform (Mitra dan Customer)

### 🧱 Struktur:

#### 🔄 Navigasi Sub-menu:

- [Mitra]
- [Customer]

#### 🛠️ Halaman Manajemen Mitra:

- Header: **Data Mitra Rebike**
- Tab: Aktif (85), Menunggu Verifikasi (2), Diblokir (5)
- Kolom Tabel: Nama Rental & Pemilik, Kontak, Jumlah Motor, Tgl Gabung, Status, Aksi
  - Status Tag: [Hijau: Terverifikasi], [Kuning: Menunggu], [Merah: Diblokir]
  - Aksi: [👁️], [✏️], [🚫 / ✅]

#### 🙋‍♂️ Halaman Manajemen Customer:

- Header: **Data Customer Rebike**
- Kolom Tabel: Nama, Kontak, Tgl Registrasi, Jumlah Pesanan Selesai, Status, Aksi
  - Status Tag: [Hijau: Aktif], [Merah: Diblokir]

---

## 3️⃣ Menu: Manajemen Transaksi

### 🎯 Tujuan:

Audit lengkap semua transaksi yang terjadi di platform

### 🧱 Struktur:

- Header: **Riwayat Semua Transaksi**

#### 🔍 Filter:

- Rentang Tanggal
- Status: Semua, Berhasil, Gagal, Refund
- Pencarian: ID Pesanan, Nama Customer, Nama Mitra

#### 📋 Tabel Transaksi:

| ID Pesanan | Tanggal | Customer | Mitra | Total Nilai | Komisi Platform | Status | Aksi |
| ---------- | ------- | -------- | ----- | ----------- | --------------- | ------ | ---- |

- Aksi: [Lihat Detail]

---

## 4️⃣ Menu: Pusat Sengketa (Dispute Center)

### 🎯 Tujuan:

Tempat khusus menangani konflik secara sistematis

### 🧱 Struktur:

- Header: **Pusat Penanganan Sengketa**
- Tab: Kasus Baru (1), Sedang Ditinjau (3), Selesai (25)

#### 📋 Tabel Sengketa:

| ID Kasus | Topik | Pelapor | Terlapor | Tanggal | Status | Aksi |
| -------- | ----- | ------- | -------- | ------- | ------ | ---- |

- Topik: "Motor tidak sesuai", "Kerusakan", "Komplain layanan"
- Status Tag: [Merah: Perlu Ditinjau], [Kuning: Menunggu], [Hijau: Terselesaikan]
- Aksi: [Tinjau Kasus]

---

## 5️⃣ Menu: Manajemen Konten

### 🎯 Tujuan:

Mengelola data master platform (lokasi, motor, promosi, bantuan)

### 🧱 Struktur:

- Header: **Manajemen Konten Aplikasi**
- Tampilan: Accordion atau Kartu

#### 🗺️ Kartu 1: Titik Penjemputan

- Tabel: Nama Lokasi, Status, Aksi
- Tombol: [+ Tambah Lokasi]

#### 🛵 Kartu 2: Kategori & Merek Motor

- Tabel pengelolaan merek & tipe motor

#### 🖼️ Kartu 3: Banner Promosi

- CRUD untuk banner yang muncul di aplikasi

#### ❓ Kartu 4: FAQ & Bantuan

- Editor teks untuk halaman bantuan

---

## 6️⃣ Menu: Pengaturan Platform

### 🎯 Tujuan:

Mengatur aturan dan konfigurasi global platform

### 🧱 Struktur:

- Header: **Pengaturan Global Platform**

#### 📋 Form Pengaturan:

- **Bagian Keuangan**:

  - Komisi Platform (%): [Input Angka]
  - Note: Komisi dari transaksi sukses

- **Bagian Notifikasi**:

  - Email Admin: [Input Email]
  - Note: Untuk notifikasi penting

- **Bagian Batasan & Aturan**:

  - Minimum Pencairan Dana (Rp): [Input Angka]

- Tombol: [💾 Simpan Perubahan]
