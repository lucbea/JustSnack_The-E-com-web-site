
import React, { useContext, useEffect, useState } from 'react';
import { Table, TableBody,  Paper, Box, Grid } from '@mui/material';
import { OrdenShopContext } from '../../context/OrdenShop';
import { useNavigate } from 'react-router-dom';
import { ThemeCustom } from '../../context/ThemeCustom';

export const UserOrders = () => {
    const theme = ThemeCustom();
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(OrdenShopContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/'); // Redirige a la página de inicio si no está logueado
        }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        const fetchOrders = () => {
            // Obtener el usuario actual desde localStorage
            const userJson = localStorage.getItem('usuarioActual');
            if (userJson) {
                const user = JSON.parse(userJson);
                const userId = user.userId;

                // Obtener las órdenes desde localStorage
                const ordersJson = localStorage.getItem('orders');
                if (ordersJson) {
                    const allOrders = JSON.parse(ordersJson);
                    // Filtrar las órdenes por el ID del usuario actual
                    const userOrders = allOrders.filter(order => order.userId === userId);
                    setOrders(userOrders);
                }
            }
            setLoading(false);
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Cargando órdenes...</div>;
    }
    return (
        <Box component={Paper} sx={{marginBottom:'5px', maxWidth:'600px', margin:'auto'}}>
            <Box sx={{ minWidth: '248px',  }}>
                <Box>
                    {orders.map((order) => (
                        <React.Fragment key={order.orderId}>
                            {/* Mostrar la fecha y el total de la orden en la primera fila */}
                            <Box>
                                <Box sx={{ width: '100%', height: '2px', borderBottom: theme.tabla.delimitaSolid }}></Box>
                                <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                    <Box sx={{ width: '100%', justifyContent: 'center', alignItems:'center' }}>
                                        <Box sx={{ padding: '6px', fontSize: '10px', borderBottom: '0px solid red', textAlign: 'center' }}>Fecha: </Box>
                                        <Box rowSpan={order.items.length} sx={{ padding: '6px', fontSize: '12px', borderBottom: '0px solid red', textAlign: 'center' }}>
                                            {new Date(order.date).toLocaleDateString()}
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems:'center' }}>
                                        <Box sx={{ padding: '6px', fontSize: '10px', borderBottom: '0px solid red', textAlign: 'center' }}>Monto Total</Box>
                                        <Box rowSpan={order.items.length} sx={{ padding: '6px', fontSize: '12px', borderBottom: '0px solid red', textAlign: 'center', fontWeight: 800 }}>
                                            ${order.total.toFixed(2)}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ width: '100%' }}>
                                    {/* Mostrar el primer ítem de la orden */}
                                    <Box sx={{ borderTop: theme.tabla.delimita, borderBottom: theme.tabla.delimita, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <Box sx={{ fontSize: '12px', width: '50%', padding: '6px', borderBottom: '0px solid red', textAlign: 'left' }}>Item</Box>
                                        <Box sx={{ fontSize: '12px', width: '25%', padding: '6px', borderBottom: '0px solid red', textAlign: 'center' }}>Cantidad</Box>
                                        <Box sx={{ fontSize: '12px', width: '25%', padding: '6px', borderBottom: '0px solid red', textAlign: 'center' }}>Subtotal</Box>
                                    </Box>
                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>

                                        <Box sx={{ fontSize: '12px', width: '50%', padding: '6px', borderBottom: '0px solid red', textAlign: 'left' }}>{order.items[0].title}</Box>
                                        <Box sx={{ fontSize: '12px', width: '25%', padding: '6px', borderBottom: '0px solid red', textAlign: 'center' }}>{order.items[0].cantidad}</Box>
                                        <Box sx={{ fontSize: '12px', width: '25%', padding: '6px', borderBottom: '0px solid red', textAlign: 'center' }}>${(order.items[0].totalItem).toFixed(2)}</Box>
                                        {/* <Box ></Box> */}
                                    </Box>
                                </Box>
                            </Box>
                            {/* Mostrar el resto de los ítems de la orden */}
                            {order.items.slice(1).map((item, index) => (
                                <Box key={`${order.orderId}-${index}`} sx={{ borderTop: theme.tabla.delimita, borderBottom: theme.tabla.delimita }}>
                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <Box sx={{ fontSize: '12px', width: '50%', padding: '6px', borderBottom: '0px solid red', textAlign: 'left' }}>{item.title}</Box>
                                        <Box sx={{ fontSize: '12px', width: '25%', padding: '6px', borderBottom: '0px solid red', textAlign: 'center' }}>{item.cantidad}</Box>
                                        <Box sx={{ fontSize: '12px', width: '25%', padding: '6px', borderBottom: '0px solid red', textAlign: 'center' }}>${(item.totalItem).toFixed(2)}</Box>
                                    </Box>
                                </Box>
                            ))}
                            <Box sx={{ width: '100%', height: '2px', borderBottom: theme.tabla.delimitaSolid }}></Box>
                        </React.Fragment>

                    ))}
                </Box>
            </Box>
        </Box>
    );
};





