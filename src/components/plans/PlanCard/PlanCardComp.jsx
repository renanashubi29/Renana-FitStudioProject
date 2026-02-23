import React from 'react';
import { Card, CardContent, Typography, Button, Box, Divider } from '@mui/material';
import './PlanCardComp.css';

export const PlanCardComp = (props) => {
    const { name, price, duration, onSelect } = props;

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
                <Typography variant="h5" className="plan-title-mui">
                    {name}
                </Typography>

                <Box className="price-container-mui">
                    {/* העברנו ל-className */}
                    <Typography variant="h6" className="price-color price-symbol">
                        ₪
                    </Typography>
                    <Typography variant="h3" className="price-color">
                        {price}
                    </Typography>
                </Box>

                {/* העברנו ל-className */}
                <Typography variant="caption" className="duration-text">
                    PER {duration}
                </Typography>

                {/* העברנו ל-className */}
                <Divider className="plan-divider" />

                <Box className="features-list-mui">
                    {planData.features.map((item) => (
                        <Typography key={item} variant="body2" className="feature-item-mui">
                            • {item}
                        </Typography>
                    ))}
                </Box>

                <Button
                    onClick={onSelect}
                    variant="contained"
                    fullWidth
                    className="enroll-btn-mui"
                >
                    ENROLL NOW
                </Button>
            </CardContent>
        </Card>
    );
};