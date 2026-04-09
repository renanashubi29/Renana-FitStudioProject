


 export const GalleryCard = ({ img, title, sizeClass, baseUrl }) => {

  return (
  <div 
              
                className={`gallery-item ${sizeClass}`}
                style={{ backgroundImage: `url(${baseUrl}${img}.jpg)` }}
            >
                <div className="gi-hover-text">
                    <h5>{title}</h5>
                </div>
            </div>
  );
};

export default GalleryCard;