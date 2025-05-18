import {
    Box,
    Button,
    Typography,
    Container,
    Card,
    CardActionArea,
    CardContent,
    IconButton,
    MobileStepper,
    useTheme,
    Stack,
    Chip
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { useOnboarding } from '../contexts/OnboardingContext';

const dietaryRequirementsList = [
    { name: 'Vegetarian', description: 'No meat, poultry, or seafood', icon: '🥕' },
    { name: 'Vegan', description: 'No animal products or byproducts', icon: '🌱' },
    { name: 'Gluten-Free', description: 'No wheat, barley, or rye', icon: '🌾' },
    { name: 'Dairy-Free', description: 'No milk, cheese, or dairy products', icon: '🥛' },
    { name: 'Nut-Free', description: 'No peanuts, tree nuts, or derivatives', icon: '🥜' },
    { name: 'Keto', description: 'Low carb, high fat diet', icon: '🥩' },
    { name: 'Halal', description: 'Permissible according to Islamic law', icon: '☪️' },
    { name: 'Kosher', description: 'Meets Jewish dietary laws', icon: '✡️' },
    { name: 'No Restrictions', description: 'Open to all food options', icon: '🍽️' }
];

export default function OnboardingStep3() {
    const theme = useTheme();
    const navigate = useNavigate();
    const { dietaryRequirements, setDietaryRequirements } = useOnboarding();

    const handleSelect = (requirement: string) => {
        // If "No Restrictions" is selected, clear all other selections
        if (requirement === 'No Restrictions') {
            setDietaryRequirements(['No Restrictions']);
            return;
        }
        
        // If another option is selected while "No Restrictions" was active, remove "No Restrictions"
        let newRequirements = [...dietaryRequirements];
        if (dietaryRequirements.includes('No Restrictions')) {
            newRequirements = newRequirements.filter(r => r !== 'No Restrictions');
        }
        
        // Toggle the selected requirement
        if (newRequirements.includes(requirement)) {
            newRequirements = newRequirements.filter(r => r !== requirement);
        } else {
            newRequirements = [...newRequirements, requirement];
        }
        
        setDietaryRequirements(newRequirements);
    };

    const handleNext = () => {
        navigate('/onboarding/4');
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: theme.palette.background.default, pb: 14 }}>
            <Container maxWidth="sm" sx={{ pt: 4, pb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton onClick={() => navigate(-1)}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography variant="subtitle2" sx={{ flex: 1, textAlign: 'center', fontWeight: 'medium', color: theme.palette.text.secondary }}>
                        Step 3 of 4
                    </Typography>
                    <Box sx={{ width: 40 }} />
                </Box>

                <Typography variant="h5" gutterBottom sx={{ fontFamily: '"Playfair Display", serif', fontWeight: 'bold', color: theme.palette.primary.main, textAlign: 'center' }}>
                    Any dietary requirements?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
                    Select any dietary restrictions or preferences you have
                </Typography>

                <Stack spacing={2}>
                    {dietaryRequirementsList.map(({ name, description, icon }) => {
                        const isActive = dietaryRequirements.includes(name);
                        return (
                            <Card key={name} elevation={isActive ? 8 : 2} sx={{ borderRadius: 3, border: isActive ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent' }}>
                                <CardActionArea onClick={() => handleSelect(name)}>
                                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, bgcolor: isActive ? theme.palette.primary.light + '20' : 'transparent' }}>
                                        <Typography variant="h4">{icon}</Typography>
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: isActive ? 'bold' : 'normal', color: isActive ? theme.palette.primary.main : theme.palette.text.primary }}>
                                                {name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {description}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        );
                    })}
                </Stack>
            </Container>

            <Box sx={{ position: 'fixed', bottom: 0, left: 0, width: '100%', bgcolor: theme.palette.background.default, borderTop: `1px solid ${theme.palette.divider}`, px: 2, py: 1.5 }}>
                <MobileStepper variant="dots" steps={4} position="static" activeStep={2} nextButton={<div />} backButton={<div />} sx={{ justifyContent: 'center', display: 'flex', bgcolor: 'transparent', mb: 1 }} />
                <Button variant="contained" size="large" disabled={dietaryRequirements.length === 0} onClick={handleNext} fullWidth sx={{ py: 1.5, borderRadius: 3 }}>
                    Next
                </Button>
            </Box>
        </Box>
    );
}
