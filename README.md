
# W Prompt

W Prompt adalah package CLI untuk menjalankan perintah yang didefinisikan secara custom melalui file konfigurasi `wprompt`.

## Instalasi

1. Pastikan Node.js sudah terinstal.

2. Instal package terinstall :

- Untuk Install secara Local:
```bash

npm install w-prompt

```
- Untuk Install secara Global:
```bash

npm install -g w-prompt

```

## Format File `wprompt`

File `wprompt` digunakan untuk mendefinisikan perintah yang akan dijalankan. Format dasarnya:

  

```plaintext

command_name: [no_logs]

action1

action2

---

```

  

### Elemen Format

1.  **`command_name:`**

- Nama perintah yang akan dijalankan. Contohnya, `mantap` atau `greet`.

- Nama ini **tidak peka huruf besar/kecil** (case-insensitive).

  

2.  **`[no_logs]`**  *(opsional)*

- Jika ditambahkan setelah nama perintah, log eksekusi (seperti pesan "Executing commands for:") akan disembunyikan.

- Jika tidak disebutkan, log akan ditampilkan secara default.

  

3.  **`action1, action2, ...`**

- Daftar perintah yang akan dijalankan oleh CLI, ditulis satu per baris.

- Perintah ini bisa berupa apa saja yang dapat dieksekusi di terminal, seperti `echo`, `w -v`, atau `npm install`.

  

4.  **`---`**

- Pemisah antar blok perintah. Setiap blok diawali dengan nama perintah baru.

  

### Contoh File `wprompt`

```plaintext

tEsT-123: no_logs

echo "This is Testing!"

echo "Running without logs."

---

  

greet:

echo "Hello, World!"

echo "Welcome to W Prompt!"

---

```

  

#### Penjelasan Contoh

-  **Blok `tEsT-123`**

- Memiliki opsi `no_logs`, sehingga log eksekusi tidak ditampilkan.

- Perintah akan mencetak:

```

This is Testing!

Running without logs.

```

  

-  **Blok `greet`**

- Tidak menggunakan opsi `no_logs`, sehingga log eksekusi akan ditampilkan:

```

Executing commands for: greet

Executing: echo "Hello, World!"

Hello, World!

Executing: echo "Welcome to W Prompt!"

Welcome to W Prompt!

```

  

## Cara Menggunakan

1. Buat file `wprompt` di direktori kerja.

2. Tambahkan perintah sesuai format.

3. Jalankan perintah:

- Untuk menjalankan perintah dari file WPrompt
```bash

w <command_name>

```
- Untuk melihat informasi tentang W Prompt
```bash

w -v

```
- Untuk melihat panduan
```bash

w -h

```


## Error Handling

- Jika file `wprompt` tidak ditemukan:

```

wprompt file not found.

```

- Jika perintah tidak ditemukan:

```

<command_name> Prompt Not Found

```