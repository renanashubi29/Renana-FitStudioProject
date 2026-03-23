import React, { useState, useEffect } from 'react';
import './FormModal.css';
import { AddressAutocomplete } from '../../user/AddressAutocomplete/AddressAutocomplete';

export const FormModal = ({ isOpen, onClose, onSubmit, initialData, title, fields,submitButtonText = "Save Changes" }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData || {});
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // פונקציית שינוי משופרת שתומכת ב-Custom onChange
  const internalHandleChange = (e, field) => {
    const { name, value } = e.target;
    
    if (field.onChange) {
      // אם הגדרנו לוגיקה מיוחדת בשדות (כמו עדכון קיבולת חדר)
      field.onChange(value, formData, setFormData);
    } else {
      // עדכון רגיל
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose} type="button">&times;</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            {fields.map((field) => {
              if (field.condition && !field.condition(formData)) return null;

              if (field.type === 'address-autocomplete') {
                return (
                  <div key="address-section" className="form-group">
                    <AddressAutocomplete 
                      formData={formData} 
                      setFormData={setFormData} 
                    />
                  </div>
                );
              }

              if (field.type === 'select') {
                return (
                  <div key={field.name} className="form-group">
                    <label>{field.label}</label>
                    <select 
                      name={field.name} 
                      value={formData[field.name] || ""} 
                      onChange={(e) => internalHandleChange(e, field)}
                      required={field.required}
                      disabled={field.readOnly} // ב-select משתמשים ב-disabled
                    >
                      {!initialData?._id && (
                        <option value="" disabled>Select {field.label}</option>
                      )}
                      {field.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                );
              }

              return (
                <div key={field.name} className="form-group">
                  <label>{field.label}</label>
                  <input 
                    name={field.name} 
                    type={field.type || 'text'} 
                    placeholder={field.placeholder}
                    value={formData[field.name] || ""} 
                    onChange={(e) => internalHandleChange(e, field)}
                    required={field.required}
                    readOnly={field.readOnly} // מונע הקלדה בשדה
                    className={field.readOnly ? 'input-readonly' : ''} // אופציונלי לעיצוב
                  />
                </div>
              );
            })}
          </div>
          
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn">{submitButtonText}</button>
          </div>
        </form>
      </div>
    </div>
  );
};