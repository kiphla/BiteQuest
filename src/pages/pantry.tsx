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
  TextField 
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useState } from 'react';

interface Ingredient {
  ingredient: string;
  category: string;
  quantity?: string;
  unit?: string;
  image?: string;
  description?: string;
}

interface GroupedIngredients {
  [key: string]: Ingredient[];
}

export default function Pantry() {
    //@ts-ignore
  const [ingredients, setIngredients] = useState<Ingredient[]>(ingredientsData);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  const [newQuantity, setNewQuantity] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const groupedByCategory: GroupedIngredients = ingredients.reduce((acc: GroupedIngredients, item: Ingredient) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleAccordionClick = (ingredient: Ingredient): void => {
    setSelectedIngredient(ingredient);
    setNewQuantity(ingredient.quantity || '');
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
    setSelectedIngredient(null);
    setNewQuantity('');
  };

  const handleSave = (): void => {
    if (!selectedIngredient) return;
    
    setIngredients(prevIngredients =>
      prevIngredients.map(item =>
        item.ingredient === selectedIngredient.ingredient
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
    handleClose();
  };

  const filteredIngredients = ingredients.filter(item =>
    item.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#F4F1E7', minHeight: '100vh', padding: '10px', width: '390px' }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search ingredients..."
        value={searchTerm}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
        style={{ marginBottom: '20px', backgroundColor: 'white', borderRadius: '50px' }}
      />

      <div style={{ width: '100%' }}>
        {Object.entries(groupedByCategory).map(([category, items]) => {
          const filteredItems = items.filter(item =>
            item.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (filteredItems.length === 0) return null;

          return (
            <div key={category} style={{ marginBottom: '20px' }}>
              <Accordion style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', width: '100%' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  style={{ backgroundColor: '#FFFFFF', borderRadius: '10px' }}
                >
                  <Typography sx={{ fontWeight: 'bold' }}>{category}</Typography>
                </AccordionSummary>

                {filteredItems.map((item) => (
                  <AccordionDetails
                    key={item.ingredient}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      backgroundColor: '#F4F1E7',
                      padding: '10px 16px'
                    }}
                    onClick={() => handleAccordionClick(item)}
                  >
                    <Typography>{item.ingredient}</Typography>
                    <NavigateNextIcon />
                  </AccordionDetails>
                ))}
              </Accordion>
            </div>
          );
        })}
      </div>

      {/* Bottom Sheet Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: '#F4F1E7',
            position: 'absolute',
            bottom: 0,
            margin: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: '65vh',
            width: '100%',
          },
        }}
      >
        <DialogTitle style={{ textAlign: 'center' }}>
          {selectedIngredient && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>
                {selectedIngredient.ingredient}
              </Typography>
              <img
                src={selectedIngredient.image || 'https://via.placeholder.com/100'}
                alt={selectedIngredient.ingredient}
                style={{ width: '200px', height: '200px', objectFit: 'cover', borderRadius: '10px' }}
              />
              <Typography variant="body1" style={{ marginTop: '10px' }}>
                {selectedIngredient.description}
              </Typography>
            </div>
          )}
        </DialogTitle>

        <DialogContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '10px' }}>
          <TextField
            autoFocus
            margin="dense"
            type="text"
            variant="outlined"
            value={newQuantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewQuantity(e.target.value)}
            inputProps={{ maxLength: 6 }}
            style={{ width: '80px', marginRight: '10px', backgroundColor: 'white', borderRadius: '8px' }}
          />
          <Typography variant="h6">
            {selectedIngredient ? selectedIngredient.unit : ''}
          </Typography>
        </DialogContent>

        <DialogActions style={{ justifyContent: 'center', marginBottom: '10px' }}>
          <Button onClick={handleClose} variant="outlined" style={{ marginRight: '10px' }}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" style={{ backgroundColor: '#000', color: '#fff' }}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
} 