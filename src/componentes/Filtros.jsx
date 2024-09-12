
import Box from '@mui/material/Box';
import { BsSearch } from "react-icons/bs";

export const Filtros = () => {
    const handleWord = (e) => {
        let URLAux = `${URLBase}?name=${e.target.value}`;
        // console.log("handleWord", URLAux);
        // console.log("handleWord", e.target.value);
        setURL(URLAux);
    }

    return (
        <>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '49% 49%', sm: 'auto 58%' },
                    gap: '2%',
                    minWidth: '248px',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    maxWidth: '650px',
                    marginInline: 'auto'
                }}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        minWidth: '200px'
                    }}>
                    <select name="categ" id="categ"
                        style={{
                            padding: '6px 10px',
                            fontSize: '12px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            width: { xs: '100%', sm: '-webkit-fill-available' },
                        }}>
                        <option value="todas">Todos</option>
                        <option value="secos">Frutos Secos</option>
                        <option value="deshidratados">Deshidratados</option>
                    </select>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        position: 'relative'
                    }}>
                    <BsSearch
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '10px',
                            transform: 'translateY(-50%)',
                            color: '#999'
                        }}
                    />
                    <input
                        type="text"
                        onChange={handleWord}
                        style={{
                            padding: '5px 10px 5px 35px',
                            fontSize: '14px',
                            width: 'inherit',
                            border: '1px solid #ccc',
                            borderRadius: '4px'
                        }}
                        placeholder="Buscar..."
                    />
                </Box>
            </Box>
        </>
    );
}
