
// //Tarjeta.jsx
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Box } from '@mui/material';
import { OrdenShopContext } from '../context/OrdenShop';
import { ThemeCustom } from "../context/ThemeCustom";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export default function Tarjeta({ product }) {
    const theme = ThemeCustom();
    const navigate = useNavigate();
    const { setMostrarProduct } = useContext(OrdenShopContext);

    const handleMas = async (id) => {
            try {
                console.log("handleMas - product ID", id);
        
                const docRef = doc(db, 'product', id); // Asegúrate de que el nombre de la colección sea 'product'
                const docSnap = await getDoc(docRef);
        
                if (docSnap.exists()) {
                    const productData = docSnap.data();
                    console.log("Document data:", productData);
        
                    setMostrarProduct(productData); // Actualiza el estado con los datos del producto
                    navigate(`/product/${id}`); // Navega a la página del producto con el ID
                } else {
                    console.log("No encontró data!");
                    setMostrarProduct(null); // Asegúrate de manejar el caso en que no se encuentre el producto
                }
            } catch (error) {
                console.error("Error fetching product:", error);
                setMostrarProduct(null); // Maneja el error y asegura que el estado se actualice
            }
        };
   

    return (
        <Card onClick={() => handleMas(product.id)}
            sx={{
                cursor: 'pointer',
                maxWidth: '345px',
                minWidth: '238px',
                position: 'relative',
                height: 'auto',
                justifyContent: 'space-between',
                '&:hover': {
                    boxShadow: theme.cardStyle.shadow
                }
            }}
        >
            {(product.stock < 1) ? (
                <Box sx={{ top: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '40px', boxShadow: 'inset 0px 0px 14px 4px grey' }}>
                    <p style={{ color: 'black' }}>SIN STOCK</p>
                </Box>
            ) : null}
            <CardMedia
                component="img"
                height="194"
                image={product.imagen}
                alt={product.nombre}
                sx={{
                    position: 'relative',
                    top: '0',
                    width: '100%',
                    height: '200px',
                    paddingTop: '1.5rem',
                    objectFit: 'contain'
                }}
            />
            <Box sx={{ position: 'relative', bottom: '0', width: '100%', maxHeight: '350px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '-webkit-fill-available', position: 'relative' }}>
                    <CardHeader
                        title={<p style={{ fontSize: '20px' }}>{product.nombre}</p>}
                        subheader={product.categoria}
                        aria-label="recipe"
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }}>
                                {product.id}
                            </Avatar>
                        }
                    />
                    <CardContent sx={{ paddingBlock: '0px' }}>
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '12px' }}>
                            {product.descripcion}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between', paddingInline: '1rem', height: '60px' }}>
                        <Typography sx={{ fontSize: '28px', position: 'absolute', bottom: '0px', marginBottom: '15px', width: '100%', textAlign: 'center' }}>
                            {product.precio}
                        </Typography>
                    </CardActions>
                </Box>
            </Box>
        </Card>
    );
}
