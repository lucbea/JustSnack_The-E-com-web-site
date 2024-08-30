
//Product.jsx
import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { OrdenShopContext } from '../context/OrdenShop';
import { Box, IconButton } from '@mui/material';
import { BsCartPlus } from 'react-icons/bs';

export const Product = ({ products }) => {

    const { hayItemsCarro, setHayItemsCarro, itemsCarro, setItemsCarro, agregarCarro, setAgregarCarro, setQuitarCarro, setModifItemCarro, ordenCarro, setOrdenCarro, cantItems, setCantItems, setMostrarProduct } = useContext(OrdenShopContext)
    // console.log("estoy en product", products)
    const { id } = useParams(); // Obtén el id del parámetro de la URL
    const product = products.find(p => p.id === parseInt(id)); // Encuentra el producto con el id

    const handleCarShop = (product) => {
        // console.log("entré a handleCardShop", product.id)
        product.cantidadPedida = 1;
        product.totalItem = product.price;
        setAgregarCarro(product);
        setQuitarCarro();
        setModifItemCarro();
        setHayItemsCarro(true)
        // console.log("Estoy en TarjetaLiked - handleCarShop agregarCarro:", agregarCarro, ordenCarro)
        // setLiked(!liked);
    }

    if (!product) {
        return <h1>Producto no encontrado</h1>; // Mensaje si el producto no se encuentra
    } else {
        // console.log("encontré:", product)
    }

    return (
        <Box sx={{ marginInline: {xs:'5px', sm:'30px'} }}>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '40% 60%' },
                boxSizing: 'border-box'
            }}>
                <Box sx={{
                    height: 'auto',
                    width: 'auto',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'center',
                    boxSizing: 'border-box'
                }}>
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        style={{
                            width: '100%',
                            maxWidth: '320px',
                            objectFit: 'contain'
                        }}
                    />
                </Box>
                <Box sx={{paddingLeft: {xs:'0px', sm:'20px'}}}>
                    <h2 style={{ fontSize: '20px', marginBottom: '0px' }}>{product.title}</h2>
                    <p style={{ fontSize: '12px', marginTop: '0px', marginBottom: '25px' }}>Código del producto: {product.id}</p>
                    <p style={{ marginBottom: '8px' }}>Descripción: {product.description}</p>
                    <Box
                        sx={{
                            width:'100%',
                            display: { xs: 'flex', sm: 'flex', md: 'flex' },
                            justifyContent: 'space-between',
                            alignItems:'center',
                            marginInline: '0px',  // Ajusta el margen según sea necesario
                            marginBottom: '10px',
                            flexDirection:'column',
                        }}
                    >
                        <p style={{ fontSize: '12px', marginBlock: '8px' }}>Descripción: {product.description}</p>
                        <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
                        <p style={{ fontSize: '20px', fontWeight: 700, marginBlock: '8px', paddingLeft:'20px'}}>Precio: ${product.price}</p>
                        <IconButton
                            sx={{
                                width: '56px',
                                height: '56px',
                                fontSize: '30px',
                                '&:focus': {
                                    outline: '0px solid #00000000'
                                },
                                '&:focus-visible': {
                                    outline: '0px solid #00000000'
                                },
                            }}
                            aria-label="add to favorites"
                            onClick={() => handleCarShop(product)} // CUIDADO colocar función anónima para evitar bucle infinito
                        >
                            <BsCartPlus
                                sx={{
                                    outline: 'none',
                                }}
                            />
                        </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none' }, flexDirection: 'column' }}>
                <p style={{ fontSize: '12px', marginBlock: '8px' }}>Descripción: {product.description}</p>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginInline: '0px',  // Ajusta el margen según sea necesario
                        marginBottom: '10px'
                    }}
                >
                    <p style={{ fontSize: '20px', fontWeight: 700, marginBlock: '8px' }}>Precio: ${product.price}</p>
                    <IconButton
                        sx={{
                            width: '56px',
                            height: '56px',
                            fontSize: '30px',
                            '&:focus': {
                                outline: '0px solid #00000000'
                            },
                            '&:focus-visible': {
                                outline: '0px solid #00000000'
                            },
                        }}
                        aria-label="add to favorites"
                        onClick={() => handleCarShop(product)} // CUIDADO colocar función anónima para evitar bucle infinito
                    >
                        <BsCartPlus
                            sx={{
                                outline: 'none',
                            }}
                        />
                    </IconButton>
                </Box>
            </Box>
        </Box>

    );
}
