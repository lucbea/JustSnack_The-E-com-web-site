import React, { createContext, useEffect, useState } from "react";

export const OrdenShopContext = createContext();

export const OrdenShopProvider = ({children}) => {
    const [ agregarCarro, setAgregarCarro ] = useState();
    const [ quitarCarro, setQuitarCarro ] = useState([]);
    const [ ordenCarro, setOrdenCarro ] = useState([]);
    const [ vaciarCarro, setVaciarCarro ] = useState(false);
    const [ cantItems, setCantItems ] = useState(0);
    let cantCarroAux = 0;
    const [totalCarro, setTotalCarro] = useState(0);
    const [ actualImport, setActualImport] = useState(true);

    useEffect (()=> {
        console.log("entre a ordenShop - useEffect - porque se modificó agregarCarro")
        const ordenesAux =ordenCarro;
        if (agregarCarro) {
            const resultado = ordenCarro.filter((o) => o.id === agregarCarro.id)
            resultado.length === 0 ? ordenesAux.push(agregarCarro) : null;  
            setOrdenCarro(ordenesAux);
        }
        const cantItemsAux = ordenCarro.reduce((acum, o) => acum + o.cantidadPedida, 0);
        setCantItems(cantItemsAux)
    }, [agregarCarro, quitarCarro])

    return (
        <OrdenShopContext.Provider value = {{ordenCarro, setOrdenCarro, agregarCarro, setAgregarCarro, quitarCarro, setQuitarCarro, vaciarCarro, setVaciarCarro,      cantItems, setCantItems, totalCarro, setTotalCarro, actualImport, setActualImport, cantCarroAux }}  >
            { children }
        </OrdenShopContext.Provider>
    )
}


