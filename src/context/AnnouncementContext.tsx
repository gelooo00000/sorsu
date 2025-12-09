import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: string;
  priority: string;
  audience: string;
  status: string;
  publishDate: string;
  expiryDate?: string;
  author: string;
  views: number;
  // Additional fields for student view compatibility
  type?: string;
  targetAudience?: string;
  isPinned?: boolean;
  tags?: string[];
}

interface AnnouncementContextType {
  announcements: Announcement[];
  addAnnouncement: (announcement: Announcement) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  getAnnouncementById: (id: string) => Announcement | undefined;
  incrementViews: (id: string) => void;
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

const defaultAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Fall 2024 Registration Now Open",
    content: "Registration for Fall 2024 semester is now open. Please log into your student portal to register for classes. Early registration ends September 15th.",
    category: "Academic",
    priority: "High",
    audience: "Students",
    status: "Published",
    publishDate: "2024-08-15",
    expiryDate: "2024-09-30",
    author: "Registrar Office",
    views: 1247,
    type: "Academic",
    targetAudience: "All Students",
    isPinned: true,
    tags: ["Registration", "Academic", "Deadline"]
  },
  {
    id: "2",
    title: "Library Hours Extended During Finals",
    content: "The Central Library will be open 24/7 during finals week (December 16-22) to support students during their exam preparation.",
    category: "Services",
    priority: "Medium",
    audience: "Students",
    status: "Published",
    publishDate: "2024-12-10",
    expiryDate: "2024-12-25",
    author: "Library Services",
    views: 456,
    type: "General",
    targetAudience: "All Students",
    isPinned: false,
    tags: ["Library", "Schedule", "Midterms"]
  },
  {
    id: "3",
    title: "SorSU-Bulan Research Symposium 2024",
    content: "The College of Engineering and Technology invites all students and faculty to participate in the annual Research Symposium. This year's theme is 'Innovation for Sustainable Development'. Registration deadline is February 20, 2024.",
    category: "Events",
    priority: "Medium",
    audience: "Students",
    status: "Published",
    publishDate: "2024-01-10",
    expiryDate: "2024-03-01",
    author: "College of Engineering and Technology",
    views: 892,
    type: "Event",
    targetAudience: "Students",
    isPinned: false,
    tags: ["Research", "Symposium", "Innovation"]
  }
];

const STORAGE_KEY = 'university_announcements_data';

export function AnnouncementProvider({ children }: { children: ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading announcements from localStorage:', error);
    }
    return defaultAnnouncements;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(announcements));
    } catch (error) {
      console.error('Error saving announcements to localStorage:', error);
    }
  }, [announcements]);

  const addAnnouncement = (newAnnouncement: Announcement) => {
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  };

  const updateAnnouncement = (id: string, updatedData: Partial<Announcement>) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, ...updatedData } : a));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const getAnnouncementById = (id: string) => {
    return announcements.find(a => a.id === id);
  };

  const incrementViews = (id: string) => {
    setAnnouncements(prev => prev.map(a => 
      a.id === id ? { ...a, views: a.views + 1 } : a
    ));
  };

  return (
    <AnnouncementContext.Provider value={{ 
      announcements, 
      addAnnouncement, 
      updateAnnouncement, 
      deleteAnnouncement, 
      getAnnouncementById,
      incrementViews 
    }}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncements() {
  const context = useContext(AnnouncementContext);
  if (context === undefined) {
    throw new Error('useAnnouncements must be used within an AnnouncementProvider');
  }
  return context;
}

// Helper function to convert admin format to student view format
export function announcementToStudentView(announcement: Announcement) {
  return {
    id: announcement.id,
    title: announcement.title,
    content: announcement.content,
    type: announcement.type || announcement.category,
    priority: announcement.priority,
    targetAudience: announcement.targetAudience || announcement.audience,
    publishDate: announcement.publishDate,
    expiryDate: announcement.expiryDate,
    author: announcement.author,
    isPinned: announcement.isPinned || false,
    tags: announcement.tags || []
  };
}

