import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  maxAttendees: number;
  currentAttendees: number;
  status: string;
  organizer: string;
  registrationRequired: boolean;
  isPublic: boolean;
  // Additional fields for student view compatibility
  type?: string;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  capacity?: number;
  registrationDeadline?: string;
  contactEmail?: string;
  website?: string;
  tags?: string[];
  featured?: boolean;
}

interface EventContextType {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  getEventById: (id: string) => Event | undefined;
  updateEventStatus: (id: string, status: string) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const defaultEvents: Event[] = [
  {
    id: "1",
    title: "Graduate Research Symposium",
    description: "Annual showcase of graduate student research across all departments. Presentations, posters, and networking opportunities.",
    date: "2024-11-15",
    time: "09:00",
    location: "Student Center Auditorium",
    category: "Academic",
    maxAttendees: 200,
    currentAttendees: 156,
    status: "Published",
    organizer: "Graduate School",
    registrationRequired: true,
    isPublic: true,
    type: "Academic",
    startDate: "2024-11-15",
    endDate: "2024-11-15",
    startTime: "09:00",
    endTime: "17:00",
    capacity: 200,
    registrationDeadline: "2024-11-10",
    contactEmail: "research@sorsu-bulan.edu.ph",
    tags: ["Research", "Innovation", "Academic", "Technology"],
    featured: true
  },
  {
    id: "2",
    title: "Career Fair - Technology Sector",
    description: "Meet with leading technology companies for internship and full-time opportunities. Bring your resume and dress professionally.",
    date: "2024-10-25",
    time: "10:00",
    location: "Recreation Center Gymnasium",
    category: "Career",
    maxAttendees: 500,
    currentAttendees: 423,
    status: "Published",
    organizer: "Career Services",
    registrationRequired: false,
    isPublic: true,
    type: "Career",
    startDate: "2024-10-25",
    endDate: "2024-10-25",
    startTime: "10:00",
    endTime: "16:00",
    capacity: 500,
    contactEmail: "careers@sorsu-bulan.edu.ph",
    tags: ["Career", "Jobs", "Networking", "Recruitment"],
    featured: true
  }
];

const STORAGE_KEY = 'university_events_data';

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading events from localStorage:', error);
    }
    return defaultEvents;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error('Error saving events to localStorage:', error);
    }
  }, [events]);

  const addEvent = (newEvent: Event) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  const updateEvent = (id: string, updatedData: Partial<Event>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updatedData } : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const getEventById = (id: string) => {
    return events.find(e => e.id === id);
  };

  const updateEventStatus = (id: string, status: string) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  };

  return (
    <EventContext.Provider value={{ 
      events, 
      addEvent, 
      updateEvent, 
      deleteEvent, 
      getEventById,
      updateEventStatus 
    }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventProvider');
  }
  return context;
}

// Helper function to convert admin format to student view format
export function eventToStudentView(event: Event) {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    type: event.type || event.category,
    category: event.category,
    startDate: event.startDate || event.date,
    endDate: event.endDate,
    startTime: event.startTime || event.time,
    endTime: event.endTime,
    location: event.location,
    organizer: event.organizer,
    capacity: event.capacity || event.maxAttendees,
    registrationRequired: event.registrationRequired,
    registrationDeadline: event.registrationDeadline,
    contactEmail: event.contactEmail || `${event.organizer.toLowerCase().replace(/\s+/g, '')}@sorsu-bulan.edu.ph`,
    website: event.website,
    tags: event.tags || [],
    featured: event.featured || false
  };
}

