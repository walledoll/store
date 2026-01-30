
import { useProducts } from "./hooks/useProducts";


function App() {
  const { data, isLoading, error } = useProducts();
  return (
  <div>
    {isLoading && <p>Loading...</p>}
    {error && <p>Error loading products</p>}
    {data && (
      <ul>
        {data.products.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    )}
  </div>)
}

export default App
