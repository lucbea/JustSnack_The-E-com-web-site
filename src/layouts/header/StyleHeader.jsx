export const StyleHeader = ({ theme }) => {
    return {
        contenItem: {
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            gap: '10px',
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
            [theme.breakpoints.up('sm')]: { 
                display: 'grid',
                gridTemplateColumns: '50px 1fr',
            },
        },

        contenImg: {
            width: '50px',
            height: '50px',
            flewGrow: '1',
        },

        img: {
            width: '100%', 
            height: '100%'
        },

        contenTit: {
            flexGrow: 1,          
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

       
        contenPEC: {
            display: 'flex',
            justifyContent: 'center',
            alignItem: 'center',
            gap: '10px',
            minWidth: '200px',
        },

        footerCarro: {
            borderTop: `1px solid ${theme.palette.primary.borde}`,
            gap: { xs: '15px', sm: '60px' },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '25px',
            paddingBottom: '10px',
            paddingInline: { xs: '1%', sm: '15%' },
            position: 'relative',
        },

        btnFooterCarro: {
            height: '40px',
            borderRadius: '4px',
            bgcolor: theme.palette.primary.verdeBrill,
            fontSize: '12px',
            fontWeight: 900,
            minWidth: '95px',
            padding: { xs: '6px', sm: '6px 16px' },
            '&:hover': {
                bgcolor: theme.palette.primary.doradoClaro,
            },
        }
    }
}