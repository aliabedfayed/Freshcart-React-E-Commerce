import React from 'react'
import NotFoundPic from "../../assets/images/error.svg"
import { Link } from 'react-router-dom'
function NotFound() {
    return (
        <>
            <div className='text-center'>
                <img src={NotFoundPic} className='w-1/2 mx-auto' alt="" />
                <Link to="/" >
                    <button className='main-btn opacity-100 w-1/2 translate-y-0'>Return To Home Page</button>
                </Link>
            </div>
        </>
    )
}

export default NotFound
