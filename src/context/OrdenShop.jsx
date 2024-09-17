import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import { v4 as uuidv4 } from 'uuid';
import { DataBDContext } from "./DataBd";

export const OrdenShopContext = createContext();

export const OrdenShopProvider = ({ children }) => {
    const navigate = useNavigate();
    const { setOneData } = useContext(DataBDContext)
    const [mostrarProduct, setMostrarProduct] = useState();
    const [agregarCarro, setAgregarCarro] = useState();
    const [quitarCarro, setQuitarCarro] = useState();
    const [modifItemCarro, setModifItemCarro] = useState();
    const [ordenCarro, setOrdenCarro] = useState([]);
    const [vaciarCarro, setVaciarCarro] = useState(false);
    const [cantItems, setCantItems] = useState(0);
    const [totalCarro, setTotalCarro] = useState(0);
    const [showProducts, setShowProducts] = useState(false)
    const [hayItemsCarro, setHayItemsCarro] = useState(false);
    const [cantMaxStock, setCantMaxStock] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anclaMenuCarr, setAnclaMenuCarr] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ userId: "", nombre: "", apellido: "", password: "", notificaciones: "", email: "" });
    const [btnIniciarCompra, setBtnIniciarCompra] = useState();
    const [notFoundSearch, setNotFoundSearch] = useState(false);
    let userLS;

    const handleIniciarCompra = () => {
        if (!isLoggedIn) {
            navigate('/signin');
            setAnclaMenuCarr(null);
            setBtnIniciarCompra();
            return;
        }

        let userLSJson = localStorage.getItem('usuarioActual', JSON.stringify(user));
        if (userLSJson) {
            userLS = JSON.parse(userLSJson);
        }

        if (!(userLS.userId)) {
            console.error("El usuario no está definido o no tiene un ID.");
            return;
        } 

        if (totalCarro === undefined || isNaN(totalCarro)) {
            console.error("El total del carro no es válido:", totalCarro);
            return;
        }

        const orderId = uuidv4();
        const orderDate = new Date().toISOString(); 

        const items = Array.isArray(ordenCarro) ? ordenCarro.map(item => ({
            id: item.id,
            nombre: item.nombre,
            cantidad: item.cantidadPedida,
            totalItem: item.totalItem,
        })) : [];
        const orderDetails = {
            userId: userLS.userId, 
            orderId,
            items,
            total: totalCarro,
            date: orderDate
        };
        try {
            setOneData('orders', orderId, orderDetails);
            Promise.all(
                ordenCarro.map(async (item) => {
                    const newStock = item.stock - item.cantidadPedida;
                    const stockUpdate = { stock: newStock };
                    await setOneData('product', item.id, stockUpdate);
                })
            );
        } catch (error) {
            console.error("Error al guardar la orden o actualizar el stock en Firestore:", error);
        }
        setAnclaMenuCarr(null);
        navigate('/compra');
        setBtnIniciarCompra();
    };

    const handleLogin = () => {
        if (!isLoggedIn) {
            setAnchorEl(null);
            setMobileMoreAnchorEl(null);
            setAnclaMenuCarr(null);
            navigate('/signin'); 
        } 
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        const user = { "userId": "" };
        localStorage.setItem('usuarioActual', JSON.stringify(user));
        setUser({userId: "", nombre: "", apellido: "", password: "", notificaciones: "", email: ""})
    };

    const handlePerfil = () => {
        setMobileMoreAnchorEl(null);
    }

    const handleIncrement = (item) => {
        const itemEncont = ordenCarro.find(o => o.id === item.id);
        if (!itemEncont) return;
        const cantPedAux = itemEncont.cantidadPedida + 1;
        if (itemEncont.stock >= cantPedAux) {
            handleModifCantItem(item, cantPedAux);
            setCantMaxStock(false);
        }
        else { setCantMaxStock(true); }
    };

    const handleModifCantItem = (item, cantPedida) => {
        if (item.stock >= cantPedida) {
            setCantMaxStock(false);
        }
        else { setCantMaxStock(true); }
        if (isNaN(cantPedida) || cantPedida <= 0) return;
        const totalItem = parseFloat((item.precio * cantPedida).toFixed(2));
        const updatedOrdenCarro = ordenCarro.map(o =>
            o.id === item.id ? { ...item, cantidadPedida: cantPedida, totalItem } : o
        );

        setOrdenCarro(updatedOrdenCarro);
        setAgregarCarro();
        setQuitarCarro();
        setVaciarCarro(false);
        setModifItemCarro(item);
    };


    useEffect(() => {
        if (agregarCarro) {
            const exists = ordenCarro.some(o => o.id === agregarCarro.id);
            if (exists) {
                const aux = ordenCarro;
            }
            const aux = [...ordenCarro, agregarCarro];
            setOrdenCarro(aux)
        }
        
        if (quitarCarro) {
            setOrdenCarro(ordenCarro.filter(o => o.id !== quitarCarro.id));
        }

        if (vaciarCarro) {
            setOrdenCarro([]);
            setTotalCarro(0);
            setCantItems(0);
            setHayItemsCarro(false);
        }
    }, [agregarCarro, quitarCarro, modifItemCarro, vaciarCarro])

    useEffect(() => {
        const totalAuxCarro = ordenCarro.reduce((acum, o) => acum + (o.totalItem || 0), 0);
        setTotalCarro(totalAuxCarro);
        const cantItemsAux = ordenCarro.reduce((acum, o) => acum + o.cantidadPedida, 0);
        setCantItems(cantItemsAux);
    }, [ordenCarro])

    return (
        <OrdenShopContext.Provider value={{
            agregarCarro, setAgregarCarro, anchorEl, setAnchorEl, anclaMenuCarr, setAnclaMenuCarr, mobileMoreAnchorEl, setMobileMoreAnchorEl, cantItems, setCantItems, cantMaxStock, setCantMaxStock, hayItemsCarro, setHayItemsCarro, btnIniciarCompra, setBtnIniciarCompra, modifItemCarro, setModifItemCarro, mostrarProduct, setMostrarProduct, ordenCarro, setOrdenCarro, quitarCarro, setQuitarCarro, showProducts, setShowProducts, totalCarro, setTotalCarro, vaciarCarro, setVaciarCarro,
            handleIniciarCompra, handleLogin, handleLogout, handlePerfil, user, setUser, isLoggedIn, setIsLoggedIn, handleIncrement, handleModifCantItem, notFoundSearch, setNotFoundSearch, 
        }}  >
            {children}
        </OrdenShopContext.Provider>
    )
}


