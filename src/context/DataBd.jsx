import React, { createContext, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuidv4 } from 'uuid';


export const DataBDContext = createContext();

export const DataBDProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const getAllData = async () => {
      try {
      const collectionReference = collection(db, "product");
      const dataArrayBD = await getDocs(collectionReference);
      const newProductsArray = dataArrayBD.docs.map((objeto) => {
        return { ...objeto.data() };
      });
      setProducts(newProductsArray);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    } finally {
      setLoadingProducts(false); 
    }
  };
    getAllData();
  }, []); 


  const arrayProdInic = [
    {
      cargado: false,
      nomb: "Almendras",
      prec: 6800, desc: "Nuestras almendras, seleccionadas rigurosamente, de calidad premium, pensadas para aquellos que no renuncian al sabor mientras buscan opciones saludables y nutritivas.", 
      descLarga: "Aporta fibra, proteína vegetal energizante y grasas saludables. Cada almendra es un tributo a la calidad. Provenientes de los mejores cultivos, conservan todos sus nutrientes naturales lo que las convierte en un alimento ideal para recargar energías de manera saludable. Su versatilidad culinaria permite realzar ensaladas, granolas, postres o disfrutarlas como snack. Presentaciones: 250gr., 500gr., 1kg y por mayor ", 
      categ: "Seco", 
      provID: "1", 
      present: "250g", 
      stock: 44, 
      img: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgHjfyDUWCxQpPz3JC9OEILZ2t_0k7tvdu8XUYH-8VM4otXWHHF6MbmtaAu7X3EIyWtywdE4ytPt_aj1gEfq73LC0EmmAxUAfehdebpycktzbQpYUQ5ARbFDKS70WN86iSYk8bghNrFpLqf_EHMppW_ZzxuPgmh1Lp5F0r5iohAzvlZe-wo1As3bVTRPa8w/w528-h528/almendras.png",
    }, 
    { 
      cargado: false, 
      nomb: "Ananá deshidratado", 
      prec: 12000, 
      desc: "Ananás seleccionados, aportan sabor intenso, tropical y textura crujiente. Ideales para entre horas y combinado con yogur. Perfecto para coctelería, pastelería, chocolatería y mezclas dietéticas. Sin gluten. Sin azúcar,  grasas  ni conservantes añadidos.", 
      descLarga: "Aporta vitaminas, minerales, fibra y enzimas, como la bromelina, que resultan excelentes para el sistema digestivo, lo que ayuda a mantener el peso ideal y una nutrición equilibrada.  Presentaciones: 250gr., 500gr., 1kg y por mayor.", 
      categ: "Deshidratado", 
      provID: "2", 
      present: "250g", 
      stock: 10, 
      img: "https://blogger.googleusercontent.com/img/a/AVvXsEiVcKlAFSPdg1yJHyiuryuabIxoSdeJ3H6CYfNPd5EWDwtxULtnZMuRX3b6QeixThY3ZktBw0ux6RWyb_4zyDUnSBRsvz-GoanmK-4-6OIU8D-WHo1Ff7ytGRMV7kog52xaT11wjdmftPn2SLpVFgJLZ_2cLTQ8jlA3RsYWegYVlxEJRUGIGbuYzmt5MTG_=w537-h537", 
    }, 
    { 
      cargado: false, 
      nomb: "Arándano deshidratado", 
      prec: 9000, 
      desc: "Nuestros arándanos son una delicia para tu paladar… una opción nutritiva y llena de energía que te acompañará en tus momentos diarios. Sin gluten. Sin azúcar,  grasas  ni conservantes añadidos.", 
      descLarga: "Elaborados con arándanos cuidadosamente seleccionados, obteniendo una textura crujiente y exquisita. Tienen un gran poder antioxidante y destacan por su poder defensivo contra las enfermedades cardiovasculares. Previenen la acumulación de plaquetas reduciendo la presión arterial. Presentaciones: 250gr., 500gr., 1kg y por mayor.", 
      categ: "Deshidratado", 
      present: "250g", 
      provID: "3", 
      stock: 18, 
      img: "https://blogger.googleusercontent.com/img/a/AVvXsEjci5ygmsCTDIQdEbLFkcTmzx_8dKDNZlBrjGi-HD5C9-0I0mOY85z6l9Y_sewfeMPlh2-WN0NO6PnlEgfAk1yEPvHnDaXLqHkoR1bGv12uffkd_0t_WMLnbq8rnAcFMMfJpmOBvWNwBFWeCeTkfSaC7vFiXrDj0ED8smX33yBO1_GycIo2uNKPnxXECFZB=w538-h538", 
    }, 
    { 
      cargado: false, 
      nomb: "Banana deshidratada", 
      prec: 3500, 
      desc: "Bananas finamente laminadas. Son un aperitivo único y crujiente que te ofrece una experiencia diferente en cada bocado. Sin gluten. Sin azúcar,  grasas  ni conservantes añadidos. ", 
      descLarga: "Elaborados con ingredientes seleccionados, estos chips ofrecen un sabor intenso y una textura crujiente que los convierte en una opción idea de snack. Fuente de vitaminas A, C, B6 y ácido fólico, fósforo, calcio, potasio y proteínas. Presentaciones: 250gr., 500gr., 1kg y por mayor.", 
      categ: "Deshidratado", 
      present: "250g", 
      provID: "1", 
      stock: 55, 
      img: "https://blogger.googleusercontent.com/img/a/AVvXsEh_4c9XDEO60xvmRUM5AFvQRa5MMw6jUs1lIH2ghbhaRhQs-cB6YTB0A9fqgdts8ptZ7CKHZ-ubT3nc8BB0TfilEM0q83c0Set624LCybJrUAUVGEOvMeu2osFjDFzxFoAhcYUGvKyNgfkUiDaGMSN5QY58OR0PfeqW3guiLgU6WuyfYT077TocmDcSYB0Y=w569-h534", 
    }, 
    { 
      cargado: false, 
      nomb: "Frutilla deshidratada", 
      prec: 4200, 
      desc: "Frutillas seleccionadas finamente laminadas, aportan sabor intenso, dulce y textura crujiente. Ideales para entre horas y combinadas con yogur.", 
      descLarga: "Cada lámina ofrece una dulzura vibrante y una textura crujiente que es ideal para una variedad de aplicaciones. Perfectas para coctelería, pastelería, chocolatería y mezclas dietéticas; nuestras frutillas deshidratadas aportan un toque de sofisticación a cualquier receta. Rica en vitamina C y antioxidantes, ideal para una dieta equilibrada. Sin gluten. Sin azúcar,  grasas  ni conservantes añadidos. Presentaciones: 250gr., 500gr., 1kg y por mayor.", 
      categ: "Deshidratado", 
      present: "250g", 
      provID: "2", 
      stock: 43, 
      img: "https://blogger.googleusercontent.com/img/a/AVvXsEiuFwQZteoeU1I_cNXFAqME4THgHWB-0wdItEgmcbx6Z8OuDgONmsO27QAt3AlJ_YDRCQQN01lQX_V5FJbzWsB4bi0w81Yge5iuQPbMBax0eMCYgXXcZd4e1kPvDIyVQ3GTYXuDnH6a6PzQz_jK_umxHPf4dC7FL1I2YKeGR1b_rNZD3kBI_Y8MjdtqxNfa=w536-h536", 
    }, 
    {
      cargado: false, 
      nomb: "Limón deshidratado", 
      prec: 2000, 
      desc: "Excelentes como condimento en la cocina, cocktails o potenciador del sabor en repostería. Además puede utilizarse como aromatizante, incienso o ambientador natural ideal para el hogar.", 
      descLarga: "Solo utilizamos limones frescos de la más alta calidad, seleccionados a mano para asegurar un producto superior. Rico en vitamina C y antioxidantes, ideal para una dieta equilibrada. También puedes utilizarlo como aromatizante natural. Sin gluten. Sin azúcar,  grasas  ni conservantes añadidos. Presentaciones: 20 unidades, 250gr., 500gr., 1kg y por mayor.", 
      categ: "Deshidratado",
      present: "20 un.", 
      provID: "1", 
      stock: 37, 
      img: "https://blogger.googleusercontent.com/img/a/AVvXsEgJvU-tQd9bbNsy-bxBqqS4Y-mE634MAQpadl5i7dVa6tekKb1_PULsJrOGHm8OU3QeLG52sOI8GazKP5vs4s3umrwUBJxOtdakKTS8EyC733RrKF55lDKlMIVKHE_9Qj7LPLKuWlbZsVS6yeFtqBcwFxfh98n4sUD5VG9n7DXht0S16Um4ICbdR5NJ5O1f=w531-h531",
    }, 
    { 
      cargado: false, 
      nomb: "Manzana deshidratada", 
      prec: 4200, 
      desc: "Manzanas finamente laminadas, ideales para consumir en viajes o entre horas, como un snack saludable  o como complemento de preparaciones de cocina. Sin gluten. Sin azúcar,  grasas  ni conservantes añadidos.", 
      descLarga: "La manzana deshidratada es un producto con grandes beneficios para el organismo. Este aperitivo posee grandes propiedades antioxidantes por su alto contenido en vitaminas C y E. También es rico en fibra, hidratos de carbono y minerales como el potasio, que favorece la eliminación de líquidos, sodio y toxinas internas. Presentaciones: 250gr.,  500gr., 1kg y por mayor.", 
      categ: "Deshidratado", 
      present: "250g", 
      provID: "2", 
      stock: 50, 
      img: "https://blogger.googleusercontent.com/img/a/AVvXsEi70u145TKYbZVG1AjkOBCwjScrUWwNWPA-H1wK1rQy_2XiiPGhCaSHI-8zMpb9ajjMRRr4plnci7XDLH6ffq8Ts9zyf8UW7bCjdu1dVSe7YrAIfbFmqynfc3psiYaNtHAPMeVoJGw0Y7XlAMik8SdKRy0vwk7ogymVwf9WlkNi_Hsxpysl_tLkr5_SqYTN=w527-h527", 
    }, 
    {
      cargado: false, 
      nomb: "Naranja deshidratada",
      prec: 5500,
      desc: "Naranjas seleccionadas. Proporcionan sabor dulce y refrescante. Excelentes para cocktelería, pastelería, como snack y aromatizante del hogar. Sin gluten. Sin azúcar,  grasas  ni conservantes añadidos.",
      descLarga: "Nuestras rodajas se deshidratan mediante un proceso especializado que conserva su sabor natural, aroma y nutrientes. Cada rodaja de naranja ofrece un equilibrio perfecto entre dulzura y acidez, con una textura crujiente y refrescante que es ideal para una variedad de aplicaciones. Rica en fibra y antioxidantes. Ideal para una dieta equilibrada. Presentaciones: 20unidades, 250gr., 500gr., 1kg y por mayor.",
      categ: "Deshidratado",
      present: "20 unidades",
      provID: "3",
      stock: 52,
      img: "https://blogger.googleusercontent.com/img/a/AVvXsEiQedVOdQP99gS1LDdS8KHYIoTWYe9tjoGtQibDuCgqH9Jv-0-EZRd5lHInFdOtNn1uKJTyqFDnRs6aF1Z0M3potzcgR4HuDmJDkLEigzldUyey6sbCvcOYhyHJyUuPrRiwS7PdTYrz5semHFakCi3T7Q_Hvnbng4lSuIu2lDJFIXSD8xjGxTDB4DSB-FJz=w534-h534",
    },
    {
      cargado: false,
      nomb: "Nueces",
      prec: 5400,
      desc: "Variedad de nuez entera, destacada para aprovechar sus aceites naturales cardioprotectores. De sabor y textura suave. Ideal para consumir como colación saludable o para usos culinarios variados. ",
      descLarga: "Nuestras nueces pueden colaborar en reducir el riesgo de enfermedades cardíacas al mejorar los niveles de colesterol y triglicéridos en la sangre. Sus ácidos grasos omega-3 y antioxidantes pueden beneficiar la función cerebral, mejorar la memoria y reducir el riesgo de enfermedades neurodegenerativas. Su contenido de minerales como el calcio, magnesio y fósforo contribuyen a la salud ósea y previenen la osteoporosis. La fibra presente en las nueces promueve la salud intestinal al mejorar la digestión y prevenir el estreñimiento. Presentaciones: 250gr., 500gr., 1kg y por mayor.",
      categ: "Seco",
      present: "250g",
      provID: "1",
      stock: 6,
      img: "https://blogger.googleusercontent.com/img/a/AVvXsEinh9VIqYtia_I6VMSVMzKfdCreMZQcn4pmWPpAsZ7WvpVDwBmNXpkSkne5x4ME4uMG4LVTTLe3rdi10-w_v0C5Gknx2YVHE8s-UJK9Ri-LjYZfdgZPdn2DIvABah4gx8bWzHHiAibKQ5LyXI7E4-eE6oOzeohAjrAIhzUHzQL0XKDlCcqUoyatST__thIT=w533-h533",
    },
    {
      cargado: false,
      nomb: "Pasas negras",
      prec: 2700,
      desc: "Excelente snack saludable ricas en fibra, brindan saciedad por más tiempo y ayudan a regularizar el tránsito intestinal. Aportan potasio y hierro.",
      descLarga: "Como snack saludable. Ideales para acompañar algún yogur, ensaladas, budines, barritas de cereal, frutos secos, panes, cookies, pancakes.A su vez también utilizadas en preparaciones saladas: pastel de papas, empanadas o tamales. Endulzar licuados o utilizar en bebidas fermentadas. Presentaciones: 250gr., 500gr., 1kg y por mayor.",
      categ: "Deshidratado",
      present: "250g",
      provID: "3",
      stock: 9,
      img: "https://blogger.googleusercontent.com/img/a/AVvXsEiKhvl4uYYbklg1L95zQ7XmWO3KyNboaDFrYPJToQc1tIdAnbF5o0cGekMZTB51b7PAEOIkVYpj2R6UkCh6ll4YtKRXmEjAjhXX4bJ709nDME20-wBT7F09rUphAJqh1HhYG5nyzGj_VaJsxJ_7LxlNC9iB4Kk1t3XAKdzGzSHObpNtX0Q4afubxbM6zH4G=w535-h535",
    }
  ];


  let inicializacionRealizada = false;
  
  // Función para inicializar datos en la base de datos
  const inicializarDataBD = async () => {
    const largo = arrayProdInic.length;
    if (!inicializacionRealizada) {
      inicializacionRealizada = true;
      for (let i = 0; i < largo; i++) {
        if (arrayProdInic[i].cargado === false) {
          arrayProdInic[i].cargado = true;
          const identif = uuidv4();
          let data = {
            id: identif,
            nombre: arrayProdInic[i].nomb,
            precio: arrayProdInic[i].prec,
            descripcion: arrayProdInic[i].desc,
            descripcionLarga: arrayProdInic[i].descLarga,
            categoria: arrayProdInic[i].categ,
            presentacion: arrayProdInic[i]. present,
            proveedorID: arrayProdInic[i].provID,
            stock: arrayProdInic[i].stock,
            imagen: arrayProdInic[i].img,
            descuento: "false",
            valorDescuento:"",
            x: "",
            y: "",
            z: "",
          };
          const collectionRef = doc(db, "product", identif);
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
        return docSnap.data(); 
      } else {
        return null; 
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      return null; 
    }
  };

  const setOneData = async (queTabla, id, agregModif) => {
    try {
      const docRef = doc(db, queTabla, id);
      if (agregModif) {
        await setDoc(docRef, agregModif, { merge: true });
      } else {
        await setDoc(docRef);
      }
    } catch (error) {
      console.error('Error al actualizar el stock en Firestore: ', error);
    }
  }

  return (
    <DataBDContext.Provider
      value={{
        products,
        setProducts,
        getOneData,
        setOneData, 
        loadingProducts, 
        setLoadingProducts
      }}
    >
      {children}
    </DataBDContext.Provider>
  );
};
