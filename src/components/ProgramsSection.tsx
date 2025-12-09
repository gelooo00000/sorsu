import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Briefcase, Laptop, FlaskConical, Brush, Calculator, Heart, Scale, Building2, BookOpen, Users, GraduationCap, Clock, CheckCircle2 } from "lucide-react";

interface Program {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  duration: string;
  type: string;
  description: string;
  fullDescription?: string;
  careers: string[];
  color: string;
  objectives?: string[];
  curriculum?: string[];
  admissionRequirements?: string[];
}

const programs: Program[] = [
  {
    title: "Bachelor of Science in Information Technology",
    icon: Laptop,
    duration: "4 years",
    type: "Bachelor's",
    description: "Comprehensive IT program covering software development, network administration, and database management.",
    fullDescription: "This program provides students with a strong foundation in information technology, including software development, network administration, database management, and cybersecurity. Students learn to design, develop, and maintain computer systems and applications.",
    careers: ["Software Developer", "System Administrator", "IT Consultant", "Database Administrator", "Network Engineer", "Web Developer"],
    color: "blue",
    objectives: [
      "Develop proficiency in programming languages and software development",
      "Understand network architecture and administration",
      "Master database design and management",
      "Learn cybersecurity principles and practices"
    ],
    curriculum: ["Programming Fundamentals", "Data Structures and Algorithms", "Database Systems", "Network Security", "Web Development", "Software Engineering"],
    admissionRequirements: ["High School Diploma", "Entrance Examination", "Mathematics Proficiency", "Basic Computer Knowledge"]
  },
  {
    title: "Bachelor of Science in Business Administration",
    icon: Briefcase,
    duration: "4 years",
    type: "Bachelor's",
    description: "Business education focusing on management, entrepreneurship, and organizational leadership.",
    fullDescription: "A comprehensive business program that prepares students for careers in management, entrepreneurship, and organizational leadership. Students learn essential business skills including finance, marketing, operations, and strategic planning.",
    careers: ["Business Manager", "Entrepreneur", "Operations Manager", "Marketing Manager", "Financial Analyst", "Human Resources Manager"],
    color: "purple",
    objectives: [
      "Develop leadership and management skills",
      "Understand business operations and strategy",
      "Learn financial and marketing principles",
      "Foster entrepreneurial thinking"
    ],
    curriculum: ["Principles of Management", "Marketing Management", "Financial Management", "Operations Management", "Business Ethics", "Strategic Planning"],
    admissionRequirements: ["High School Diploma", "Entrance Examination", "Good Communication Skills"]
  },
  {
    title: "Bachelor of Elementary Education",
    icon: BookOpen,
    duration: "4 years",
    type: "Bachelor's",
    description: "Teacher education program preparing future elementary school educators.",
    fullDescription: "This program prepares students to become effective elementary school teachers. It covers pedagogical theories, curriculum development, classroom management, and child psychology to equip future educators with the skills needed to inspire young learners.",
    careers: ["Elementary Teacher", "Curriculum Developer", "Educational Coordinator", "School Administrator", "Educational Researcher"],
    color: "green",
    objectives: [
      "Develop teaching methodologies and pedagogical skills",
      "Understand child development and psychology",
      "Learn curriculum design and assessment",
      "Foster a love for learning in students"
    ],
    curriculum: ["Child Development", "Teaching Methods", "Educational Psychology", "Curriculum Design", "Classroom Management", "Teaching Practice"],
    admissionRequirements: ["High School Diploma", "Entrance Examination", "Good Communication Skills", "Patience and Dedication"]
  },
  {
    title: "Bachelor of Science in Agriculture",
    icon: FlaskConical,
    duration: "4 years",
    type: "Bachelor's",
    description: "Agricultural science program focusing on crop production, soil management, and sustainable farming.",
    fullDescription: "This program focuses on modern agricultural practices, sustainable farming, crop production, and agricultural economics. Students learn to apply scientific principles to improve agricultural productivity and sustainability.",
    careers: ["Agricultural Technician", "Farm Manager", "Agricultural Inspector", "Agricultural Consultant", "Extension Officer", "Research Assistant"],
    color: "orange",
    objectives: [
      "Understand agricultural systems and practices",
      "Learn sustainable farming techniques",
      "Master crop and soil management",
      "Develop skills in agricultural research"
    ],
    curriculum: ["Crop Production", "Soil Science", "Agricultural Economics", "Plant Pathology", "Agricultural Extension", "Farm Management"],
    admissionRequirements: ["High School Diploma", "Entrance Examination", "Interest in Agriculture", "Physical Fitness"]
  },
  {
    title: "Bachelor of Science in Criminology",
    icon: Scale,
    duration: "4 years",
    type: "Bachelor's",
    description: "Criminal justice program covering law enforcement, investigation, and public safety.",
    fullDescription: "A comprehensive program that prepares students for careers in law enforcement, criminal investigation, and public safety. Students learn about criminal law, forensic science, crime investigation, and crime prevention strategies.",
    careers: ["Police Officer", "Criminal Investigator", "Security Manager", "Forensic Analyst", "Corrections Officer", "Probation Officer"],
    color: "teal",
    objectives: [
      "Understand criminal justice system",
      "Learn investigation techniques",
      "Master forensic science principles",
      "Develop public safety skills"
    ],
    curriculum: ["Criminal Law", "Criminology", "Forensic Science", "Crime Investigation", "Crime Prevention", "Law Enforcement"],
    admissionRequirements: ["High School Diploma", "Entrance Examination", "Physical and Mental Fitness", "Background Check"]
  },
  {
    title: "Bachelor of Arts in English",
    icon: BookOpen,
    duration: "4 years",
    type: "Bachelor's",
    description: "Literature and language program developing communication and analytical skills.",
    fullDescription: "This program develops strong communication, critical thinking, and analytical skills through the study of literature, language, and writing. Students explore diverse literary works and learn to express themselves effectively in written and oral communication.",
    careers: ["English Teacher", "Content Writer", "Communications Specialist", "Editor", "Journalist", "Public Relations Officer"],
    color: "pink",
    objectives: [
      "Develop advanced writing and communication skills",
      "Analyze literary works and texts",
      "Understand language structure and usage",
      "Foster critical thinking abilities"
    ],
    curriculum: ["English Literature", "Creative Writing", "Linguistics", "Literary Criticism", "Communication Studies", "Professional Writing"],
    admissionRequirements: ["High School Diploma", "Entrance Examination", "Proficiency in English", "Good Writing Skills"]
  }
];

