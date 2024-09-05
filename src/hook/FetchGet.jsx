

import { useEffect } from "react";


export const useFetchGet = ({ URL, setProducts, pag, setPagTotal, isLoading, setIsLoading }) => {
  useEffect(() => {

    // Muestra el spinner al iniciar la carga de datos
    setIsLoading(true);

    // Realiza la petición fetch
    fetch(URL)
      .then((res) => {
        if (!res.ok) {
          throw new Error("El fetch está con error");
        }
        return res.json();
      })
      .then(data => {
        // console.log('fetch:', data);
        const products= data.products;
        // console.log("DATA products", products)
        // Asegúrate de pasar solo el array de productos
        setProducts(products || []); // Extrae solo el array de productos
        setPagTotal(data.info ? data.info.pages : 1);
      })
      .catch((error) => {
        console.error("Error del fetch:", error);
        // Manejo del error, como mostrar un modal o mensaje
        console.log("Modal ::::::: abrir porque no hay resultados");
      })
      .finally(() => {
        // Oculta el spinner después de completar la petición
        setIsLoading(false);
      });

  }, [pag, URL]);

};

