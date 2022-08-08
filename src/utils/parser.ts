import type { Output } from 'rss-parser'
import Parser from 'rss-parser'

const parser = new Parser()

export type FeedItem = Output<Record<string, string>>

export const parseRss = async (url: string): Promise<FeedItem> => {
  return await parser.parseURL(url)
}
