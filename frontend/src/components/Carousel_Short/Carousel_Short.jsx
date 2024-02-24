import React from "react";
import Slider from "react-slick";
import ShortCard from "../ShortCard/ShortCard";
import image from "../../assets/IMG_20210528_173635.jpg";
import image1 from "../../assets/IMG_20201008_111139.jpg";
import image2 from "../../assets/IMG_20160222_142007247.jpg";
import image3 from "../../assets/IMG_20210523_181918.jpg";
import image4 from "../../assets/pexels-eray-altay-3834331.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel_Short.css";

function CarouselShort() {
  return (
    <section>
      <Slider
        className="slider_Short"
        infinite
        speed={500}
        slidesToShow={6}
        slidesToScroll={3}
        arrows={false}
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 6,
              slidesToScroll: 1,
            },
          },
        ]}
      >
        <div>
          <ShortCard
            title="Dubai Atlantis"
            thumbnailUrl={image}
            author="Alex"
            views={1783}
            uploadDate="3 day ago"
          />
        </div>
        <div>
          <ShortCard
            title="Le Mans"
            thumbnailUrl="src/assets/31yMnUP2cPc-SD.jpg"
            author="Aurel"
            views={745129}
            uploadDate="12 days ago"
          />
        </div>
        <div>
          <ShortCard
            title="La Réunion"
            thumbnailUrl={image1}
            author="Lulu94"
            views={69851}
            uploadDate="4 day ago"
          />
        </div>
        <div>
          <ShortCard
            title="Yacht Club"
            thumbnailUrl={image2}
            author="Aurel"
            views={14578}
            uploadDate="2 days ago"
          />
        </div>
        <div>
          <ShortCard
            title="Al Burj Khalifa"
            thumbnailUrl={image3}
            author="Alex"
            views={541236}
            uploadDate="2 days ago"
          />
        </div>
        <div>
          <ShortCard
            title="Helico Miami"
            thumbnailUrl={image4}
            author="Aurel"
            views={541236}
            uploadDate="22 days ago"
          />
        </div>
        <div>
          <ShortCard
            title="Short Title 7"
            thumbnailUrl="src/assets/31yMnUP2cPc-SD.jpg"
            author="Author 2"
            views={500}
            uploadDate="2 days ago"
          />
        </div>
      </Slider>
    </section>
  );
}

export default CarouselShort;
