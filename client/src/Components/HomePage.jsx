import React, { useState, useEffect } from 'react';
import './HomePage.css'; 

const ImageGallery = ({ }) => {

  const str='images/'
  const images=[`${str}1.jpg`,`${str}2.jpg`]

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

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
