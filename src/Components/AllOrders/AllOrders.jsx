import { Link } from 'react-router-dom'

function AllOrders() {
    return (
        <>
            <section className="h-[80vh] flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <i className="fa-solid fa-check text-green-600 text-4xl"></i>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-3">Payment Successful!</h1>
                <p className="text-gray-600 text-base sm:text-lg mb-8 ">Your order has been placed successfully.</p>
                <Link className='w-full' to="/">
                    <button className="main-btn opacity-100 w-6/12 translate-y-0">Back to home</button>
                </Link>
            </section>
        </>
    )
}

export default AllOrders
