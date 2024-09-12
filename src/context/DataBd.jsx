
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { v4 as uuidv4 } from 'uuid';

export const DataBDContext = createContext();

export const DataBDProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // inicializarDataBD();
    const getAllData = async () => {
      const collectionReference = collection(db, "product");
      const dataArrayBD = await getDocs(collectionReference);

      const newProductsArray = dataArrayBD.docs.map((objeto) => {
        return { ...objeto.data() };
      });
      console.log(newProductsArray);
      setProducts(newProductsArray);
      console.log(products);
    };
    getAllData();

  }, []); // Solo ejecuta una vez al montar el componente

  // Datos iniciales para cargar en la base de datos

  const getTodaTabla = async (queTabla) => {
    console.log("ingresé a getTodaTabla", queTabla)
    const collectionReference = collection(db, queTabla);
    const dataBD = await getDocs(collectionReference);
    return dataBD;
  }


  const arrayProdInic = [
    {
      cargado: false,
      nomb: "anillo",
      prec: 142,
      desc: "Anillo de plata",
      descLarga: "Anillo de plata 925 con diseño elegante.",
      categ: "plata 925",
      provID: "1",
      stock: 4,
      img: "https://cuadrifoglio.com.ar/wp-content/uploads/2018/08/811PU019-480x480.jpg",
    },
    {
      cargado: false,
      nomb: "pulsera",
      prec: 95,
      desc: "Pulsera de acero",
      descLarga: "Pulsera de acero con diseño trenzado.",
      categ: "oro",
      provID: "2",
      stock: 10,
      img: "https://cuadrifoglio.com.ar/wp-content/uploads/2018/08/811PU019-480x480.jpg",
    },
    {
      cargado: false,
      nomb: "cadena con anillo",
      prec: 210,
      desc: "Cadena de acero inoxidable",
      descLarga: "Cadena resistente de acero inoxidable con acabado brillante.",
      categ: "acero",
      provID: "3",
      stock: 8,
      img: "https://dcdn.mitiendanube.com/stores/716/643/products/an000241-9310d84e9812155f3f15385222437966-640-0.webp",
    },
    {
      cargado: false,
      nomb: "aros",
      prec: 75,
      desc: "Aros de plata",
      descLarga: "Aros pequeños de plata 925 con diseño minimalista.",
      categ: "plata 925",
      provID: "1",
      stock: 15,
      img: "https://cuadrifoglio.com.ar/wp-content/uploads/2018/08/327AR037.jpg",
    },
    {
      cargado: false,
      nomb: "anillo",
      prec: 180,
      desc: "Anillo de oro",
      descLarga: "Anillo de oro blanco 14 quilates con piedra blanca.",
      categ: "oro",
      provID: "2",
      stock: 3,
      img: "https://cuadrifoglio.com.ar/wp-content/uploads/2018/09/edicion2.jpg",
    },
    {
      cargado: false,
      nomb: "pulsera",
      prec: 120,
      desc: "Pulsera de plata",
      descLarga: "Pulsera de plata 925 con diseño entrelazado.",
      categ: "plata 925",
      provID: "1",
      stock: 7,
      img: "https://cuadrifoglio.com.ar/wp-content/uploads/2018/08/811PU029X-600x600.jpg",
    },
    {
      cargado: false,
      nomb: "cadena",
      prec: 300,
      desc: "Cadena de oro blanco",
      descLarga: "Cadena elegante de oro blanco 18 quilates con eslabones finos.",
      categ: "oro",
      provID: "2",
      stock: 5,
      img: "https://cuadrifoglio.com.ar/wp-content/uploads/2018/09/222PU010-600x600.jpg",
    },
    {
      cargado: false,
      nomb: "cadena",
      prec: 50,
      desc: "Cadena plata",
      descLarga: "Cadena de plata con diseño geométrico.",
      categ: "acero",
      provID: "3",
      stock: 12,
      img: "https://cdn.oiritaly.it/image-storage/628c4f8d-4edd-4f7b-97fd-ceeafa5bd2e5/prod%7Cimg_default",
    },
    {
      cargado: false,
      nomb: "anillo",
      prec: 160,
      desc: "Anillo de plata y circonita",
      descLarga: "Anillo de plata 925 con incrustaciones de circonitas blancas.",
      categ: "plata 925",
      provID: "1",
      stock: 6,
      img: "https://dcdn.mitiendanube.com/stores/716/643/products/an000241-9310d84e9812155f3f15385222437966-640-0.webp",
    },
    {
      cargado: false,
      nomb: "pulsera",
      prec: 85,
      desc: "Pulsera de acero y cuero",
      descLarga: "Pulsera de acero inoxidable y cuero negro con cierre magnético.",
      categ: "acero",
      provID: "3",
      stock: 9,
      img: "https://cuadrifoglio.com.ar/wp-content/uploads/2018/08/811PU018-14-600x600.jpg",
    }
  ];


  let inicializacionRealizada = false;

  // Función para inicializar datos en la base de datos
  const inicializarDataBD = async () => {
    const largo = arrayProdInic.length;
    if (!inicializacionRealizada) {
      inicializacionRealizada = true;
      for (let i = 0; i < largo; i++) {
        console.log("CARGADO ANTES", arrayProdInic[i].cargado)
        if (arrayProdInic[i].cargado === false) {
          arrayProdInic[i].cargado = true;
          console.log("CARGADO DESPUes", arrayProdInic[i].cargado, "********************************************")
          const identif = uuidv4();
          let data = {
            id: identif,
            nombre: arrayProdInic[i].nomb,
            precio: arrayProdInic[i].prec,
            descripcion: arrayProdInic[i].desc,
            descripcionLarga: arrayProdInic[i].descLarga,
            categoria: arrayProdInic[i].categ,
            proveedorID: arrayProdInic[i].provID,
            stock: arrayProdInic[i].stock,
            imagen: arrayProdInic[i].img,
            w: "",
            x: "",
            y: "",
            z: "",
          };
          const collectionRef = doc(db, "product", identif);
          console.log("]]]]]]]]74]]]]]]]]", data);
          await setDoc(collectionRef, data);
        }
      }
    }
  }

  const getOneData = async (queTabla, id) => {
    try {
      const docRef = doc(db, queTabla, id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data(); // Retorna los datos del documento
      } else {
        console.log("No encontró data!");
        return null; // Retorna null si no se encuentra el documento
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      return null; // Retorna null en caso de error
    }
  };

  const setOneData = async (queTabla, id, agregModif) => {
    console.log("entré a setOneData", "que tabla", queTabla, id, agregModif)
    try {
      const docRef = doc(db, queTabla, id);
      if (agregModif) {
        console.log("se agregó a tabla", queTabla, "en el id", id, "los datos", agregModif);
        await setDoc(docRef, agregModif, { merge: true });
    } else {
        console.log("se agregó a tabla", queTabla, "los datos del id", id);
        await setDoc(docRef);
    }
    } catch (error) {
      console.error('Error al actualizar el stock en Firestore: ', error);
    }

  }

  const updateProductStock = async (productId, newStock) => {
    try {
      const docRef = doc(db, 'products', productId);

      // Actualiza el campo 'stock' del documento
      await updateDoc(docRef, {
        stock: newStock
      });

      console.log('Stock actualizado con éxito en Firestore');
    } catch (error) {
      console.error('Error al actualizar el stock en Firestore: ', error);
    }
  };










  return (
    <DataBDContext.Provider
      value={{
        products,
        setProducts,
        getOneData,
        setOneData,
      }}
    >
      {children}
    </DataBDContext.Provider>
  );
};
