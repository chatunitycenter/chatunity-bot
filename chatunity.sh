echo -e "\e[35m

▒█▀▀▀█ ▒█▀▀▀ ▀▀█▀▀ 　 ▀▀█▀▀ ▒█░▒█ ▒█▀▀▀ 　 ▒█▀▀▀█ ▒█▀▀█ ▒█▀▀█ ▒█▀▀▀ ▒█▀▀▀ ▒█▄░▒█ 
░▀▀▀▄▄ ▒█▀▀▀ ░▒█░░ 　 ░▒█░░ ▒█▀▀█ ▒█▀▀▀ 　 ░▀▀▀▄▄ ▒█░░░ ▒█▄▄▀ ▒█▀▀▀ ▒█▀▀▀ ▒█▒█▒█ 
▒█▄▄▄█ ▒█▄▄▄ ░▒█░░ 　 ░▒█░░ ▒█░▒█ ▒█▄▄▄ 　 ▒█▄▄▄█ ▒█▄▄█ ▒█░▒█ ▒█▄▄▄ ▒█▄▄▄ ▒█░░▀█\n\e[0m" 

echo -e "\033[01;93mPreparando installazione...\nPreparing installation...\n\033[0m"

echo -e "\033[01;32mInstalling dependencies!!\n\033[0m" 
echo -e "\e[36m
██╗███╗░░██╗░██████╗████████╗░█████╗░██╗░░░░░██╗░░░░░
██║████╗░██║██╔════╝╚══██╔══╝██╔══██╗██║░░░░░██║░░░░░
██║██╔██╗██║╚█████╗░░░░██║░░░███████║██║░░░░░██║░░░░░
██║██║╚████║░╚═══██╗░░░██║░░░██╔══██║██║░░░░░██║░░░░░
██║██║░╚███║██████╔╝░░░██║░░░██║░░██║███████╗███████╗
╚═╝╚═╝░░╚══╝╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚══════╝╚══════╝

░██████╗░██╗████████╗
██╔════╝░██║╚══██╔══╝
██║░░██╗░██║░░░██║░░░
██║░░╚██╗██║░░░██║░░░
╚██████╔╝██║░░░██║░░░
░╚═════╝░╚═╝░░░╚═╝░░░\n\e[0m"

if command -v git >/dev/null 2>&1; then
    echo -e "\033[01;33mGit era già installato precedentemente.\nGit was already installed previously.\033[0m"
else
    if pkg install git -y 2>&1 >/dev/null | grep -E -i -q '(command not found|unable to locate package|E: Could not get lock|debconf: delaying package configuration|Package not found|Failed to fetch|404 Not Found|Hash sum mismatch|503 Service Unavailable|504 Gateway Timeout|408 Request Timeout|Connection timed out|Temporary failure resolving)'; then
        error=$(pkg install git -y 2>&1 >/dev/null)
        echo -e "\033[0;31mErrore: $error\033[0m" 
        echo -e "\033[0;34mNon è stato possibile installare Git. Verifica la tua connessione a Internet e riprova. Se l'errore persiste, installa manualmente!!\nIf the error continues, install manually!!\033[0m" 
        exit 1
    else
        echo -e "\033[01;32mGit è stato installato correttamente.\nGit has been installed successfully.\n\033[0m" 
    fi
fi
 
echo -e "\e[35m
██╗███╗░░██╗░██████╗████████╗░█████╗░██╗░░░░░██╗░░░░░
██║████╗░██║██╔════╝╚══██╔══╝██╔══██╗██║░░░░░██║░░░░░
██║██╔██╗██║╚█████╗░░░░██║░░░███████║██║░░░░░██║░░░░░
██║██║╚████║░╚═══██╗░░░██║░░░██╔══██║██║░░░░░██║░░░░░
██║██║░╚███║██████╔╝░░░██║░░░██║░░██║███████╗███████╗
╚═╝╚═╝░░╚══╝╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚══════╝╚══════╝

███╗░░██╗░█████╗░██████╗░███████╗░░░░░░░░██╗░██████╗
████╗░██║██╔══██╗██╔══██╗██╔════╝░░░░░░░░██║██╔════╝
██╔██╗██║██║░░██║██║░░██║█████╗░░░░░░░░░░██║╚█████╗░
██║╚████║██║░░██║██║░░██║██╔══╝░░░░░██╗░░██║░╚═══██╗
██║░╚███║╚█████╔╝██████╔╝███████╗██╗╚█████╔╝██████╔╝
╚═╝░░╚══╝░╚════╝░╚═════╝░╚══════╝╚═╝░╚════╝░╚═════╝░\n\e[0m"

if command -v node >/dev/null 2>&1; then
    echo -e "\033[01;33mNodejs era già installato precedentemente.\nNodejs was already installed previously.\033[0m"
else
    if pkg install nodejs -y 2>&1 >/dev/null | grep -E -i -q '(command not found|unable to locate package|E: Could not get lock|debconf: delaying package configuration|Package not found|Failed to fetch|404 Not Found|Hash sum mismatch|503 Service Unavailable|504 Gateway Timeout|408 Request Timeout|Connection timed out|Temporary failure resolving)'; then
        error=$(pkg install nodejs -y 2>&1 >/dev/null)
        echo -e "\033[0;31mErrore: $error\033[0m" 
        echo -e "\033[0;34mNon è stato possibile installare Node.js. Verifica la tua connessione a Internet e riprova. Se l'errore persiste, installa manualmente!!\nIf the error continues, install manually!!\033[0m" 
        exit 1
    else
        echo -e "\033[01;32mNode.js è stato installato correttamente.\nNode.js has been installed successfully.\n\033[0m" 
    fi
fi

echo -e "\e[36m
██╗███╗░░██╗░██████╗████████╗░█████╗░██╗░░░░░██╗░░░░░
██║████╗░██║██╔════╝╚══██╔══╝██╔══██╗██║░░░░░██║░░░░░
██║██╔██╗██║╚█████╗░░░░██║░░░███████║██║░░░░░██║░░░░░
██║██║╚████║░╚═══██╗░░░██║░░░██╔══██║██║░░░░░██║░░░░░
██║██║░╚███║██████╔╝░░░██║░░░██║░░██║███████╗███████╗
╚═╝╚═╝░░╚══╝╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚══════╝╚══════╝

███████╗███████╗███╗░░░███╗██████╗░███████╗░██████╗░
██╔════╝██╔════╝████╗░████║██╔══██╗██╔════╝██╔════╝░
█████╗░░█████╗░░██╔████╔██║██████╔╝█████╗░░██║░░██╗░
██╔══╝░░██╔══╝░░██║╚██╔╝██║██╔═══╝░██╔══╝░░██║░░╚██╗
██║░░░░░██║░░░░░██║░╚═╝░██║██║░░░░░███████╗╚██████╔╝
╚═╝░░░░░╚═╝░░░░░╚═╝░░░░░╚═╝╚═╝░░░░░╚══════╝░╚═════╝░\n\e[0m"

if command -v ffmpeg >/dev/null 2>&1; then
    echo -e "\033[01;33mFfmpeg era già installato precedentemente.\nFfmpeg was already installed previously.\033[0m"
else
    if pkg install ffmpeg -y 2>&1 >/dev/null | grep -E -i -q '(command not found|unable to locate package|E: Could not get lock|debconf: delaying package configuration|Package not found|Failed to fetch|404 Not Found|Hash sum mismatch|503 Service Unavailable|504 Gateway Timeout|408 Request Timeout|Connection timed out|Temporary failure resolving)'; then
        error=$(pkg install ffmpeg -y 2>&1 >/dev/null)
        echo -e "\033[0;31mErrore: $error\033[0m" 
        echo -e "\033[0;34mNon è stato possibile installare FFmpeg. Verifica la tua connessione a Internet e riprova. Se l'errore persiste, installa manualmente!!\nIf the error continues, install manually!!\033[0m" 
        exit 1
    else
        echo -e "\033[01;32mFFmpeg è stato installato correttamente.\nFFmpeg has been installed successfully.\n\033[0m" 
    fi
fi

echo -e "\e[35m
██╗███╗░░██╗░██████╗████████╗░█████╗░██╗░░░░░██╗░░░░░
██║████╗░██║██╔════╝╚══██╔══╝██╔══██╗██║░░░░░██║░░░░░
██║██╔██╗██║╚█████╗░░░░██║░░░███████║██║░░░░░██║░░░░░
██║██║╚████║░╚═══██╗░░░██║░░░██╔══██║██║░░░░░██║░░░░░
██║██║░╚███║██████╔╝░░░██║░░░██║░░██║███████╗███████╗
╚═╝╚═╝░░╚══╝╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚══════╝╚══════╝

██╗███╗░░░███╗░█████╗░░██████╗░███████╗███╗░░░███╗░█████╗░░██████╗░██╗░█████╗░██╗░░██╗
██║████╗░████║██╔══██╗██╔════╝░██╔════╝████╗░████║██╔══██╗██╔════╝░██║██╔══██╗██║░██╔╝
██║██╔████╔██║███████║██║░░██╗░█████╗░░██╔████╔██║███████║██║░░██╗░██║██║░░╚═╝█████═╝░
██║██║╚██╔╝██║██╔══██║██║░░╚██╗██╔══╝░░██║╚██╔╝██║██╔══██║██║░░╚██╗██║██║░░██╗██╔═██╗░
██║██║░╚═╝░██║██║░░██║╚██████╔╝███████╗██║░╚═╝░██║██║░░██║╚██████╔╝██║╚█████╔╝██║░╚██╗
╚═╝╚═╝░░░░░╚═╝╚═╝░░╚═╝░╚═════╝░╚══════╝╚═╝░░░░░╚═╝╚═╝░░╚═╝░╚═════╝░╚═╝░╚════╝░╚═╝░░╚═╝\n\e[0m"

if command -v convert >/dev/null 2>&1; then
    echo -e "\033[01;33mImagemagick era già installato in precedenza.\nImagemagick was already installed previously.\033[0m"
else
    if pkg install imagemagick -y 2>&1 >/dev/null | grep -E -i -q '(command not found|unable to locate package|E: Could not get lock|debconf: delaying package configuration|Package not found|Failed to fetch|404 Not Found|Hash sum mismatch|503 Service Unavailable|504 Gateway Timeout|408 Request Timeout|Connection timed out|Temporary failure resolving)'; then
        error=$(pkg install imagemagick -y 2>&1 >/dev/null)
        echo -e "\033[0;31mErrore: $error\033[0m" 
        echo -e "\033[0;34mImpossibile installare ImageMagick. Verifica la tua connessione a Internet e riprova. Se l'errore persiste, installalo manualmente!!\nIf the error continues, install manually!!\033[0m" 
        exit 1
    else
        echo -e "\033[01;32mImageMagick è stato installato correttamente.\nImageMagick has been installed successfully.\n\033[0m" 
    fi
fi

echo -e "\e[36m
██╗███╗░░██╗░██████╗████████╗░█████╗░██╗░░░░░██╗░░░░░
██║████╗░██║██╔════╝╚══██╔══╝██╔══██╗██║░░░░░██║░░░░░
██║██╔██╗██║╚█████╗░░░░██║░░░███████║██║░░░░░██║░░░░░
██║██║╚████║░╚═══██╗░░░██║░░░██╔══██║██║░░░░░██║░░░░░
██║██║░╚███║██████╔╝░░░██║░░░██║░░██║███████╗███████╗
╚═╝╚═╝░░╚══╝╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚══════╝╚══════╝

██╗░░░██╗░█████╗░██████╗░███╗░░██╗
╚██╗░██╔╝██╔══██╗██╔══██╗████╗░██║
░╚████╔╝░███████║██████╔╝██╔██╗██║
░░╚██╔╝░░██╔══██║██╔══██╗██║╚████║
░░░██║░░░██║░░██║██║░░██║██║░╚███║
░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝\n\e[0m"

if command -v yarn >/dev/null 2>&1; then
    echo -e "\033[01;33mYarn era già installato in precedenza.\nYarn was already installed previously.\033[0m"
else
    if npm install -g yarn 2>&1 >/dev/null | grep -E -i -q '(command not found|unable to locate package|E: Could not get lock|debconf: delaying package configuration|Package not found|Failed to fetch|404 Not Found|Hash sum mismatch|503 Service Unavailable|504 Gateway Timeout|408 Request Timeout|Connection timed out|Temporary failure resolving)'; then
        error=$(npm install -g yarn 2>&1 >/dev/null)
        echo -e "\033[0;31mErrore: $error\033[0m" 
        echo -e "\033[0;34mImpossibile installare Yarn. Verifica la tua connessione a Internet e riprova. Se l'errore persiste, installalo manualmente!!\nIf the error continues, install manually!!\033[0m" 
        exit 1
    else
        echo -e "\033[01;32mYarn è stato installato correttamente.\nYarn has been installed successfully.\n\033[0m" 
    fi
fi

echo -e "\e[36m
░█▀▀█ ▒█░░░ ▒█░░░ 　 ▒█▀▀█ ▀█▀ ▒█▀▀█ ▒█░▒█ ▀▀█▀▀ 
▒█▄▄█ ▒█░░░ ▒█░░░ 　 ▒█▄▄▀ ▒█░ ▒█░▄▄ ▒█▀▀█ ░▒█░░ 
▒█░▒█ ▒█▄▄█ ▒█▄▄█ 　 ▒█░▒█ ▄█▄ ▒█▄▄█ ▒█░▒█ ░▒█░░\n\e[0m"
echo -e "\033[01;32m\nTutte le dipendenze sono state installate correttamente.\nAll dependencies have been installed successfully.\n\033[0m"

echo -e "\e[35m
██╗░░██╗░░██╗░░  ██╗███╗░░██╗░██████╗████████╗░█████╗░██╗░░░░░██╗░░░░░
╚██╗░╚██╗░╚██╗░  ██║████╗░██║██╔════╝╚══██╔══╝██╔══██╗██║░░░░░██║░░░░░
░╚██╗░╚██╗░╚██╗  ██║██╔██╗██║╚█████╗░░░░██║░░░███████║██║░░░░░██║░░░░░
░██╔╝░██╔╝░██╔╝  ██║██║╚████║░╚═══██╗░░░██║░░░██╔══██║██║░░░░░██║░░░░░
██╔╝░██╔╝░██╔╝░  ██║██║░╚███║██████╔╝░░░██║░░░██║░░██║███████╗███████╗
╚═╝░░╚═╝░░╚═╝░░  ╚═╝╚═╝░░╚══╝╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚══════╝╚══════╝


░█████╗░██╗░░██╗░█████╗░████████╗██╗░░░██╗███╗░░██╗██╗████████╗██╗░░░██╗░░░░░░██████╗░░█████╗░████████╗
██╔══██╗██║░░██║██╔══██╗╚══██╔══╝██║░░░██║████╗░██║██║╚══██╔══╝╚██╗░██╔╝░░░░░░██╔══██╗██╔══██╗╚══██╔══╝
██║░░╚═╝███████║███████║░░░██║░░░██║░░░██║██╔██╗██║██║░░░██║░░░░╚████╔╝░█████╗██████╦╝██║░░██║░░░██║░░░
██║░░██╗██╔══██║██╔══██║░░░██║░░░██║░░░██║██║╚████║██║░░░██║░░░░░╚██╔╝░░╚════╝██╔══██╗██║░░██║░░░██║░░░
╚█████╔╝██║░░██║██║░░██║░░░██║░░░╚██████╔╝██║░╚███║██║░░░██║░░░░░░██║░░░░░░░░░██████╦╝╚█████╔╝░░░██║░░░
░╚════╝░╚═╝░░╚═╝╚═╝░░╚═╝░░░╚═╝░░░░╚═════╝░╚═╝░░╚══╝╚═╝░░░╚═╝░░░░░░╚═╝░░░░░░░░░╚═════╝░░╚════╝░░░░╚═╝░░░\n\e[0m"

echo -e "\033[1;35m"
git clone https://github.com/chatunitycenter/chatunity-bot.git
echo -e "\033[01;32mLa clonazione è stata scaricata e installata correttamente.\nThe clone has been downloaded and installed successfully.\n\033[0m"

echo -e "\033[01;32mCambiando alla directory del repository!!\nChanging to the repository directory!!\n\033[0m" 
cd /sdcard/chatunity-bot

echo -e "\e[35m
██╗███╗░░██╗░██████╗████████╗░█████╗░██╗░░░░░██╗░░░░░  ███╗░░██╗██████╗░███╗░░░███╗
██║████╗░██║██╔════╝╚══██╔══╝██╔══██╗██║░░░░░██║░░░░░  ████╗░██║██╔══██╗████╗░████║
██║██╔██╗██║╚█████╗░░░░██║░░░███████║██║░░░░░██║░░░░░  ██╔██╗██║██████╔╝██╔████╔██║
██║██║╚████║░╚═══██╗░░░██║░░░██╔══██║██║░░░░░██║░░░░░  ██║╚████║██╔═══╝░██║╚██╔╝██║
██║██║░╚███║██████╔╝░░░██║░░░██║░░██║███████╗███████╗  ██║░╚███║██║░░░░░██║░╚═╝░██║
╚═╝╚═╝░░╚══╝╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚══════╝╚══════╝  ╚═╝░░╚══╝╚═╝░░░░░╚═╝░░░░░╚═╝\n\e[0m"

echo -e "\033[0;34mNPM verrà installato automaticamente. Attendere un momento, per favore.\nNPM will be installed automatically. Wait a moment please.\n\033[0m"
if yarn install 2>&1 >/dev/null | grep -E -i -q '(command not found|unable to locate package|E: Could not get lock|debconf: delaying package configuration|Package not found|Failed to fetch|404 Not Found|Hash sum mismatch|503 Service Unavailable|504 Gateway Timeout|408 Request Timeout|Connection timed out|Temporary failure resolving)'; then
    error=$(npm install 2>&1 >/dev/null)
    echo -e "\033[0;31mErrore: $error\033[0m" 
    echo -e "\033[0;34mImpossibile installare NPM. Verifica la tua connessione a Internet e riprova. Se l'errore persiste, installalo manualmente!!\nIf the error continues, install manually!!\033[0m" 
else
    echo -e "\033[01;32mNPM è stato installato correttamente.\n\033[0m" 
fi

echo -e "\e[36m
░██████╗░██████╗░░█████╗░███████╗██╗███████╗  ██████╗░███████╗██████╗░
██╔════╝░██╔══██╗██╔══██╗╚════██║██║██╔════╝  ██╔══██╗██╔════╝██╔══██╗
██║░░██╗░██████╔╝███████║░░███╔═╝██║█████╗░░  ██████╔╝█████╗░░██████╔╝
██║░░╚██╗██╔══██╗██╔══██║██╔══╝░░██║██╔══╝░░  ██╔═══╝░██╔══╝░░██╔══██╗
╚██████╔╝██║░░██║██║░░██║███████╗██║███████╗  ██║░░░░░███████╗██║░░██║
░╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝╚══════╝╚═╝╚══════╝  ╚═╝░░░░░╚══════╝╚═╝░░╚═╝

██╗░░░░░██╗██╗███╗░░██╗░██████╗████████╗░█████╗░██╗░░░░░██╗░░░░░░█████╗░███████╗██╗░█████╗░███╗░░██╗███████╗
██║░░░░░╚█║██║████╗░██║██╔════╝╚══██╔══╝██╔══██╗██║░░░░░██║░░░░░██╔══██╗╚════██║██║██╔══██╗████╗░██║██╔════╝
██║░░░░░░╚╝██║██╔██╗██║╚█████╗░░░░██║░░░███████║██║░░░░░██║░░░░░███████║░░███╔═╝██║██║░░██║██╔██╗██║█████╗░░
██║░░░░░░░░██║██║╚████║░╚═══██╗░░░██║░░░██╔══██║██║░░░░░██║░░░░░██╔══██║██╔══╝░░██║██║░░██║██║╚████║██╔══╝░░
███████╗░░░██║██║░╚███║██████╔╝░░░██║░░░██║░░██║███████╗███████╗██║░░██║███████╗██║╚█████╔╝██║░╚███║███████╗
╚══════╝░░░╚═╝╚═╝░░╚══╝╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚══════╝╚══════╝╚═╝░░╚═╝╚══════╝╚═╝░╚════╝░╚═╝░░╚══╝╚══════╝\n\e[0m"

echo -e "\e[31m
_░▒███████
░██▓▒░░▒▓██
██▓▒░__░▒▓██___██████
██▓▒░____░▓███▓__░▒▓██
██▓▒░___░▓██▓_____░▒▓██
██▓▒░_______________░▒▓██
_██▓▒░______________░▒▓██
__██▓▒░____________░▒▓██
___██▓▒░__________░▒▓██
____██▓▒░________░▒▓██
_____██▓▒░_____░▒▓██
______██▓▒░__░▒▓██
_______█▓▒░░▒▓██
_________░▒▓██
_______░▒▓██
_____░▒▓██\n\e[0m"
    
yarn start
