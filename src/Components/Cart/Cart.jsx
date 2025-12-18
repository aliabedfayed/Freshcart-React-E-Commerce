import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getUserCart, removeItem, updateCart } from '../../Redux/cartSlice';

function Cart() {
    const { cartItems, cartPrice } = useSelector(state => state.cartRed)
    const dispatch = useDispatch()
    let [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCart()
    }, [])

    async function getCart() {
        await dispatch(getUserCart())
        setIsLoading(false)
    }

    function removeCartItem(productId) {
        dispatch(removeItem(productId))
    }

    function clearCartItems() {
        dispatch(clearCart())
    }

    function updateCartQuantity(productId, count) {
        dispatch(updateCart({ productId, count }))
    }

    return (
        <>
            {isLoading ? <Loader /> : cartItems.length === 0 ?
                <p className='text-4xl my-5 text-main font-bold text-center' >Cart is empty</p> :
                <section className="container mx-auto shadow bg-light p-10 my-4">
                    <div className='w-[90%] mx-auto'>
                        <div className="flex justify-between">
                            <div>
                                <h1 className="text-3xl font-bold my-3">Shop Cart</h1>
                                <p className="text-main font-bold my-1">Total cart price : {cartPrice} EGP</p>
                            </div>
                            <div>
                                <button onClick={() => clearCartItems()} className="bg-red-900 text-white cursor-pointer rounded-2xl p-3">
                                    Clear
                                </button>
                            </div>
                        </div>
                        {cartItems.map((item) =>
                            <div className="flex flex-col md:flex-row items-center gap-4 my-5 border-b border-gray-200 py-4">
                                <img src={item.product.imageCover} className="w-20 h-24 object-fill rounded" />
                                <div className="flex-1 text-center md:text-left">
                                    <h4 className="font-bold text-gray-800">{item.product.title}</h4>
                                    <span className="text-main block my-2">
                                        Price : {item.price} EGP
                                    </span>
                                    <button className="text-red-600 font-bold cursor-pointer mt-2 md:mt-0" onClick={() => removeCartItem(item?.product.id)}>
                                        <i className="fa fa-trash"></i>
                                        Remove
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 mt-3 md:mt-0">
                                    <button onClick={() => updateCartQuantity(item?.product.id, item.count + 1)}
                                        className="border border-main px-3 py-1 rounded hover:bg-main hover:text-white transition">
                                        +
                                    </button>
                                    <span className="font-semibold">{item.count}</span>
                                    <button onClick={() => updateCartQuantity(item?.product.id, item.count - 1)}
                                        className="border border-main px-3 py-1 rounded hover:bg-main hover:text-white transition">
                                        -
                                    </button >
                                </div >
                            </div >
                        )}
                        <div className="flex flex-col md:flex-row justify-between gap-3 mt-6">
                            <Link to="/products" className="w-full md:w-auto">
                                <button className="main-btn opacity-100 w-full md:w-auto translate-y-0">
                                    Continue shopping
                                </button>
                            </Link>

                            <Link to="/checkout" className="w-full md:w-auto">
                                <button className="main-btn opacity-100 w-full md:w-auto translate-y-0">
                                    Go to checkout <span className="ms-2">{cartPrice} EGP</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </section >
            }
        </>
    )
}

export default Cart