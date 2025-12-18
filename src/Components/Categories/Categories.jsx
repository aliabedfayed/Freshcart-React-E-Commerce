import Loader from "../Loader/Loader"
import { Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

function Categories() {
    async function getCategories() {
        return await axios.get("/categories")
    }

    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        refetchOnWindowFocus: false
    })

    const categories = data?.data.data || []

    return (
        <>
            {isLoading ? <Loader /> :
                <section className="container mx-auto w-[90%] my-6">
                    <h2 className="text-xl lg:text-3xl sm:text-2xl font-bold text-center mb-6 text-main">
                        Categories
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                        {categories.map((category) =>
                            <div key={category._id} className="bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer text-center group">
                                <Link to={`/categoryDetails/${category._id}`}>
                                    <div>
                                        <div className="w-full h-70 flex items-center justify-center">
                                            <img src={category.image} alt={category.name}
                                                className="w-full h-full object-contain transition duration-300 group-hover:scale-105" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800 mt-3 group-hover:text-main">
                                            {category.name}
                                        </h3>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </section >
            }
        </>
    )
}

export default Categories
