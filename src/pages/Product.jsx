
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { OrdenShopContext } from '../context/OrdenShop';
import { Box, IconButton } from '@mui/material';
import { BsCartPlus } from 'react-icons/bs';
import { ThemeCustom } from '../context/ThemeCustom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
export const Product = () => {
    console.log("PRODUCT");
    const theme = ThemeCustom();
    const { id } = useParams(); // Obtén el ID del producto de la URL
    const { hayItemsCarro, setHayItemsCarro, itemsCarro, setItemsCarro, agregarCarro, setAgregarCarro, setQuitarCarro, setModifItemCarro, setVaciarCarro, ordenCarro, setOrdenCarro, cantItems, setCantItems, mostrarProduct, setMostrarProduct, handleIncrement, cantMaxStock, setCantMaxStock } = useContext(OrdenShopContext)
    const [product, setProduct] = useState(null); // Inicializa el estado como null
    console.log("Product - id param", id)
    useEffect(() => {
        if (mostrarProduct && mostrarProduct.id === id) {
            console.log("mostrarProduct", mostrarProduct)
            setProduct(mostrarProduct);
        } else {
            const fetchProduct = async () => {
                try {
                    const docRef = doc(db, 'product', id); // Asegúrate de que el nombre de la colección sea 'product'
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        console.log("Document data:", docSnap.data());
                        setProduct(docSnap.data()); // Actualiza el estado con los datos del producto
                        setMostrarProduct(docSnap.data()); // Actualiza el contexto para que esté sincronizado
                    } else {
                        console.log("No encontró data!");
                        setProduct(null); // Asegúrate de manejar el caso en que no se encuentre el producto
                    }
                } catch (error) {
                    console.error("Error fetching document:", error);
                    setProduct(null); // Maneja el error y asegura que el estado se actualice
                }
            };

            fetchProduct();
        }
    }, [id, mostrarProduct, setMostrarProduct]); // Asegúrate de que los efectos se ejecuten correctamente

    if (!product) {
        return (
            <Box sx={{ minWidth: '249px', marginTop: '180px' }}>
                <h2>Producto no encontrado</h2>
            </Box>
        );
    }

    const handleAgregarCarro = (product) => {
        const agregado = ordenCarro.filter((o) => product.id === o.id)
        if (agregado.length > 0) {
            handleIncrement(product)
        } else {
            if (product.stock > 0) {
                product.cantidadPedida = 1;
                product.totalItem = product.precio;
                setQuitarCarro();
                setModifItemCarro();
                setVaciarCarro(false);
                setHayItemsCarro(true);
                setAgregarCarro(product);
            } else { console.log("NO HAY STOCKKKKKKKKKK") }
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
                        src={product.imagen}
                        alt={product.nombre}
                        style={{
                            width: '100%',
                            maxWidth: '320px',
                            objectFit: 'contain'
                        }}
                    />
                    {(product.stock < 1) ? <Box sx={{
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
                    <p style={{ marginBottom: '8px' }}>Descripción: {product.descripcion}</p>
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
                        <p style={{ fontSize: '12px', marginBlock: '8px' }}>Descripción: {product.descripcionLarga}</p>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', position: 'relative' }}>
                            <p style={{ fontSize: '20px', fontWeight: 700, marginBlock: '8px', paddingLeft: '20px' }}>Precio: ${product.precio}</p>
                            {cantMaxStock &&
                                <Box sx={{ position: 'absolute', top: '-8px', color: 'red', height: '30px', }}>
                                    <p style={{ color: theme.palette.primary.rojo, fontSize: '8px', fontWeight: 800 }}>No hay más productos para la venta</p>
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
                                onClick={() => handleAgregarCarro(product)} 
                                disabled={product.stock < 1}  
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
        </Box>
    );
}
