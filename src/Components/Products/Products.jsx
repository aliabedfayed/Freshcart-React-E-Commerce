import axios from 'axios'
import { useState } from 'react'
import Loader from '../Loader/Loader'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from './../../Redux/cartSlice';

function Products({ isHome }) {
    const [searchTerm, setSearchTerm] = useState("")
    const dispatch = useDispatch()

    function AddProductToCart(productId) {
        dispatch(addToCart(productId))
    }

    function getProducts() {
        return axios.get("/products")
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
        refetchOnWindowFocus: false
    })

    const filteredProducts = data?.data.data.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <>
            <section className="my-6">
                {!isHome && <div className="flex justify-center mb-10">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="main-input w-3/4"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>}

                <div className="w-full sm:w-[90%] mx-auto px-4">
                    {!isLoading && isHome ? <h2 className="text-2xl lg:text-3xl font-bold my-5 text-center text-main">Popular Products</h2> : null}
                    {isLoading && !isHome ? <Loader /> : null}
                    {isError ? <p className='text-4xl py-5 text-main text-center font-extrabold'>{error.message}</p> : null}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 sm:gap-8 md:gap-10">
                        {filteredProducts?.length === 0 ?
                            <div className="col-span-full text-center py-10">
                                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-main">
                                    No Products Found
                                </h2>
                            </div>
                            : null}
                        {filteredProducts?.map((product) =>
                            <div key={product.id} className="hover:border-main hover:border p-3 rounded-2xl hover:shadow-main cursor-pointer group">
                                <Link to={`/productDetails/${product.id}`}>
                                    <div>
                                        <img src={product.imageCover} className="w-full" alt="" />
                                        <h5 className="text-main">{product.category.name}</h5>
                                        <h4 className="font-bold line-clamp-1">{product.title}</h4>
                                        <div className="flex justify-between my-5">
                                            <span>{product.price} EGP</span>
                                            <span><i className="fa-solid fa-star text-rating" />{product.ratingsAverage}</span>
                                        </div>
                                    </div>
                                </Link>
                                <button onClick={() => AddProductToCart(product.id)} className="main-btn">Add To Cart</button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

        </>
    )
}

export default Products

