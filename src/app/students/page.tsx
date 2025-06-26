"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Search, Filter, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import Profile from '../../assets/user.jpg'
import Image from "next/image"
// Mock data for students
const students = [
  {
    id: 1,
    name: "Alex Chen",
    avatar: Profile,
    initials: "AC",
    major: "Design",
    year: "Junior",
    skills: ["Graphic Design", "UI/UX", "Branding"],
    rating: 4.9,
    reviews: 27,
    completedProjects: 42,
    verified: true,
    bio: "I'm a junior studying Design with a focus on digital media. I've worked with several campus organizations and local businesses to create branding materials and marketing collateral.",
    topServices: ["Logo Design", "Brand Identity", "Social Media Graphics"],
  },
  {
    id: 2,
    name: "Maya Johnson",
    avatar: Profile,
    initials: "MJ",
    major: "Computer Science",
    year: "Senior",
    skills: ["Programming", "Web Development", "Tutoring"],
    rating: 4.8,
    reviews: 42,
    completedProjects: 35,
    verified: true,
    bio: "Senior CS student specializing in full-stack development. I offer tutoring for programming courses and development services for websites and applications.",
    topServices: ["Web Development", "CS Tutoring", "Mobile Apps"],
  },
  {
    id: 3,
    name: "David Park",
    avatar: Profile,
    initials: "DP",
    major: "Psychology",
    year: "Graduate",
    skills: ["Research", "Data Analysis", "Academic Writing"],
    rating: 4.7,
    reviews: 18,
    completedProjects: 24,
    verified: true,
    bio: "Graduate Psychology student with expertise in research methodology and data analysis. I help with literature reviews, survey design, and statistical analysis for academic projects.",
    topServices: ["Research Assistance", "Data Analysis", "Survey Design"],
  },
  {
    id: 4,
    name: "Sophia Martinez",
    avatar: Profile,
    initials: "SM",
    major: "English",
    year: "Senior",
    skills: ["Writing", "Editing", "Proofreading"],
    rating: 4.9,
    reviews: 35,
    completedProjects: 50,
    verified: true,
    bio: "English major with a passion for writing and editing. I help students and businesses craft compelling content, from essays to marketing materials.",
    topServices: ["Essay Editing", "Content Writing", "Proofreading"],
  },
  {
    id: 5,
    name: "James Wilson",
    avatar: Profile,
    initials: "JW",
    major: "Information Systems",
    year: "Senior",
    skills: ["Web Development", "Database Design", "SEO"],
    rating: 4.8,
    reviews: 22,
    completedProjects: 30,
    verified: true,
    bio: "Information Systems senior with professional experience in web development and database design. I build custom websites and web applications for businesses and student organizations.",
    topServices: ["Website Development", "Database Design", "SEO Optimization"],
  },
  {
    id: 6,
    name: "Emma Lee",
    avatar: Profile,
    initials: "EL",
    major: "Mathematics",
    year: "Junior",
    skills: ["Math Tutoring", "Statistics", "Data Science"],
    rating: 4.7,
    reviews: 31,
    completedProjects: 45,
    verified: false,
    bio: "Mathematics major with a minor in Computer Science. I offer tutoring in various math subjects, from calculus to statistics, and help with data analysis projects.",
    topServices: ["Math Tutoring", "Statistics Help", "Data Analysis"],
  },
  {
    id: 7,
    name: "Ryan Thompson",
    avatar: Profile,
    initials: "RT",
    major: "Film Studies",
    year: "Senior",
    skills: ["Video Production", "Editing", "Animation"],
    rating: 4.9,
    reviews: 19,
    completedProjects: 25,
    verified: true,
    bio: "Film Studies student specializing in video production and editing. I create promotional videos, event coverage, and animated content for various clients.",
    topServices: ["Video Production", "Video Editing", "Motion Graphics"],
  },
  {
    id: 8,
    name: "Olivia Garcia",
    avatar: Profile,
    initials: "OG",
    major: "Music",
    year: "Junior",
    skills: ["Music Composition", "Piano", "Voice"],
    rating: 4.8,
    reviews: 24,
    completedProjects: 32,
    verified: false,
    bio: "Music major with expertise in piano, voice, and composition. I offer private lessons and composition services for various projects.",
    topServices: ["Music Lessons", "Composition", "Performance"],
  },
]

// Categories for filtering
const majors = [
  "Design",
  "Computer Science",
  "Psychology",
  "English",
  "Information Systems",
  "Mathematics",
  "Film Studies",
  "Music",
]

const skills = [
  "Graphic Design",
  "UI/UX",
  "Programming",
  "Web Development",
  "Research",
  "Data Analysis",
  "Writing",
  "Editing",
  "Math Tutoring",
  "Video Production",
  "Music",
]

