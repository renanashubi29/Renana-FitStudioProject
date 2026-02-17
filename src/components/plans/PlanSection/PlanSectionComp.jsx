import React, { useContext } from 'react';

import { PlanCardComp } from '../PlanCard/PlanCardComp.jsx';

import { Box } from '@mui/material';
import { ShopContext } from '../../../ShopContext';
import './PlanSectionComp.css';

export const PlanSectionComp = () => {
  const { plans } = useContext(ShopContext);

  return (
    <Box className="plans-container">
      {plans && plans.map((planItem) => (
        // עבור כל איבר במערך, אנחנו מפעילים את הקומפוננטה ומעבירים לה את האיבר
        <PlanCardComp
         name={planItem.name}
         price={planItem.price}
         duration={planItem.duration}
          />
      ))}
    </Box>
  );
};