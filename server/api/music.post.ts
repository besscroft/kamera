import timelineData from 'assets/server/json/music.json'

export default defineEventHandler(async (event) => {
  return {
    data: timelineData,
  }
})
