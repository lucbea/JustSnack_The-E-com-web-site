
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const Tarjeta = ({ product }) => {
  return (
    <>
        <Card  key= { product.id } sx={{ maxWidth: 245, minWidth:230 }}>
          <CardMedia
            component="img"
            alt= { product.name }
            height="190"
            image= { product.image }
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              { product.name }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Estado: { product.status }
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Especie: { product.species }
            </Typography>
          </CardContent>
        </Card>
    </>
  );
}