// Additional programs for "View All Programs"
const allPrograms: Program[] = [
  ...programs,
  {
    title: "Bachelor of Secondary Education",
    icon: GraduationCap,
    duration: "4 years",
    type: "Bachelor's",
    description: "Prepare to teach in secondary schools with specialization in various subject areas.",
    fullDescription: "This program prepares students to become secondary school teachers in various subject areas including Mathematics, Science, English, and Social Studies.",
    careers: ["Secondary Teacher", "Subject Specialist", "Curriculum Developer", "Educational Researcher"],
    color: "green",
    objectives: [
      "Develop expertise in chosen teaching specialization",
      "Master secondary education pedagogy",
      "Understand adolescent development",
      "Learn effective classroom management for teenagers"
    ],
    curriculum: ["Teaching Methodology", "Subject Specialization", "Educational Technology", "Assessment and Evaluation"],
    admissionRequirements: ["High School Diploma", "Entrance Examination", "Subject Area Proficiency"]
  },
  {
    title: "Bachelor of Science in Computer Science",
    icon: Laptop,
    duration: "4 years",
    type: "Bachelor's",
    description: "Advanced computer science program focusing on algorithms, software engineering, and computer systems.",
    fullDescription: "A rigorous program that covers advanced topics in computer science including algorithms, data structures, software engineering, artificial intelligence, and computer systems architecture.",
    careers: ["Software Engineer", "Computer Scientist", "AI Specialist", "Systems Analyst", "Research Scientist"],
    color: "blue",
    objectives: [
      "Master algorithms and data structures",
      "Develop software engineering expertise",
      "Understand computer systems architecture",
      "Explore artificial intelligence and machine learning"
    ],
    curriculum: ["Advanced Algorithms", "Software Engineering", "Computer Architecture", "Artificial Intelligence", "Machine Learning", "Operating Systems"],
    admissionRequirements: ["High School Diploma", "Entrance Examination", "Strong Mathematics Background", "Programming Aptitude"]
  },
  {
    title: "Bachelor of Science in Civil Engineering",
    icon: Building2,
    duration: "5 years",
    type: "Bachelor's",
    description: "Engineering program focusing on infrastructure design, construction, and management.",
    fullDescription: "This program prepares students to design, construct, and manage infrastructure projects including buildings, roads, bridges, and water systems.",
    careers: ["Civil Engineer", "Structural Engineer", "Construction Manager", "Project Engineer", "Surveyor"],
    color: "blue",
    objectives: [
      "Design infrastructure projects",
      "Understand construction materials and methods",
      "Master structural analysis and design",
      "Learn project management principles"
    ],
    curriculum: ["Structural Analysis", "Construction Materials", "Transportation Engineering", "Hydraulics", "Geotechnical Engineering", "Project Management"],
    admissionRequirements: ["High School Diploma", "Entrance Examination", "Strong Mathematics and Physics Background"]
  }
];

