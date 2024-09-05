
//Product.jsx
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { OrdenShopContext } from '../context/OrdenShop';
import { Box, IconButton } from '@mui/material';
import { BsCartPlus } from 'react-icons/bs';
import { ThemeCustom } from '../context/ThemeCustom';

export const Product = ({ products }) => {
    const theme = ThemeCustom();
    const { hayItemsCarro, setHayItemsCarro, itemsCarro, setItemsCarro, agregarCarro, setAgregarCarro, setQuitarCarro, setModifItemCarro, setVaciarCarro, ordenCarro, setOrdenCarro, cantItems, setCantItems, setMostrarProduct, handleIncrement, cantMaxStock, setCantMaxStock } = useContext(OrdenShopContext)

    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return (<Box sx={{ minWidth: '249px', marginTop: '180px' }}>
            <h2 style={{}}>Producto no encontrado</h2>
        </Box>)
    }

    const handleAgregarCarro = (product) => {
        const agregado = ordenCarro.filter((o) => product.id === o.id)
        if (agregado.length > 0) {
            handleIncrement(product)
        } else {
            product.cantidadPedida = 1;
            product.totalItem = product.price;
            setQuitarCarro();
            setModifItemCarro();
            setVaciarCarro(false);
            setHayItemsCarro(true);
            setAgregarCarro(product);
        }
    }

    return (
        <Box sx={{ marginInline: { xs: '5px', sm: '30px' } }}>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: '40% 60%' },
                boxSizing: 'border-box',
            }}>
                <Box sx={{
                    height: 'auto',
                    width: 'auto',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxSizing: 'border-box',
                    position: 'relative',
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
                    {(product.stock === 5) ? <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '30px',
                        boxShadow: 'inset 0px 0px 14px 4px grey',
                        backgroundColor: '#ffffffc4',
                        borderRadius: '4px'
                    }}><p style={{ color: 'black' }}>SIN  STOCK</p></Box> : null}
                </Box>
                <Box sx={{ paddingLeft: { xs: '0px', sm: '20px' } }}>
                    <h2 style={{ fontSize: '20px', marginBottom: '0px' }}>{product.title}</h2>
                    <p style={{ fontSize: '12px', marginTop: '0px', marginBottom: '25px' }}>Código del producto: {product.id}</p>
                    <p style={{ marginBottom: '8px' }}>Descripción: {product.description}</p>
                    <Box
                        sx={{
                            width: '100%',
                            display: { xs: 'flex', sm: 'flex', md: 'flex' },
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginInline: '0px',
                            marginBottom: '10px',
                            flexDirection: 'column',
                        }}
                    >
                        <p style={{ fontSize: '12px', marginBlock: '8px' }}>Descripción: {product.description}</p>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', position:'relative' }}>
                            <p style={{ fontSize: '20px', fontWeight: 700, marginBlock: '8px', paddingLeft: '20px' }}>Precio: ${product.price}</p>
                            {cantMaxStock &&
                            <Box sx={{ position: 'absolute', top: '-8px', color: 'red', height: '30px',}}>
                                <p style={{ color: theme.palette.primary.rojo, fontSize:'8px', fontWeight:800 }}>No hay más productos para la venta</p>
                            </Box>
                             }
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
                                onClick={() => handleAgregarCarro(product)} // CUIDADO colocar función anónima para evitar bucle infinito
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

            {/* <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none' }, flexDirection: 'column' }}>
                <p style={{ fontSize: '12px', marginBlock: '8px' }}>Descripción: {product.description}</p>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginInline: '0px',
                        marginBottom: '10px',
                        position: 'relative',
                        border: '2px solid red',
                    }}
                >
                    <p style={{ borde: '2px solid red', fontSize: '20px', fontWeight: 700, marginBlock: '8px' }}>Precio: ${product.price}</p>

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
                        onClick={() => handleAgregarCarro(product)} // CUIDADO colocar función anónima para evitar bucle infinito
                    >

                        <BsCartPlus
                            sx={{
                                outline: 'none',
                            }}
                        />
                    </IconButton>
                </Box>
            </Box> */}
        </Box>

    );
}
