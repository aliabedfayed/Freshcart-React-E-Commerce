import { FallingLines } from "react-loader-spinner";

export default function GlobalLoader() {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/40 z-999999">
            <FallingLines
                color="#0aad0a"
                width="150"
                visible={true}
                ariaLabel="falling-circles-loading"
            />
        </div>
    );
}
