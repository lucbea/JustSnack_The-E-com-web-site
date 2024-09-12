
// import React, { useContext, useEffect, useState } from 'react';
// import { Table, TableBody,  Paper, Box, Grid } from '@mui/material';
// import { OrdenShopContext } from '../../context/OrdenShop';
// import { useNavigate } from 'react-router-dom';
// import { ThemeCustom } from '../../context/ThemeCustom';

// export const UserOrders = () => {
//     const theme = ThemeCustom();
//     const navigate = useNavigate();
//     const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(OrdenShopContext);
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!isLoggedIn) {
//             navigate('/'); // Redirige a la página de inicio si no está logueado
//         }
//     }, [isLoggedIn, navigate]);

//     useEffect(() => {
//         const fetchOrders = () => {
//             // Obtener el usuario actual desde localStorage
//             const userJson = localStorage.getItem('usuarioActual');
//             if (userJson) {
//                 const user = JSON.parse(userJson);
//                 const userId = user.userId;

//                 // Obtener las órdenes desde localStorage
//                 const ordersJson = localStorage.getItem('orders');
//                 if (ordersJson) {
//                     const allOrders = JSON.parse(ordersJson);
//                     // Filtrar las órdenes por el ID del usuario actual
//                     const userOrders = allOrders.filter(order => order.userId === userId);
//                     setOrders(userOrders);
//                 }
//             }
//             setLoading(false);
//         };

//         fetchOrders();
//     }, []);

//     if (loading) {
//         return <div>Cargando órdenes...</div>;
//     }

// import React, { useContext, useEffect, useState } from 'react';
// import { Box, Paper } from '@mui/material';
// import { OrdenShopContext } from '../../context/OrdenShop';
// import { useNavigate } from 'react-router-dom';
// import { ThemeCustom } from '../../context/ThemeCustom';
// import { db } from '../../../firebase'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
// import { collection, query, where, getDocs } from 'firebase/firestore';

// export const UserOrders = () => {
//     const theme = ThemeCustom();
//     const navigate = useNavigate();
//     const { isLoggedIn } = useContext(OrdenShopContext);
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!isLoggedIn) {
//             navigate('/'); // Redirige a la página de inicio si no está logueado
//         }
//     }, [isLoggedIn, navigate]);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             try {
//                 // Obtener el usuario actual desde localStorage
//                 const userJson = localStorage.getItem('usuarioActual');
//                 if (userJson) {
//                     // const user = JSON.parse(userJson);
//                     // const userId = user.userId;
//                     const userId = JSON.parse(userJson)
//                     console.log ("UserORders - userId", userId)
//                     // Referencia a la colección 'orders' en Firestore
//                     const ordersRef = collection(db, 'orders');
//                     // Consulta para obtener las órdenes del usuario actual
//                     const q = query(ordersRef, where('userId', '==', userId));
//                     const querySnapshot = await getDocs(q);
//                     console.log("querySnapshot", querySnapshot)

//                     const userOrders = querySnapshot.docs.map(doc => doc.data());
//                     setOrders(userOrders);
//                 }
//             } catch (error) {
//                 console.error('Error fetching orders: ', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, []);

//     if (loading) {
//         return <div>Cargando órdenes...</div>;
//     }

//     return (
//         <Box component={Paper} sx={{marginBottom:'5px', maxWidth:'600px', margin:'auto'}}>
//             <Box sx={{ minWidth: '248px',  }}>
//                 <Box>
//                     {orders.map((order) => (
//                         <React.Fragment key={order.orderId}>
//                             {/* Mostrar la fecha y el total de la orden en la primera fila */}
//                             <Box>
//                                 <Box sx={{ width: '100%', height: '2px', borderBottom: theme.tabla.delimitaSolid }}></Box>
//                                 <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
//                                     <Box sx={{ width: '100%', justifyContent: 'center', alignItems:'center' }}>
//                                         <Box sx={{ padding: '6px', fontSize: '10px', borderBottom: '0px solid red', textAlign: 'center' }}>Fecha: </Box>
//                                         <Box rowSpan={order.items.length} sx={{ padding: '6px', fontSize: '12px', borderBottom: '0px solid red', textAlign: 'center' }}>
//                                             {new Date(order.date).toLocaleDateString()}
//                                         </Box>
//                                     </Box>
//                                     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems:'center' }}>
//                                         <Box sx={{ padding: '6px', fontSize: '10px', borderBottom: '0px solid red', textAlign: 'center' }}>Monto Total</Box>
//                                         <Box rowSpan={order.items.length} sx={{ padding: '6px', fontSize: '12px', borderBottom: '0px solid red', textAlign: 'center', fontWeight: 800 }}>
//                                             ${order.total.toFixed(2)}
//                                         </Box>
//                                     </Box>
//                                 </Box>
//                                 <Box sx={{ width: '100%' }}>
//                                     {/* Mostrar el primer ítem de la orden */}
//                                     <Box sx={{ borderTop: theme.tabla.delimita, borderBottom: theme.tabla.delimita, width: '100%', display: 'flex', justifyContent: 'space-between' }}>
//                                         <Box sx={{ fontSize: '12px', width: '50%', padding: '6px', borderBottom: '0px solid red', textAlign: 'left' }}>Item</Box>
//                                         <Box sx={{ fontSize: '12px', width: '25%', padding: '6px', borderBottom: '0px solid red', textAlign: 'center' }}>Cantidad</Box>
//                                         <Box sx={{ fontSize: '12px', width: '25%', padding: '6px', borderBottom: '0px solid red', textAlign: 'center' }}>Subtotal</Box>
//                                     </Box>
//                                     <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>

//                                         <Box sx={{ fontSize: '12px', width: '50%', padding: '6px', borderBottom: '0px solid red', textAlign: 'left' }}>{order.items[0].nombre}
//                                             <span style={{fontSize:'8px', marginLeft:'10px'}}>Código: {order.items[0].id} </span>
//                                             </Box>
//                                         <Box sx={{ fontSize: '12px', width: '25%', padding: '6px', borderBottom: '0px solid red', textAlign: 'center' }}>{order.items[0].cantidad}</Box>
//                                         <Box sx={{ fontSize: '12px', width: '25%', padding: '6px', borderBottom: '0px solid red', textAlign: 'center' }}>${(order.items[0].totalItem).toFixed(2)}</Box>
//                                         {/* <Box ></Box> */}
//                                     </Box>
//                                 </Box>
//                             </Box>
//                             {/* Mostrar el resto de los ítems de la orden */}
//                             {order.items.slice(1).map((item, index) => (
//                                 <Box key={`${order.orderId}-${index}`} sx={{ borderTop: theme.tabla.delimita, borderBottom: theme.tabla.delimita }}>
//                                     <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
//                                         <Box sx={{ fontSize: '12px', width: '50%', padding: '6px', borderBottom: '0px solid red', textAlign: 'left' }}>{item.nombre}
//                                         <span style={{fontSize:'8px', marginLeft:'10px'}}>Código: {order.items[0].id} </span>
//                                         </Box>
//                                         <Box sx={{ fontSize: '12px', width: '25%', padding: '6px', borderBottom: '0px solid red', textAlign: 'center' }}>{item.cantidad}</Box>
//                                         <Box sx={{ fontSize: '12px', width: '25%', padding: '6px', borderBottom: '0px solid red', textAlign: 'center' }}>${(item.totalItem).toFixed(2)}</Box>
//                                     </Box>
//                                 </Box>
//                             ))}
//                             <Box sx={{ width: '100%', height: '2px', borderBottom: theme.tabla.delimitaSolid }}></Box>
//                         </React.Fragment>

//                     ))}
//                 </Box>
//             </Box>
//         </Box>
//     );
// };




import React, { useContext, useEffect, useState } from 'react';
import { Box, Paper } from '@mui/material';
import { OrdenShopContext } from '../../context/OrdenShop';
import { useNavigate } from 'react-router-dom';
import { ThemeCustom } from '../../context/ThemeCustom';
import { db } from '../../../firebase'; // Ajusta la ruta si es necesario
import { collection, query, where, getDocs } from 'firebase/firestore';

export const UserOrders = () => {
    const theme = ThemeCustom();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const {isLoggedIn, setIsLoggedIn} = useContext(OrdenShopContext)

    useEffect(() => {
        const fetchOrders = async () => {
            console.log("entre en fetchOrders");
            console.log("setisLoggedIn", isLoggedIn)
            try {
                // Obtener el userId directamente desde localStorage
                const userIdLS = localStorage.getItem('usuarioActual');
                console.log("fetchOrders - userId", userIdLS, typeof(userIdLS));
                if (userIdLS) {
                    // Verifica que el userId no esté vacío
                    const parsedUserId = JSON.parse(userIdLS).userId;
                    console.log("UserOrders - userId", parsedUserId);
        
                    if (!parsedUserId) {
                        throw new Error('UserId is undefined or empty');
                    }
                    // Referencia a la colección 'orders' en Firestore
                    const ordersRef = collection(db, 'orders');

                    // Consulta para obtener las órdenes del usuario actual
                    const q = query(ordersRef, where('userId', '==', parsedUserId));
                    const querySnapshot = await getDocs(q);
                 // Depuración: Verifica el tamaño de los documentos obtenidos
                    console.log("Number of documents found:", querySnapshot.size);







                    // Si hay documentos, mapea los datos
                    if (!querySnapshot.empty) {
                        const userOrders = querySnapshot.docs.map(doc => doc.data());
                        console.log("User Orders:", userOrders); // Depuración
                        setOrders(userOrders);
                    } else {
                        console.log("No orders found for userId:", userIdLS); // Depuración
                    }
                } else {
                    console.error('No userId found in localStorage');
                }
            } catch (error) {
                console.error('Error fetching orders: ', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return <div style={{marginInline:'auto', marginTop:'150px',     backgroundColor:'#fff',
            color: 'rgba(0, 0, 0, 0.87)', 
            borderRadius: '4px',
            boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
            marginBottom: '5px',
            maxWidth: '600px', 
            padding:'20px'}}>Para acceder a las órdenes solicitadas, debes iniciar sesión.</div>;
    }
    if (loading) {
        return <div style={{
            marginInline:'auto', 
            marginTop:'150px',     
            backgroundColor:'#fff',
            color: 'rgba(0, 0, 0, 0.87)', 
            borderRadius: '4px',
            boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
            marginBottom: '5px',
            maxWidth: '600px', 
            padding:'20px'
        }}>Cargando órdenes...</div>;
    }

    return (
        <Box component={Paper} sx={{ marginBottom: '5px', maxWidth: '600px', margin: 'auto' }}>
            <Box sx={{ minWidth: '248px' }}>
                <Box>
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <React.Fragment key={order.orderId}>
                                {/* Mostrar la fecha y el total de la orden en la primera fila */}
                                <Box>
                                    <Box sx={{ width: '100%', height: '2px', borderBottom: theme.tabla.delimitaSolid }}></Box>
                                    <Box sx={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                        <Box sx={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                                            <Box sx={{ padding: '6px', fontSize: '10px', borderBottom: '0px solid red', textAlign: 'center' }}>Fecha: </Box>
                                            <Box rowSpan={order.items.length} sx={{ padding: '6px', fontSize: '12px', borderBottom: '0px solid red', textAlign: 'center' }}>
                                                {new Date(order.date).toLocaleDateString()}
                                            </Box>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                        <Box sx={{ fontSize: '12px', width: '50%', padding: '6px', borderBottom: '0px solid red', textAlign: 'left' }}>{order.items[0].nombre}
                                             <span style={{fontSize:'8px', marginLeft:'10px'}}>Código: {order.items[0].id} </span>
                                             </Box>
                                            <Box sx={{ fontSize: '12px', width: '25%', padding: '6px', borderBottom: '0px solid red', textAlign: 'center' }}>{order.items[0].cantidad}</Box>
                                            <Box sx={{ fontSize: '12px', width: '25%', padding: '6px', borderBottom: '0px solid red', textAlign: 'center' }}>${(order.items[0].totalItem).toFixed(2)}</Box>
                                        </Box>
                                    </Box>
                                </Box>
                                {/* Mostrar el resto de los ítems de la orden */}
                                {order.items.slice(1).map((item, index) => (
                                    <Box key={`${order.orderId}-${index}`} sx={{ borderTop: theme.tabla.delimita, borderBottom: theme.tabla.delimita }}>
                                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                        <Box sx={{ fontSize: '12px', width: '50%', padding: '6px', borderBottom: '0px solid red', textAlign: 'left' }}>{order.items[0].nombre}
                                             <span style={{fontSize:'8px', marginLeft:'10px'}}>Código: {order.items[0].id} </span>
                                             </Box>
                                            <Box sx={{ fontSize: '12px', width: '25%', padding: '6px', borderBottom: '0px solid red', textAlign: 'center' }}>{item.cantidad}</Box>
                                            <Box sx={{ fontSize: '12px', width: '25%', padding: '6px', borderBottom: '0px solid red', textAlign: 'center' }}>${(item.totalItem).toFixed(2)}</Box>
                                        </Box>
                                    </Box>
                                ))}
                                <Box sx={{ width: '100%', height: '2px', borderBottom: theme.tabla.delimitaSolid }}></Box>
                            </React.Fragment>
                        ))
                    ) : (
                        <div style={{
                            marginInline:'auto', 
                            marginTop:'150px',     
                            backgroundColor:'#fff',
                            color: 'rgba(0, 0, 0, 0.87)', 
                            borderRadius: '4px',
                            boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                            marginBottom: '5px',
                            maxWidth: '600px', 
                            padding:'20px'
                        }}>No tienes órdenes realizadas.</div>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
