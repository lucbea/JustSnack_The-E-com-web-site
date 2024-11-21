import React, { useContext, useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { ThemeCustom } from '../context/ThemeCustom';
import { DataBDContext } from '../context/DataBd';

export const Ruta = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const theme = ThemeCustom();
    const { products } = useContext(DataBDContext);
    const [pathParts, setPathParts] = useState(() => location.pathname.split('/').filter(part => part));

    useEffect(() => {
        setPathParts(location.pathname.split('/').filter(part => part));
    }, [location.pathname]);

    useEffect(() => {
        if (pathParts[0] === 'product') {
            pathParts[0] = 'productos';
            setPathParts([...pathParts]);
            navigate(`/productos/${pathParts[1]}`);
        }
        if (pathParts[0] === 'inicio') {
            navigate ("/")
        }
    }, [pathParts]);

    const findProductDetails = (prodId) => {
        const product = products.find(p => p.id === prodId);
        if (product) {
            return `${product.nombre}`;
        }
        return prodId;
    };

    const handleClick = (part, index) => {
        if (part === 'Inicio') {
            navigate('/');
        } else {
            if (part === 'productos') {
                if (pathParts.length === 2) {
                    navigate(`/productos/${pathParts[2]}`);
                } else {
                    navigate('/productos');
                }
            } else if (pathParts.length > 1 && pathParts[0] === 'productos') {
                navigate(`/products/${part}`);
            } else {
                navigate(`/${pathParts.slice(0, index + 1).join('/')}`);
            }
        }
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: { xs: '125px', sm: '123px', md: '98px' },
                paddingInline: { xs: '30px', sm: '147px' },
                textAlign: 'center',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}
        >
            {location.pathname !== '/' && (
                <Box
                    sx={{
                        fontSize: '10px',
                        marginRight: '3px',
                        color: theme.palette.primary.grisOsc,
                    }}
                >
                    <Link
                        to="/"
                        onClick={() => handleClick('Inicio')}
                        style={{
                            textDecoration: 'none',
                            color: theme.palette.primary.grisOsc,
                        }}
                    >
                        Inicio
                    </Link>
                </Box>
            )}

            {pathParts.length > 0 && (
                <Typography
                    component="div"
                    sx={{
                        fontSize: '10px',
                        marginRight: '3px',
                        color: theme.palette.primary.grisOsc
                    }}
                >
                    {' / '}
                </Typography>
            )}

            {pathParts.map((part, index) => (
                <React.Fragment key={index}>
                    <Box
                        component="div"
                        sx={{
                            fontSize: '10px',
                            marginRight: '3px',
                            color: theme.palette.primary.grisOsc,
                        }}
                    >
                        <Link
                            onClick={() => handleClick(part, index)}
                            to={`/${pathParts.slice(0, index + 1).join('/')}`}
                            style={{
                                textDecoration: 'none',
                                color: theme.palette.primary.grisOsc,
                            }}
                        >
                            {index === 0 && part === 'products'
                                ? 'productos'
                                : index === pathParts.length - 1
                                    ? findProductDetails(part)
                                    : part.charAt(0).toUpperCase() + part.slice(1)}
                        </Link>
                    </Box>

                    {index < pathParts.length - 1 && (
                        <Typography
                            component="div"
                            sx={{
                                fontSize: '10px',
                                marginRight: '3px',
                                color: theme.palette.primary.grisOsc,
                            }}
                        >
                            {' / '}
                        </Typography>
                    )}
                </React.Fragment>
            ))}
        </Box>
    );
};
