import React from 'react';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';

// ייבוא העיצוב של הספרייה
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
// ייבוא העיצוב החדש שלנו
import './AddressAutocomplete.css'; 

export const AddressAutocomplete = ({ formData, setFormData }) => {
  console.log("formData",formData);
  const apiKey = import.meta.env.VITE_APP_GEOAPIFY_API_KEY;
const initialValue = formData?.address?.city 
    ? `${formData.address.street} ${formData.address.houseNumber}, ${formData.address.city}` 
    : "";
  const handlePlaceSelect = (value) => {
    if (value && value.properties) {
      const props = value.properties;
      const cityName = props.city || props.town || props.village || props.municipality || props.county || "";
      const streetName = props.street || props.name || "";
      const houseNum = props.housenumber || "1";

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
    /* החלפנו את ה-Style ב-className */
    <div className="register-field address-container">
      <label className="address-label">
        Home Address
      </label>
      
      <GeoapifyContext apiKey={apiKey}>
        <GeoapifyGeocoderAutocomplete

          placeholder="Type your address..."
          lang="en"
          filterByCountryCode={['il']}
          placeSelect={handlePlaceSelect}
          value={initialValue}
          onClear={() => setFormData({ ...formData, address: "" })}
        />
      </GeoapifyContext>
    </div>
  );
};