export type CardProps = {
  blogTitle: string
  blogUrl?: string
  articleTitle?: string
  articleUrl?: string
  pubDate: string
}

export const Card: React.FC<CardProps> = (props) => {
  return (
    <ul>
      {Object.entries(props).map(([key, value], index) => {
        return <li key={index}>{`${key}-${value}`}</li>
      })}
    </ul>
  )
}
