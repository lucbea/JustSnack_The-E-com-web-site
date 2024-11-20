import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Box, styled } from '@mui/material';
import { OrdenShopContext } from '../context/OrdenShop';
import { ThemeCustom } from "../context/ThemeCustom";

export default function Tarjeta({ product }) {
    const theme = ThemeCustom();
    const navigate = useNavigate();
    const { setMostrarProduct } = useContext(OrdenShopContext);

    const TriangleAvatar = styled(Box)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'end',
        width: '68px',
        height: '68px',
        position: 'absolute',
        top: '0px',
        right: '0px',
        backgroundColor: theme.palette.primary.verde,
        color: 'white',
        clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
        fontSize: '14px',
        paddingTop: '10px',
        boxShadow: theme.palette.primary.sombraBox,
    }));

    const handleMas = async (id) => {
        try {
            const docRef = doc(db, 'product', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const productData = docSnap.data();
                setMostrarProduct(productData);
                navigate(`/product/${id}`);
            } else {
                setMostrarProduct(null);
            }
        } catch (error) {
            console.error("Error fetching product:", error);
            setMostrarProduct(null);
        }
    };


    return (
        <Card onClick={() => handleMas(product.id)}
            sx={{
                cursor: 'pointer',
                maxWidth: '345px',
                minWidth: '228px',
                position: 'relative',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '-1px -1.3px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
                '&:hover': {
                    boxShadow: theme.cardStyle.shadow
                }
            }}
        >
            <Box>
                {product.descuento > 0 && (
                    <TriangleAvatar>
                        <p style={{
                            paddingInline: '0px',
                            position: 'absolute',
                            top: '-12px',
                            right: '10px',
                        }}>Dto</p>
                        <p style={{
                            paddingInline: '0px',
                            position: 'absolute',
                            top: '4px',
                            right: '10px',
                        }}>{product.descuento}%</p>
                    </TriangleAvatar>
                )}
                {(product.stock < 1) ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '40px',
                            top: '300px',
                            boxShadow: 'inset 0px 0px 14px 4px grey'
                        }}>
                        <p style={{
                            color: 'black'
                        }}>SIN STOCK</p>
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
                <Box
                    sx={{
                        position: 'relative',
                        bottom: '0',
                        width: '100%',
                        maxHeight: '350px'
                    }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: '-webkit-fill-available',
                            position: 'relative'
                        }}>
                        <CardHeader
                            sx={{
                                padding: '0px',
                                paddingBottom: '16px',
                                justifyContent: 'center'
                            }}
                            title={<p
                                style={{
                                    fontSize: '28px',
                                    marginBlock: '8px'
                                }}>{product.nombre}</p>}
                            subheader={`Fruto ${product.categoria}`}
                            aria-label="recipe"
                        />
                        <CardContent
                            sx={{
                                paddingBlock: '0px'
                            }}>
                            <Typography variant="body1" color="text.secondary"
                                sx={{
                                    fontSize: '12px'
                                }}>
                                {product.descripcion}
                            </Typography>
                        </CardContent>
                    </Box>
                </Box>
            </Box>
            <CardActions disableSpacing
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '0px',
                    height: '60px'
                }}>
                <Typography
                    sx={{
                        fontSize: '28px',
                        bottom: '0px',
                        paddingBottom: '35px',
                        width: '100%',
                        textAlign: 'center'
                    }}>
                    <span
                        style={{
                            fontSize: '20px'
                        }}>Precio final:</span> $ {product.precio}
                </Typography>
            </CardActions>
        </Card>
    );
}
