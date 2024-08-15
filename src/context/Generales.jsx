import React, { createContext, useEffect, useState } from "react";

export const GeneralesContext = createContext();

export const GeneralesProvider = ({children}) => {
    const [ openModal, setOpenModal ] = useState(false);
    const [ widthWin, setWidthWin ] = useState(window.innerWidth);
    const [ heightWin, setHeightWin ] = useState(window.innerHeight);

  
    useEffect(() => {
        const handleResize = () => {
            setWidthWin(window.innerWidth);
            setHeightWin(window.innerHeight);
        };

        // Agregar el event listener para el resize
        window.addEventListener('resize', handleResize);

        // Ejecutar la función al montar el componente
        handleResize();

        // Limpiar el event listener al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        console.log("está abierta la modal");
        console.log(`Ancho de pantalla: ${widthWin}, Alto de pantalla: ${heightWin}`);
    }, [openModal, widthWin, heightWin]);

    return (
        <GeneralesContext.Provider value = {{ openModal, setOpenModal, widthWin, setWidthWin, heightWin, setHeightWin }}  >
            { children }
        </GeneralesContext.Provider>
    )
}


