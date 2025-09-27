<p align="center">
  <img src="https://i.ibb.co/PsmK9LGR/9ddcde5b-b8e5-4fd6-bb74-94a0eeab826c.jpg" width="400">
</p>

<h1 align="center">© ChatUnity-Bot 7.2 🤖</h1>
<p align="center"><strong>Un bot avanzato per WhatsApp, ricco di funzionalità e divertimento!</strong></p>

<p align="center">
  <a href="https://whatsapp.com/channel/0029VaZVlJZHwXb8naJBQN0J">
    <img src="https://img.shields.io/badge/Canale_Ufficiale-black?style=for-the-badge&logo=whatsapp" alt="Canale Ufficiale">
  </a>
</p>

---

## 📌 Introduzione

© ChatUnity-Bot è un bot multifunzionale per WhatsApp, progettato per semplificare la gestione delle chat e offrire funzionalità avanzate. Con un'interfaccia intuitiva e una configurazione semplice, è perfetto per chiunque voglia migliorare l'esperienza su WhatsApp.

---

## 📥 Installa Termux & MT Manager

<details>
  <summary><b>Clicca qui per vedere i passaggi</b></summary>

👉🏻 [Scarica Termux (MediaFire)](https://www.mediafire.com/file/0npdmv51pnttps0/com.termux_0.119.1-119_minAPI21(arm64-v8a,armeabi-v7a,x86,x86_64)(nodpi)_apkmirror.com.apk/)

👉🏻 [Scarica MT Manager](https://mt-manager.en.softonic.com/android)

</details>

---

## 🚀 Installazione (Termux)

[![Tutorial Installazione](https://img.shields.io/badge/Tutorial-Installazione-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/shorts/qek7wWadhtI?feature=share)

```bash
termux-setup-storage
apt update -y && yes | apt upgrade && pkg install -y bash wget mpv
cd /sdcard
wget -O - https://raw.githubusercontent.com/chatunitycenter/chatunity-bot/main/chatunity.sh | bash
```

---

## 🔄 Riavvia il bot (Termux)

<details>
<summary><b>Clicca qui per vedere i passaggi</b></summary>

```bash
cd chatunity-bot
rm -rf Sessioni
npm start
```

</details>

---

## 🕒 Attivo 24/7 con PM2 (Termux)

<details>
<summary><b>Clicca qui per vedere i passaggi</b></summary>

```bash
npm i -g pm2
pm2 start index.js
pm2 save
pm2 logs
```

</details>

---

## 🌐 Installazione su Windows/VPS/RDP

<details>
<summary><b>Clicca qui per vedere i passaggi</b></summary>

1. Scarica:
   - [Git](https://git-scm.com/downloads)
   - [NodeJS](https://nodejs.org/en/download)
   - [FFmpeg](https://ffmpeg.org/download.html)
   - [ImageMagick](https://imagemagick.org/script/download.php)

2. Clona e installa:
   ```bash
   git clone https://github.com/chatunitycenter/chatunity-bot
   cd chatunity-bot
   npm install
   npm update
   npm start
   ```

</details>

---

## 📂 Risorse Utili

- **Dashboard GitHub**: [Visita qui](https://github.com/chatunity-bot)
- **Canale WhatsApp**: [Unisciti qui](https://whatsapp.com/channel/0029VaZVlJZHwXb8naJBQN0J)
- **Contatto**: [Scrivi qui](https://wa.me/393773842461)
- **Collaborazioni**: [Partecipa qui](https://whatsapp.com/channel/0029Vb1C4od5vKA35u1Mqc06)

---

## 👥 Collaboratori

Grazie a tutti coloro che hanno contribuito a questo progetto!

<p align="center">
  <a href="https://github.com/laboratiork25/beta/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=laboratiork25/beta"/>
  </a>
</p>

---

## 📜 Licenza

© ChatUnity-Bot. Tutti i diritti riservati. Consulta la licenza per i dettagli.

<p align="center"><strong>🌟 Supporta il progetto con una stella su GitHub! 🌟</strong></p>
