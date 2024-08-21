import  { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState();
    const [ user, setUser ] = useState({nombre:"", clave:""})
   
    // const [ variaCantItems, setVariaCantItems ] = useState(true);
   

    // useEffect (()=> {
    //     console.log("entre a ordenShop - useEffect - porque se modificó agregarCarro")
    //     const ordenesAux =ordenCarro;
    //     if (agregarCarro) {
    //         const resultado = ordenCarro.filter((o) => o.id === agregarCarro.id)
    //         resultado.length === 0 ? ordenesAux.push(agregarCarro) : null;  
    //         setOrdenCarro(ordenesAux);
    //         // setAgregarCarro();
    //     }
    //     const cantItemsAux = ordenCarro.reduce((acum, o) => acum + o.cantidadPedida, 0);
    //     setCantItems(cantItemsAux)
    // }, [agregarCarro, quitarCarro])

    return (
        <UserContext.Provider value = {{isLoggedIn, setIsLoggedIn, user, setUser }}  >
            { children }
        </UserContext.Provider>
    )
}
