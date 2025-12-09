import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import React from "react";
import { FacultyProvider } from "./context/FacultyContext";
import { AnnouncementProvider } from "./context/AnnouncementContext";
import { EventProvider } from "./context/EventContext";
import { CalendarProvider } from "./context/CalendarContext";

createRoot(document.getElementById("root")!).render(
  <FacultyProvider>
    <AnnouncementProvider>
      <EventProvider>
        <CalendarProvider>
          <App />
        </CalendarProvider>
      </EventProvider>
    </AnnouncementProvider>
  </FacultyProvider>
);
  