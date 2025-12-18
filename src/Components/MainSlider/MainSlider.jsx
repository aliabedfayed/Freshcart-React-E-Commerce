import Slider from "react-slick";
import slider1 from "../../assets/images/Slider1.avif"
import slider2 from "../../assets/images/Slider2.avif"
import slider3 from "../../assets/images/Slider3.avif"

function MainSlider() {
    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: false
    };

    return (
        <>
            <div className="w-full">
                <Slider {...settings}>
                    <img src={slider1} alt="" />
                    <img src={slider2} alt="" />
                    <img src={slider3} alt="" />
                </Slider>
            </div>
        </>
    )
}

export default MainSlider
