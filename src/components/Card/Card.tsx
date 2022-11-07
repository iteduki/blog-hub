import dayjs from 'dayjs'
import Link from 'next/link'

export type CardProps = {
  blogTitle: string
  blogUrl?: string
  articleTitle?: string
  articleUrl?: string
  pubDate: string
}

export const Card: React.FC<CardProps> = ({ blogTitle, blogUrl, articleTitle, articleUrl, pubDate }) => {
  return (
    <div>
      <h1>
        {articleUrl ? (
          <Link href={articleUrl} prefetch={false} target="_blank">
            <a>{articleTitle}</a>
          </Link>
        ) : (
          articleTitle
        )}
      </h1>
      <p>
        {blogUrl ? (
          <Link href={blogUrl} prefetch={false} target="_blank">
            <a>{blogTitle}</a>
          </Link>
        ) : (
          blogTitle
        )}
      </p>
      <p>{dayjs(pubDate).format('YYYY-MM-DD')}</p>
    </div>
  )
}
