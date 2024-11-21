export const StyleSpinner = ({ theme }) => {
    return {
        boxMesagge: {
            marginInline: 'auto',
            marginTop: '150px',
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