const colorVariants: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  green: "bg-green-100 text-green-600",
  pink: "bg-pink-100 text-pink-600",
  orange: "bg-orange-100 text-orange-600",
  teal: "bg-teal-100 text-teal-600"
};

export default function ProgramsSection() {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [showAllPrograms, setShowAllPrograms] = useState(false);

  const openProgramDialog = (program: Program) => {
    setSelectedProgram(program);
  };

  return (
    <section id="programs" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Academic Programs</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our comprehensive range of undergraduate and graduate programs designed to prepare you for success in your chosen field.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program, index) => {
            const IconComponent = program.icon;
            return (
              <Card key={index} className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${colorVariants[program.color]}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{program.type}</Badge>
                      <p className="text-sm text-muted-foreground mt-1">{program.duration}</p>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{program.description}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-2">Career Opportunities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {program.careers.slice(0, 3).map((career, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {career}
                        </Badge>
                      ))}
                      {program.careers.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{program.careers.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => openProgramDialog(program)}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Button size="lg" onClick={() => setShowAllPrograms(true)}>
            View All Programs
          </Button>
        </div>
      </div>

      {/* Learn More Dialog */}
      <Dialog open={selectedProgram !== null} onOpenChange={() => setSelectedProgram(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProgram && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${colorVariants[selectedProgram.color]}`}>
                    <selectedProgram.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <DialogTitle className="text-2xl">{selectedProgram.title}</DialogTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{selectedProgram.type}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{selectedProgram.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">About the Program</h3>
                  <p className="text-muted-foreground">
                    {selectedProgram.fullDescription || selectedProgram.description}
                  </p>
                </div>

                {selectedProgram.objectives && selectedProgram.objectives.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Program Objectives</h3>
                    <ul className="space-y-2">
                      {selectedProgram.objectives.map((objective, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedProgram.curriculum && selectedProgram.curriculum.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Key Courses</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedProgram.curriculum.map((course, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-muted rounded">
                          <BookOpen className="w-4 h-4 text-primary" />
                          <span className="text-sm">{course}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProgram.admissionRequirements && selectedProgram.admissionRequirements.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Admission Requirements</h3>
                    <ul className="space-y-2">
                      {selectedProgram.admissionRequirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-lg mb-3">Career Opportunities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProgram.careers.map((career, idx) => (
                      <Badge key={idx} variant="outline" className="text-sm">
                        {career}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* View All Programs Dialog */}
      <Dialog open={showAllPrograms} onOpenChange={setShowAllPrograms}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl">All Academic Programs</DialogTitle>
            <DialogDescription>
              Explore our complete range of undergraduate and graduate programs designed to prepare you for success.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {allPrograms.map((program, index) => {
              const IconComponent = program.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${colorVariants[program.color]}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{program.type}</Badge>
                        <p className="text-sm text-muted-foreground mt-1">{program.duration}</p>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{program.fullDescription || program.description}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Career Opportunities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {program.careers.slice(0, 4).map((career, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {career}
                          </Badge>
                        ))}
                        {program.careers.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{program.careers.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => {
                        setShowAllPrograms(false);
                        setTimeout(() => openProgramDialog(program), 100);
                      }}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Why Choose SorSU-Bulan?</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Accredited programs recognized by national and international bodies</li>
              <li>• Experienced faculty with industry expertise</li>
              <li>• Modern facilities and state-of-the-art laboratories</li>
              <li>• Strong industry partnerships for internships and job placements</li>
              <li>• Comprehensive student support services</li>
              <li>• Affordable tuition fees with scholarship opportunities</li>
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}