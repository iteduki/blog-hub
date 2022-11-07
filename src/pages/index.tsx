import type { NextPage } from 'next'
import type { GetStaticProps } from 'next'

import type { CardProps } from '@/components/Card'
import { Card } from '@/components/Card'
import { feedUrls } from '@/constants/feedUrls'
import { parseRss } from '@/utils/parser'

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const response = await Promise.allSettled(feedUrls.map(parseRss))

  const cardProps = response
    .reduce<CardProps[]>((prev, cur) => {
      if (cur.status === 'rejected') return prev
      const { title = 'No Title', items, link } = cur.value
      return [
        ...prev,
        ...items.map(({ title: articleTitle = 'No Title', link: articleUrl, pubDate = '' }) => {
          return {
            blogTitle: title,
            blogUrl: link,
            articleTitle,
            articleUrl,
            pubDate,
          }
        }),
      ]
    }, [])
    .sort((a, b) => {
      return new Date(a.pubDate) < new Date(b.pubDate) ? 1 : -1
    })
  return {
    props: {
      cardProps,
    },
  }
}

type HomeProps = {
  cardProps: CardProps[]
}

const Home: NextPage<HomeProps> = ({ cardProps }) => {
  return (
    <>
      {cardProps.map((props, index) => {
        return <Card {...props} key={index} />
      })}
    </>
  )
}

export default Home
