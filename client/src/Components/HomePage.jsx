import React, { useState, useEffect } from 'react';
import './HomePage.css'; 

const ImageGallery = ({ }) => {

  const str='images/homePage/'
  const images=[`${str}1.jpg`,`${str}2.jpg`,`${str}3.jpg`,`${str}4.jpg`,`${str}5.jpg`,`${str}6.jpg`,`${str}7.jpg`,`${str}8.jpg`,]

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="image-gallery">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
          className={index === currentIndex ? 'active' : ''}
          style={{  
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ))}
    </div>
  );
};

export default ImageGallery;
