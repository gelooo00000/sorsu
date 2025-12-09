import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import {
  BookOpen,
  Users,
  Car,
  TreePine,
  Hospital,
  Utensils,
  Dumbbell,
  Music,
  GraduationCap,
  MapPin
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import CampusMapImg from "../assets/campus map.jpg";

type LocationType = 'academic' | 'administrative' | 'facilities' | 'recreation' | 'services';

interface MapLocation {
  id: string;
  name: string;
  type: LocationType;
  position: { x: number; y: number };
  icon: React.ReactNode;
  description: string;
  hours?: string;
}

const CAMPUS_LOCATIONS: MapLocation[] = [
  { id: 'library', name: 'University Library', type: 'academic', position: { x: 60, y: 45 }, icon: <BookOpen className="w-4 h-4" />, description: 'Modern library with digital resources, study areas, and research facilities.', hours: '7:00 AM - 8:00 PM' },
  { id: 'admin-building', name: 'Administration Building', type: 'administrative', position: { x: 25, y: 40 }, icon: <GraduationCap className="w-4 h-4" />, description: 'Houses administrative offices including Registrar, Cashier, and Student Affairs.', hours: '8:00 AM - 5:00 PM' },
  { id: 'student-center', name: 'Student Center', type: 'facilities', position: { x: 50, y: 60 }, icon: <Users className="w-4 h-4" />, description: 'Hub for student activities, organizations, and social gatherings.', hours: '6:00 AM - 10:00 PM' },
  { id: 'cafeteria', name: 'University Cafeteria', type: 'services', position: { x: 70, y: 65 }, icon: <Utensils className="w-4 h-4" />, description: 'Main dining facility offering affordable meals and snacks.', hours: '6:00 AM - 7:00 PM' },
  { id: 'gymnasium', name: 'Sports Complex', type: 'recreation', position: { x: 30, y: 70 }, icon: <Dumbbell className="w-4 h-4" />, description: 'Multi-purpose gymnasium for sports, events, and physical education.', hours: '5:00 AM - 9:00 PM' },
  { id: 'clinic', name: 'Health Center', type: 'services', position: { x: 40, y: 50 }, icon: <Hospital className="w-4 h-4" />, description: 'Medical facility providing healthcare services to students and staff.', hours: '8:00 AM - 5:00 PM' },
  { id: 'parking', name: 'Parking Area', type: 'facilities', position: { x: 15, y: 60 }, icon: <Car className="w-4 h-4" />, description: 'Designated parking spaces for students, faculty, and visitors.', hours: '24/7 Access' },
  { id: 'garden', name: 'Botanical Garden', type: 'recreation', position: { x: 80, y: 30 }, icon: <TreePine className="w-4 h-4" />, description: 'Peaceful garden area for relaxation and outdoor activities.', hours: '6:00 AM - 6:00 PM' },
  { id: 'auditorium', name: 'University Auditorium', type: 'facilities', position: { x: 55, y: 25 }, icon: <Music className="w-4 h-4" />, description: 'Main venue for graduations, conferences, and cultural events.', hours: 'Event-based' }
];

const TYPE_COLORS: Record<LocationType, string> = {
  academic: 'bg-blue-500',
  administrative: 'bg-green-500',
  facilities: 'bg-purple-500',
  recreation: 'bg-orange-500',
  services: 'bg-red-500'
};

const TYPE_LABELS: Record<LocationType, string> = {
  academic: 'Academic',
  administrative: 'Administrative',
  facilities: 'Facilities',
  recreation: 'Recreation',
  services: 'Services'
};

export default function VirtualCampusMap() {
  const [zoom, setZoom] = useState(1);
  const [dimMap, setDimMap] = useState(false);
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);
  const [filterType, setFilterType] = useState<'all' | LocationType | string>('all');
  const [selected, setSelected] = useState<MapLocation | null>(null);

  const onMapLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget as HTMLImageElement;
    if (img && img.naturalWidth && img.naturalHeight) setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
  };

  const filtered = filterType === 'all' ? CAMPUS_LOCATIONS : CAMPUS_LOCATIONS.filter(l => l.type === filterType);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Virtual Campus Map</h2>
        <p className="text-xl font-semibold mb-2">Explore our campus facilities and find your way around SorSU-Bulan</p>
        <p className="text-muted-foreground mb-4">All Locations • Academic • Administrative • Facilities • Recreation • Services</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <Button variant={filterType === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setFilterType('all')}>All Locations</Button>
        {(Object.keys(TYPE_LABELS) as LocationType[]).map(t => (
          <Button key={t} variant={filterType === t ? 'default' : 'outline'} size="sm" onClick={() => setFilterType(t)} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${TYPE_COLORS[t]}`} />
            {TYPE_LABELS[t]}
          </Button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Campus Layout
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full max-h-[80vh] rounded-lg overflow-auto bg-gray-100">
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
              <div className="bg-white/90 p-1 rounded shadow-sm flex flex-col">
                <button onClick={() => setZoom(z => Math.min(2, +(z + 0.1).toFixed(2)))} className="px-2 py-1 text-sm">+</button>
                <button onClick={() => setZoom(z => Math.max(0.5, +(z - 0.1).toFixed(2)))} className="px-2 py-1 text-sm">-</button>
                <button onClick={() => setZoom(1)} className="px-2 py-1 text-sm">Reset</button>
              </div>
              <button onClick={() => setDimMap(d => !d)} className="bg-white/90 p-2 rounded shadow-sm text-sm">{dimMap ? 'Undim' : 'Dim'}</button>
            </div>

            <div className="relative flex justify-center items-start py-8">
              <div style={imgSize ? { width: imgSize.w, height: imgSize.h, transform: `scale(${zoom})`, transformOrigin: 'top left' } : { transform: `scale(${zoom})`, transformOrigin: 'top left' }} className="relative inline-block">
                <ImageWithFallback src={CampusMapImg} alt="SorSU-Bulan Campus Map" onLoad={onMapLoad} className="block w-auto h-auto object-contain" />
                <div className={`absolute inset-0 ${dimMap ? 'bg-black/30' : 'bg-black/0'}`} />

                {filtered.map(loc => (
                  <Dialog key={loc.id}>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => setSelected(loc)}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 ${TYPE_COLORS[loc.type]} text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 z-10`}
                        style={{ left: `${loc.position.x}%`, top: `${loc.position.y}%` }}
                      >
                        {loc.icon}
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <div className={`w-6 h-6 ${TYPE_COLORS[loc.type]} text-white rounded-full flex items-center justify-center`}>{loc.icon}</div>
                          {loc.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3">
                        <Badge variant="secondary">{TYPE_LABELS[loc.type]}</Badge>
                        <p className="text-sm text-muted-foreground">{loc.description}</p>
                        {loc.hours && <div className="text-sm"><strong>Hours:</strong> {loc.hours}</div>}
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}

                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <h4 className="font-semibold text-sm mb-2">Legend</h4>
                  <div className="space-y-1">
                    {(Object.keys(TYPE_LABELS) as LocationType[]).map(t => (
                      <div key={t} className="flex items-center gap-2 text-xs">
                        <div className={`w-3 h-3 rounded-full ${TYPE_COLORS[t]}`} />
                        <span>{TYPE_LABELS[t]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                  <div className="text-right">
                    <p className="font-semibold text-sm">SorSU-Bulan Campus</p>
                    <p className="text-xs text-muted-foreground">Bulan, Sorsogon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CAMPUS_LOCATIONS.map(loc => (
          <Card key={loc.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className={`w-6 h-6 ${TYPE_COLORS[loc.type]} text-white rounded-full flex items-center justify-center`}>{loc.icon}</div>
                {loc.name}
              </CardTitle>
              <Badge variant="secondary" className="w-fit">{TYPE_LABELS[loc.type]}</Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{loc.description}</p>
              {loc.hours && <p className="text-xs text-muted-foreground"><strong>Hours:</strong> {loc.hours}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
import * as React from "react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  MapPin, 
  Building, 
  BookOpen, 
  Users, 
  Coffee, 
  Car, 
  TreePine,
  GraduationCap,
  Hospital,
  Utensils,
  Dumbbell,
  Music,
  X
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import CampusMapImg from "../assets/campus map.jpg";

interface MapLocation {
  id: string;
  name: string;
  type: 'academic' | 'administrative' | 'facilities' | 'recreation' | 'services';
  position: { x: number; y: number };
  icon: React.ReactNode;
  description: string;
  image?: string;
  details: {
    hours?: string;
    capacity?: string;
    services?: string[];
    contact?: string;
  };
}

const CAMPUS_LOCATIONS: MapLocation[] = [
  {
    id: 'library',
    name: 'University Library',
    type: 'academic',
    position: { x: 60, y: 45 },
    icon: <BookOpen className="w-4 h-4" />,
    description: 'Modern library with digital resources, study areas, and research facilities.',
    image: 'https://images.unsplash.com/photo-1684403798139-289e0f7fa5da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwbGlicmFyeSUyMG1vZGVybnxlbnwxfHx8fDE3NTkzOTYxODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    details: {
      hours: '7:00 AM - 8:00 PM',
      capacity: '500 simultaneous users',
      services: ['Books & Journals', 'Digital Resources', 'Study Rooms', 'Research Assistance'],
      contact: 'library@sorsu-bulan.edu.ph'
    }
  },
  {
    id: 'admin-building',
    name: 'Administration Building',
    type: 'administrative',
    position: { x: 25, y: 40 },
    icon: <GraduationCap className="w-4 h-4" />,
    description: 'Houses administrative offices including Registrar, Cashier, and Student Affairs.',
    details: {
      hours: '8:00 AM - 5:00 PM',
      services: ['Registrar', 'Cashier', 'Student Affairs', 'Human Resources'],
      contact: '(056) 311-1234'
    }
  },
  {
    id: 'student-center',
    name: 'Student Center',
    type: 'facilities',
    position: { x: 50, y: 60 },
    icon: <Users className="w-4 h-4" />,
    description: 'Hub for student activities, organizations, and social gatherings.',
    details: {
      hours: '6:00 AM - 10:00 PM',
      services: ['Meeting Rooms', 'Event Halls', 'Student Organizations', 'Lounge Areas']
    }
  },
  {
    id: 'cafeteria',
    name: 'University Cafeteria',
    type: 'services',
    position: { x: 70, y: 65 },
    icon: <Utensils className="w-4 h-4" />,
    description: 'Main dining facility offering affordable meals and snacks.',
    image: 'https://images.unsplash.com/photo-1744168222850-85b5e5e9aa24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FmZXRlcmlhJTIwZGluaW5nJTIwaGFsbHxlbnwxfHx8fDE3NTkzOTYxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    details: {
      hours: '6:00 AM - 7:00 PM',
      capacity: '400 seats',
      services: ['Filipino Cuisine', 'Snacks & Beverages', 'Catering Services']
    }
  },
  {
    id: 'gymnasium',
    name: 'Sports Complex',
    type: 'recreation',
    position: { x: 30, y: 70 },
    icon: <Dumbbell className="w-4 h-4" />,
    description: 'Multi-purpose gymnasium for sports, events, and physical education.',
    image: 'https://images.unsplash.com/photo-1564687978103-511228eb1816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwZ3ltbmFzaXVtJTIwc3BvcnRzJTIwY29tcGxleHxlbnwxfHx8fDE3NTkzOTYxODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    details: {
      hours: '5:00 AM - 9:00 PM',
      capacity: '1,000 spectators',
      services: ['Basketball', 'Volleyball', 'Badminton', 'Fitness Equipment']
    }
  },
  {
    id: 'clinic',
    name: 'Health Center',
    type: 'services',
    position: { x: 40, y: 50 },
    icon: <Hospital className="w-4 h-4" />,
    description: 'Medical facility providing healthcare services to students and staff.',
    details: {
      hours: '8:00 AM - 5:00 PM',
      services: ['Medical Consultation', 'First Aid', 'Health Records', 'Emergency Care'],
      contact: 'clinic@sorsu-bulan.edu.ph'
    }
  },
  {
    id: 'parking',
    name: 'Parking Area',
    type: 'facilities',
    position: { x: 15, y: 60 },
    icon: <Car className="w-4 h-4" />,
    description: 'Designated parking spaces for students, faculty, and visitors.',
    details: {
      hours: '24/7 Access',
      capacity: '200 vehicles',
      services: ['Student Parking', 'Faculty Parking', 'Visitor Parking', 'Security']
    }
  },
  {
    id: 'garden',
    name: 'Botanical Garden',
    type: 'recreation',
    position: { x: 80, y: 30 },
    icon: <TreePine className="w-4 h-4" />,
    description: 'Peaceful garden area for relaxation and outdoor activities.',
    details: {
      hours: '6:00 AM - 6:00 PM',
      services: ['Walking Paths', 'Sitting Areas', 'Native Plants', 'Study Spots']
    }
  },
  {
    id: 'auditorium',
    name: 'University Auditorium',
    type: 'facilities',
    position: { x: 55, y: 25 },
    icon: <Music className="w-4 h-4" />,
    description: 'Main venue for graduations, conferences, and cultural events.',
    details: {
      hours: 'Event-based',
      capacity: '800 seats',
      services: ['Sound System', 'Stage Lighting', 'Air Conditioning', 'Projection']
    }
  }
];

const TYPE_COLORS = {
  academic: 'bg-blue-500',
  administrative: 'bg-green-500',
  facilities: 'bg-purple-500',
  recreation: 'bg-orange-500',
  services: 'bg-red-500'
};

const TYPE_LABELS = {
  academic: 'Academic',
  administrative: 'Administrative',
  facilities: 'Facilities',
  recreation: 'Recreation',
  services: 'Services'
};

export default function VirtualCampusMap() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [zoom, setZoom] = useState<number>(1);
  const [dimMap, setDimMap] = useState<boolean>(false);
  const [imgSize, setImgSize] = useState<{ w: number; h: number } | null>(null);

  const onMapLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget as HTMLImageElement;
    if (img && img.naturalWidth && img.naturalHeight) {
      setImgSize({ w: img.naturalWidth, h: img.naturalHeight });
    }
  };

  {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <Button
          variant={filterType === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilterType('all')}
        >
          All Locations
        </Button>
        {Object.entries(TYPE_LABELS).map(([type, label]) => (
          <Button
            key={type}
            variant={filterType === type ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterType(type)}
            className="flex items-center gap-2"
          >
            <div className={`w-3 h-3 rounded-full ${TYPE_COLORS[type as keyof typeof TYPE_COLORS]}`} />
            {label}
          </Button>
        ))}
      </div>

      {/* Campus Map */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Campus Layout
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full max-h-[80vh] rounded-lg overflow-auto bg-gray-100">
            {/* Controls: zoom and dim toggle */}
            <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
              <div className="bg-white/90 p-1 rounded shadow-sm flex flex-col">
                <button onClick={() => setZoom(z => Math.min(2, +(z + 0.1).toFixed(2)))} className="px-2 py-1 text-sm">+</button>
                <button onClick={() => setZoom(z => Math.max(0.5, +(z - 0.1).toFixed(2)))} className="px-2 py-1 text-sm">-</button>
                <button onClick={() => setZoom(1)} className="px-2 py-1 text-sm">Reset</button>
              </div>
              <button onClick={() => setDimMap(d => !d)} className="bg-white/90 p-2 rounded shadow-sm text-sm">{dimMap ? 'Undim' : 'Dim'}</button>
            </div>

            {/* Scalable wrapper: background + markers */}
            <div className="relative flex justify-center items-start">
              <div
                className="relative inline-block"
                style={imgSize ? { width: imgSize.w, height: imgSize.h, transform: `scale(${zoom})`, transformOrigin: 'top left' } : { transform: `scale(${zoom})`, transformOrigin: 'top left' }}
              >
                <ImageWithFallback
                  src={CampusMapImg}
                  alt="SorSU-Bulan Campus Map"
                  className="block w-auto h-auto object-contain"
                  onLoad={onMapLoad}
                />
                <div className={`absolute inset-0 ${dimMap ? 'bg-black/30' : 'bg-black/0'}`} />

                {/* Location Markers */}
                {filteredLocations.map((location) => (
                  <Dialog key={location.id}>
                    <DialogTrigger asChild>
                      <button
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 ${TYPE_COLORS[location.type]} text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 z-10`}
                        style={{
                          left: `${location.position.x}%`,
                          top: `${location.position.y}%`
                        }}
                        onClick={() => setSelectedLocation(location)}
                      >
                        {location.icon}
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <div className={`w-6 h-6 ${TYPE_COLORS[location.type]} text-white rounded-full flex items-center justify-center`}>
                            {location.icon}
                          </div>
                          {location.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Badge variant="secondary">
                            {TYPE_LABELS[location.type]}
                          </Badge>
                        </div>

                        {location.image && (
                          <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={location.image}
                              alt={location.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <p className="text-sm text-muted-foreground">
                          {location.description}
                        </p>

                        <div className="space-y-2">
                          {location.details.hours && (
                            <div className="flex items-center gap-2 text-sm">
                              <strong>Hours:</strong> {location.details.hours}
                            </div>
                          )}
                          {location.details.capacity && (
                            <div className="flex items-center gap-2 text-sm">
                              <strong>Capacity:</strong> {location.details.capacity}
                            </div>
                          )}
                          {location.details.contact && (
                            <div className="flex items-center gap-2 text-sm">
                              <strong>Contact:</strong> {location.details.contact}
                            </div>
                          )}
                          {location.details.services && (
                            <div className="text-sm">
                              <strong>Services:</strong>
                              <ul className="list-disc list-inside mt-1 text-muted-foreground">
                                {location.details.services.map((service, index) => (
                                  <li key={index}>{service}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <h4 className="font-semibold text-sm mb-2">Legend</h4>
                  <div className="space-y-1">
                    {Object.entries(TYPE_LABELS).map(([type, label]) => (
                      <div key={type} className="flex items-center gap-2 text-xs">
                        <div className={`w-3 h-3 rounded-full ${TYPE_COLORS[type as keyof typeof TYPE_COLORS]}`} />
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Campus Name */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                  <div className="text-right">
                    <p className="font-semibold text-sm">SorSU-Bulan Campus</p>
                    <p className="text-xs text-muted-foreground">Bulan, Sorsogon</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLocations.map((location) => (
          <Card key={location.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className={`w-6 h-6 ${TYPE_COLORS[location.type]} text-white rounded-full flex items-center justify-center`}>
                  {location.icon}
                </div>
                {location.name}
              </CardTitle>
              <Badge variant="secondary" className="w-fit">
                {TYPE_LABELS[location.type]}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">
                {location.description}
              </p>
              {location.details.hours && (
                <p className="text-xs text-muted-foreground">
                  <strong>Hours:</strong> {location.details.hours}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}