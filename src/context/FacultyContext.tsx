import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Unified Faculty interface that works for both admin and student views
export interface Faculty {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  office: string;
  department: string;
  title: string;
  status: string;
  bio: string;
  specializations: string[];
  education: string[];
  awards: string[];
  profileImage?: string;
  officeHours: string;
  website?: string;
  // Additional fields for student view compatibility
  researchInterests?: string[];
  yearsOfExperience?: number;
}

interface FacultyContextType {
  faculty: Faculty[];
  addFaculty: (faculty: Faculty) => void;
  updateFaculty: (id: string, faculty: Partial<Faculty>) => void;
  deleteFaculty: (id: string) => void;
  getFacultyById: (id: string) => Faculty | undefined;
}

const FacultyContext = createContext<FacultyContextType | undefined>(undefined);

// Default mock data
const defaultFaculty: Faculty[] = [
  {
    id: "1",
    firstName: "Dr. Sarah",
    lastName: "Johnson",
    email: "s.johnson@university.edu",
    phone: "(555) 123-4567",
    office: "Science Building 301",
    department: "Computer Science",
    title: "Professor",
    status: "Active",
    bio: "Dr. Johnson specializes in artificial intelligence and machine learning research with over 15 years of experience in the field.",
    specializations: ["Artificial Intelligence", "Machine Learning", "Data Science"],
    education: ["Ph.D. Computer Science - MIT", "M.S. Computer Science - Stanford"],
    awards: ["Excellence in Teaching Award 2023", "Research Innovation Grant 2022"],
    officeHours: "Mon/Wed 2-4 PM",
    website: "https://cs.university.edu/faculty/johnson",
    researchInterests: ["AI", "Machine Learning", "Data Science"],
    yearsOfExperience: 15
  },
  {
    id: "2",
    firstName: "Prof. Michael",
    lastName: "Chen",
    email: "m.chen@university.edu",
    phone: "(555) 234-5678",
    office: "Business Building 205",
    department: "Business Administration",
    title: "Associate Professor",
    status: "Active",
    bio: "Professor Chen focuses on international business strategy and has consulted for Fortune 500 companies worldwide.",
    specializations: ["International Business", "Strategic Management", "Corporate Finance"],
    education: ["Ph.D. Business Administration - Harvard", "MBA - Wharton"],
    awards: ["Outstanding Faculty Award 2021"],
    officeHours: "Tue/Thu 1-3 PM",
    researchInterests: ["International Business", "Strategy"],
    yearsOfExperience: 12
  },
  {
    id: "3",
    firstName: "Dr. Emily",
    lastName: "Rodriguez",
    email: "e.rodriguez@university.edu",
    phone: "(555) 345-6789",
    office: "Arts Building 102",
    department: "Psychology",
    title: "Assistant Professor",
    status: "Active",
    bio: "Dr. Rodriguez researches cognitive psychology and human behavior, with a focus on memory and learning processes.",
    specializations: ["Cognitive Psychology", "Memory Research", "Learning Sciences"],
    education: ["Ph.D. Psychology - UCLA", "M.A. Psychology - UC Berkeley"],
    awards: [],
    officeHours: "Currently on sabbatical",
    researchInterests: ["Cognitive Psychology", "Memory"],
    yearsOfExperience: 8
  },
  {
    id: "4",
    firstName: "Dr. Maria Elena",
    lastName: "Santos",
    email: "me.santos@sorsu-bulan.edu.ph",
    phone: "+63 917 123 4567",
    office: "Engineering Building, Room 201",
    department: "College of Engineering and Technology",
    title: "Dean",
    status: "Active",
    bio: "Dr. Santos has over 20 years of experience in civil engineering and academia. She has led numerous infrastructure projects in Bicol Region and is passionate about sustainable engineering practices.",
    specializations: ["Civil Engineering", "Structural Engineering", "Project Management"],
    education: ["Ph.D. in Civil Engineering, University of the Philippines Diliman"],
    awards: ["Outstanding Engineering Educator Award 2022", "Best Research Paper in Structural Engineering 2021", "CHED Outstanding Faculty Award 2020"],
    officeHours: "Mon-Fri 9-5 PM",
    researchInterests: ["Earthquake-resistant structures", "Sustainable building materials", "Infrastructure development"],
    yearsOfExperience: 20
  },
  {
    id: "5",
    firstName: "Prof. Roberto",
    lastName: "dela Cruz",
    email: "r.delacruz@sorsu-bulan.edu.ph",
    phone: "+63 918 234 5678",
    office: "Engineering Building, Room 105",
    department: "College of Engineering and Technology",
    title: "Program Chair",
    status: "Active",
    bio: "Prof. dela Cruz is a technology enthusiast with expertise in software development and AI. He has mentored hundreds of students in programming and system development.",
    specializations: ["Computer Science", "Software Engineering", "Artificial Intelligence"],
    education: ["M.S. in Computer Science, Ateneo de Manila University"],
    awards: ["Best IT Faculty Award 2023", "Innovation in Teaching Award 2022", "Outstanding Alumni Award - Ateneo de Manila 2021"],
    officeHours: "Mon/Wed/Fri 10-12 PM",
    researchInterests: ["Machine Learning", "Web Development", "Mobile Applications", "Database Systems"],
    yearsOfExperience: 15
  }
];

const STORAGE_KEY = 'university_faculty_data';

export function FacultyProvider({ children }: { children: ReactNode }) {
  const [faculty, setFaculty] = useState<Faculty[]>(() => {
    // Load from localStorage or use default
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading faculty data from localStorage:', error);
    }
    return defaultFaculty;
  });

  // Save to localStorage whenever faculty changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(faculty));
    } catch (error) {
      console.error('Error saving faculty data to localStorage:', error);
    }
  }, [faculty]);

  const addFaculty = (newFaculty: Faculty) => {
    setFaculty(prev => [newFaculty, ...prev]);
  };

  const updateFaculty = (id: string, updatedData: Partial<Faculty>) => {
    setFaculty(prev => prev.map(f => f.id === id ? { ...f, ...updatedData } : f));
  };

  const deleteFaculty = (id: string) => {
    setFaculty(prev => prev.filter(f => f.id !== id));
  };

  const getFacultyById = (id: string) => {
    return faculty.find(f => f.id === id);
  };

  return (
    <FacultyContext.Provider value={{ faculty, addFaculty, updateFaculty, deleteFaculty, getFacultyById }}>
      {children}
    </FacultyContext.Provider>
  );
}

export function useFaculty() {
  const context = useContext(FacultyContext);
  if (context === undefined) {
    throw new Error('useFaculty must be used within a FacultyProvider');
  }
  return context;
}

// Helper function to convert Faculty to student view format
export function facultyToStudentView(faculty: Faculty) {
  return {
    id: faculty.id,
    name: `${faculty.firstName} ${faculty.lastName}`,
    position: faculty.title,
    department: faculty.department,
    specialization: faculty.specializations,
    education: faculty.education.join('; '),
    email: faculty.email,
    phone: faculty.phone,
    officeLocation: faculty.office,
    profileImage: faculty.profileImage,
    bio: faculty.bio,
    achievements: faculty.awards,
    researchInterests: faculty.researchInterests || [],
    yearsOfExperience: faculty.yearsOfExperience || 5,
    employmentStatus: faculty.status === 'Active' ? 'Regular' : faculty.status
  };
}

