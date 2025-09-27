/* 
==========================================
Crediti al solo e unico kekko aka nexus
github.com/kekk00
==========================================
*/

import fs from 'fs/promises'
import path from 'path'
import { createCanvas, loadImage, registerFont } from 'canvas'
import fetch from 'node-fetch'

const dbPath = path.resolve('./xp-counter.json')
const DEFAULT_AVATAR_URL = 'https://i.ibb.co/BKHtdBNp/default-avatar-profile-icon-1280x1280.jpg'
const TWEMOJI_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg'

async function readDB() {
  try { return JSON.parse(await fs.readFile(dbPath,'utf-8')) }
  catch(e){ if(e.code==='ENOENT'){ await fs.writeFile(dbPath,'{}','utf-8'); return {} } else throw e }
}
async function writeDB(db){ await fs.writeFile(dbPath,JSON.stringify(db,null,2),'utf-8') }

let fontsLoaded=false
async function setupFonts(){
  if(fontsLoaded) return
  try{
    registerFont('media/fonts/BebasNeue-Regular.ttf',{family:'Bebas Neue'})
    registerFont('media/fonts/Montserrat-Regular.ttf',{family:'Montserrat'})
  }catch{}
  fontsLoaded=true
}

function levelFromXP(xp){return Math.floor(Math.sqrt(xp/100))+1}

async function createCircularProfilePic(url,size=80){
  try{
    const img = await loadImage(url)
    const canvas = createCanvas(size,size)
    const ctx = canvas.getContext('2d')
    ctx.beginPath()
    ctx.arc(size/2,size/2,size/2,0,Math.PI*2)
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(img,0,0,size,size)
    return canvas
  }catch{return null}
}

// emoji SVG Twemoji
async function drawTextWithEmoji(ctx,text,x,y,fontSize=22,font='Montserrat',fillStyle='#fff'){
  ctx.font = `${fontSize}px ${font}`
  ctx.fillStyle = fillStyle
  ctx.textBaseline = 'top'
  let offsetX = x
  for (const char of [...text]){
    if(/\p{Emoji}/u.test(char)){
      const codepoint = [...char].map(c => c.codePointAt(0).toString(16)).join('-')
      const url = `${TWEMOJI_BASE}/${codepoint}.svg`
      try{
        const res = await fetch(url)
        const svg = await res.text()
        const img = await loadImage(Buffer.from(svg.replace('<svg ','<svg width="'+fontSize+'" height="'+fontSize+'" ')))
        ctx.drawImage(img,offsetX,y,fontSize,fontSize)
      }catch{}
      offsetX += fontSize
    }else{
      ctx.fillText(char,offsetX,y)
      offsetX += ctx.measureText(char).width
    }
  }
}

function drawRoundRect(ctx,x,y,w,h,r){
  ctx.beginPath()
  ctx.moveTo(x+r,y)
  ctx.lineTo(x+w-r,y)
  ctx.arcTo(x+w,y,x+w,y+r,r)
  ctx.lineTo(x+w,y+h-r)
  ctx.arcTo(x+w,y+h,x+w-r,y+h,r)
  ctx.lineTo(x+r,y+h)
  ctx.arcTo(x,y+h,x,y+h-r,r)
  ctx.lineTo(x,y+r)
  ctx.arcTo(x,y,x+r,y,r)
  ctx.closePath()
}

function applyGlow(ctx,color,blur){
  ctx.shadowColor = color
  ctx.shadowBlur = blur
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0
}

async function createTopXPImage(topUsers){
  await setupFonts()
  const width = 600, height = 800
  const canvas = createCanvas(width,height)
  const ctx = canvas.getContext('2d')

  // sfondo gradient
  const grad = ctx.createLinearGradient(0,0,0,height)
  grad.addColorStop(0,'#0f2027')
  grad.addColorStop(1,'#203a43')
  ctx.fillStyle = grad
  ctx.fillRect(0,0,width,height)

  // mega titolo
  ctx.textAlign='center'
  ctx.fillStyle='#FFD700'
  ctx.font='bold 52px "Bebas Neue"'
  applyGlow(ctx,'#FFD700',15)
  ctx.fillText('TOP 3XP',width/2,60)
  ctx.shadowColor = 'transparent'

  const margin = 40
  const cardHeight = 160
  const cardWidth = width - 2*margin
  const startY = 150

  for(let i=0;i<topUsers.length;i++){
    const user = topUsers[i]
    const y = startY + i*(cardHeight + 20)

    // card background
    ctx.fillStyle='rgba(0,0,0,0.6)'
    applyGlow(ctx,'#00ffff',10)
    drawRoundRect(ctx,margin,y,cardWidth,cardHeight,20)
    ctx.fill()
    ctx.shadowColor = 'transparent'

    // avatar
    const pfpCanvas = await createCircularProfilePic(user.avatar,cardHeight-40)
    if(pfpCanvas) ctx.drawImage(pfpCanvas,margin+15,y+15)

    // medaglie
    let medal = i===0?'🥇':i===1?'🥈':''
    if(medal) await drawTextWithEmoji(ctx,medal,margin+cardWidth-60,y+50,32,'Montserrat','#fff')

    // nome con emoji
    await drawTextWithEmoji(ctx,user.name,margin+cardHeight+10,y+30,22,'Montserrat','#fff')

    // livello e XP
    ctx.font='18px Montserrat'
    ctx.fillStyle='#fff'
    ctx.fillText(`Livello: ${user.level}`,margin+cardHeight+35,y+70)
    ctx.fillText(`XP: ${user.xp}`,margin+cardHeight+35,y+95)
  }

  // footer
  ctx.textAlign='center'
  ctx.font='18px Montserrat'
  ctx.fillStyle='#fff'
  ctx.fillText('made by ChatUnity',width/2,height-30)

  return canvas.toBuffer('image/png')
}

let handler = async (m,{conn})=>{
  const db = await readDB()
  const topUsersData = Object.entries(db).sort((a,b)=>b[1].exp - a[1].exp).slice(0,3)

  const usersData = await Promise.all(topUsersData.map(async ([id,data])=>{
    const level = levelFromXP(data.exp)
    return {
      id,
      name: await conn.getName(id),
      avatar: await conn.profilePictureUrl(id).catch(()=>DEFAULT_AVATAR_URL),
      level,
      xp: data.exp
    }
  }))

  const topImage = await createTopXPImage(usersData)
  await conn.sendMessage(m.chat,{image:topImage,caption:'🏆 Top 3 XP 🏆'},{quoted:m})
  await writeDB(db)
}

handler.help=['topxp']
handler.tags=['rpg']
handler.command=['topxp','topxp4']
handler.register=true
export default handler
