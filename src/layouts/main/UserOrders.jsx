import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { db } from '../../../firebase';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { OrdenShopContext } from '../../context/OrdenShop';
import { ThemeCustom } from '../../context/ThemeCustom';
import { StyleUserOrders } from './StyleUserOrders';
import spinner from "../../assets/bx_loader.gif"
import { StyleSpinner } from '../../hook/StyleSpinner';

export const UserOrders = () => {
    const theme = ThemeCustom();
    const navigate = useNavigate();
    const stUsOrd = StyleUserOrders({ theme });
    const stSpinner = StyleSpinner({ theme });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalUserOrders, setTotalUserOrders] = useState(0);
    const { isLoggedIn, setUser, user } = useContext(OrdenShopContext);
    let totalUser = 0;

    useEffect(() => {
        const fetchOrders = async () => {
            const isLoggedInLS = localStorage.getItem('isLoggedIn');
            if (isLoggedInLS === "true") {
                try {
                    const userIdLS = localStorage.getItem('usuarioActual');
                    if (userIdLS) {
                        const parsedUserId = JSON.parse(userIdLS);
                        const queryUsuario = await getDoc(doc(db, 'users', parsedUserId));
                        if (queryUsuario.exists()) {
                            const userData = queryUsuario.data();
                            setUser(userData)
                        }
                        const ordersRef = collection(db, 'orders');
                        const q = query(ordersRef, where('userId', '==', parsedUserId));
                        const querySnapshot = await getDocs(q);
                        if (!querySnapshot.empty) {
                            const userOrders = querySnapshot.docs.map(doc => {
                                const orderData = doc.data();
                                return orderData;
                            });

                            userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

                            totalUser = userOrders.reduce((acc, order) => acc + (order.total || 0), 0);
                            setOrders(userOrders);
                            setTotalUserOrders(totalUser);
                        }
                    } else {
                        // navigate("/")
                    }
                } catch (error) {
                    console.error('Error proceso de lectura de ordenes: ', error);
                } finally {
                    setLoading(false);
                }
            } else {
                // navigate("/")
            }
        };
        fetchOrders();
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return <Box sx={{ ...stSpinner.boxMesagge }} >Para continuar, debes iniciar sesión.</Box>;
    }
    if (loading) {
        return <Box sx={{ ...stSpinner.boxMesagge }}>Cargando...
            <Box sx={{ ...stSpinner.contentSpinner }}>
                <img src={spinner} alt="Loading spinner"
                    style={{ ...stSpinner.imgSpinner }} />
            </Box>
        </Box>;
    }

    return (
        <Box component={Paper} sx={{ ...stUsOrd.contentTabla }}>
            <>
                <Box sx={{ display: 'flex', paddingInline: '16px', paddingBlock: '8px', flexDirection: 'column', alignItems: 'flex-start', paddingBottom: '5px' }}>Hola {user.nombre}.
                    <span style={{ fontSize: '12px' }}>Estas son tus órdenes de compra.</span> </Box>
                {orders.length > 0 ? (
                    <>
                        {orders.map((order) => (
                            <React.Fragment key={order.orderId}>
                                <>
                                    <Box sx={{ ...stUsOrd.bordeTabla }}></Box>
                                    <Box sx={{ ...stUsOrd.encabItem }}>
                                        <Box sx={{ ...stUsOrd.contentDate }}>
                                            <Box sx={{ ...stUsOrd.boxFechMontOrd }}>Fecha: </Box>
                                            <Box rowSpan={order.items.length} sx={{ ...stUsOrd.boxFechMontOrd }}>
                                                {new Date(order.date).toLocaleDateString()}
                                            </Box>
                                        </Box>
                                        <Box sx={{ ...stUsOrd.contentMontTot }}>
                                            <Box sx={{ ...stUsOrd.boxFechMontOrd }}>Monto Total:</Box>
                                            <Box rowSpan={order.items.length} sx={{ ...stUsOrd.boxFechMontOrd, ...stUsOrd.boxPrice }}>
                                                ${order.total.toFixed(2)}
                                            </Box>
                                        </Box>
                                    </Box>
                                    <>
                                        <Box sx={{ ...stUsOrd.bordeItem }}>
                                        </Box>
                                        <Box sx={{ ...stUsOrd.boxItem }}>
                                            <Box sx={{ ...stUsOrd.orderNomb }}>Item</Box>
                                            <Box sx={{ ...stUsOrd.orderCantSubtot }}>Cantidad</Box>
                                            <Box sx={{ ...stUsOrd.orderCantSubtot }}>Subtotal</Box>
                                        </Box>
                                        <Box sx={{ ...stUsOrd.boxItem }}>
                                            <Box sx={{ ...stUsOrd.orderNomb }}>{order.items[0].nombre}
                                                <span style={{ ...stUsOrd.spanCodItem }}>Código: {order.items[0].id}</span>
                                            </Box>
                                            <Box sx={{ ...stUsOrd.orderCantSubtot }}>{order.items[0].cantidad}</Box>
                                            <Box sx={{ ...stUsOrd.orderCantSubtot }}>${(order.items[0].totalItem).toFixed(2)}</Box>
                                        </Box>
                                    </>
                                </>
                                {order.items.slice(1).map((item, index) => (
                                    <Box key={`${order.orderId}-${index}`} sx={{ borderTop: theme.tabla.delimita, borderBottom: theme.tabla.delimita }}>
                                        <Box sx={{ ...stUsOrd.boxItem }}>
                                            <Box sx={{ ...stUsOrd.orderNomb }}>{item.nombre}
                                                <span style={{ ...stUsOrd.spanCodItem }}>Código: {item.id}</span>
                                            </Box>
                                            <Box sx={{ ...stUsOrd.orderCantSubtot }}>{item.cantidad}</Box>
                                            <Box sx={{ ...stUsOrd.orderCantSubtot }}>${(item.totalItem).toFixed(2)}</Box>
                                        </Box>
                                    </Box>
                                ))}
                                <Box sx={{ ...stUsOrd.bordeTabla }}></Box>
                            </React.Fragment>
                        ))}
                        <Box sx={{ ...stUsOrd.contentMontAcum }}>
                            <Box sx={{ ...stUsOrd.boxStringMontAcum }}>Monto Acumulado:</Box>
                            <Box sx={{ ...stUsOrd.boxNumberMontAcum }}>${totalUserOrders}
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Box sx={{ ...stUsOrd.boxMesagge }}>No tienes órdenes realizadas.</Box>
                )}
            </>
        </Box>
    );
};
