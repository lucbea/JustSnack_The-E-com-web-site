export const StyleUserOrders = ({ theme }) => {
    return {
        contentTabla: {
            maxWidth: '900px',
            margin: 'auto',
            minWidth: '248px',
            paddingInline: '8px', 
            paddingBottom: '40px',
        },

        bordeTabla: {
            width: '100%',
            height: '2px',
            borderBottom: theme.tabla.delimitaSolid
        },

        encabItem: {
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr'
        },

        contentBox: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },

        contentDate: {
            display: 'flex',
            alignItems:'center',
            paddingLeft: {xs:'0px', sm:'20px'}
        },

        boxFechMontOrd: {
            padding: '6px',
            fontSize: '10px',
            textAlign: 'center'
        },

        boxPrice: {
            fontSize: '12px',
            fontWeight: 800
        },

        bordeItem: {
            borderTop: theme.tabla.delimita, 
            borderBottom: theme.tabla.delimita, 
        },

        boxItem:{
            width: '100%', 
            display: 'flex', 
            justifyContent: 'space-between' 
        },

        orderNomb: {
            fontSize: '12px',
            width: '50%',
            padding: '6px',
            textAlign: 'left',
            paddingLeft: {xs:'8px', sm:'16px', md:'8%' }
        },

        spanCodItem: {
            fontSize: '8px',
            marginLeft: '10px'
        },

        orderCantSubtot: {
            fontSize: '12px',
            width: '25%',
            padding: '6px',
            textAlign: 'center'
        },

        contentMontTot: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingRight: {xs:'0px', sm:'20px'}
        },

        contentMontAcum: {
            width:'50%',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: '10px',
            marginLeft: 'auto',
            paddingRight: {xs:'0px', sm:'20px'}
        },

        boxStringMontAcum: {
            padding: '6px',
            fontSize: '10px', 
            textAlign: 'center'
        },

        boxNumberMontAcum: {
            padding: '6px',
            fontSize: '12px',
            textAlign: 'center',
            fontWeight: 800
        },

        boxMesagge: {
            marginInline: 'auto',
            marginTop: '20px',
            marginBottom: '5px',
            padding: '20px',
            backgroundColor: theme.palette.primary.blanco,
            color: theme.palette.primary.negro87,
            borderRadius: '4px',
            boxShadow: theme.palette.primary.sombraBox,
            maxWidth: '600px',
        },

        contentSpinner: {
            width: '40px',
            height: '40px',
            margin: 'auto',
            marginTop: '50px',
            objectFit: 'cover',
            filter: 'drop-shadow(0 0 3px #595f7e) drop-shadow(0 0 2px grey)'
        },

        imgSpinner: {
            display: 'block',
            margin: 'auto',
            width: '100%'
        }
    }
}