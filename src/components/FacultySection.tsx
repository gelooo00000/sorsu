import * as React from "react";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { 
  Search,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  Award,
  Building,
  User,
  Users
} from "lucide-react";
import { useFaculty, facultyToStudentView } from "../context/FacultyContext";

// Student view interface
interface FacultyView {
  id: string;
  name: string;
  position: string;
  department: string;
  specialization: string[];
  education: string;
  email: string;
  phone?: string;
  officeLocation?: string;
  profileImage?: string;
  bio?: string;
  achievements: string[];
  researchInterests: string[];
  yearsOfExperience: number;
  employmentStatus: string;
}

// Departments will be dynamically generated from faculty data

const positions = [
  "All Positions",
  "Dean",
  "Associate Dean", 
  "Program Chair",
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Lecturer",
  "Instructor"
];

export default function FacultySection() {
  const { faculty } = useFaculty();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("All Departments");
  const [filterPosition, setFilterPosition] = useState("All Positions");
  const [expandedFaculty, setExpandedFaculty] = useState<string[]>([]);

  // Convert faculty from context to student view format and filter only Active faculty
  const studentViewFaculty = useMemo(() => {
    return faculty
      .filter(f => f.status === "Active") // Only show active faculty
      .map(f => facultyToStudentView(f));
  }, [faculty]);

  // Get unique departments from faculty data
  const availableDepartments = useMemo(() => {
    const deptSet = new Set(studentViewFaculty.map(f => f.department));
    return ["All Departments", ...Array.from(deptSet).sort()];
  }, [studentViewFaculty]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const getPositionColor = (position: string) => {
    switch (position) {
      case "Dean":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Associate Dean":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "Program Chair":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Professor":
        return "bg-green-100 text-green-800 border-green-200";
      case "Associate Professor":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Assistant Professor":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Instructor":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const toggleExpanded = (id: string) => {
    setExpandedFaculty(prev => 
      prev.includes(id) 
        ? prev.filter(facultyId => facultyId !== id)
        : [...prev, id]
    );
  };

  const filteredFaculty = useMemo(() => {
    return studentViewFaculty
      .filter(faculty => {
        const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             faculty.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase())) ||
                             faculty.department.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDepartment = filterDepartment === "All Departments" || faculty.department === filterDepartment;
        const matchesPosition = filterPosition === "All Positions" || faculty.position === filterPosition;
        
        return matchesSearch && matchesDepartment && matchesPosition;
      })
      .sort((a, b) => {
        // Sort by position hierarchy, then by name
        const positionOrder = ["Dean", "Associate Dean", "Program Chair", "Professor", "Associate Professor", "Assistant Professor", "Lecturer", "Instructor"];
        const aPos = positionOrder.indexOf(a.position);
        const bPos = positionOrder.indexOf(b.position);
        
        if (aPos !== bPos) return aPos - bPos;
        return a.name.localeCompare(b.name);
      });
  }, [studentViewFaculty, searchTerm, filterDepartment, filterPosition]);

  // Group faculty by department for better organization
  const facultyByDepartment = useMemo(() => {
    return filteredFaculty.reduce((acc, faculty) => {
      if (!acc[faculty.department]) {
        acc[faculty.department] = [];
      }
      acc[faculty.department].push(faculty);
      return acc;
    }, {} as Record<string, FacultyView[]>);
  }, [filteredFaculty]);

  return (
    <section id="faculty" className="py-16 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Faculty</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet our dedicated educators and researchers who are committed to academic excellence at SorSU-Bulan
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search faculty by name, specialization, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                {availableDepartments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterPosition} onValueChange={setFilterPosition}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Position" />
              </SelectTrigger>
              <SelectContent>
                {positions.map(position => (
                  <SelectItem key={position} value={position}>{position}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {filterDepartment === "All Departments" ? (
            // Group by department when showing all
            Object.entries(facultyByDepartment).map(([department, facultyList]) => (
              <div key={department} className="mb-12">
                <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <Building className="w-6 h-6 text-primary" />
                  {department}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {facultyList.map((faculty) => (
                    <Card key={faculty.id} className="h-fit">
                      <CardHeader className="text-center pb-4">
                        <Avatar className="w-24 h-24 mx-auto mb-4">
                          <AvatarImage src={faculty.profileImage} alt={faculty.name} />
                          <AvatarFallback className="text-lg">
                            {getInitials(faculty.name)}
                          </AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-lg">{faculty.name}</CardTitle>
                        <Badge className={getPositionColor(faculty.position)}>
                          {faculty.position}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-2">
                          {faculty.department}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <GraduationCap className="w-4 h-4" />
                            Education
                          </h4>
                          <p className="text-sm text-muted-foreground">{faculty.education}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            Specialization
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {faculty.specialization.slice(0, 3).map((spec, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {spec}
                              </Badge>
                            ))}
                            {faculty.specialization.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{faculty.specialization.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>

                        {faculty.bio && (
                          <div>
                            <p className={`text-sm text-muted-foreground ${
                              expandedFaculty.includes(faculty.id) ? '' : 'line-clamp-3'
                            }`}>
                              {faculty.bio}
                            </p>
                            {faculty.bio.length > 100 && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => toggleExpanded(faculty.id)}
                                className="mt-2 p-0 h-auto text-primary text-xs"
                              >
                                {expandedFaculty.includes(faculty.id) ? 'Show Less' : 'Read More'}
                              </Button>
                            )}
                          </div>
                        )}

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            <a href={`mailto:${faculty.email}`} className="hover:text-primary">
                              {faculty.email}
                            </a>
                          </div>
                          {faculty.phone && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              <span>{faculty.phone}</span>
                            </div>
                          )}
                          {faculty.officeLocation && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Building className="w-3 h-3" />
                              <span>{faculty.officeLocation}</span>
                            </div>
                          )}
                        </div>

                        {faculty.achievements.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                              <Award className="w-4 h-4" />
                              Recent Achievements
                            </h4>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {faculty.achievements.slice(0, 2).map((achievement, index) => (
                                <li key={index} className="flex items-start gap-1">
                                  <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                                  {achievement}
                                </li>
                              ))}
                              {faculty.achievements.length > 2 && (
                                <li className="text-primary">
                                  +{faculty.achievements.length - 2} more achievements
                                </li>
                              )}
                            </ul>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                          <span>{faculty.yearsOfExperience} years experience</span>
                          <Badge variant="outline" className="text-xs">
                            {faculty.employmentStatus}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Show filtered results without grouping
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFaculty.map((faculty) => (
                <Card key={faculty.id} className="h-fit">
                  <CardHeader className="text-center pb-4">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={faculty.profileImage} alt={faculty.name} />
                      <AvatarFallback className="text-lg">
                        {getInitials(faculty.name)}
                      </AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-lg">{faculty.name}</CardTitle>
                    <Badge className={getPositionColor(faculty.position)}>
                      {faculty.position}
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-2">
                      {faculty.department}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <GraduationCap className="w-4 h-4" />
                        Education
                      </h4>
                      <p className="text-sm text-muted-foreground">{faculty.education}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Specialization
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {faculty.specialization.slice(0, 3).map((spec, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                        {faculty.specialization.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{faculty.specialization.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-3 h-3" />
                        <a href={`mailto:${faculty.email}`} className="hover:text-primary">
                          {faculty.email}
                        </a>
                      </div>
                      {faculty.phone && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          <span>{faculty.phone}</span>
                        </div>
                      )}
                      {faculty.officeLocation && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building className="w-3 h-3" />
                          <span>{faculty.officeLocation}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                      <span>{faculty.yearsOfExperience} years experience</span>
                      <Badge variant="outline" className="text-xs">
                        {faculty.employmentStatus}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredFaculty.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No faculty members found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}