
import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom'; // Para redirección
import { v4 as uuidv4 } from 'uuid'; // Para generar un ID único


export const OrdenShopContext = createContext();

export const OrdenShopProvider = ({ children }) => {
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
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ user, setUser ] = useState({nombre:"", clave:""})

    // Ajusta la ruta según tu estructura de proyecto

    const handleIniciarCompra = (ordenCarro, totalCarro) => {
        // Obtener valores del contexto
        console.log("Ingresé a handleIniciarCompra den OrdenShop")
        if (!isLoggedIn) {
            // Redirige al usuario a la página de inicio de sesión
            navigate('/signin');
            setAnclaMenuCarr(null);
            return;
        }

        // Si el usuario está logueado, guarda la orden de compra
        const userId = user.id; // Asegúrate de que 'user' tenga el ID adecuado
        const orderId = uuidv4(); // Generar un ID único para la orden
        const orderDate = new Date().toISOString(); // Fecha actual en formato ISO
        console.log("ORDENCARRO:", ordenCarro)
        // Crear el objeto con los detalles de la orden
        const items = Array.isArray(ordenCarro) ? ordenCarro.map(item => ({

            id: item.id,
            title: item.title,
            quantity: item.cantidadPedida,
            totalItem: item.totalItem
        })) : [];

        const orderDetails = {
            userId,
            orderId,
            items,
            total: totalCarro,
            date: orderDate
        };
        console.log("guardaré en LS:", orderDetails)

        // Guardar la orden en localStorage
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(orderDetails);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Opcional: Puedes hacer algo más aquí, como limpiar el carrito
        console.log("Compra iniciada y guardada en localStorage");
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
    }, [agregarCarro, quitarCarro, modifItemCarro])

    return (
        <OrdenShopContext.Provider value={{ actualImport, setActualImport, agregarCarro, setAgregarCarro, anchorEl, setAnchorEl, anclaMenuCarr, setAnclaMenuCarr, mobileMoreAnchorEl, setMobileMoreAnchorEl, cantItems, setCantItems, hayItemsCarro, setHayItemsCarro, modifItemCarro, setModifItemCarro, ordenCarro, setOrdenCarro, quitarCarro, setQuitarCarro, showProducts, setShowProducts, totalCarro, setTotalCarro, vaciarCarro, setVaciarCarro, cantCarroAux, handleIniciarCompra, handleLogin, handleLogout, handlePerfil, user, setUser, isLoggedIn, setIsLoggedIn }}  >
            {children}
        </OrdenShopContext.Provider>
    )
}


