//@ts-nocheck
import ingredientsData from './ingredients.js';
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  Typography, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Tabs,
  Tab,
  Box,
  Paper,
  Fab,
  Snackbar,
  Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KitchenIcon from '@mui/icons-material/Kitchen';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import BuildIcon from '@mui/icons-material/Build';
import AddIcon from '@mui/icons-material/Add';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface Ingredient {
  ingredient: string;
  category: string;
  quantity?: string;
  unit?: string;
  image?: string;
  description?: string;
}

interface Utensil {
  name: string;
  type: string;
  image?: string;
  description?: string;
}

interface GroupedIngredients {
  [key: string]: Ingredient[];
}

interface GroupedUtensils {
  [key: string]: Utensil[];
}

// Mock data for utensils
const mockUtensilsData: Utensil[] = [
  { name: "Chef's Knife", type: "Cutting Tools", image: "https://via.placeholder.com/100", description: "A versatile knife for chopping, slicing, and dicing" },
  { name: "Wooden Spoon", type: "Cooking Tools", image: "https://via.placeholder.com/100", description: "Perfect for stirring and mixing" },
  { name: "Whisk", type: "Cooking Tools", image: "https://via.placeholder.com/100", description: "Ideal for beating eggs and mixing ingredients" },
  { name: "Measuring Cups", type: "Measuring Tools", image: "https://via.placeholder.com/100", description: "For accurate measurement of ingredients" },
  { name: "Cast Iron Pan", type: "Cookware", image: "https://via.placeholder.com/100", description: "Excellent heat retention for even cooking" },
  { name: "Mixing Bowl", type: "Preparation Tools", image: "https://via.placeholder.com/100", description: "For mixing ingredients" },
];

