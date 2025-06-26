"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Calendar, DollarSign, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

// Mock data for jobs
const jobs = [
  {
    id: 1,
    title: "Graphic Designer for Student Organization",
    description:
      "We're looking for a talented graphic designer to create promotional materials for our upcoming events. This includes posters, social media graphics, and digital signage.",
    category: "Design",
    type: "Project",
    budget: "$150-$200",
    duration: "2 weeks",
    postedDate: "2 days ago",
    deadline: "Apr 20, 2025",
    location: "Remote",
    skills: ["Graphic Design", "Adobe Creative Suite", "Social Media"],
    client: {
      name: "Student Activities Board",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SAB",
      verified: true,
    },
    applicants: 8,
  },
  {
    id: 2,
    title: "Web Developer for Department Website",
    description:
      "The Computer Science department is seeking a student web developer to update and maintain our department website. Experience with React and Next.js is required.",
    category: "Sponsorship",
    type: "Part-time",
    budget: "$20/hr",
    duration: "Ongoing",
    postedDate: "1 week ago",
    deadline: "Apr 25, 2025",
    location: "On-campus",
    skills: ["React", "Next.js", "JavaScript", "HTML/CSS"],
    client: {
      name: "CS Department",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "CS",
      verified: true,
    },
    applicants: 12,
  },
  {
    id: 3,
    title: "Research Assistant for Psychology Study",
    description:
      "Professor seeking a research assistant to help with data collection and analysis for a study on cognitive development. Experience with statistical analysis software is a plus.",
    category: "Research",
    type: "Part-time",
    budget: "$18/hr",
    duration: "3 months",
    postedDate: "3 days ago",
    deadline: "Apr 15, 2025",
    location: "On-campus",
    skills: ["Research Methods", "Data Analysis", "SPSS or R"],
    client: {
      name: "Dr. Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DJ",
      verified: true,
    },
    applicants: 5,
  },
  {
    id: 4,
    title: "Content Writer for Local Business",
    description:
      "Local coffee shop looking for a student to write engaging content for our website and social media channels. Must have excellent writing skills and a passion for coffee culture.",
    category: "Writing",
    type: "Freelance",
    budget: "$100-$150",
    duration: "1 month",
    postedDate: "5 days ago",
    deadline: "Apr 18, 2025",
    location: "Remote",
    skills: ["Content Writing", "SEO", "Social Media"],
    client: {
      name: "Morning Brew Cafe",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MB",
      verified: true,
    },
    applicants: 10,
  },
  {
    id: 5,
    title: "Math Tutor for Calculus",
    description:
      "Looking for a math tutor to help with Calculus II. Need someone who can explain concepts clearly and provide practice problems.",
    category: "Tutoring",
    type: "Part-time",
    budget: "$25/hr",
    duration: "Ongoing",
    postedDate: "1 day ago",
    deadline: "Apr 30, 2025",
    location: "On-campus",
    skills: ["Calculus", "Teaching", "Problem Solving"],
    client: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SC",
      verified: false,
    },
    applicants: 3,
  },
  {
    id: 6,
    title: "Video Editor for Student Film",
    description:
      "Film student looking for an experienced video editor to help with post-production on a short film project. Knowledge of Adobe Premiere Pro and After Effects required.",
    category: "Media",
    type: "Project",
    budget: "$300-$400",
    duration: "3 weeks",
    postedDate: "4 days ago",
    deadline: "Apr 22, 2025",
    location: "Remote",
    skills: ["Video Editing", "Adobe Premiere", "After Effects"],
    client: {
      name: "Film Club",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "FC",
      verified: true,
    },
    applicants: 7,
  },
  {
    id: 7,
    title: "Social Media Manager for Startup",
    description:
      "Student-run startup looking for a social media manager to grow our online presence. Experience with content creation and analytics preferred.",
    category: "Marketing",
    type: "Part-time",
    budget: "$15/hr",
    duration: "6 months",
    postedDate: "1 week ago",
    deadline: "Apr 17, 2025",
    location: "Hybrid",
    skills: ["Social Media", "Content Creation", "Analytics"],
    client: {
      name: "TechStart",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TS",
      verified: true,
    },
    applicants: 15,
  },
  {
    id: 8,
    title: "UI/UX Designer for Mobile App",
    description:
      "Looking for a UI/UX designer to create wireframes and mockups for a new mobile app. Must have experience with Figma and user-centered design principles.",
    category: "Design",
    type: "Project",
    budget: "$500-$700",
    duration: "1 month",
    postedDate: "3 days ago",
    deadline: "Apr 28, 2025",
    location: "Remote",
    skills: ["UI/UX Design", "Figma", "Mobile Design"],
    client: {
      name: "AppWorks",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AW",
      verified: true,
    },
    applicants: 9,
  },
]

