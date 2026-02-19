export const config = {
  port: process.env.PORT || 4000,
  goldApiKey: process.env.GOLD_API_KEY || '',
  goldApiUrl: process.env.GOLD_API_URL || '',
  lineChannelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  linePushUrl: 'https://api.line.me/v2/bot/message/push',
}
