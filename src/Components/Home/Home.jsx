import Products from '../Products/Products'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { useIsFetching } from '@tanstack/react-query';
import GlobalLoader from './../GlobalLoader/GlobalLoader';

function Home() {
    const isFetching = useIsFetching();
    return (
        <>
            {isFetching ? <GlobalLoader /> : null}
            <MainSlider />
            <CategorySlider />
            <Products isHome={true} />
        </>
    )
}

export default Home
