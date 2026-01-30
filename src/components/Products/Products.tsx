import ErrorIcon from '@mui/icons-material/Error';
import { useProducts } from "../../hooks/useProducts";
import { Loading } from "../Loading/Loading";
import { Product } from "../Product/Product";
import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ProductDetails } from '@components/ProductDetails';
import { useMemo, useState } from 'react';
import { SearchBar } from '@components/SearchBar/SearchBar';

export const Products = () => {
  const { data, isLoading, error } = useProducts();

  const [query, setQuery] = useState("");

  const clearQuery = () => setQuery("");

  const filteredProducts = useMemo(() => {
    return data?.products.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [data?.products, query]);
  
  if(error) return <div><ErrorIcon /> Error loading products</div>;
  if(isLoading) return <Loading />;
  
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" marginY={5} align="center" gutterBottom>
        Products List
      </Typography>

      <Container maxWidth="lg">
        <SearchBar query={query} setQuery={setQuery} clearQuery={clearQuery} />
        <Grid 
          container 
          spacing={3} 
          justifyContent="center"
        >
          {query === "" ? data?.products.map((product) => (
            <Grid key={product.id}>
              <Product {...product} />
            </Grid>
          )) : filteredProducts?.map((product) => (
            <Grid key={product.id}>
              <Product {...product} />
            </Grid>
          ))}
        </Grid>
      </Container>
      
      {data && <ProductDetails />}
    </Box>
  );
}