import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export const ClassCard = ({ image, category, title, baseUrl }) => {


  return (
     <div className="class-item" >
              <div className="class-image">
            <img src={`${baseUrl}${image}.jpg`}  alt={title} />
              </div>
               <div className="class-text">
                <span className="category">{category}</span>
                <h3>{title}</h3>
                <div className="class-icon">
                  <ChevronRightIcon sx={{ fontSize: 24, color: 'white' }} />
                </div>
              </div>
            </div>
  );
};

export default ClassCard;