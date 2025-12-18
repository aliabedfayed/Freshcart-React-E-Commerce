import Loader from './../Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

function Brands() {
    function getBrands() {
        return axios.get("/brands")
    }

    const { data, isLoading } = useQuery({
        queryKey: ["brands"],
        queryFn: getBrands,
        refetchOnWindowFocus: false
    })

    const brands = data?.data.data || []

    return (
        <>
            {isLoading ? <Loader /> :
                <section className="my-6">
                    <div className="container mx-auto w-[90%]">
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-6 text-center text-main">
                            Top Brands
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                            {brands.map((brand) =>
                                <div key={brand._id}
                                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer text-center group border border-gray-100">
                                    <div className="w-full h-32 flex items-center justify-center">
                                        <img src={brand.image} alt={brand.name} className="h-full transition duration-300 group-hover:scale-105" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-800 mt-3 group-hover:text-main">
                                        {brand.name}
                                    </h3>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            }

        </>
    )
}

export default Brands
