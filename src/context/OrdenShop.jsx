
import { createContext, useEffect, useState, useContext } from "react";
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
    // const [ variaCantItems, setVariaCantItems ] = useState(true);
    const [cantItems, setCantItems] = useState(0);
    let cantCarroAux = 0;
    const [totalCarro, setTotalCarro] = useState(0);
    const [actualImport, setActualImport] = useState(true);
    const [showProducts, setShowProducts] = useState(false)
    const [hayItemsCarro, setHayItemsCarro] = useState(false);
    const navigate = useNavigate(); // Hook para redirección
    const [anchorEl, setAnchorEl] = useState(null);
    const [anclaMenuCarr, setAnclaMenuCarr] = useState(null);
    
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ userId:"", nombre: "", apellido:"", password: "", notificaciones:"" , email:""});
    const [btnIniciarCompra, setBtnIniciarCompra] = useState(false);
    let userLS;


    

    const handleIniciarCompra = () => {
        console.log("Ingresé a handleIniciarCompra den OrdenShop", ordenCarro, "***", totalCarro);
    
        if (!isLoggedIn) {
            // Redirige al usuario a la página de inicio de sesión
            setBtnIniciarCompra(true);
            navigate('/signin');
            setAnclaMenuCarr(null);
            return;
        }
        let userLSJson = localStorage.getItem('usuarioActual', JSON.stringify(user));
        console.log("userLSJson ********************:", userLSJson)
        if (userLSJson) {
            userLS = JSON.parse(userLSJson);
            console.log("USERLS.id:",userLS, userLS.userId)
            
        }
        console.log("ordenShop - user:", user,"***", userLS,"***", user.id, "***",userLS.userId)
        // Verificar el estado del usuario
        if (!(userLS.userId)) {
            console.error("El usuario no está definido o no tiene un ID.");
            return;
        } else {console.log("hay usuario:", userLS.userId)}
    
        console.log("totalCarro:", totalCarro)        
        // Verificar el total del carro
        if (totalCarro === undefined || isNaN(totalCarro)) {
            console.error("El total del carro no es válido:", totalCarro);
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
        console.log("el user del local storage es:", user.id)
        const orderDetails = {
            userId: userLS.userId, // Asegúrate de que 'user' tenga el ID adecuado
            orderId,
            items,
            total: totalCarro,
            date: orderDate
        };
    
        console.log("guardaré en LS:", orderDetails);
    
        // Guardar la orden en localStorage
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(orderDetails);
        localStorage.setItem('orders', JSON.stringify(orders));
    
        // Opcional: Puedes hacer algo más aquí, como limpiar el carrito
        console.log("Compra iniciada y guardada en localStorage");
        setAnclaMenuCarr(null);
        navigate('/compra');
    };
    

    const vaciarCarrito = () => {
        setVaciarCarro(true);
        setOrdenCarro([]);  // Vacía el carrito
        setTotalCarro(0);   // Restablece el total
        setCantItems(0);    // Restablece la cantidad de ítems
        console.log("Carrito vacío");
    };

    const handleLogin = () => {
        if (!isLoggedIn) {
            console.log("NO está logueado")
            setAnchorEl(null);
            setMobileMoreAnchorEl(null);
            setAnclaMenuCarr(null);
            navigate('/signin'); // Navigate to SignIn page
        } else {
            console.log("ESTÁ logueado")
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const handlePerfil = () => {
        setMobileMoreAnchorEl(null);
    }

    useEffect(() => {
        console.log("entre a ordenShop - useEffect - porque se modificó Carro:", agregarCarro, "***", quitarCarro, "***", modifItemCarro, "***")
        const ordenesAux = ordenCarro;
        let totalAuxCarro = 0;
        if (agregarCarro) {
            console.log("entre a agregarCarro")
            const resultado = ordenCarro.filter((o) => o.id === agregarCarro.id)
            resultado.length === 0 ? ordenesAux.push(agregarCarro) : null;
            setOrdenCarro(ordenesAux);

        }
        if (quitarCarro) {
            console.log("entre por quitarCarro")
            setOrdenCarro(ordenCarro.filter(o => o.id !== quitarCarro.id));
        }
        if (modifItemCarro) { console.log("entre por modificarItemCarro") }
        totalAuxCarro = ordenCarro.reduce((acum, o) => acum + (o.totalItem || 0), 0);
        console.log("estoy en OrdenShopProvider - totalAux:", totalAuxCarro)
        setTotalCarro(totalAuxCarro);
        const cantItemsAux = ordenCarro.reduce((acum, o) => acum + o.cantidadPedida, 0);
        setCantItems(cantItemsAux);
        console.log("USE EFFECT - ordenCarro:", ordenCarro)
        if (vaciarCarro) {
            console.log("estoy en useEffect - vaciarCarro")
            setOrdenCarro([]);
            setTotalCarro(0);
            setCantItems(0);
        }
    }, [agregarCarro, quitarCarro, modifItemCarro, vaciarCarro])

    return (
        <OrdenShopContext.Provider value={{ actualImport, setActualImport, agregarCarro, setAgregarCarro, anchorEl, setAnchorEl, anclaMenuCarr, setAnclaMenuCarr, mobileMoreAnchorEl, setMobileMoreAnchorEl, cantItems, setCantItems, hayItemsCarro, setHayItemsCarro, btnIniciarCompra, setBtnIniciarCompra, modifItemCarro, setModifItemCarro, mostrarProduct, setMostrarProduct, ordenCarro, setOrdenCarro, quitarCarro, setQuitarCarro, showProducts, setShowProducts, totalCarro, setTotalCarro, vaciarCarro, setVaciarCarro, vaciarCarrito, cantCarroAux, handleIniciarCompra, handleLogin, handleLogout, handlePerfil, user, setUser, isLoggedIn, setIsLoggedIn }}  >
            {children}
        </OrdenShopContext.Provider>
    )
}


