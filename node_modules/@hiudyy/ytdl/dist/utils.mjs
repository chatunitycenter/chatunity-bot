import { execFile } from "child_process";
import fs from "fs";
import os from 'os';
import path from "path";
import fetch from 'node-fetch';

function detectSystemInfo(callback) {
   const architecture = os.arch();
   const platform = os.platform();
   callback(null, architecture, platform);
};


function generateRandomName(extension) {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 100000);
  return `${timestamp}_${random}.${extension}`;
}


function getYouTubeID(input) {
if (!input) return null;
try {
const url = new URL(input)
const validDomains = ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be', 'youtube.co'];
if (!validDomains.some(domain => url.hostname.endsWith(domain))) return input;
if (url.hostname === 'youtu.be') return url.pathname.substring(1);

if (url.hostname.includes('youtube.com')) {
if (url.pathname.startsWith('/shorts/')) return url.pathname.split('/')[2];
if (url.searchParams.has('v')) return url.searchParams.get('v');
if (url.pathname === '/watch') return null;
if (url.pathname.startsWith('/channel/')) return null;
if (url.pathname.startsWith('/user/')) return null;
if (url.pathname.startsWith('/playlist') && url.searchParams.has('list')) return url.searchParams.get('list');
};

} catch {return input};
return input;
};


function getVideoUrl(ajsjj) {
const idzz = getYouTubeID(ajsjj) ;
return `https://www.youtube.com/watch?v=${idzz}`;
};


function ensureExecutable(filePath) {
fs.chmodSync(filePath, 0o755)
};


function handleFile(tempFile, resolve, reject) {
fs.readFile(tempFile, (readErr, buffer) => {
if (readErr) {
reject(`Error reading file: ${readErr.message}`);
} else {
fs.unlink(tempFile, (unlinkErr) => {
if (unlinkErr) console.error(`Error deleting file: ${unlinkErr.message}`);
});
resolve(buffer);
}})};

async function updateFile() {
  const binPath = path.join(__dirname, "../bin/");
  const repos = [
    {
      repo: "yt-dlp/yt-dlp",
      versionFile: path.join(binPath, "version.txt"),
      files: [
        { suffix: "yt-dlp", name: "hiudyydl_py", platforms: ["android"] },
        { suffix: "yt-dlp_linux", name: "hiudyydl", platforms: ["linux", "x64"] },
        { suffix: "yt-dlp_linux_aarch64", name: "hiudyydl_64", platforms: ["linux", "aarch64"] },
        { suffix: "yt-dlp_linux_armv7l", name: "hiudyydl_v7", platforms: ["linux", "arm"] },
        { suffix: "yt-dlp.exe", name: "hiudyydl_win.exe", platforms: ["win32"] },
        { suffix: "yt-dlp_windows_x86.zip", name: "hiudyydl_win_x86.zip", platforms: ["win32", "x86"] },
        { suffix: "yt-dlp_windows_x64.zip", name: "hiudyydl_win_x64.zip", platforms: ["win32", "x64"] }
      ]
    }
  ];

  fs.mkdirSync(binPath, { recursive: true });
  const platform = os.platform();
  const arch = os.arch();

  for (const { repo, versionFile, files } of repos) {
    try {
      const release = await fetch(`https://api.github.com/repos/${repo}/releases/latest`).then(r => r.json());
      const latestVersion = release.tag_name;
      const assets = release.assets;

      const localVersion = fs.existsSync(versionFile) ? fs.readFileSync(versionFile, "utf8").trim() : null;

      if (localVersion === latestVersion) {
        console.log(`✅ [INFO] A versão local (${localVersion}) já está atualizada.`);
        continue;
      }

      let selectedFile = null;
      for (const { suffix, name, platforms } of files) {
        if (platforms.includes(platform) && (platform !== "linux" || platforms.includes(arch))) {
          selectedFile = { suffix, name };
          break;
        }
      }

      if (!selectedFile) {
        console.error(`❌ [ERRO] Nenhum binário compatível encontrado para a plataforma ${platform} (${arch}).`);
        continue;
      }

      const { suffix, name } = selectedFile;
      const asset = assets.find(a => a.name.endsWith(suffix));

      if (!asset) {
        console.error(`❌ [ERRO] Asset não encontrado para o binário: ${suffix}`);
        continue;
      }

      const filePath = path.join(binPath, name);

      fs.readdirSync(binPath).forEach(file => {
        if (file !== name) fs.unlinkSync(path.join(binPath, file));
      });

      console.log(`⚠️ [INFO] Baixando o binário da nova versão...`);
      await fetch(asset.browser_download_url).then(r => {
        const stream = fs.createWriteStream(filePath);
        r.body.pipe(stream);
        return new Promise((resolve, reject) => {
          stream.on("finish", resolve);
          stream.on("error", reject);
        });
      });

      // Atualize o arquivo de versão
      fs.writeFileSync(versionFile, latestVersion);
      console.log(`✅ [SUCESSO] Atualizado para a versão: ${latestVersion}`);
    } catch (error) {
      console.error(`❌ [ERRO] Falha ao atualizar o repositório ${repo}: ${error.message}`);
    }
  }
}


const expots = { detectSystemInfo: detectSystemInfo, generateRandomName: generateRandomName, getYouTubeID: getYouTubeID, ensureExecutable: ensureExecutable, handleFile: handleFile, getVideoUrl: getVideoUrl, updateFile: updateFile };

export default expots;