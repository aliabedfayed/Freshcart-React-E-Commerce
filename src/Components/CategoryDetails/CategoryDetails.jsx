import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { addToCart } from '../../Redux/cartSlice'

export default function CategoryDetails() {
    let { id } = useParams()
    let dispatch = useDispatch()

    function AddProductToCart(productId) {
        dispatch(addToCart(productId))
    }

    function getSpecificCategory() {
        return axios.get(`/categories/${id}`)
    }

    const { data: categoryData, isLoading } = useQuery({
        queryKey: ["category"],
        queryFn: getSpecificCategory,
        gcTime: 0
    })

    function getProducts() {
        return axios.get("/products")
    }

    const { data } = useQuery({
        queryKey: ["category-products"],
        queryFn: getProducts,
        select: (res) => res.data.data.filter(p => p.category._id === id),
        refetchOnWindowFocus: false
    })

    const category = categoryData?.data?.data
    const categoryProducts = data || []

    return (
        <>
            {isLoading ? <Loader /> :
                <section className="container mx-auto p-6">
                    <div className="shadow rounded p-5 text-center mb-6 max-w-md mx-auto">
                        <img src={category?.image} className="w-full rounded shadow mb-5" />
                        <h1 className="text-3xl font-bold mb-2">{category?.name}</h1>
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-main text-center">
                        Products
                    </h2>
                    {categoryProducts?.length === 0 ? <p class="text-center text-gray-500 my-10">
                        There is no products in this category
                    </p> : null}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {categoryProducts?.map((product) =>
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
                </section >
            }
        </>
    )
}