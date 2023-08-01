import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillCartCheckFill } from 'react-icons/bs';
const Navbar = () => {
  return (
    <nav>
      <div className="header">
        <ul>
          <li>
            <Link to={'/'} className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to={'/about'} className="link">
              About
            </Link>
          </li>
        </ul>
        <div>
          <Link to={'/cart'} className="cart">
            Cart
            <BsFillCartCheckFill className="cart" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
