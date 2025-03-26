import React from 'react';
import "./page.module.css";

const UsersPage = () => {
  return (
    <div className="background">
        <ul>
          <li className="icones-menu">
            <button data-shop-target="#shop" className="button-nav">
              <span className="icone">
                <i className="bi bi-shop-window"></i>
              </span>
              <span className="icone-texto">SHOP</span>
            </button>
            <div id="overlay"></div>
          </li>
        </ul>
    </div>
  );
};

export default UsersPage;
