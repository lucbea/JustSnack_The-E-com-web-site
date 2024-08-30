
//TarjetaLiked.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { IoIosArrowDown } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import { Box, Button } from '@mui/material';
import { OrdenShopContext } from '../context/OrdenShop';
import { ThemeCustom } from "../context/ThemeCustom";


export default function TarjetaLiked({ product }) {
    const theme = ThemeCustom();
    const navigate = useNavigate();
    // const [liked, setLiked] = useState(false);
    const { hayItemsCarro, setHayItemsCarro, itemsCarro, setItemsCarro, agregarCarro, setAgregarCarro, setQuitarCarro, setModifItemCarro, ordenCarro, setOrdenCarro, cantItems, setCantItems, setMostrarProduct } = useContext(OrdenShopContext)

    

    const handleMas = (product) => {
        console.log("debo mostrar más", product)
        setMostrarProduct(product)
            // navigate(`/product:${product.id}`);
            navigate(`/product/${product.id}`);
        
    }

    return (
       
        <Card onClick={()=> handleMas(product)} sx={{ cursor:'pointer', maxWidth: '345px', minWidth: '238px', position: 'relative', height: 'auto', justifycontent: 'space-between', '&:hover': { boxShadow: theme.cardStyle.shadow } }}
        >
            <CardMedia
                component="img"
                height="194"
                image={product.images[0]}
                alt="Paella dish"
                sx={{ position: 'relative', top: '0', width: '100%', height: '200px', paddingTop: '1.5rem', objectFit: 'contain' }}
            />
            <Box sx={{ position: 'relative', bottom: '0', width: '100%', maxHeight: '350px', }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '-webkit-fill-available' }}>
                    <CardHeader
                        title={<p style={{ fontSize: '20px' }}>{product.title}</p>}
                        subheader={product.category}
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {product.id}
                            </Avatar>
                        }
                    />
                    <CardContent sx={{ paddingBlock: '0px' }}>
                        <Typography variant="body1" color="text.secondary" sx={{ fontSize: '12px' }}>
                            {product.description}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between', paddingInline: '1rem', height:'60px' }}>
                    <Typography sx={{ fontSize: '28px', position:'absolute', bottom:'0px', marginBottom:'15px', width:'100%', textAlign:'center'}}>{product.price}</Typography>
                        {/* <IconButton
                            sx={{
                                '&:focus': {
                                    outline: '0px solid #00000000'
                                },
                                '&:focus-visible': {
                                    outline: '0px solid #00000000'
                                },
                                // color: liked ? 'red' : '#b1adad',
                                // stroke: liked ? '#af9f6d' : 'blue', // Borde azul cuando liked es falso
                                //     strokeWidth: liked ? '23px' : '1px', // Grosor del borde ajustado a 1px cuando liked es falso
                                //     fill: liked ? '#af9f6d' : 'pink' 

                            }}
                            aria-label="add to favorites"
                            onClick={() => handleCarShop(product)}//CUIDADO colocar función anónima para evitar bucle infinito
                        >
                            <BsCartPlus
                                // <FaHeart
                                sx={{
                                    outline: 'none',
                                }}
                            />
                           
                        </IconButton> */}
                        {/* <Box>
                            <Button onClick={() =>handleMas(product)} sx={{color:theme.palette.primary.dorado, cursor:'pointer', zIndex:'10' }}>VER  MÁS</Button>
                        </Box> */}
                    </CardActions>
                    
                </Box>
            </Box>
            
         

        </Card>
    );
}
