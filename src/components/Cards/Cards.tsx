import { type CardProps, Card } from './Card'

export type CardsProps = {
  cardProps: CardProps[]
}

export const Cards: React.FC<CardsProps> = (props) => {
  return (
    <div className="grid grid-flow-row-dense grid-cols-3 grid-rows-3">
      {props.cardProps.map((prop, index) => {
        return <Card {...prop} key={index} />
      })}
    </div>
  )
}
