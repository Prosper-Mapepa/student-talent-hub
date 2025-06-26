"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  PlusCircle,
  Search,
  Clock,
  DollarSign,
  Users,
  Briefcase,
  Star,
  MessageSquare,
  FileText,
  CreditCard,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for active projects
const activeProjects = [
  {
    id: 1,
    title: "Logo Design for Marketing Campaign",
    provider: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AJ",
      major: "Design",
      year: "Senior",
    },
    status: "In Progress",
    dueDate: "Apr 28, 2025",
    price: "$120",
    messages: 2,
  },
  {
    id: 2,
    title: "Social Media Content Creation",
    provider: {
      name: "Sophia Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SC",
      major: "Marketing",
      year: "Junior",
    },
    status: "Revision Requested",
    dueDate: "May 5, 2025",
    price: "$200",
    messages: 4,
  },
  {
    id: 3,
    title: "Website Bug Fixes",
    provider: {
      name: "Marcus Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ML",
      major: "Computer Science",
      year: "Senior",
    },
    status: "Awaiting Review",
    dueDate: "Apr 25, 2025",
    price: "$180",
    messages: 0,
  },
]

// Mock data for completed projects
const completedProjects = [
  {
    id: 4,
    title: "Market Research Report",
    provider: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EW",
      major: "Business",
      year: "Senior",
    },
    completedDate: "Apr 10, 2025",
    price: "$250",
    rating: 5,
  },
  {
    id: 5,
    title: "Product Photography",
    provider: {
      name: "David Park",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DP",
      major: "Photography",
      year: "Junior",
    },
    completedDate: "Apr 5, 2025",
    price: "$150",
    rating: 4,
  },
]

// Mock data for job postings
const jobPostings = [
  {
    id: 1,
    title: "UI/UX Designer for Mobile App",
    category: "Design",
    budget: "$200-300",
    posted: "Apr 15, 2025",
    applications: 8,
    status: "Active",
  },
  {
    id: 2,
    title: "Python Developer for Data Analysis",
    category: "Development",
    budget: "$150-250",
    posted: "Apr 12, 2025",
    applications: 5,
    status: "Active",
  },
  {
    id: 3,
    title: "Content Writer for Blog Posts",
    category: "Writing",
    budget: "$100-150",
    posted: "Apr 8, 2025",
    applications: 12,
    status: "Closed",
  },
]

// Mock data for recommended talent
const recommendedTalent = [
  {
    id: 1,
    name: "Jessica Zhang",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JZ",
    major: "Computer Science",
    year: "Senior",
    skills: ["Web Development", "UI/UX Design", "React"],
    rating: 4.9,
    projects: 15,
  },
  {
    id: 2,
    name: "Ryan Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "RP",
    major: "Graphic Design",
    year: "Junior",
    skills: ["Illustration", "Branding", "Animation"],
    rating: 4.8,
    projects: 12,
  },
  {
    id: 3,
    name: "Olivia Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "OM",
    major: "Marketing",
    year: "Senior",
    skills: ["Social Media", "Content Strategy", "Analytics"],
    rating: 4.7,
    projects: 9,
  },
]

// Mock data for payment history
const paymentHistory = [
  {
    id: 1,
    description: "Payment for Logo Design",
    provider: "Alex Johnson",
    date: "Apr 18, 2025",
    amount: "$120.00",
    status: "Completed",
  },
  {
    id: 2,
    description: "Payment for Market Research",
    provider: "Emma Wilson",
    date: "Apr 10, 2025",
    amount: "$250.00",
    status: "Completed",
  },
  {
    id: 3,
    description: "Deposit for Website Bug Fixes",
    provider: "Marcus Lee",
    date: "Apr 15, 2025",
    amount: "$90.00",
    status: "Completed",
  },
  {
    id: 4,
    description: "Remaining Balance for Website Bug Fixes",
    provider: "Marcus Lee",
    date: "Apr 25, 2025",
    amount: "$90.00",
    status: "Pending",
  },
]

