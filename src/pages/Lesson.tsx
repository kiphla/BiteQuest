//@ts-nocheck
import React, { useState } from 'react';
import { styled } from '@mui/material/styles'
import {
    Box,
    Button,
    Typography,
    Container,
    IconButton,
    MobileStepper,
    useTheme,
    CardMedia,
    Card,
    CardActions,
    CardContent,
    Collapse,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';
import { ExpandCircleDown } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
  accordionSummaryClasses,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MoreVertIcon from '@mui/icons-material/MoreVert'; 
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

const steps = [
    {
        title: 'Introduction to Fattoush',
        content: 'Fattoush is a vibrant Lebanese salad made with fresh vegetables, crispy pita, and a zesty dressing. Let’s learn how to make it step by step!',
        image: '/fattoush.jpg',
    },
    {
        title: 'Step 1: Prepare the Vegetables',
        content: 'Chop tomatoes, cucumbers, radishes, lettuce, and green onions into bite-sized pieces. Freshness is key!',
        image: '/chopped.jpg',
        noteRating: '71% of users suggest: ',
        noteText: 'If you are rushed by time or unable to chop the ingredients with a knife, you could try using a food processor.',
        noteAuthor: '- CollegeBoy123'
    },
    {
        title: 'Step 2: Toast the Pita',
        content: 'Cut pita bread into small pieces and toast or fry until golden and crispy. This adds the signature crunch to Fattoush.',
        image: '/toastpita.jpg',
        noteRating: '94% of users suggest: ',
        noteText: 'Feel free to adjust how long the bread should be fried for! If you prefer something less crunchier, fry it for a shorter duration of time!',
        noteAuthor: '- HomeCookPro'
    },
    {
        title: 'Step 3: Make the Dressing',
        content: 'Whisk together olive oil, lemon juice, sumac, garlic, salt, and pepper. Sumac gives Fattoush its tangy flavor.',
        image: '/dressing.jpg',
        noteRating: '84% of users suggest: ',
        noteText: 'Use the best quality extra virgin olive oil you can find and avoid those simply labeled as "Pure", they lack character and flavor',
        noteAuthor: '- Paolo Ferraro'
    },
    {
        title: 'Step 4: Toss & Serve',
        content: 'Combine veggies, pita, and dressing. Toss well and serve immediately for the best crunch. Enjoy your homemade Fattoush!',
        image: '/tossandserve.jpg',
        noteRating: '90% of users suggest: ',
        noteText: 'If you think you make too much of a mess when tossing the ingredients, try using a lid! Make sure to give enough space for the food to toss around though',
        noteAuthor: '- NewComerCook'
    },
];

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&::before': {
      display: 'none',
    },
  }));

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.78)',
    flexDirection: 'row-reverse',
    [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
      {
        transform: 'rotate(90deg)',
      },
    [`& .${accordionSummaryClasses.content}`]: {
      marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('light', {
      backgroundColor: 'rgba(255, 255, 255, 0.78)',
    }),
  }));
  

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    width: 'auto',
  }));
  
export default function Lesson() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);

    {/* Community notes section*/}
    function CommunityNotes(){
        if (activeStep > 0){
            return(
                <Card sx={{width: 550, position: 'fixed', bottom: 100}}>
                    <Accordion expanded={activePanel === 'panel2'} onChange={handlePanel2Change}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                        <Typography component="span">Community Notes</Typography>
                    </AccordionSummary>
                    <CardContent>
                    <AccordionDetails>
                    {steps[activeStep].noteRating} <br></br>
                    {steps[activeStep].noteText} <br></br>
                    {steps[activeStep].noteAuthor}
                    </AccordionDetails>
                    </CardContent>
                    </Accordion>
                </Card>
            )
        }
    }

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
        } else {
            navigate('/complete', { state: { lesson: { name: 'Fattoush' } } });
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep((prev) => prev - 1);
        } else {
            navigate(-1);
        }
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'I just completed the Fattoush lesson on BiteQuest!',
                text: 'Check out my progress and try this delicious Lebanese salad!',
                url: window.location.href,
            });
        } else {
            alert('Sharing is not supported on this device.');
        }
    };
    const [activePanel, setActivePanel] = useState<'panel1' | 'panel2'>('panel1');

    const handlePanel2Change = (event, isExpanded) => {
        if (isExpanded) {
            setActivePanel('panel2');
        } else {
            setActivePanel('panel1');  // fallback to panel1 if collapsing panel2
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                bgcolor: theme.palette.background.default,
                pb: 14,
            }}
        >
            <Container maxWidth="sm" sx={{ pt: 4, pb: 2 }}>
                {/* header with back button */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <IconButton onClick={handleBack}>
                        <ArrowBackIosNewIcon />
                    </IconButton>
                    <Typography
                        variant="subtitle2"
                        sx={{
                            flex: 1,
                            textAlign: 'center',
                            fontWeight: 'medium',
                            color: theme.palette.text.secondary,
                        }}
                    >
                        Step {activeStep + 1} of {steps.length}
                    </Typography>
                    <Box sx={{ width: 40 }} />
                </Box>
                <Card sx={{marginBottom: 2}}>
                    <CardContent>
                        {/* image for the step */}
                        <CardMedia
                            component="img"
                            image={steps[activeStep].image}
                            alt={steps[activeStep].title}
                            sx={{
                                width: '100%',
                                height: 200,
                                objectFit: 'cover',
                                borderRadius: 3,
                                mb: 3,
                            }}
                        />
                        <Accordion expanded={activePanel === 'panel1'} onChange={() => {}}>
                        <AccordionDetails>
                        {/* title + content */}
                        <Typography
                            variant="h5"
                            gutterBottom
                            sx={{
                                fontFamily: '"Playfair Display", serif',
                                fontWeight: 'bold',
                                color: theme.palette.primary.main,
                                textAlign: 'center',
                            }}
                        >
                            {steps[activeStep].title}
                        </Typography>
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ textAlign: 'center', mb: 3 }}
                        >
                            {steps[activeStep].content}
                        </Typography>
                        </AccordionDetails>
                        </Accordion>
                    </CardContent>
                    <CommunityNotes />
                </Card>
            </Container>

            {/* sticky footer */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    bgcolor: theme.palette.background.default,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    px: 2,
                    py: 1.5,
                }}
            >
                <MobileStepper
                    variant="dots"
                    steps={steps.length}
                    position="static"
                    activeStep={activeStep}
                    nextButton={<div />}
                    backButton={<div />}
                    sx={{
                        justifyContent: 'center',
                        display: 'flex',
                        bgcolor: 'transparent',
                        mb: 1,
                    }}
                />
                <Button
                    variant="contained"
                    size="large"
                    onClick={handleNext}
                    fullWidth
                    sx={{ py: 1.5, borderRadius: 3 }}
                >
                    {activeStep === steps.length - 1 ? 'Finish Lesson' : 'Continue'}
                </Button>
            </Box>
        </Box>
    );
}

