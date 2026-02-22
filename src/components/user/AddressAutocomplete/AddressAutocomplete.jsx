import React from 'react';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';

// ייבוא העיצוב המינימליסטי
import '@geoapify/geocoder-autocomplete/styles/minimal.css';

export const AddressAutocomplete = ({ formData, setFormData }) => {
const apiKey = import.meta.env.VITE_APP_GEOAPIFY_API_KEY;
  const handlePlaceSelect = (value) => {

   if (value && value.properties) {
      const props = value.properties;

      //זה API גלובלי 
      const cityName = props.city || props.town || props.village || props.municipality || props.county || "";
      const streetName = props.street || props.name || "";
      const houseNum = props.housenumber || "1";

      console.log("Address details extracted:", { cityName, streetName, houseNum });

      // עדכון ה-State עם אובייקט ולא עם מחרוזת
      setFormData({
        ...formData,
        address: {
          city: cityName,
          street: streetName,
          houseNumber: houseNum
        }
      });
    }
  };

  return (
    <div className="register-field" style={{ direction: 'ltr', textAlign: 'left' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
        Home Address
      </label>
     {/*  קומפוננטה מוכן לשדה כתובת */}
      <GeoapifyContext apiKey={apiKey}>
        <GeoapifyGeocoderAutocomplete
          placeholder="Type your address..."
          lang="en"                // הכיתוב והתוצאות יהיו באנגלית
          filterByCountryCode={['il']}  // עדיין מחפש בתוך ישראל
          placeSelect={handlePlaceSelect}
          // פונקציה אופציונלית לניקוי השדה
          onClear={() => setFormData({ ...formData, address: "" })}
        />
      </GeoapifyContext>
    </div>
  );
};