export default function StudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMajors, setSelectedMajors] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  // Filter students based on search and filters
  const filteredStudents = students.filter((student) => {
    // Search query filter
    if (
      searchQuery &&
      !student.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !student.major.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !student.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }

    // Major filter
    if (selectedMajors.length > 0 && !selectedMajors.includes(student.major)) {
      return false
    }

    // Skills filter
    if (selectedSkills.length > 0 && !student.skills.some((skill) => selectedSkills.includes(skill))) {
      return false
    }

    // Rating filter
    if (student.rating < minRating) {
      return false
    }

    // Verified filter
    if (verifiedOnly && !student.verified) {
      return false
    }

    return true
  })

  const toggleMajor = (major: string) => {
    setSelectedMajors((prev) => (prev.includes(major) ? prev.filter((m) => m !== major) : [...prev, major]))
  }

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  return (
    <div className=" px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#6A0032]">Talented Students</h1>
          <p className="text-muted-foreground">Discover skilled students from Central Michigan University</p>
        </div>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <div className="relative flex-1 md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <Select defaultValue="rating-high">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating-high">Highest Rated</SelectItem>
              <SelectItem value="rating-low">Lowest Rated</SelectItem>
              <SelectItem value="projects-high">Most Projects</SelectItem>
              <SelectItem value="projects-low">Fewest Projects</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Filters Sidebar */}
        <div className="hidden md:block border rounded-xl p-4">
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-[#6A0032]">Major</h3>
              <div className="space-y-2">
                {majors.map((major) => (
                  <div key={major} className="flex items-center space-x-2">
                    <Checkbox
                      id={`major-${major}`}
                      checked={selectedMajors.includes(major)}
                      onCheckedChange={() => toggleMajor(major)}
                    />
                    <label
                      htmlFor={`major-${major}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {major}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-[#6A0032]">Skills</h3>
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={`skill-${skill}`}
                      checked={selectedSkills.includes(skill)}
                      onCheckedChange={() => toggleSkill(skill)}
                    />
                    <label
                      htmlFor={`skill-${skill}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {skill}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-[#6A0032]">Minimum Rating</h3>
              <div className="px-2">
                <Slider defaultValue={[0]} max={5} step={0.1} onValueChange={(value) => setMinRating(value[0])} />
                <div className="mt-2 text-center text-sm font-medium">{minRating.toFixed(1)} Stars & Above</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="verified"
                checked={verifiedOnly}
                onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
              />
              <label
                htmlFor="verified"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Verified Students Only
              </label>
            </div>
            <Button
              className="w-full bg-[#6A0032] hover:bg-cmu-dark"
              onClick={() => {
                setSearchQuery("")
                setSelectedMajors([])
                setSelectedSkills([])
                setMinRating(0)
                setVerifiedOnly(false)
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Mobile Filters */}
        <div className="md:hidden">
          <Accordion type="single" collapsible className="mb-6 w-full">
            <AccordionItem value="filters">
              <AccordionTrigger>Filters</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Major</h3>
                    <div className="space-y-2">
                      {majors.map((major) => (
                        <div key={major} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-major-${major}`}
                            checked={selectedMajors.includes(major)}
                            onCheckedChange={() => toggleMajor(major)}
                          />
                          <label
                            htmlFor={`mobile-major-${major}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {major}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Skills</h3>
                    <div className="space-y-2">
                      {skills.slice(0, 6).map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-skill-${skill}`}
                            checked={selectedSkills.includes(skill)}
                            onCheckedChange={() => toggleSkill(skill)}
                          />
                          <label
                            htmlFor={`mobile-skill-${skill}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Minimum Rating</h3>
                    <div className="px-2">
                      <Slider defaultValue={[0]} max={5} step={0.1} onValueChange={(value) => setMinRating(value[0])} />
                      <div className="mt-2 text-center text-sm font-medium">{minRating.toFixed(1)} Stars & Above</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="mobile-verified"
                      checked={verifiedOnly}
                      onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
                    />
                    <label
                      htmlFor="mobile-verified"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Verified Students Only
                    </label>
                  </div>
                  <Button
                    className="w-full bg-cmu-maroon hover:bg-cmu-dark"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedMajors([])
                      setSelectedSkills([])
                      setMinRating(0)
                      setVerifiedOnly(false)
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Students Grid */}
        <div className="col-span-1 grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-3 lg:grid-cols-3">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <Link key={student.id} href={`/students/${student.id}`} className="group">
                <Card className="h-full overflow-hidden transition-all hover:shadow-md card-hover-effect">
                  <div className="relative aspect-square w-full overflow-hidden">
                    
                    <Image
                      src={student.avatar || "/placeholder.svg"}
                      alt={student.name}
                      width={0}
                      height={0}                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    {student.verified && (
                      <div className="absolute right-2 top-2 rounded-full bg-cmu-maroon p-1 text-white">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-lg font-bold">{student.name}</h3>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium">{student.rating}</span>
                      </div>
                    </div>
                    <div className="mb-3 flex items-center text-sm text-muted-foreground">
                      <span>
                        {student.major}, {student.year}
                      </span>
                    </div>
                    <div className="mb-3 flex flex-wrap gap-1">
                      {student.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {student.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{student.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{student.bio}</p>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 p-4">
                    <div className="w-full text-sm">
                      <p className="font-medium">Top Services:</p>
                      <ul className="mt-1 list-inside list-disc text-muted-foreground">
                        {student.topServices.slice(0, 2).map((service, index) => (
                          <li key={index} className="line-clamp-1">
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-muted p-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No students found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedMajors([])
                  setSelectedSkills([])
                  setMinRating(0)
                  setVerifiedOnly(false)
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

