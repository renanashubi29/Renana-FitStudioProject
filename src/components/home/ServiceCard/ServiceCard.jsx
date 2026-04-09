// ServiceCard.jsx
export const ServiceCard = ({ title, icon, description }) => {
  return (
    <div className="service-item" >
                 <div className="icon-box">
                    <span className="icon-placeholder">{icon}</span>
                  </div>
                 <h3>{title}</h3>
                  <p>{description}</p>
                </div>
  );
};

export default ServiceCard;