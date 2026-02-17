import React, { useContext } from 'react';

import { PlanCardComp } from './/PlanCard/PlanCardComp';
import { Box } from '@mui/material';
import { ShopContext } from '../ShopContext';

export const PlansList = () => {
  const { plans } = useContext(ShopContext);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center', p: 4 }}>
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