
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
      .then((data) => {
        // Actualiza el estado con los datos recibidos
        setProducts(data.products);
        // Ajusta el total de páginas (puedes descomentar si es necesario)
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

