
export const StyleFooter = ({ theme }) => {
    return {
        contenFooter: {
            position: 'fixed',
            bottom: '0px',
            left: 0,
            width: '100%',
            minWidth: '248px',
            zIndex:'3',
        },
        footer:{
            py: 1,
            px: 2,
            mt: 'auto',
            display: 'flex',
            justifyContent: 'center',
            position:'relative',
            backgroundColor:  theme.palette.primary.grisFooter,
        },

        contenEnlacesPage:{
            width: {xs:'auto', sm:'100%'},
            maxWidth: {xs:'auto', sm:'100px'},
            height: { xs:'-webkit-fill-available', sm: 'auto'},
            marginBlock: { xs:'0px', sm:'0px'},
            marginLeft: { xs:'0px', sm:'20px'},
            marginBottom:'10px',
            display: 'flex',
            justifyContent: {xs:'center', sm:'center'},
            alignItems: {xs:'center', sm:'flex-start'},
            flexDirection: { xs: 'row', sm: 'column' },
            position: { xs: 'relative', sm: 'absolute' },
            left: '0px',
            gap: {xs:'20px', sm:'3px'},
            // cursor: 'pointer',
        },

        boxEnlacePage: {
            display: 'flex',
            fontSize: '12px',
            width: '75px',
            justifyContent: { xs: 'center', sm:'flex-start'},
            color: theme.palette.primary.manteca,
            '&:hover': {
                color: theme.palette.primary.blanco,
                fontWeight: 900, // Corregido de fontWeigth a fontWeight
            },
        },

        enlace: {
            textDecoration: 'none',
            color: 'inherit',         
        },

        contRedes: {
            maxWidth: '260px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            margin: 'auto',
            // cursor: 'pointer',
        },

        bordeIconoRed: {
            borderRadius: '50%',
            height: '30px',
            width: '30px',
            border: `2px solid ${theme.palette.primary.manteca}`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginInline: '5px',
            marginBlock: '3px',
            cursor: 'pointer',
            '&:hover': {
                borderColor: theme.palette.primary.blanco,
                color: theme.palette.primary.blanco,
                fontWeight: 900, // Corregido de fontWeigth a fontWeight
            },
        },

        iconoRed: {
            fontSize: '20px',
            color: theme.palette.primary.manteca,
            cursor:'pointer',
        }
    }
}