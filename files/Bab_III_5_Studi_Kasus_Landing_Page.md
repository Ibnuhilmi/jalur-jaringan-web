## 3.5 Studi Kasus: Landing Page "JalurJaringan"

### 3.5.1 Kebutuhan dan Tema

Landing page ini dibuat sebagai penerapan langsung dari materi dasar teknologi web (HTML, CSS, dan JavaScript) pada Subbab 3.2. Tema yang dipilih adalah **peta karier di bidang jaringan komputer**, sesuai topik makalah ini. Alasannya ada dua. Pertama, isi halaman dapat memakai materi Bab II (profesi, kompetensi, dan jalur karier) sehingga makalah dan produk saling mendukung. Kedua, informasi profesi yang terdiri dari beberapa kategori cocok disajikan dengan komponen tab, yang menunjukkan bahwa JavaScript dapat dipakai untuk mengubah isi halaman tanpa memuat ulang.

Sasaran pengunjung adalah mahasiswa dan pemula yang ingin mengenal karier jaringan. Halaman harus bisa dipahami dalam sekali baca dan nyaman dibuka di ponsel maupun laptop.

### 3.5.2 Struktur Halaman

Halaman terdiri dari satu berkas HTML, satu berkas CSS, dan satu berkas JavaScript dengan susunan berikut.

| Bagian | Isi |
|---|---|
| Judul dan navigasi (`header`) | Nama "JalurJaringan" dan lima tautan: Beranda, Profesi, Skill, Langkah belajar, Tentang |
| Beranda (hero) | Judul utama, kalimat pengantar, dan tombol ajakan |
| Profesi | Empat tab: Network Engineer, Network Administrator, NOC Engineer, Network Security Engineer |
| Skill | Dua kolom: hard skill dan soft skill |
| Langkah belajar | Lima langkah berurutan dari dasar jaringan sampai tren otomasi dan cloud |
| Footer | Keterangan tugas, kelompok, kelas, dan tahun akademik |

[PLACEHOLDER: sisipkan Gambar 3.1, tangkapan layar tampilan penuh halaman]

### 3.5.3 Fungsi Bagian HTML

HTML memberi struktur dan makna pada konten. Elemen yang dipakai dan fungsinya:

- `<header>` dan `<nav>` membungkus identitas situs dan menu. Tautan memakai atribut `href="#profesi"` dan seterusnya sehingga pengunjung berpindah ke bagian yang dituju tanpa memuat ulang halaman.
- `<main>` dan `<section>` memisahkan isi utama menjadi bagian-bagian bertema. Setiap `section` punya `id` sebagai tujuan tautan navigasi.
- `<h1>` sampai `<h3>` membentuk hierarki judul. Hanya ada satu `<h1>` di halaman.
- `<dl>`, `<dt>`, dan `<dd>` dipakai untuk pasangan istilah dan keterangan, misalnya "Tugas" beserta penjelasannya pada tiap profesi.
- `<ol>` dipakai untuk langkah belajar karena urutannya memang penting, sedangkan `<ul>` dipakai untuk daftar skill yang tidak berurutan.
- Atribut `role="tab"`, `role="tabpanel"`, dan `aria-selected` membantu pembaca layar memahami komponen tab.

Potongan kode tab profesi:

```html
<button role="tab" id="tab-ne" aria-selected="true" data-role="ne">Network Engineer</button>
<article class="panel" id="panel-ne" role="tabpanel">...</article>
```

### 3.5.4 Aturan CSS Utama

CSS mengatur tampilan. Aturan yang paling berpengaruh:

1. **Variabel warna dan font** pada `:root` (`--ink`, `--teal`, `--amber`, `--font`). Warna cukup diubah di satu tempat dan berlaku di seluruh halaman.
2. **Layout hero satu kolom** dengan lebar teks dibatasi (`max-width: 20ch` pada judul dan `60ch` pada paragraf) agar nyaman dibaca.
3. **Header menempel di atas** dengan `position: sticky; top: 0` agar navigasi selalu terlihat.
4. **Desain responsif** dengan `@media (max-width: 820px)`. Pada layar sempit, menu berubah menjadi tombol "Menu", dan tab tersusun ke bawah.
5. **Status tab aktif** dengan selektor `.tabs button[aria-selected="true"]` yang mengubah warna latar. Gaya mengikuti atribut yang sama dengan yang dipakai pembaca layar.
6. **Fokus keyboard** dengan `:focus-visible` agar pengguna keyboard tahu elemen mana yang sedang dipilih.

```css
.tabs button[aria-selected="true"] {
  background: var(--ink);
  color: #fff;
}
.steps li::before {
  content: counter(step);
}
```

### 3.5.5 Cara Kerja Interaksi JavaScript

Halaman memiliki dua interaksi.

**a. Tab profesi (interaksi utama).** Setiap tombol tab menyimpan kode profesinya di atribut `data-role` (misalnya `ne`, `noc`). Saat tab diklik, fungsi `activateTab()` berjalan dengan langkah berikut:

1. Semua tab diperiksa. Tab yang diklik diberi `aria-selected="true"`, sedangkan tab lain diberi `false`. Atribut ini juga yang dipakai CSS untuk mewarnai tab aktif.
2. Semua panel diperiksa. Panel yang `id`-nya sama dengan `"panel-" + data-role` ditampilkan, sedangkan panel lain disembunyikan dengan atribut `hidden`.
3. Tab juga bisa dipindah memakai tombol panah kiri dan kanan di keyboard.

```js
function activateTab(tab) {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute("aria-selected", String(selected));
    t.tabIndex = selected ? 0 : -1;
  });
  panels.forEach((p) => {
    p.hidden = p.id !== "panel-" + tab.dataset.role;
  });
}
```

Dengan cara ini seluruh informasi empat profesi ada dalam satu halaman, tetapi pengunjung hanya melihat satu profesi pada satu waktu.

**b. Menu mobile.** Tombol "Menu" menambah atau menghapus kelas `open` pada elemen navigasi dengan `classList.toggle("open")`. CSS menampilkan menu hanya bila kelas itu ada, dan atribut `aria-expanded` ikut diperbarui.

### 3.5.6 Tangkapan Layar dan Cara Membuka Halaman

**Cara membuka:**

1. Ekstrak folder `landing-page` hingga berisi `index.html`, `style.css`, dan `script.js` dalam satu folder yang sama.
2. Klik dua kali `index.html` untuk membukanya di peramban (Chrome, Edge, atau Firefox).
3. Koneksi internet dibutuhkan hanya untuk memuat font IBM Plex dari Google Fonts. Tanpa internet, halaman tetap tampil dengan font cadangan.

**Tangkapan layar:**

[PLACEHOLDER: Gambar 3.1, tampilan penuh di desktop]
[PLACEHOLDER: Gambar 3.2, tab profesi dalam kondisi aktif]
[PLACEHOLDER: Gambar 3.3, tab profesi lain setelah diklik]
[PLACEHOLDER: Gambar 3.4, tampilan di ponsel dengan menu terbuka]

Tangkapan layar tambahan dan tautan ke berkas kode dimasukkan ke Lampiran.
