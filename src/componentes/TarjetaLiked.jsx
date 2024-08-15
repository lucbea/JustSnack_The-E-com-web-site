import { useContext } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { BsCartPlus } from "react-icons/bs";
import { Box } from '@mui/material';
import { OrdenShopContext } from '../context/OrdenShop';
import { ThemeCustom } from "../context/ThemeCustom";


export default function TarjetaLiked({ product }) {
  const theme = ThemeCustom();
    const {itemsCarro, setItemsCarro, agregarCarro, setAgregarCarro, ordenCarro, setOrdenCarro, cantItems, setCantItems } = useContext(OrdenShopContext)

    const handleCarShop = (product) => {
        product.cantidadPedida = 1;
        product.totalItem = product.price;
        setAgregarCarro(product);
    }

    return (
        <Card sx={{ maxWidth: '345px', minWidth:'238px', position:'relative', height:'auto', '&:hover': { boxShadow: theme.cardStyle.shadow } }}
        >
            <CardMedia
                component="img"
                height="194"
                image={product.images[0]}
                alt="Paella dish"
                sx = {{position: 'relative', top:'0', width:'100%', height:'200px', paddingTop:'1.5rem', objectFit:'contain'}}
            />
            <Box sx={{position: 'relative', bottom:'0', width:'100%', height:'300px', }}>
                <Box sx={{ display: 'flex', flexDirection:'column',  justifyContent: 'space-between', height: '-webkit-fill-available'}}>
            <CardHeader
                title={<p style={{ fontSize: '20px' }}>{product.title}</p>}
                subheader={product.category}
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {product.id}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        {/* <MoreVertIcon /> */}
                    </IconButton>
                }
            />
            <CardContent sx={{paddingBlock:'0px'}}>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '12px' }}>
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between', paddingInline: '1rem' }}>
                <IconButton
                    sx={{
                        '&:focus': {
                            outline: '0px solid #00000000'
                        },
                        '&:focus-visible': {
                            outline: '0px solid #00000000'
                        },
                    }}
                    aria-label="add to favorites"
                    onClick={() => handleCarShop(product)}//CUIDADO colocar función anónima para evitar bucle infinito
                >
                    <BsCartPlus
                        sx={{
                            outline: 'none',
                        }}
                    />
                </IconButton>         
                <Typography sx={{ fontSize: '28px' }}>{product.price}</Typography>
            </CardActions>
            </Box>
            </Box>
        </Card>
    );
}