// Categories for filtering
const categories = ["Design", "Development", "Research", "Writing", "Tutoring", "Media", "Marketing"]

const jobTypes = ["Project", "Part-time", "Freelance", "Internship", "One-time"]

const locations = ["Remote", "On-campus", "Hybrid", "Pittsburgh"]

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [budgetRange, setBudgetRange] = useState([0, 50])

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter((job) => {
    // Search query filter
    if (
      searchQuery &&
      !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !job.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(job.category)) {
      return false
    }

    // Type filter
    if (selectedTypes.length > 0 && !selectedTypes.includes(job.type)) {
      return false
    }

    // Location filter
    if (selectedLocations.length > 0 && !selectedLocations.includes(job.location)) {
      return false
    }

    // Budget filter for hourly jobs
    if (job.budget.includes("/hr")) {
      const hourlyRate = Number.parseInt(job.budget.replace(/\D/g, ""))
      if (hourlyRate < budgetRange[0] || hourlyRate > budgetRange[1]) {
        return false
      }
    }

    return true
  })

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleType = (type: string) => {
    setSelectedTypes((prev) => (prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]))
  }

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) => (prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]))
  }

  return (
    <div className=" px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#6A0032]">Jobs & Opportunities</h1>
          <p className="text-muted-foreground">Find projects, part-time work, and freelance opportunities</p>
        </div>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <div className="relative flex-1 md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search jobs..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="deadline">Deadline (Soonest)</SelectItem>
              <SelectItem value="budget-high">Budget (High to Low)</SelectItem>
              <SelectItem value="budget-low">Budget (Low to High)</SelectItem>
              <SelectItem value="applicants">Fewest Applicants</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* Filters Sidebar */}
        <div className="hidden md:block border rounded-xl p-4">
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-[#6A0032]">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-[#6A0032]">Job Type</h3>
              <div className="space-y-2">
                {jobTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={selectedTypes.includes(type)}
                      onCheckedChange={() => toggleType(type)}
                    />
                    <label
                      htmlFor={`type-${type}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-[#6A0032]">Location</h3>
              <div className="space-y-2">
                {locations.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={`location-${location}`}
                      checked={selectedLocations.includes(location)}
                      onCheckedChange={() => toggleLocation(location)}
                    />
                    <label
                      htmlFor={`location-${location}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {location}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold text-[#6A0032]">Hourly Budget</h3>
              <div className="px-2">
                <Slider defaultValue={[0, 50]} max={50} step={1} onValueChange={(value) => setBudgetRange(value)} color="#6A0032"/>
                <div className="mt-2 flex justify-between text-sm">
                  <span>${budgetRange[0]}/hr</span>
                  <span>${budgetRange[1]}/hr</span>
                </div>
              </div>
            </div>
            <Button
              className="w-full bg-[#6A0032] hover:bg-cmu-dark"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategories([])
                setSelectedTypes([])
                setSelectedLocations([])
                setBudgetRange([0, 50])
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
                    <h3 className="mb-2 text-lg font-semibold">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <label
                            htmlFor={`mobile-category-${category}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Job Type</h3>
                    <div className="space-y-2">
                      {jobTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-type-${type}`}
                            checked={selectedTypes.includes(type)}
                            onCheckedChange={() => toggleType(type)}
                          />
                          <label
                            htmlFor={`mobile-type-${type}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    className="w-full bg-cmu-maroon hover:bg-cmu-dark"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategories([])
                      setSelectedTypes([])
                      setSelectedLocations([])
                      setBudgetRange([0, 50])
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Jobs List */}
        <div className="col-span-1 space-y-6 md:col-span-3">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`} className=""> 
                <Card className="overflow-hidden transition-all hover:shadow-md card-hover-effect">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge className="mb-2 bg-[#6A0032]">{job.category}</Badge>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                      </div>
                      <Badge
                        variant={job.type === "Project" ? "default" : "outline"}
                        className="bg-[#6A0032] text-white"
                      >
                        {job.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="mb-4 line-clamp-2 text-muted-foreground">{job.description}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {job.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm md:grid-cols-4">
                      <div className="flex items-center">
                        <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{job.budget}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{job.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>Due {job.deadline}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-muted/50 p-4 ">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={job.client.avatar} alt={job.client.name} />
                          <AvatarFallback className="bg-orange-400">{job.client.initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{job.client.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Posted {job.postedDate}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{job.applicants} applicants</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <div className="mb-4 rounded-full bg-muted p-3">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No jobs found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategories([])
                  setSelectedTypes([])
                  setSelectedLocations([])
                  setBudgetRange([0, 50])
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

