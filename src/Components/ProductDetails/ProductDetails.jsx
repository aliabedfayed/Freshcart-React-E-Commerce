import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import Loader from '../Loader/Loader';
import Slider from "react-slick";
import "./ProductDetails.css"
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/cartSlice';

function ProductDetails() {
    let { id } = useParams()
    const dispatch = useDispatch()

    function getSpecificProduct() {
        return axios.get(`/products/${id}`)
    }

    const { data, isLoading } = useQuery({
        queryKey: ["productDetails"],
        queryFn: getSpecificProduct,
        gcTime: 0
    })

    function AddProductToCart(productId) {
        dispatch(addToCart(productId))
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const productDetails = data?.data.data;

    return (
        <>
            {isLoading ? <Loader /> :
                <section className="my-10 sm:my-20">
                    <div className="sm:w-[90%] mx-auto px-6">
                        <div className="grid grid-cols-12 gap-5 sm:gap-10">
                            <div className="col-span-12 sm:col-span-5">
                                <Slider {...settings}>
                                    {productDetails?.images.map((image) =>
                                        <img src={image} alt="" className="w-full h-[250px] sm:h-[450px] object-contain rounded-2xl " />
                                    )}
                                </Slider>
                            </div>
                            <div className="col-span-12 sm:col-span-7 flex flex-col justify-between py-6 sm:py-20">
                                <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-3 line-clamp-2">
                                    {productDetails?.title}
                                </h1>
                                <p className="text-gray-700 text-lg mb-8 line-clamp-2">
                                    {productDetails?.description}
                                </p>
                                <div className="flex justify-between my-5">
                                    <span>{productDetails?.price} EGP</span>
                                    <span><i className="fa-solid fa-star text-rating" /> {productDetails?.ratingsAverage}</span>
                                </div>
                                <button onClick={() => AddProductToCart(productDetails?.id)} className="main-btn opacity-100 translate-y-0">Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </section>
            }
        </>
    )
}

export default ProductDetails
