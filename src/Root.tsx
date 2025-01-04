
import { NavLink, Outlet } from "react-router-dom";

export default function Root() {


  return (
    <div className="container">
      <ul className="nav bg-light mb-3 border-bottom">
        <li className="nav-item">
          <NavLink to="/" className="nav-link">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/cart" className="nav-link">Cart</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/form" className="nav-link">Form</NavLink>
        </li>
      </ul>
      <Outlet/>
    </div>
  )
}