//@ts-nocheck
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { IconButton, Box } from '@mui/material';

import Home from './pages/Home';
import OnboardingStep1 from './pages/OnboardingStep1';
import OnboardingStep2 from './pages/OnboardingStep2';
import OnboardingStep3 from './pages/OnboardingStep3';
import Login from './pages/Login';
import theme from './theme';
import { OnboardingProvider } from './contexts/OnboardingContext';
import CookingDashboard from './pages/CookingDashboard';
import IPhoneTopBar from './components/IPhoneTopBar';
import LessonPath from './pages/LessonPath';
import Lesson from './pages/Lesson';
import Complete from './pages/Complete';
import Share from './pages/Share';
import Review from './pages/Review';
import MyProfile from './pages/MyProfile';
import Pantry from './pages/Pantry';
import Profile from './pages/Profile';
import Friends from './pages/Friends';
import FriendProfile from './pages/FriendProfile';
import OnboardingStep4 from './pages/OnboardingStep4';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        <Box sx={{ flex: 1 }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/complete" element={<Complete />} />
              <Route path="/login" element={<Login />} />
              <Route path="/lesson" element={<Lesson />} />
              <Route path="/dashboard" element={<CookingDashboard />} />
              <Route path="/lessonpath" element={<LessonPath />} />
              <Route path="/lessonpath/:cuisineId" element={<LessonPath />} />
              <Route path="/share" element={<Share />} />
              <Route path="/review" element={<Review />} />
              <Route path="/myprofile" element={<MyProfile />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/pantry" element={<Pantry />} />
              <Route path="/friends" element={<Friends />} />
              <Route path="/friendprofile/:id" element={<FriendProfile />} />

              {/* nest all onboarding steps under one provider */}
              <Route
                path="/onboarding"
                element={
                  <OnboardingProvider>
                    <Outlet />
                  </OnboardingProvider>
                }
              >
                <Route path="1" element={<OnboardingStep1 />} />
                <Route path="2" element={<OnboardingStep2 />} />
                <Route path="3" element={<OnboardingStep3 />} />
                <Route path="4" element={<OnboardingStep4 />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
