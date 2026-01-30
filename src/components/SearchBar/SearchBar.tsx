import { Box, TextField } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

interface SearchBarProps {
    query: string;
    setQuery: (query: string) => void;
    clearQuery: () => void;
}

export const SearchBar = ({ query, setQuery, clearQuery }: SearchBarProps) => {
    return (
        <Box padding={5} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <TextField
            label="Search Products"
            variant="outlined"
            fullWidth
            margin="normal"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <CloseIcon 
            onClick={clearQuery} 
            sx={{ cursor: 'pointer', verticalAlign: 'middle', marginLeft: 1, color: 'red' }} 
          />
        </Box>
    );
}