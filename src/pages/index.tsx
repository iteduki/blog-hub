import type { NextPage } from 'next'
import type { GetStaticProps } from 'next'

import { type CardsProps, Cards } from '@/components/Cards'
import { Head } from '@/components/Head'
import { feedUrls } from '@/constants/feedUrls'
import { parseRss } from '@/utils/parser'

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const response = await Promise.allSettled(feedUrls.map(parseRss))

  const cardProps = response
    .reduce<CardsProps['cardProps']>((prev, cur) => {
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
      cardsProps: cardProps,
    },
  }
}

type HomeProps = {
  cardsProps: CardsProps['cardProps']
}

const Home: NextPage<HomeProps> = ({ cardsProps }) => {
  return (
    <>
      <Head />
      <Cards cardProps={cardsProps} />
      {/* {cardsProps.map((props, index) => {
        return <Card {...props} key={index} />
      })} */}
    </>
  )
}

export default Home
