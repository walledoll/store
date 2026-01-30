import { Loading } from "@components/Loading";
import { Product } from "@components/Product";
import { useProducts } from "@hooks/useProducts";
import { Box, Typography, Grid } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';


export const Products = () =>  {
  const { data, isLoading, error } = useProducts();
  if(error) return <div><ErrorIcon /> Error loading products</div>;
  if(isLoading) return <Loading />;
  return (
  <Box sx={{ width: '100%' }}>
    <Typography variant="h4" component="h1" marginY={5} align="center" gutterBottom>
      Products List
    </Typography>
    <Grid 
      container 
      spacing={3} 
      justifyContent="center"
    >
      {data?.products.map((product) => (
        <Grid key={product.id}>
          <Product {...product} />
        </Grid>
      ))}
    </Grid>
  </Box>)
}