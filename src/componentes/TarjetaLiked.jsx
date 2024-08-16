import React, { useState, useContext, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { IoIosArrowDown } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import { Box } from '@mui/material';
import { OrdenShopContext } from '../context/OrdenShop';
import { ThemeCustom } from "../context/ThemeCustom";


export default function TarjetaLiked({ product }) {
  const theme = ThemeCustom();
    // const [liked, setLiked] = useState(false);
    const {itemsCarro, setItemsCarro, agregarCarro, setAgregarCarro, ordenCarro, setOrdenCarro, cantItems, setCantItems } = useContext(OrdenShopContext)

    const handleCarShop = (product) => {
        console.log("entré a handleCardShop", product.id)
        product.cantidadPedida = 1;
        product.totalItem = product.price;
        setAgregarCarro(product);
        console.log("Estoy en TarjetaLiked - handleCarShop agregarCarro:", agregarCarro, ordenCarro)
        // setLiked(!liked);
    }

    return (
        <Card sx={{ maxWidth: '345px', minWidth:'238px', position:'relative', height:'auto', '&:hover': { boxShadow: theme.cardStyle.shadow } }}
        >
            <CardMedia
                component="img"
                height="194"
                image={product.images[0]}
                alt="Paella dish"
                sx = {{position: 'relative', top:'0', width:'100%', height:'200px', paddingTop:'1.5rem', objectFit:'contain'}}
            />
            <Box sx={{position: 'relative', bottom:'0', width:'100%', height:'300px', }}>
                <Box sx={{ display: 'flex', flexDirection:'column',  justifyContent: 'space-between', height: '-webkit-fill-available'}}>
            <CardHeader
                title={<p style={{ fontSize: '20px' }}>{product.title}</p>}
                subheader={product.category}
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {product.id}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        {/* <MoreVertIcon /> */}
                    </IconButton>
                }
            />
            <CardContent sx={{paddingBlock:'0px'}}>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '12px' }}>
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between', paddingInline: '1rem' }}>
                <IconButton
                    // const e={personaje.id}
                    // value = e.target.value
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
                            // stroke: liked ? '#af9f6d' : 'blue', // Borde azul cuando liked es falso
                            // strokeWidth: liked ? '23px' : '1px', // Grosor del borde ajustado a 1px cuando liked es falso
                            // fill: liked ? '#af9f6d' : 'pink' // Relleno rosa cuando liked es falso
                        }}
                    />
                </IconButton>


            
                <Typography sx={{ fontSize: '28px' }}>{product.price}</Typography>
            </CardActions>
            </Box>
            </Box>

        </Card>
    );
}
