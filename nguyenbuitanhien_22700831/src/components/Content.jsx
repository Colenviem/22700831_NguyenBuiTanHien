import React from 'react'
import Card from './Card'
import Project from './Project'
import Team from './Team'
import Analytic from './Analytic'
import Message from './Message'
import Integration from './Integration'
import DetailReport from './DetailReport'
import { Routes, Route } from 'react-router-dom'

const Content = ( {cardList} ) => {
    return (
        <div className="content">            
            <Card cardList={cardList}></Card>
            
            <Routes>
                <Route path="/" element={<DetailReport/>}></Route>
                <Route path="/projects" element={<Project />}></Route>
                <Route path="/teams" element={<Team />}></Route>
                <Route path="/analytics" element={<Analytic />}></Route>
                <Route path="/messages" element={<Message />}></Route>
                <Route path="/integrations" element={<Integration />}></Route>
            </Routes>
        </div>
    )
}

export default Content
