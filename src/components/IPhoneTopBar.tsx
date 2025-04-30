import { Box, Typography } from '@mui/material';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import WifiIcon from '@mui/icons-material/Wifi';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';

export default function IPhoneTopBar() {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            px={2}
            py={1}
            sx={{
                backgroundColor: '#fff',
                fontSize: '0.875rem',
                borderBottom: '1px solid #eee',
            }}
        >
            <Typography variant="body2" fontWeight={600}>
                9:41
            </Typography>

            <Box display="flex" alignItems="center" gap={1.5}>
                <SignalCellularAltIcon sx={{ fontSize: 18 }} />
                <WifiIcon sx={{ fontSize: 18 }} />
                <BatteryFullIcon sx={{ fontSize: 18 }} />
            </Box>
        </Box>
    );
}
