import timelineData from '~/assets/json/music.json'

export default defineEventHandler(async (event) => {
    return {
        data: timelineData
    }
})
