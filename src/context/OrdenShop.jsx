import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { DataBDContext } from "./DataBd";
import { query, where, getDocs, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { db } from "../../firebase";

export const OrdenShopContext = createContext();

export const IsUserLogged = () => {
    if (!isLoggedIn) {
        navigate('/signin');
        setAnclaMenuCarr(null);
        setBtnIniciarCompra();
        let userLSJson = localStorage.getItem('usuarioActual', JSON.stringify(user));
        if (userLSJson) {
            userLS = JSON.parse(userLSJson);
        }
        if (!(userLS.userId)) {
            console.error("El usuario no está definido o no tiene un ID.");
            return;
        }
        return;
    }
}

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
    const [user, setUser] = useState({ userId: "", nombre: "", apellido: "", notificaciones: "", email: "" }); 
    const [productIdVolverLoggedIn, setProductIdVolverLoggedIn] = useState("0");
    const [mjeHabilitarCarro, setMjeHabilitarCarro] = useState(false);
    const [btnIniciarCompra, setBtnIniciarCompra] = useState();
    const [notFoundSearch, setNotFoundSearch] = useState(false);
    const [auxShowCarro, setAuxShowCarro] = useState();
    const [mjeCarroPend, setMjeCarroPend] = useState (false)
    let userLS;


    const handleIniciarCompra = () => {
        if (!isLoggedIn) {
            navigate('/signin');
            setAnclaMenuCarr(null);
            return;
        }
        navigate("/confirmarPedido");
    }


    const deleteUserCarro = async (userId) => {
        try {
            const q = query(collection(db, "carro"), where("usuarioId", "==", userId));
    
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                querySnapshot.forEach(async (document) => {
                    await deleteDoc(doc(db, "carro", document.id));
                });
            } 
        } catch (error) {
            console.error("Error al eliminar documentos:", error);
        }
    };
    
    const handleConfirmarPedido = async () => {
        let userLSJson = localStorage.getItem('usuarioActual');
        let userLS;
        if (userLSJson) {
            userLS = JSON.parse(userLSJson);
        }
        if (!userLS) {
            console.error("El usuario no está definido o no tiene un ID.", userLS);
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
            userId: userLS,
            orderId,
            items,
            total: totalCarro,
            date: orderDate
        };

        try {
            await setOneData('orders', orderId, orderDetails);
            await Promise.all(
                ordenCarro.map(async (item) => {
                    const newStock = item.stock - item.cantidadPedida;
                    const stockUpdate = { stock: newStock };
                    await setOneData('product', item.id, stockUpdate); 
                })
            );
            deleteUserCarro(userLS);
            setOrdenCarro([]);
            setTotalCarro(0);
            navigate('/compra');
            setBtnIniciarCompra(); 
            setAgregarCarro();
            setQuitarCarro();
            setVaciarCarro(false);
            setModifItemCarro();
            localStorage.removeItem(user.userId);
        } catch (error) {
            console.error("Error al guardar la orden o actualizar el stock en Firestore:", error);
        }
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

    const carroLS = (carroGuardar) => {
        if (agregarCarro || quitarCarro || modifItemCarro || vaciarCarro) {
            localStorage.setItem(user.userId, JSON.stringify(carroGuardar));
        } 
    }
    
    
    const cargarCarroLS = (userId) => {
        const carroPend = JSON.parse(localStorage.getItem(userId))
        if (carroPend) { 
            setOrdenCarro(carroPend)
            setMjeCarroPend(true)
        }
        else {
            setMjeCarroPend(false)
        }
       
    }

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
        carroLS (ordenCarro)
    }, [ordenCarro])



    return (
        <OrdenShopContext.Provider value={{
            agregarCarro, setAgregarCarro, anchorEl, setAnchorEl, anclaMenuCarr, setAnclaMenuCarr, mobileMoreAnchorEl, setMobileMoreAnchorEl, cantItems, setCantItems, cantMaxStock, setCantMaxStock, hayItemsCarro, setHayItemsCarro, btnIniciarCompra, setBtnIniciarCompra, modifItemCarro, setModifItemCarro, mostrarProduct, setMostrarProduct, ordenCarro, setOrdenCarro, quitarCarro, setQuitarCarro, showProducts, setShowProducts, totalCarro, setTotalCarro, vaciarCarro, setVaciarCarro,
            handleIniciarCompra, handleConfirmarPedido, handlePerfil, user, setUser, isLoggedIn, setIsLoggedIn, handleIncrement, handleModifCantItem, notFoundSearch, setNotFoundSearch, auxShowCarro, setAuxShowCarro, productIdVolverLoggedIn, setProductIdVolverLoggedIn, mjeHabilitarCarro, setMjeHabilitarCarro, carroLS, cargarCarroLS, mjeCarroPend, setMjeCarroPend
        }}  >
            {children}
        </OrdenShopContext.Provider>
    )
}


