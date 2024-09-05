
import { createContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Para redirección
import { v4 as uuidv4 } from 'uuid';


export const OrdenShopContext = createContext();

export const OrdenShopProvider = ({ children }) => {
    const [mostrarProduct, setMostrarProduct] = useState();
    const [agregarCarro, setAgregarCarro] = useState();
    const [quitarCarro, setQuitarCarro] = useState();
    const [modifItemCarro, setModifItemCarro] = useState();
    const [ordenCarro, setOrdenCarro] = useState([]);
    const [vaciarCarro, setVaciarCarro] = useState(false);
    const [cantItems, setCantItems] = useState(0);
    let cantCarroAux = 0;
    const [totalCarro, setTotalCarro] = useState(0);
    const [actualImport, setActualImport] = useState(true);
    const [showProducts, setShowProducts] = useState(false)
    const [hayItemsCarro, setHayItemsCarro] = useState(false);
    const [cantMaxStock, setCantMaxStock] = useState(false);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anclaMenuCarr, setAnclaMenuCarr] = useState(null);

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ userId: "", nombre: "", apellido: "", password: "", notificaciones: "", email: "" });
    const [btnIniciarCompra, setBtnIniciarCompra] = useState();
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
        // if (!(userLS.userId)) {
        //     // console.error("El usuario no está definido o no tiene un ID.");
        //     return;
        // } else {
        //     // console.log("hay usuario:", userLS.userId)
        // }

        if (totalCarro === undefined || isNaN(totalCarro)) {
            // console.error("El total del carro no es válido:", totalCarro);
            return;
        }

        // Generar un ID único para la orden
        const orderId = uuidv4();
        const orderDate = new Date().toISOString(); // Fecha actual en formato ISO

        // Crear el objeto con los detalles de la orden
        const items = Array.isArray(ordenCarro) ? ordenCarro.map(item => ({
            id: item.id,
            title: item.title,
            cantidad: item.cantidadPedida,
            totalItem: item.totalItem
        })) : [];
        const orderDetails = {
            userId: userLS.userId, // Asegúrate de que 'user' tenga el ID adecuado
            orderId,
            items,
            total: totalCarro,
            date: orderDate
        };

        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(orderDetails);
        localStorage.setItem('orders', JSON.stringify(orders));
        setAnclaMenuCarr(null);
        navigate('/compra');
        setBtnIniciarCompra();
    };



    const handleLogin = () => {
        if (!isLoggedIn) {
            // console.log("NO está logueado")
            setAnchorEl(null);
            setMobileMoreAnchorEl(null);
            setAnclaMenuCarr(null);
            navigate('/signin'); // Navigate to SignIn page
        } else {
            // console.log("ESTÁ logueado")
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
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
        console.log("handleModifCantItem ######", item, "***", cantPedida)
        if (item.stock >= cantPedida) {
            setCantMaxStock(false);
        }
        else { setCantMaxStock(true); }
        if (isNaN(cantPedida) || cantPedida <= 0) return;
        const totalItem = parseFloat((item.price * cantPedida).toFixed(2));
        console.log("Estoy en handlemodifCantItem - ordenCarro?????:", ordenCarro)
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
        // const ordenesAux = ordenCarro;
        if (agregarCarro) {
            const exists = ordenCarro.some(o => o.id === agregarCarro.id);
            if (exists) {
                const aux = ordenCarro;
            }
            const aux = [...ordenCarro, agregarCarro]; // Crear una nueva copia del estado
            setOrdenCarro(aux)
        }
        if (quitarCarro) {
            // console.log("entre por quitarCarro")
            setOrdenCarro(ordenCarro.filter(o => o.id !== quitarCarro.id));
            console.log("entre a ordenShop - USEEFFECT - porque se modificó Carro:", agregarCarro, "***", quitarCarro, "***", modifItemCarro, "***", ordenCarro)
        }
        if (modifItemCarro) {
            console.log("entre por modificarItemCarro");
            console.log("entre a ordenShop - USEEFFECT - porque se modificó Carro:", agregarCarro, "***", quitarCarro, "***", modifItemCarro, "***", ordenCarro)
        }


        if (vaciarCarro) {
            console.log("estoy en useEffect - vaciarCarro")
            setOrdenCarro([]);
            setTotalCarro(0);
            setCantItems(0);
            setHayItemsCarro(false);
            // setAgregarCarro();
        }
    }, [agregarCarro, quitarCarro, modifItemCarro, vaciarCarro])

    useEffect(() => {
        const totalAuxCarro = ordenCarro.reduce((acum, o) => acum + (o.totalItem || 0), 0);
        console.log("CAMBIÓ  ORDENCARRO estoy en OrdenShopProvider - totalAux:", totalAuxCarro)
        setTotalCarro(totalAuxCarro);
        const cantItemsAux = ordenCarro.reduce((acum, o) => acum + o.cantidadPedida, 0);
        console.log("useEffect - cantItemsAux:", cantItemsAux)
        setCantItems(cantItemsAux);
    }, [ordenCarro])

    return (
        <OrdenShopContext.Provider value={{
            actualImport, setActualImport, agregarCarro, setAgregarCarro, anchorEl, setAnchorEl, anclaMenuCarr, setAnclaMenuCarr, mobileMoreAnchorEl, setMobileMoreAnchorEl, cantItems, setCantItems, cantMaxStock, setCantMaxStock, hayItemsCarro, setHayItemsCarro, btnIniciarCompra, setBtnIniciarCompra, modifItemCarro, setModifItemCarro, mostrarProduct, setMostrarProduct, ordenCarro, setOrdenCarro, quitarCarro, setQuitarCarro, showProducts, setShowProducts, totalCarro, setTotalCarro, vaciarCarro, setVaciarCarro,
            //  vaciarCarrito, 
            cantCarroAux, handleIniciarCompra, handleLogin, handleLogout, handlePerfil, user, setUser, isLoggedIn, setIsLoggedIn, handleIncrement, handleModifCantItem
        }}  >
            {children}
        </OrdenShopContext.Provider>
    )
}


