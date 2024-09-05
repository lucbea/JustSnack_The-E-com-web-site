
//Tarjeta.jsx
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


export default function Tarjeta({ product }) {
    const theme = ThemeCustom();
    const navigate = useNavigate();
    const { setMostrarProduct } = useContext(OrdenShopContext)


    const handleMas = (product) => {
        setMostrarProduct(product);
        navigate(`/product/${product.id}`);
    }

    return (
        <Card onClick={() => handleMas(product)}
            sx={{
                cursor: 'pointer',
                maxWidth: '345px',
                minWidth: '238px',
                position: 'relative',
                height: 'auto',
                justifycontent: 'space-between',
                '&:hover': {
                    boxShadow: theme.cardStyle.shadow
                }
            }}
        >
           {(product.stock === 5 )? <Box sx={{ top:'300px', display:'flex', justifyContent:'center', alignItems:'center', width:'100%',height:'40px', boxShadow: 'inset 0px 0px 14px 4px grey'}}><p style={{color:'black'}}>SIN  STOCK</p></Box> : null}
            <CardMedia
                component="img"
                height="194"
                image={product.images[0]}
                alt="Paella dish"
                sx={{
                    position: 'relative',
                    top: '0',
                    width: '100%',
                    height: '200px',
                    paddingTop: '1.5rem',
                    objectFit: 'contain'
                }}
            />

            <Box
                sx={{
                    position: 'relative',
                    bottom: '0',
                    width: '100%',
                    maxHeight: '350px',
                }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: '-webkit-fill-available', 
                        position:'relative',
                    }}>
                        
                    <CardHeader
                        title={<p
                            style={{
                                fontSize: '20px'
                            }}
                        >{product.title}</p>}
                        subheader={product.category}
                        aria-label="recipe"
                        avatar={
                            <Avatar
                                sx={{
                                    bgcolor: red[500]
                                }} >
                                {product.id}
                            </Avatar>
                        }
                       
                    />
                    <CardContent
                        sx={{
                            paddingBlock: '0px'
                        }}>
                        <Typography variant="body1" color="text.secondary"
                            sx={{
                                fontSize: '12px'
                            }}>
                            {product.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            paddingInline: '1rem',
                            height: '60px'
                        }}>
                        <Typography
                            sx={{
                                fontSize: '28px',
                                position: 'absolute',
                                bottom: '0px',
                                marginBottom: '15px',
                                width: '100%',
                                textAlign: 'center'
                            }}>{product.price}
                        </Typography>
                    </CardActions>
                </Box>
            </Box>
        </Card>
    );
}
