import { FallingLines } from "react-loader-spinner"

function Loader() {
    return (
        <>
            <div className="h-[70vh] flex justify-center items-center">
                <FallingLines
                    color="#0aad0a"
                    width="150"
                    visible={true}
                    ariaLabel="falling-circles-loading"
                />
            </div>
        </>
    )
}

export default Loader