export default function Pantry() {
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState<Ingredient[]>(ingredientsData);
  const [utensils, setUtensils] = useState<Utensil[]>(mockUtensilsData);
  const [tabValue, setTabValue] = useState(0);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [selectedUtensil, setSelectedUtensil] = useState<Utensil | null>(null);
  const [newQuantity, setNewQuantity] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [cameraOpen, setCameraOpen] = useState<boolean>(false);
  const [showItemAdded, setShowItemAdded] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const groupedByCategory: GroupedIngredients = ingredients.reduce((acc: GroupedIngredients, item: Ingredient) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const groupedByType: GroupedUtensils = utensils.reduce((acc: GroupedUtensils, item: Utensil) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setSearchTerm('');
  };

  const handleIngredientClick = (ingredient: Ingredient): void => {
    setSelectedIngredient(ingredient);
    setSelectedUtensil(null);
    setNewQuantity(ingredient.quantity || '');
    setOpen(true);
  };

  const handleUtensilClick = (utensil: Utensil): void => {
    setSelectedUtensil(utensil);
    setSelectedIngredient(null);
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
    setSelectedIngredient(null);
    setSelectedUtensil(null);
    setNewQuantity('');
  };

  const handleSave = (): void => {
    if (selectedIngredient) {
      setIngredients(prevIngredients =>
        prevIngredients.map(item =>
          item.ingredient === selectedIngredient.ingredient
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
    handleClose();
  };

  const handleOpenCamera = () => {
    setCameraOpen(true);
    // In a real app, we would access the camera here
    setTimeout(() => {
      // Simulate photo being taken after 3 seconds
      handlePhotoTaken();
    }, 3000);
  };

  const handlePhotoTaken = () => {
    // Close the camera
    setCameraOpen(false);
    
    // Show success message
    setShowItemAdded(true);
    
    // In a real app, we would process the barcode here
    console.log("Photo taken and barcode processed");
    
    // Add a mock item to the pantry
    const newItem: Ingredient = {
      ingredient: "Scanned Item",
      category: "Other",
      quantity: "1",
      unit: "pkg",
      image: "https://via.placeholder.com/100",
      description: "Item added via barcode scan"
    };
    
    setIngredients(prev => [...prev, newItem]);
  };

  const handleCloseSnackbar = () => {
    setShowItemAdded(false);
  };

  const filteredIngredients = ingredients.filter(item =>
    item.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUtensils = utensils.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ bgcolor: '#F4F1E7', minHeight: '100vh', pb: 8, position: 'relative' }}>
      {/* App Bar with back button */}
      <AppBar position="static" sx={{ bgcolor: 'white', color: 'black', boxShadow: 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            My Pantry
          </Typography>
        </Toolbar>
        
        {/* Tabs for ingredients and utensils */}
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{ 
            bgcolor: 'white',
            '& .MuiTab-root': { 
              fontWeight: 'bold',
              color: 'rgba(0, 0, 0, 0.7)' 
            },
            '& .Mui-selected': {
              color: '#d6004c',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#d6004c',
            },
          }}
        >
          <Tab icon={<KitchenIcon />} label="Ingredients" />
          <Tab icon={<BuildIcon />} label="Utensils" />
        </Tabs>
      </AppBar>

      <Box sx={{ p: 2 }}>
        {/* Search bar */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder={tabValue === 0 ? "Search ingredients..." : "Search utensils..."}
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          sx={{ 
            mb: 3, 
            bgcolor: 'white', 
            borderRadius: '50px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
            }
          }}
        />

        {/* Ingredients Tab Content */}
        {tabValue === 0 && (
          <Box sx={{ width: '100%' }}>
            {Object.entries(groupedByCategory).map(([category, items]) => {
              const filteredItems = items.filter(item =>
                item.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
              );
              if (filteredItems.length === 0) return null;

              return (
                <Box key={category} sx={{ mb: 2 }}>
                  <Accordion 
                    sx={{ 
                      bgcolor: 'white', 
                      borderRadius: '10px', 
                      overflow: 'hidden',
                      '&:before': {
                        display: 'none',
                      },
                      boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ bgcolor: 'white', borderRadius: '10px' }}
                    >
                      <Typography sx={{ fontWeight: 'bold' }}>{category}</Typography>
                    </AccordionSummary>

                    {filteredItems.map((item) => (
                      <AccordionDetails
                        key={item.ingredient}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          bgcolor: '#F4F1E7',
                          p: '10px 16px',
                          borderTop: '1px solid rgba(0,0,0,0.05)',
                          '&:hover': {
                            bgcolor: '#ebe8df'
                          }
                        }}
                        onClick={() => handleIngredientClick(item)}
                      >
                        <Typography>{item.ingredient}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {item.quantity && (
                            <Typography variant="body2" sx={{ mr: 1, color: 'text.secondary' }}>
                              {item.quantity} {item.unit || ''}
                            </Typography>
                          )}
                          <NavigateNextIcon />
                        </Box>
                      </AccordionDetails>
                    ))}
                  </Accordion>
                </Box>
              );
            })}
          </Box>
        )}

        {/* Utensils Tab Content */}
        {tabValue === 1 && (
          <Box sx={{ width: '100%' }}>
            {Object.entries(groupedByType).map(([type, items]) => {
              const filteredItems = items.filter(item =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase())
              );
              if (filteredItems.length === 0) return null;

              return (
                <Box key={type} sx={{ mb: 2 }}>
                  <Accordion 
                    sx={{ 
                      bgcolor: 'white', 
                      borderRadius: '10px', 
                      overflow: 'hidden',
                      '&:before': {
                        display: 'none',
                      },
                      boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      sx={{ bgcolor: 'white', borderRadius: '10px' }}
                    >
                      <Typography sx={{ fontWeight: 'bold' }}>{type}</Typography>
                    </AccordionSummary>

                    {filteredItems.map((item) => (
                      <AccordionDetails
                        key={item.name}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          bgcolor: '#F4F1E7',
                          p: '10px 16px',
                          borderTop: '1px solid rgba(0,0,0,0.05)',
                          '&:hover': {
                            bgcolor: '#ebe8df'
                          }
                        }}
                        onClick={() => handleUtensilClick(item)}
                      >
                        <Typography>{item.name}</Typography>
                        <NavigateNextIcon />
                      </AccordionDetails>
                    ))}
                  </Accordion>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>

      {/* Barcode scanning button at bottom */}
      <Box 
        sx={{ 
          position: 'fixed', 
          bottom: 16, 
          left: 0, 
          right: 0, 
          display: 'flex', 
          justifyContent: 'center' 
        }}
      >
        <Button
          variant="contained"
          startIcon={<CameraAltIcon />}
          onClick={handleOpenCamera}
          sx={{
            bgcolor: '#d6004c',
            color: 'white',
            borderRadius: 50,
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(214, 0, 76, 0.3)',
            '&:hover': {
              bgcolor: '#b0003f',
              boxShadow: '0 6px 16px rgba(214, 0, 76, 0.4)',
            }
          }}
        >
          Scan Barcode
        </Button>
      </Box>

      {/* Detail Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: '#F4F1E7',
            position: 'absolute',
            bottom: 0,
            m: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: '65vh',
            width: '100%',
          },
        }}
      >
        <DialogTitle sx={{ textAlign: 'center' }}>
          {selectedIngredient && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {selectedIngredient.ingredient}
              </Typography>
              <img
                src={selectedIngredient.image || 'https://via.placeholder.com/100'}
                alt={selectedIngredient.ingredient}
                style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedIngredient.description}
              </Typography>
            </Box>
          )}

          {selectedUtensil && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                {selectedUtensil.name}
              </Typography>
              <img
                src={selectedUtensil.image || 'https://via.placeholder.com/100'}
                alt={selectedUtensil.name}
                style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedUtensil.description}
              </Typography>
            </Box>
          )}
        </DialogTitle>

        {selectedIngredient && (
          <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1 }}>
            <TextField
              autoFocus
              margin="dense"
              type="text"
              variant="outlined"
              value={newQuantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewQuantity(e.target.value)}
              inputProps={{ maxLength: 6 }}
              sx={{ 
                width: '80px', 
                mr: 1, 
                bgcolor: 'white', 
                borderRadius: '8px',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                }
              }}
            />
            <Typography variant="h6">
              {selectedIngredient.unit || ''}
            </Typography>
          </DialogContent>
        )}

        <DialogActions sx={{ justifyContent: 'center', mb: 2 }}>
          <Button 
            onClick={handleClose} 
            variant="outlined" 
            sx={{ 
              mr: 1,
              borderRadius: '8px',
              borderColor: 'rgba(0,0,0,0.3)',
              color: 'rgba(0,0,0,0.7)'
            }}
          >
            Cancel
          </Button>
          {selectedIngredient && (
            <Button 
              onClick={handleSave} 
              variant="contained" 
              sx={{ 
                bgcolor: '#d6004c', 
                color: 'white',
                borderRadius: '8px',
                '&:hover': {
                  bgcolor: '#b0003f',
                }
              }}
            >
              Save
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Camera View Dialog */}
      <Dialog
        open={cameraOpen}
        fullScreen
        PaperProps={{
          style: {
            backgroundColor: '#000',
          },
        }}
      >
        <Box 
          sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {/* Camera preview */}
          <Box 
            sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            {/* In a real app, this would be replaced with a video element */}
            <Box 
              sx={{ 
                width: '100%', 
                height: '100%', 
                bgcolor: '#111',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography color="white" variant="h6" sx={{ 
                mb: 12, 
                textTransform: 'uppercase',
                letterSpacing: 1,
                fontWeight: 'bold'
              }}>
                Barcode Scanner
              </Typography>
              
              {/* Simulated test barcode image */}
              <Box sx={{ position: 'relative', mb: 4 }}>
                <img 
                  src="https://bwipjs-api.metafloor.com/?bcid=code128&text=123456789&scale=3&includetext=false&backgroundcolor=111111"
                  alt="Barcode"
                  style={{ 
                    width: 220, 
                    height: 70, 
                    filter: 'contrast(1.2) brightness(0.9)' 
                  }}
                />
              </Box>
            </Box>
            
            {/* Barcode scanning frame/overlay */}
            <Box 
              sx={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)',
                width: 260,
                height: 110,
                border: '2px solid #d6004c',
                borderRadius: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                overflow: 'hidden'
              }}
            >
              {/* Red laser scanning line */}
              <Box 
                sx={{ 
                  height: '2px', 
                  width: '100%', 
                  bgcolor: '#d6004c',
                  position: 'absolute',
                  animation: 'scan 1.5s infinite',
                  boxShadow: '0 0 8px #d6004c',
                  '@keyframes scan': {
                    '0%': { top: '0%' },
                    '50%': { top: '100%' },
                    '100%': { top: '0%' }
                  }
                }}
              />
              
              {/* Corner brackets */}
              <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: 15, 
                height: 15, 
                borderTop: '3px solid #d6004c', 
                borderLeft: '3px solid #d6004c' 
              }} />
              <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                width: 15, 
                height: 15, 
                borderTop: '3px solid #d6004c', 
                borderRight: '3px solid #d6004c' 
              }} />
              <Box sx={{ 
                position: 'absolute', 
                bottom: 0, 
                left: 0, 
                width: 15, 
                height: 15, 
                borderBottom: '3px solid #d6004c', 
                borderLeft: '3px solid #d6004c' 
              }} />
              <Box sx={{ 
                position: 'absolute', 
                bottom: 0, 
                right: 0, 
                width: 15, 
                height: 15, 
                borderBottom: '3px solid #d6004c', 
                borderRight: '3px solid #d6004c' 
              }} />
            </Box>
          </Box>
          
          {/* Instruction text */}
          <Typography 
            color="white" 
            variant="body2" 
            sx={{ 
              textAlign: 'center', 
              py: 3,
              opacity: 0.8
            }}
          >
            Align barcode within the frame
          </Typography>
          
          {/* Canvas for capturing the image (hidden) */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </Box>
      </Dialog>
      
      {/* Success Snackbar */}
      <Snackbar
        open={showItemAdded}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity="success" 
          sx={{ 
            width: '100%',
            bgcolor: '#d6004c',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white'
            }
          }}
        >
          Item has been added to your pantry!
        </Alert>
      </Snackbar>
    </Box>
  );
} 