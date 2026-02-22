import React, { useContext } from 'react';

import { PlanCardComp } from '../PlanCard/PlanCardComp.jsx';

import { Box } from '@mui/material';
import { ShopContext } from '../../../ShopContext';
import './PlanSectionComp.css';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { registerUser } from '../../../api/userApi.js';

export const PlanSectionComp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tempTraineeData = location.state?.tempTraineeData;
  const { plans,setUser } = useContext(ShopContext);
const handlePlanSelection = async (planId) => {
    if (!tempTraineeData) {
      alert("Missing registration data");
      return;
    }

    try {
      // איחוד הנתונים עם ה-plan הנבחר
      const finalData = { ...tempTraineeData, plan: planId };

      // שליחה ל-API
      const response = await registerUser(finalData);
      if (response.data && response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
      if (response.data) {
        setUser(response.data.user);
      }

      navigate('/');
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };
  return (
    <Box className="plans-container">
      {plans && plans.map((planItem) => (
        // עבור כל איבר במערך, אנחנו מפעילים את הקומפוננטה ומעבירים לה את האיבר
        <PlanCardComp
         name={planItem.name}
         price={planItem.price}
         duration={planItem.duration}
         onSelect={() => handlePlanSelection(planItem._id)}
          />
      ))}
    </Box>
  );
};