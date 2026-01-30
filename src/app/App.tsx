import Products from '@components/Products';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<Products />}>
            <Route path=":id" element={null} />
          </Route>
          
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;