import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { useNavigate } from 'react-router';

export interface ProductProps {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
}

export const Product = (props: ProductProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/products/${props.id}`);
  }
  return (
    <Card 
      onClick={handleClick}
      sx={{ 
        maxWidth: 345, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '5px 5px 10px rgba(0,0,0,0.2)' 
      }}
    >
      <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <CardMedia
          component="img"
          height="300"
          image={props.images[0]}
          alt={props.title}
          sx={{ objectFit: 'contain' }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography gutterBottom variant="h5" component="div">
                {props.title}
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'text.secondary',
                flexGrow: 1,
                overflow: 'hidden',
              }}
            >
                {props.description}
            </Typography>
            <Typography variant="h6" sx={{ marginTop: 1 }}>
                ${props.price}
            </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}