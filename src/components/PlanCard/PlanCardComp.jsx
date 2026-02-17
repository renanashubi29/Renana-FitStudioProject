import React from 'react';
import { Card, CardContent, Typography, Button, Box, Divider } from '@mui/material';
import './PlanCardComp.css';

export const PlanCardComp = (props) => {
    const {name,price,duration} = props;
   
  // נתונים קבועים לפי התמונה מה-DB שלך
  const planData = {
    features: [
      'Access 2 times a week',
      'Full gym equipment',
      'Personal locker',
      'No registration fee'
    ]
  };

  return (
    <Card className="plan-card-mui" elevation={0}>
      <CardContent>
        {/* שם המנוי */}
        <Typography variant="h5" className="plan-title-mui">
          {name}
        </Typography>

        {/* מחיר */}
        <Box className="price-container-mui">
          <Typography variant="h6" className="price-color" sx={{ mr: 0.5 }}>₪</Typography>
          <Typography variant="h3" className="price-color">
            {price}
          </Typography>
        </Box>

        {/* משך הזמן (שנה) */}
        <Typography variant="caption" sx={{ display: 'block', mb: 2, textTransform: 'uppercase', fontWeight: 'bold' }}>
          PER {duration}
        </Typography>

        <Divider sx={{ bgcolor: '#333', my: 2 }} />

        {/* רשימת תכונות */}
        <Box className="features-list-mui">
          {planData.features.map((item) => (
            <Typography key={item} variant="body2" className="feature-item-mui">
              • {item}
            </Typography>
          ))}
        </Box>

        <Button 
          variant="contained" 
          fullWidth 
          className="enroll-btn-mui"
          sx={{ mt: 3 }}
        >
          ENROLL NOW
        </Button>
      </CardContent>
    </Card>
  );
};