"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare, DollarSign, Clock, CheckCircle, PlusCircle } from "lucide-react"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for active projects
const activeProjects = [
  {
    id: 1,
    title: "Logo Design for Student Club",
    client: {
      name: "Science Club",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SC",
    },
    status: "In Progress",
    dueDate: "Apr 15, 2025",
    price: "$40",
    messages: 3,
  },
  {
    id: 2,
    title: "Website Development for Local Cafe",
    client: {
      name: "Morning Brew Cafe",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MB",
    },
    status: "Revision Requested",
    dueDate: "Apr 20, 2025",
    price: "$150",
    messages: 5,
  },
]

// Mock data for completed projects
const completedProjects = [
  {
    id: 3,
    title: "Poster Design for Campus Event",
    client: {
      name: "Student Activities Board",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SA",
    },
    completedDate: "Mar 28, 2025",
    price: "$35",
    rating: 5,
  },
  {
    id: 4,
    title: "Social Media Graphics Package",
    client: {
      name: "Dance Club",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DC",
    },
    completedDate: "Mar 15, 2025",
    price: "$60",
    rating: 4,
  },
]

// Mock data for services
const services = [
  {
    id: 1,
    title: "Graphic Design & Branding",
    price: "$40",
    category: "Design",
    orders: 12,
    views: 245,
    status: "Active",
  },
  {
    id: 2,
    title: "Website Development",
    price: "$150",
    category: "Development",
    orders: 5,
    views: 178,
    status: "Active",
  },
  {
    id: 3,
    title: "Social Media Graphics",
    price: "$25",
    category: "Design",
    orders: 8,
    views: 203,
    status: "Active",
  },
]

