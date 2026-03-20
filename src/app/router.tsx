import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import {
  ExerciseDetailsPage,
  ExerciseLibraryPage,
} from "@/features/exercise-library";
import { HomePage } from "@/features/home";
import { NotFoundPage } from "@/features/not-found";

function RouteScrollRestoration() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname]);

  return null;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <RouteScrollRestoration />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exercises" element={<ExerciseLibraryPage />} />
        <Route path="/exercises/:exerciseId" element={<ExerciseDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
