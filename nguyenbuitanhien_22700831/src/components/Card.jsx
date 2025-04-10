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
                        <h4 className='font-poppins text-base leading-6 font-bold text-[#171A1F]'>{card.title}</h4>
                        <h1 className='font-poppins text-2xl leading-[48px] font-bold text-[#171A1F]'>{card.value}</h1>
                        <p className='font-manrope text-sm leading-5 font-normal mt-3.5'><span className='font-bold text-[#117B34]'>{card.percentageChange}</span> period of change</p>
                        <img src={card.icon} alt={card.title} />
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Card