// Mock data for earnings
const earnings = {
  total: "$850.00",
  pending: "$190.00",
  withdrawn: "$660.00",
  recentTransactions: [
    {
      id: 1,
      description: "Payment for Logo Design",
      amount: "$40.00",
      date: "Apr 2, 2025",
      status: "Completed",
    },
    {
      id: 2,
      description: "Payment for Website Development",
      amount: "$150.00",
      date: "Mar 28, 2025",
      status: "Pending",
    },
    {
      id: 3,
      description: "Withdrawal to Bank Account",
      amount: "-$200.00",
      date: "Mar 25, 2025",
      status: "Completed",
    },
  ],
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className=" px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#6A0032]">Student Dashboard</h1>
          <p className="text-muted-foreground">Manage your services, projects, and earnings</p>
        </div>
        <div className="flex gap-2">
          <Link href="/services/create">
            <Button className="bg-[#6A0032] hover:bg-cmu-dark">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Service
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4 " onValueChange={setActiveTab}>
        <TabsList className="bg-[#6A0032]/10 text-white">
          <TabsTrigger value="overview" className="">Overview</TabsTrigger>
          <TabsTrigger value="projects" className="">Projects</TabsTrigger>
          <TabsTrigger value="services" className="">Services</TabsTrigger>
          <TabsTrigger value="earnings" className="">Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-[#6A0032] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium ">Active Projects</CardTitle>
                <CheckCircle className="h-8 w-8 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400">{activeProjects.length}</div>
                <p className="text-xs text-white">
                  {activeProjects.length > 0 ? "Projects in progress" : "No active projects"}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#6A0032] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                <DollarSign className="h-8 w-8 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400">{earnings.total}</div>
                <p className="text-xs text-white">{earnings.pending} pending</p>
              </CardContent>
            </Card>
            <Card className="bg-[#6A0032] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Services</CardTitle>
                <PlusCircle className="h-8 w-8 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400">{services.length}</div>
                <p className="text-xs text-white">
                  {services.reduce((total, service) => total + service.orders, 0)} total orders
                </p>
              </CardContent>
            </Card>
            <Card className="bg-[#6A0032] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-8 w-8 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400">4.8</div>
                <p className="text-xs text-white">From {completedProjects.length} completed projects</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-[#6A0032]">Active Projects</CardTitle>
                <CardDescription>Your current ongoing projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeProjects.length > 0 ? (
                    activeProjects.map((project) => (
                      <div key={project.id} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={project.client.avatar || "/placeholder.svg"} alt={project.client.name} />
                            <AvatarFallback>{project.client.initials}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{project.title}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant={project.status === "In Progress" ? "default" : "outline"}>
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
                            <p className="font-medium text-green-700">{project.price}</p>
                            {project.messages > 0 && (
                              <div className="flex items-center justify-end text-xs text-muted-foreground">
                                <MessageSquare className="mr-1 h-3 w-3" />
                                {project.messages} new
                              </div>
                            )}
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/projects/${project.id}`}>View</Link>
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <p className="text-muted-foreground">No active projects</p>
                      <Button variant="outline" className="mt-4" asChild>
                        <Link href="/services">Browse Opportunities</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle className="text-[#6A0032]">Recent Earnings</CardTitle>
                <CardDescription>Your recent transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {earnings.recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-medium ${transaction.amount.startsWith("-") ? "text-red-600" : "text-green-700"}`}
                        >
                          {transaction.amount}
                        </p>
                        <Badge variant={transaction.status === "Completed" ? "outline" : "secondary"} className="mt-1">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
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
                  <CardTitle className="text-[#6A0032]">Active Projects</CardTitle>
                  <CardDescription>Manage your ongoing projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Client</TableHead>
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
                                  src={project.client.avatar || "/placeholder.svg"}
                                  alt={project.client.name}
                                />
                                <AvatarFallback>{project.client.initials}</AvatarFallback>
                              </Avatar>
                              <span>{project.client.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={project.status === "In Progress" ? "default" : "outline"} >
                              {project.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{project.dueDate}</TableCell>
                          <TableCell>{project.price}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/projects/${project.id}`}>View</Link>
                            </Button>
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
                  <CardTitle className="text-[#6A0032]">Completed Projects</CardTitle>
                  <CardDescription>View your completed projects and ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Client</TableHead>
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
                                  src={project.client.avatar || "/placeholder.svg"}
                                  alt={project.client.name}
                                />
                                <AvatarFallback className="bg-orange-400">{project.client.initials}</AvatarFallback>
                              </Avatar>
                              <span>{project.client.name}</span>
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
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/projects/${project.id}`}>View</Link>
                            </Button>
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

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-[#6A0032]">Your Services</CardTitle>
                <CardDescription>Manage and track your service listings</CardDescription>
              </div>
              <Button className="bg-cmu-maroon hover:bg-cmu-dark" asChild>
                <Link href="/services/create">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Service
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => (
                    <TableRow key={service.id}>
                      <TableCell className="font-medium">{service.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{service.category}</Badge>
                      </TableCell>
                      <TableCell>{service.price}</TableCell>
                      <TableCell>{service.orders}</TableCell>
                      <TableCell>{service.views}</TableCell>
                      <TableCell>
                        <Badge variant={service.status === "Active" ? "default" : "secondary"}>{service.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/services/${service.id}/edit`}>Edit</Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/services/${service.id}`}>View</Link>
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

        <TabsContent value="earnings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-[#6A0032] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium ">Total Earnings</CardTitle>
                <DollarSign className="h-8 w-8 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400">{earnings.total}</div>
                <p className="text-xs text-white">Lifetime earnings</p>
              </CardContent>
            </Card>
            <Card className="bg-[#6A0032] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-8 w-8 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400">{earnings.pending}</div>
                <p className="text-xs text-white">Awaiting clearance</p>
              </CardContent>
            </Card>
            <Card className="bg-[#6A0032] text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Withdrawn</CardTitle>
                <CheckCircle className="h-8 w-8 text-white" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-400">{earnings.withdrawn}</div>
                <p className="text-xs text-white">Transferred to bank</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View all your earnings and withdrawals</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {earnings.recentTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.description}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell
                        className={transaction.amount.startsWith("-") ? "text-muted-foreground" : "text-red-600"}
                      >
                        {transaction.amount}
                      </TableCell>
                      <TableCell>
                        <Badge variant={transaction.status === "Completed" ? "outline" : "secondary"}>
                          {transaction.status}
                        </Badge>
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
