import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import type { DefaultTheme } from 'vitepress'

export function getBlogPosts(blogPath: string): DefaultTheme.SidebarItem[] {
  try {
    return readdirSync(blogPath).map((file) => {
      let title = file
      const raw = readFileSync(join(blogPath, file), {
        encoding: 'utf-8',
      })

      raw.split(/\r?\n/).some((line) => {
        if (line.startsWith('# ')) {
          title = line.substring(2)
          return true
        }
        return false
      })

      return { text: title, link: `/${blogPath}/${file}` }
    })
  } catch (error) {
    return []
  }
}