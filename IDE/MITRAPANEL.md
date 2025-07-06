# 📘 Blueprint Desain Panel MITRA - REBIKE

## 📐 Asumsi Umum

- **Layout**: Sidebar kiri (7 menu), header atas, dan konten utama
- **Fokus desain**:
  - Informasi padat dan mudah dibaca
  - Aksi prioritas tinggi
  - Kejelasan status dan data

---

## 1️⃣ Menu: Dashboard

### 🎯 Tujuan:

Memberikan ringkasan kondisi bisnis dalam 30 detik — pusat kontrol harian.

### 🧱 Struktur:

#### 🧑‍💼 Header:

> Selamat Datang, [Nama Rental Mitra]  
> Berikut adalah rangkuman aktivitas bisnis Anda hari ini.

#### 📊 KPI Cards (4 Kartu):

1. **Menunggu Konfirmasi Anda**

   - 🔢 3 Pesanan
   - 🔗 Tombol: _Lihat Sekarang →_

2. **Armada Sedang di Jalan**

   - 🔢 8 Motor
   - 📌 Teks kecil: Dari total 15 motor yang Anda miliki.

3. **Jadwal Kembali Hari Ini**

   - 🔢 2 Motor
   - 🔗 Tombol: _Lihat Detail Jadwal →_

4. **Pendapatan (Oktober 2023)**
   - 💰 Rp 7.500.000
   - 📌 Berdasarkan pesanan selesai & aktif

#### 📰 Aktivitas Terbaru (Live Feed):

- 🛒 Pesanan baru dari Budi S. – 2 menit lalu
- ✅ Pesanan #REB123 dikonfirmasi – 15 menit lalu
- 🏍️ Honda Scoopy dikembalikan – 1 jam lalu
- ⭐ Review ★★★★★ dari #REB111 – 3 jam lalu

#### ✅ Quick To-Do List:

- ⚠️ Honda Beat belum diatur untuk bulan depan → [Atur Sekarang]
- ℹ️ Saldo Rp 2.500.000 siap dicairkan → [Cairkan Dana]

---

## 2️⃣ Menu: Management Product (Manajemen Armada)

### 🎯 Tujuan:

CRUD seluruh motor yang dimiliki.

### 🧱 Struktur:

#### 🧑‍💼 Header:

- **Manajemen Armada**
- Tombol: [+ Tambah Motor Baru]

#### 📋 Tabel Armada:

|     | Motor                 | Harga/Hari | Status                                   | Jadwal Berikutnya | Aksi                                              |
| --- | --------------------- | ---------- | ---------------------------------------- | ----------------- | ------------------------------------------------- |
| ☑️  | Gambar + Nama + Nopol | Rp 75.000  | Tersedia / Disewa / Perbaikan / Nonaktif | Dibooking 28/10   | [👁 Lihat] [✏️ Edit] [🗑️ Hapus] [📅 Atur Kalender] |

#### 🔍 Fitur:

- 🔎 Pencarian: Nama/Nopol
- 🧭 Filter Status: Semua, Tersedia, Disewa, Perbaikan

---

## 3️⃣ Menu: Transaction (Manajemen Pesanan)

### 🎯 Tujuan:

Kelola siklus penuh pesanan dari masuk hingga selesai.

### 🧱 Struktur:

#### 🧑‍💼 Header:

- **Manajemen Pesanan**

#### 📑 Tab Navigasi:

- Baru (3)
- Aktif/Dikonfirmasi (8)
- Selesai (52)
- Ditolak/Dibatalkan (5)

#### 📋 Tabel:

- **Baru**:
  - Kolom: ID, Customer, Detail Motor, Tanggal Sewa, Total, Aksi [✅ Terima] [❌ Tolak]
- **Aktif**:
  - Kolom: ID, Customer + Kontak, Motor + Nopol, Durasi Sewa, Aksi [Lihat Detail] [WA]
- **Selesai**:
  - Kolom: ID, Customer, Motor, Tanggal Selesai, Pendapatan, Review

---

## 4️⃣ Menu: Report & Finance

### 🎯 Tujuan:

Laporan finansial lengkap tanpa grafik, bisa diekspor.

### 🧱 Struktur:

#### 🧑‍💼 Header:

- **Laporan & Keuangan**

#### 📆 Filter Periode:

- Dropdown: Bulan Ini, Bulan Lalu, 7 Hari, Semua Waktu
- Manual: Pilih Tanggal
- Tombol: [Terapkan]

#### 💰 Kartu Rangkuman:

- **Pendapatan Kotor**: Rp 7.500.000
- **Komisi Rebike (10%)**: -Rp 750.000
- **Pendapatan Bersih**: Rp 6.750.000
- **Transaksi Sukses**: 35

#### 📋 Tabel Rincian:

| Tanggal | ID Pesanan | Customer | Pendapatan Kotor | Komisi | Bersih |
| ------- | ---------- | -------- | ---------------- | ------   ------ |

- Tombol Ekspor: [↓ Excel/CSV]

---

## 5️⃣ Menu: History (Riwayat Aktivitas)

### 🎯 Tujuan:

Log aktivitas akun Mitra, berguna untuk audit/pelacakan.

### 🧱 Struktur:

#### 🧑‍💼 Header:

- **Riwayat Aktivitas Akun**

#### 🔍 Filter:

- Dropdown: Semua, Produk, Pesanan, Keuangan
- Kalender: Pilih Tanggal

#### 📝 Feed Log:

- 26/10/23 10:30 - Harga Honda Scoopy diubah
- 26/10/23 09:15 - Pesanan dari Budi S. diterima
- 25/10/23 17:00 - Pencairan dana diminta
- 25/10/23 14:00 - SISTEM menandai pesanan selesai

---

## 6️⃣ Menu: Setting Account (Pengaturan Akun)

### 🎯 Tujuan:

Kelola informasi profil dan preferensi akun.

### 🧱 Struktur:

#### 🧑‍💼 Header:

- **Pengaturan Akun**

#### 🧭 Navigasi Tab/Accordion:

- **Profil Rental**: Nama, Alamat, Deskripsi, Logo
- **Kontak**: Nama Pemilik, Email, WhatsApp
- **Keamanan**: Ubah Password
- **Notifikasi**: Checkbox untuk notifikasi yang diinginkan

---

## 7️⃣ Menu: Billing (Penagihan & Pencairan)

### 🎯 Tujuan:

Melihat dan mencairkan pendapatan.

### 🧱 Struktur:

#### 💳 Panel Saldo:

- Judul: **Saldo Siap Dicairkan**
- Jumlah: Rp 2.500.000
- Tombol: [Cairkan Semua Dana]
- Catatan: Proses 1–2 hari kerja, min. Rp 100.000

#### 🏦 Panel Rekening:

- Info Bank: BCA - xxxx-xxxx-1234 a/n John Doe
- Tombol: [Ubah Rekening Bank]

#### 📋 Tabel Riwayat Pencairan:

| Tanggal | Jumlah | Rekening Tujuan | Status |
| ------- | ------ | --------------- | ------ |

- Status Tag: [🟡 Diproses], [🟢 Berhasil], [🔴 Gagal]
