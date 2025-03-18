import React from 'react'
import "./page.module.css"
const UsersPage = () => {
  return (
    <div> <nav className="menu-lateral">
    <ul>
        <li className="icones-menu">
            <button data-shop-target="#shop" className="button-nav">
                <span className="icone">
                    <i className="bi bi-shop-window"></i>
                </span>
                <span className="icone-texto">SHOP</span>
            </button>

            <div id="overlay">
            </div>
        </li>

        
    </ul>
   
</nav></div>
  )
}

export default UsersPage

