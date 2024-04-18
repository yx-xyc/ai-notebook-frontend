// material-ui
import { Box } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';

// ==============================|| LOADER ||============================== //

const Loader = () => (
    <Box sx={{ position: 'fixed', top: 0, left: 0, zIndex: 1301, width: '100%' }}>
        <LinearProgress color="primary" />
    </Box>
);

export default Loader;