export default function BusinessDashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className=" px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#6A0032]">Business Dashboard</h1>
          <p className="text-muted-foreground">Find talent, manage projects, and track your investments</p>
        </div>
        <div className="flex gap-2">
          <Link href="/business-dashboard/post-job">
            <Button className="bg-cmu-maroon hover:bg-cmu-dark">
              <PlusCircle className="mr-2 h-4 w-4" />
              Post New Job
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          <TabsTrigger value="talent">Find Talent</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-[#6A0032]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-white">Active Projects</CardTitle>
                <Briefcase className="h-5 w-5 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400">{activeProjects.length}</div>
                <p className="text-xs text-white">
                  {activeProjects.length > 0 ? "Projects in progress" : "No active projects"}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#6A0032]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-white">Active Job Postings</CardTitle>
                <FileText className="h-5 w-5 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400">{jobPostings.filter((job) => job.status === "Active").length}</div>
                <p className="text-xs text-white">
                  {jobPostings.reduce((total, job) => (job.status === "Active" ? total + job.applications : total), 0)}{" "}
                  applications received
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#6A0032]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-white">Total Spent</CardTitle>
                <DollarSign className="h-5 w-5 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400">$720.00</div>
                <p className="text-xs text-white">This month</p>
              </CardContent>
            </Card>
            <Card className="bg-[#6A0032]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-white">Talent Network</CardTitle>
                <Users className="h-5 w-5 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400">24</div>
                <p className="text-xs text-white">Students in your network</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
                <CardDescription>Your current ongoing projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeProjects.length > 0 ? (
                    activeProjects.slice(0, 2).map((project) => (
                      <div key={project.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={project.provider.avatar || "/placeholder.svg"}
                              alt={project.provider.name}
                            />
                            <AvatarFallback>{project.provider.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{project.title}</p>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  project.status === "In Progress"
                                    ? "default"
                                    : project.status === "Revision Requested"
                                      ? "destructive"
                                      : "outline"
                                }
                              >
                                {project.status}
                              </Badge>
                              <span className="flex items-center text-xs text-muted-foreground">
                                <Clock className="mr-1 h-3 w-3" />
                                Due {project.dueDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <p className="font-medium text-cmu-maroon">{project.price}</p>
                            {project.messages > 0 && (
                              <div className="flex items-center justify-end text-xs text-muted-foreground">
                                <MessageSquare className="mr-1 h-3 w-3" />
                                {project.messages} new
                              </div>
                            )}
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/business-dashboard/projects/${project.id}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="text-muted-foreground">No active projects</p>
                      <Button variant="outline" className="mt-4" asChild>
                        <Link href="/services">Browse Services</Link>
                      </Button>
                    </div>
                  )}
                  {activeProjects.length > 2 && (
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#" onClick={() => setActiveTab("projects")}>
                        View All Projects
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recommended Talent</CardTitle>
                <CardDescription>Students that match your needs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedTalent.slice(0, 2).map((talent) => (
                    <div key={talent.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={talent.avatar || "/placeholder.svg"} alt={talent.name} />
                          <AvatarFallback>{talent.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{talent.name}</p>
                          <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
                            <span className="text-xs text-muted-foreground">
                              {talent.major}, {talent.year}
                            </span>
                            <div className="flex items-center">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span className="ml-1 text-xs">{talent.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/students/${talent.id}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="#" onClick={() => setActiveTab("talent")}>
                      Browse All Talent
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Job Postings</CardTitle>
                <CardDescription>Status of your job listings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {jobPostings
                    .filter((job) => job.status === "Active")
                    .slice(0, 2)
                    .map((job) => (
                      <div key={job.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{job.category}</Badge>
                            <span className="text-xs text-muted-foreground">{job.applications} applications</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/business-dashboard/jobs/${job.id}`}>View</Link>
                        </Button>
                      </div>
                    ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="#" onClick={() => setActiveTab("jobs")}>
                      Manage Job Postings
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <CardDescription>Your recent transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.slice(0, 2).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">{payment.description}</p>
                        <p className="text-xs text-muted-foreground">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-cmu-maroon">{payment.amount}</p>
                        <Badge variant={payment.status === "Completed" ? "outline" : "secondary"} className="mt-1">
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="#" onClick={() => setActiveTab("payments")}>
                      View All Transactions
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Active Projects</TabsTrigger>
              <TabsTrigger value="completed">Completed Projects</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                  <CardDescription>Manage your ongoing projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeProjects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">{project.title}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={project.provider.avatar || "/placeholder.svg"}
                                  alt={project.provider.name}
                                />
                                <AvatarFallback>{project.provider.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <span>{project.provider.name}</span>
                                <p className="text-xs text-muted-foreground">{project.provider.major}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                project.status === "In Progress"
                                  ? "default"
                                  : project.status === "Revision Requested"
                                    ? "destructive"
                                    : "outline"
                              }
                            >
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{project.dueDate}</TableCell>
                          <TableCell>{project.price}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/business-dashboard/projects/${project.id}`}>View</Link>
                              </Button>
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/messages?project=${project.id}`}>Message</Link>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Completed Projects</CardTitle>
                  <CardDescription>View your completed projects and ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Provider</TableHead>
                        <TableHead>Completed Date</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {completedProjects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="font-medium">{project.title}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage
                                  src={project.provider.avatar || "/placeholder.svg"}
                                  alt={project.provider.name}
                                />
                                <AvatarFallback>{project.provider.initials}</AvatarFallback>
                              </Avatar>
                              <div>
                                <span>{project.provider.name}</span>
                                <p className="text-xs text-muted-foreground">{project.provider.major}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{project.completedDate}</TableCell>
                          <TableCell>{project.price}</TableCell>
                          <TableCell>
                            <div className="flex">
                              {Array(project.rating)
                                .fill(0)
                                .map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                ))}
                              {Array(5 - project.rating)
                                .fill(0)
                                .map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-muted-foreground" />
                                ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="sm" asChild>
                                <Link href={`/business-dashboard/projects/${project.id}`}>View</Link>
                              </Button>
                              <Button variant="outline" size="sm">
                                Rehire
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Job Postings</CardTitle>
                <CardDescription>Manage your job listings and applications</CardDescription>
              </div>
              <Button className="bg-cmu-maroon hover:bg-cmu-dark" asChild>
                <Link href="/business-dashboard/post-job">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Post New Job
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Posted</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobPostings.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{job.category}</Badge>
                      </TableCell>
                      <TableCell>{job.budget}</TableCell>
                      <TableCell>{job.posted}</TableCell>
                      <TableCell>{job.applications}</TableCell>
                      <TableCell>
                        <Badge variant={job.status === "Active" ? "default" : "secondary"}>{job.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/business-dashboard/jobs/${job.id}/edit`}>Edit</Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/business-dashboard/jobs/${job.id}`}>View</Link>
                          </Button>
                          {job.status === "Active" && (
                            <Button variant="outline" size="sm">
                              Close
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="talent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Find Talent</CardTitle>
              <CardDescription>Discover skilled students for your projects</CardDescription>
              <div className="mt-4 flex w-full max-w-sm items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search by skill, major, or name..."
                    className="w-full rounded-md border border-input bg-background py-2 pl-8 pr-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <Button type="submit">Search</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recommendedTalent.map((talent) => (
                  <Card key={talent.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col items-center p-6 text-center">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={talent.avatar || "/placeholder.svg"} alt={talent.name} />
                          <AvatarFallback>{talent.initials}</AvatarFallback>
                        </Avatar>
                        <h3 className="mt-4 text-lg font-medium">{talent.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {talent.major}, {talent.year}
                        </p>
                        <div className="mt-2 flex items-center">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="ml-1 text-sm">
                            {talent.rating} ({talent.projects} projects)
                          </span>
                        </div>
                      </div>
                      <div className="bg-muted/50 p-4">
                        <div className="flex flex-wrap gap-2">
                          {talent.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="bg-background">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-4 flex justify-between">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/students/${talent.id}`}>View Profile</Link>
                          </Button>
                          <Button size="sm" className="bg-cmu-maroon hover:bg-cmu-dark">
                            Contact
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <Button variant="outline">Load More</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$720.00</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$90.00</div>
                <p className="text-xs text-muted-foreground">Awaiting completion</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Active payment methods</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View all your transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Receipt</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.description}</TableCell>
                      <TableCell>{payment.provider}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell className="text-cmu-maroon">{payment.amount}</TableCell>
                      <TableCell>
                        <Badge variant={payment.status === "Completed" ? "outline" : "secondary"}>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {payment.status === "Completed" && (
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
