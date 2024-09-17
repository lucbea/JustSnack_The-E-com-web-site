import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from '../../firebase';
import Box from '@mui/material/Box';
import { DataBDContext } from '../context/DataBd';
import { OrdenShopContext } from '../context/OrdenShop';
import { ThemeCustom } from '../context/ThemeCustom';
import { BsSearch } from "react-icons/bs";


export const Filtros = () => {
    const theme = ThemeCustom()
    const navigate = useNavigate();
    const { setProducts, setLoadingProducts } = useContext(DataBDContext);
    const [categSelect, setCategSelect] = useState('Todos');
    const [wordSearch, setWordSearch] = useState('');
    const { setNotFoundSearch } = useContext(OrdenShopContext);

    useEffect(() => {
        setLoadingProducts(true);
        const fetchProducts = async () => {
            try {
                let baseQuery = query(collection(db, 'product'));

                if (categSelect !== 'Todos') {
                    baseQuery = query(baseQuery, where('categoria', '==', categSelect));
                }

                const querySnapshot = await getDocs(baseQuery);
                let productsArray = querySnapshot.docs.map(doc => doc.data());

                // Filtrar en el cliente para los campos de búsqueda
                if (wordSearch) {
                    productsArray = productsArray.filter(product => {
                        const term = wordSearch.toLowerCase();
                        return (
                            product.nombre.toLowerCase().includes(term) ||
                            product.descripcion.toLowerCase().includes(term) ||
                            product.descripcionLarga.toLowerCase().includes(term)
                        );
                    });
                }
                if (productsArray.length === 0) {
                    setNotFoundSearch(true);
                } else {
                    setNotFoundSearch(false);
                }
                setProducts(productsArray);
                navigate('/productos');
            } catch (error) {
                console.error('Error proceso de lectura de productos: ', error);
            } finally {
                setLoadingProducts(false);
            }
        };

        fetchProducts();
    }, [categSelect, wordSearch]);

    const handleWord = (e) => {
        setWordSearch(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setCategSelect(e.target.value);
    };


    return (
        <Box sx={{width:'100%', display: {sm:'flex'}, justifyContent:{sm:'flex-end'}}}>

            <Box sx={{
                // display: 'none',
                width:'100%',
                position: 'relative',
                top: '50px',
                paddingTop: { xs: '15px', sm: '25px' },
                paddingBottom: {xs: '28px', sm:'10px', md:'10px'},
                paddingInline: '16px',
                backgroundColor: theme.palette.primary.backFiltro,
                marginInline: {xs:'auto', sm:'0px'},
                display: 'flex',
                WebkitBoxPack: 'justify',
                WebkitJustifyContent: 'space-between',
                justifyContent: 'space-between'
            }}>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '49% 120px', sm: '1fr 120px' },
                        gap: '2%',
                        minWidth: '248px',
                        width: '50%',
                        justifyContent: 'center',
                        maxWidth: '650px',
                        marginInline: {xs:'auto', sm:'0px'},
                        marginLeft: {sm:'auto'}
                    }}>
                    <Box
                        sx={{
                            width: '100%',
                            position: 'relative'
                        }}>
                        <BsSearch
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '10px',
                                transform: 'translateY(-50%)',
                                color: '#999'
                            }}
                        />
                        <input
                            type="text"
                            onChange={handleWord}
                            style={{
                                padding: '7px 10px 6px 35px',
                                fontSize: '12px',
                                width: 'inherit',
                                border: '1px solid #ccc',
                                borderRadius: '4px'
                            }}
                            placeholder="Buscar..."
                        />
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            minWidth: '200px'
                        }}>
                        <select name="categ" id="categ" onChange={handleCategoryChange}
                            style={{
                                padding: '6px 10px',
                                fontSize: '12px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                width: { xs: '100%', sm: '-webkit-fill-available' },
                            }}>
                            <option value="Todos">Todos</option>
                            <option value="Secos">Frutos Secos</option>
                            <option value="Deshidratados">Deshidratados</option>
                        </select>
                    </Box>
                </Box>              
            </Box>
        </Box>
    );
}
