export const StyleHeader = ({ theme }) => {
    return {
        borrarBox: {
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
        },

        contenItem: {
            // backgroundColor: 'pink',
            display: 'flex',
            flexWrap: 'wrap', // Permite que los elementos se envuelvan en múltiples filas
            gap: '10px',     // Espaciado entre elementos
            // padding: '10px',
            minWidth: '244px',
            
        },

        contenEncab: {
            display: 'grid',
            gridTemplateColumns: '50px 1fr 40px',
            gap: '10px',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            // height: '100px',
            // backgroundColor: theme.palette.primary.dorado,
        },

        contenImg: {
            width: '50px',
            height: '50px',
            flewGrow: '1',
           
        },

        img: {
            width: '100%', height: '100%'
        },

        contenTotDatos: {
            // `@media (maxWidth: ${theme.brakpoints.sm})`: {
            //     display: 'flex',
            //     flexDirection: 'column',
            // },
        },

        contenTit: {
            flexGrow: 1,
            backgroundColor: 'lightcoral',
            padding: '8px',
            height: 'fit-content',
        },

        tit: {
            fontSize: '18px',
        },

        parrafo: {
            margin: '0px',
            textWrap: 'wrap',
            fontSize: '12px',
            color: theme.palette.primary.grisCarroFont,
        },

        span: {},

        contenPEC: {
            display:'flex',
            justifyContent: 'center',
            alignItem: 'center',
            gap: '10px',
        },










        //************************ */
        contTitFilt: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            '@media (maxWidth: 650px)': {
                display: 'flex',
                flexDirection: 'column'
            },
        },

        tableContainer: {
            overflowY: 'auto',
            position: 'relative'
        },

        table: {
            minWidth: '200px',
        },

        tableHead: {
            position: 'sticky',
            top: '-1px',
            zIndex: 1,
            // backgroundColor: theme.palette.primary.bgTableHead,
            '@media (max-width: 650px)': {
                position: 'relative',
                height: '0px',
                display: 'none'
            }
        },
        tableRowHead: {
            height: '35px',
            '@media (max-width: 650px)': {
                height: '0px'
            }
        },

        tableCellTarea: {
            padding: '3px',
            paddingLeft: '30px',
            height: '35px',
            width: '50%',
            fontSize: '14px',
            // color: theme.palette.primary.textColor,
            borderBottom: '0px solid #00000000',
            '@media (max-width: 650px)': {
                display: 'none',
                height: '0px'
            }
        },
    }
}