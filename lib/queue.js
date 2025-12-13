//DEVLOPED BY CHATUNITY TEAM
import PQueue from 'p-queue'

//DEVLOPED BY CHATUNITY TEAM
export const messageQueue = new PQueue({
  concurrency: 5, 
  timeout: 30000, 
  throwOnTimeout: false
})
//DEVLOPED BY CHATUNITY TEAM
export const commandQueue = new PQueue({
  concurrency: 3, 
  timeout: 45000, 
  throwOnTimeout: false
})
//DEVLOPED BY CHATUNITY TEAM
export const mediaQueue = new PQueue({
  concurrency: 2, 
  timeout: 60000, 
  throwOnTimeout: false
})
//DEVLOPED BY CHATUNITY TEAM
export function getQueueStats() {
  return {
    messages: {
      pending: messageQueue.pending,
      size: messageQueue.size
    },
    commands: {
      pending: commandQueue.pending,
      size: commandQueue.size
    },
    media: {
      pending: mediaQueue.pending,
      size: mediaQueue.size
    }
  }
}
//DEVLOPED BY CHATUNITY TEAM
setInterval(() => {
  const stats = getQueueStats()
  const total = stats.messages.pending + stats.commands.pending + stats.media.pending
  
  if (total > 10) {
    console.log('⚠️ Code messaggi:', JSON.stringify(stats, null, 2))
  }
}, 30000)
//DEVLOPED BY CHATUNITY TEAM
//DEVLOPED BY CHATUNITY TEAM
//DEVLOPED BY CHATUNITY TEAM
//DEVLOPED BY CHATUNITY TEAM
//DEVLOPED BY CHATUNITY TEAM
//DEVLOPED BY CHATUNITY TEAM
//DEVLOPED BY CHATUNITY TEAM
//DEVLOPED BY CHATUNITY TEAM