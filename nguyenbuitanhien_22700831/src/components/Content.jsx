import React from 'react'
import Card from './Card'
import DetailReport from './DetailReport'

const Content = ( {cardList, customers} ) => {
    return (
        <div className="content">
            <h3>content</h3>
           
            <div>
                <h1>Overview</h1>
            </div>
            
            <Card cardList={cardList}></Card>
            
            <div>
                <h1>Detailed report</h1>
            </div>
            
            <DetailReport customers={customers}></DetailReport>
        </div>
    )
}

export default Content
