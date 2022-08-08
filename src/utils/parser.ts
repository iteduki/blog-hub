import type { Output } from 'rss-parser'
import Parser from 'rss-parser'

const parser = new Parser()

export const parseRss = async (url: string): Promise<Output<Record<string, string>>> => {
  return await parser.parseURL(url)
}
