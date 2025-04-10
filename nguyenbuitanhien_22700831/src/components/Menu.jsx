import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../assets/images/Image 1858.png'
import Group from '../assets/images/Group.png'

const Menu = ( {listMenu} ) => {
    return (
        <div className='sidebar'>
            <div className="image">
                <img src={Logo} alt="Logo" />
            </div>
            
            <div className="menu">
                {listMenu.map((menuItem) => {
                    return (
                        <NavLink 
                            key={menuItem.id}
                            to={menuItem.path}
                            className={({ isActive }) => isActive ? "menuItem active" : "menuItem"}
                            >
                                <i className={menuItem.icon}></i>
                                <p>{menuItem.menuName}</p>
                        </NavLink>
                    )
                })}
            </div>
            
            <div className="group">
                <img src={Group} alt="" />
            </div>
        </div>
    )
}

export default Menu
 