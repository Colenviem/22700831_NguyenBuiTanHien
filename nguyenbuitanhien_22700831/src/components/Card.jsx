import React from 'react'

const Card = ( { cardList } ) => {
  return (
    <div>
        <div className='card flex justify-between gap-0.5'>
            {cardList.map((card) => {
                return (
                    <div key={card.id} className='card-item w-[32%] border border-gray-300 rounded-2xl p-4'>
                        <h4>{card.title}</h4>
                        <h1>{card.value}</h1>
                        <p><span>{card.percentageChange}</span> period of change</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Card
