import React from 'react'
import overview from '../assets/images/Squares four 1.png'

const Card = ( { cardList } ) => {
  return (
    <div>
        <div className='flex items-center gap-2 mb-3.5'>
            <img src={overview} alt="" />
            <h1 className='font-poppins text-xl leading-[30px] font-bold text-[#171A1FFF]'>Overview</h1>
       </div>

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
