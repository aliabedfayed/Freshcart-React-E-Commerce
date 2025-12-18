import "./Navbar.module.css"
import logo from "./../../assets/images/freshcart-logo.svg"
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getUserCart, resetCart } from "../../Redux/cartSlice"
import { removeToken } from "../../Redux/authSlice"

function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.authRed)
  const { cartCount } = useSelector(state => state.cartRed)

  useEffect(() => {
    if (token) {
      dispatch(getUserCart())
    }
  }, [dispatch, token])

  function logOut() {
    dispatch(resetCart())
    dispatch(removeToken())
    navigate("/login")
  }

  return (
    <div className="bg-light">
      <div className="navbar w-[90%] mx-auto">
        <div className="navbar-start">
          {token ? <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li className="text-lg"><NavLink to="/">Home</NavLink></li>
              <li className="text-lg relative">
                <NavLink to="cart">Cart</NavLink>
                <div className="badge bg-main text-white absolute top-1 left-9 w-5 h-5 rounded-full">{cartCount}</div>
              </li>
              <li className="text-lg"><NavLink to="products">Products</NavLink></li>
              <li className="text-lg"><NavLink to="categories">Categories</NavLink></li>
              <li className="text-lg"><NavLink to="brands">Brands</NavLink></li>
            </ul>
          </div> : null}
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          {token ? <ul className="menu menu-horizontal px-1">
            <li className="text-lg mx-2"><NavLink to="/">Home</NavLink></li>
            <li className="text-lg mx-2 relative">
              <NavLink to="cart">Cart</NavLink>
              <div className="badge bg-main text-white absolute -top-3 -right-3 w-7 h-7 rounded-full">{cartCount}</div>
            </li>
            <li className="text-lg mx-2"><NavLink to="products">Products</NavLink></li>
            <li className="text-lg mx-2"><NavLink to="categories">Categories</NavLink></li>
            <li className="text-lg mx-2"><NavLink to="brands">Brands</NavLink></li>
          </ul> : null}

        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1">
            {token ?
              <li className="text-lg"><a onClick={() => { logOut() }}>Logout</a></li>
              : <>
                <li to="login" className="text-lg"><NavLink to="login">Login</NavLink></li>
                <li to="register" className="text-lg"><NavLink to="register">Register</NavLink></li>
              </>
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
