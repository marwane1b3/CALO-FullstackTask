import React from "react";
import { HeaderLayout } from "../layout/HeaderLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeScreen } from "../screens/Home";
import CreateJob from "../screens/CreateJob";
import NoPage from "../screens/NoPage";
import { IntroPage } from "../screens/IntroPage";
import SearchJob from "src/screens/SearchJob";
import SavedJobs from "src/screens/SavedJobs";
import JobDetails from "src/screens/JobDetails";
export const RouterApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeaderLayout />}>
          <Route index element={<IntroPage />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/new" element={<CreateJob />} />
          <Route path="/search" element={<SearchJob />} />
          <Route path="/saved" element={<SavedJobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
