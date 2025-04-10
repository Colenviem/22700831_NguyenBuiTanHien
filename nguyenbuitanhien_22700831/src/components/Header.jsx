import React from 'react'
import search from '../assets/images/Search.png'
import bell from '../assets/images/Bell 1.png'
import question from '../assets/images/Question 1.png'
import avatar from '../assets/images/Avatar 313.png'

const Header = () => {
    return (
        <div className='header flex justify-between items-center'>
            <h1 className='text'>Dashboard</h1>
            
            <div className='flex items-center gap-4'>
                <div className='textbox'>
                    <img src={search} alt="search" />
                    <input type="text" placeholder='Search ...'/>
                </div>
                
                <div className="icon flex items-center gap-3">
                    <img src={bell} alt="bell" />
                    <img src={question} alt="question" />
                    <img src={avatar} alt="avatar" />
                </div>
            </div>
        </div>
    )
}

export default Header
