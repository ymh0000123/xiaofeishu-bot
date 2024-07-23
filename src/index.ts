import { Context, Schema } from 'koishi'

export const name = 'xiaofeishu-bot'

export interface Config {
  ggurl: string
}

export const Config: Schema<Config> = Schema.object({
  ggurl: Schema.string().role('link').description('公告链接'),
}).description('标题')

export function apply(ctx: Context) {
  ctx.command('机器人公告')
    .action(async () => {
      const url = ctx.config.ggurl  // 直接从 ctx.config 读取 ggurl
      try {
        const response = await ctx.http.get(url)
        const announcement = response.announcement
        return announcement || '未找到公告内容'
      } catch (error) {
        return `请求公告时出错: ${error.message}`
      }
    })
}
