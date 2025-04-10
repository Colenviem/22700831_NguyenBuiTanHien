import React from 'react'

const Menu = ( {listMenu} ) => {
    return (
            <div className="menu">
                {listMenu.map((menuItem) => {
                    return (
                        <div key={menuItem.id}>
                            {/* <img src={menuItem.image} alt={menuItem.menuName} /> */}
                            <h3>{menuItem.menuName}</h3>
                        </div>
                    )
                })}
            </div>
    )
}

export default Menu
 