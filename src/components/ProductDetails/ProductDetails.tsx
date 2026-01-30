import { Modal, Box, Typography, Chip, Grid, Divider, Rating, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import { useNavigate, useParams } from 'react-router';
import { useProductById } from '@hooks/useProducts';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: 700, md: 900 },
  maxHeight: '90vh',
  overflow: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const product = useProductById(id ? parseInt(id) : 0).data;
  const open = !!id;
  
  const handleClose = () => {
    navigate('/products');
  };

  const handleAddToCart = () => {
    console.log('Added to cart:', product);
  };

  if (!product) return null;

  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="product-modal-title"
      aria-describedby="product-modal-description"
    >
      <Box sx={style}>
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Image Gallery */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid >
            <Box
              component="img"
              src={product.images[0]}
              alt={product.title}
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'contain',
                borderRadius: 1,
                bgcolor: 'grey.100'
              }}
            />
          </Grid>
          {product.images.length > 1 && (
            <Grid >
              <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto' }}>
                {product.images.slice(1).map((img, idx) => (
                  <Box
                    key={idx}
                    component="img"
                    src={img}
                    alt={`${product.title} ${idx + 2}`}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: 'cover',
                      borderRadius: 1,
                      flexShrink: 0,
                      cursor: 'pointer',
                      '&:hover': { opacity: 0.8 }
                    }}
                  />
                ))}
              </Box>
            </Grid>
          )}
        </Grid>

        {/* Product Title and Brand */}
        <Typography variant="h4" component="h2" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Brand: {product.brand}
        </Typography>

        {/* Rating */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Rating value={product.rating} precision={0.1} readOnly />
          <Typography variant="body2" color="text.secondary">
            ({product.rating})
          </Typography>
        </Box>

        {/* Price and Buy Button */}
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h4" color="primary">
              ${discountedPrice.toFixed(2)}
            </Typography>
            {product.discountPercentage > 0 && (
              <>
                <Typography
                  variant="h6"
                  sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
                <Chip
                  label={`${product.discountPercentage}% OFF`}
                  color="error"
                  size="small"
                />
              </>
            )}
          </Box>
          
          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            sx={{ minWidth: 150 }}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </Box>

        {/* Tags */}
        {product.tags && product.tags.length > 0 && (
          <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {product.tags.map((tag, idx) => (
              <Chip key={idx} label={tag} size="small" variant="outlined" />
            ))}
          </Box>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Description */}
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <Typography variant="body1" paragraph>
          {product.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Product Details Grid */}
        <Typography variant="h6" gutterBottom>
          Product Details
        </Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid  >
            <Typography variant="body2" color="text.secondary">
              Category
            </Typography>
            <Typography variant="body1">{product.category}</Typography>
          </Grid>
          <Grid  >
            <Typography variant="body2" color="text.secondary">
              SKU
            </Typography>
            <Typography variant="body1">{product.sku}</Typography>
          </Grid>
          <Grid  >
            <Typography variant="body2" color="text.secondary">
              Stock
            </Typography>
            <Typography variant="body1" color={product.stock > 0 ? 'success.main' : 'error.main'}>
              {product.stock} units
            </Typography>
          </Grid>
          <Grid  >
            <Typography variant="body2" color="text.secondary">
              Availability
            </Typography>
            <Typography variant="body1">{product.availabilityStatus}</Typography>
          </Grid>
          <Grid  >
            <Typography variant="body2" color="text.secondary">
              Min Order Quantity
            </Typography>
            <Typography variant="body1">{product.minimumOrderQuantity}</Typography>
          </Grid>
          <Grid  >
            <Typography variant="body2" color="text.secondary">
              Weight
            </Typography>
            <Typography variant="body1">{product.weight} kg</Typography>
          </Grid>
        </Grid>

        {/* Dimensions */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Dimensions
          </Typography>
          <Typography variant="body1">
            {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Shipping and Warranty */}
        <Typography variant="h6" gutterBottom>
          Shipping & Returns
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Shipping Information
          </Typography>
          <Typography variant="body1" paragraph>
            {product.shippingInformation}
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Warranty
          </Typography>
          <Typography variant="body1" paragraph>
            {product.warrantyInformation}
          </Typography>

          <Typography variant="body2" color="text.secondary" gutterBottom>
            Return Policy
          </Typography>
          <Typography variant="body1">
            {product.returnPolicy}
          </Typography>
        </Box>

        {/* Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Customer Reviews ({product.reviews.length})
            </Typography>
            {product.reviews.map((review, idx) => (
              <Box key={idx} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="subtitle2">{review.reviewerName}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(review.date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Rating value={review.rating} size="small" readOnly sx={{ mb: 1 }} />
                <Typography variant="body2">{review.comment}</Typography>
              </Box>
            ))}
          </>
        )}

        {/* Meta Information */}
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="caption" color="text.secondary">
            Barcode: {product.meta.barcode}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Created: {new Date(product.meta.createdAt).toLocaleDateString()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Updated: {new Date(product.meta.updatedAt).toLocaleDateString()}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};