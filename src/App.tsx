import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CourseCatalog from "./pages/CourseCatalog";
import CourseOverview from "./pages/CourseOverview";
import LessonPage from "./pages/LessonPage";
import ProgressReport from "./pages/ProgressReport";
import Achievements from "./pages/Achievements";
import QuizzesAssessments from "./pages/QuizzesAssessments";
import AdaptiveLearning from "./pages/AdaptiveLearning";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<CourseCatalog />} />
          <Route path="/course/:courseId" element={<CourseOverview />} />
          <Route path="/lesson/:courseId" element={<LessonPage />} />
          <Route path="/progress" element={<ProgressReport />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/quizzes" element={<QuizzesAssessments />} />
          <Route path="/adaptive" element={<AdaptiveLearning />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
