import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'

function CategorySlider() {
    function getCategories() {
        return axios.get("/categories")
    }

    let { data, isLoading } = useQuery({
        queryKey: ["categories", "slider"],
        queryFn: getCategories,
        refetchOnWindowFocus: false,
    })

    const categories = data?.data?.data || [];

    return (
        <>
            {!isLoading && (
                <h1 className="text-2xl lg:text-3xl font-bold text-main text-center mt-5 mb-3">
                    Shop Popular Categories
                </h1>
            )}

            <Swiper
                modules={[Autoplay]}
                slidesPerView={2}
                loop={true}
                autoplay={{ delay: 1500, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                    1536: { slidesPerView: 6 },
                }}
            >
                {categories.map((category) => (
                    <SwiperSlide key={category._id}>
                        <div className="bg-white rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl items-center p-4">
                            <div className="w-full h-60 mb-3">
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    title={category.name}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </div>
                            <h4 className="text-center mt-1 text-lg font-semibold text-gray-700">
                                {category.name}
                            </h4>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

        </>
    )
}

export default CategorySlider
