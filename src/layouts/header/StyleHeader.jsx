export const StyleHeader = ({ theme }) => {
    return {
        // borrarBox: {
        //     margin: 0,
        //     padding: 0,
        //     boxSizing: 'border-box',
        // },
        encabez: {
            
        },

        contenItem: {
            // backgroundColor: 'pink',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap', // Permite que los elementos se envuelvan en múltiples filas
            gap: '10px',     // Espaciado entre elementos
            // padding: '10px',
            minWidth: '244px',
            boxShadow: theme.palette.primary.bordeItemCarro,
            maxWidth: '900px !important',
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                flexDirection: 'row',
            },

        },

        contenItemBreakPoint: {
            width: '100%',

            [theme.breakpoints.up('sm')]: {
                display: 'flex',
                flexDirection: 'row',
            },
        },

        contenEncab: {
            display: 'grid',
            gridTemplateColumns: '50px 1fr 35px',
            gap: '10px',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            // height: '100px',
            // backgroundColor: theme.palette.primary.dorado,
            // backgroundColor:'orange',
            [theme.breakpoints.up('sm')]: { // Correct use of media queries
                // backgroundColor: 'green',
                display: 'grid',
                gridTemplateColumns: '50px 1fr',
                // display:'flex',
                // flexDirection:'column',
            },
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
            // backgroundColor: 'lightcoral',
            padding: '8px',
            height: 'fit-content',
        },

        tit: {
            fontSize: '16px',

        },

        parrafo: {
            margin: '0px',
            textWrap: 'wrap',
            fontSize: '12px',
            color: theme.palette.primary.grisCarroFont,
        },

        span: {},

        contenPEC: {
            display: 'flex',
            justifyContent: 'center',
            alignItem: 'center',
            gap: '10px',
            minWidth: '200px',
        },

        footerCarro: {
            borderTop: `1px solid ${theme.palette.primary.borde}`,
            
            gap: {xs:'15px', sm:'60px'},
            display: 'flex',
            flexDirection: {xs:'column', sm:'row'},
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop:'25px',
            paddingBottom: '10px',
            paddingInline: {xs:'1%', sm:'15%'},
            position:'relative',
            // [theme.breakpoints.up('xs')]: { // Correct use of media queries
            //     // backgroundColor: 'green',
            //     // justifyContent: 'spa', 
            //     gap: '60px',
            //     paddingInline: '15%',
            //     // display:'flex',
            //     flexDirection:'row',
            // },
        },

        btnFooterCarro: {
            height: '40px',
            borderRadius: '4px',
            bgcolor: theme.palette.primary.doradoClaro,
            fontSize: '12px',
            fontWeight: 900,
            minWidth: '95px',
            padding: {xs:'6px', sm:'6px 16px'},
            '&:hover': {
                bgcolor: theme.palette.primary.verdeBrill,
            },
        }










        //************************ */
        //         contTitFilt: {
        //             display: 'flex',
        //             justifyContent: 'space-between',
        //             alignItems: 'center',
        //             '@media (maxWidth: 650px)': {
        //                 display: 'flex',
        //                 flexDirection: 'column',

        //             },
        //         },

        //         tableContainer: {
        //             overflowY: 'auto',
        //             position: 'relative'
        //         },

        //         table: {
        //             minWidth: '200px',
        //         },

        //         tableHead: {
        //             position: 'sticky',
        //             top: '-1px',
        //             zIndex: 1,
        //             // backgroundColor: theme.palette.primary.bgTableHead,
        //             '@media (max-width: 650px)': {
        //                 position: 'relative',
        //                 height: '0px',
        //                 display: 'none'
        //             }
        //         },
        //         tableRowHead: {
        //             height: '35px',
        //             '@media (max-width: 650px)': {
        //                 height: '0px'
        //             }
        //         },

        //         tableCellTarea: {
        //             padding: '3px',
        //             paddingLeft: '30px',
        //             height: '35px',
        //             width: '50%',
        //             fontSize: '14px',
        //             // color: theme.palette.primary.textColor,
        //             borderBottom: '0px solid #00000000',
        //             '@media (max-width: 650px)': {
        //                 display: 'none',
        //                 height: '0px'
        //             }
        //         },
    }
}