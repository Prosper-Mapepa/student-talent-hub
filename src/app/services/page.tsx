import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Search, Filter } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import Service from '../../assets/landdd.webp'
import Image from "next/image"

// Mock data for services
const services = [
  {
    id: 1,
    title: "Graphic Design & Branding",
    description: "Professional logos, posters, and branding materials for your club or event",
    price: "$40",
    category: "Design",
    rating: 4.9,
    reviews: 27,
    provider: {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AC",
      major: "Design",
      year: "Junior",
    },
    image: Service,
  },
  {
    id: 2,
    title: "Computer Science Tutoring",
    description: "One-on-one tutoring for CS courses including algorithms, data structures, and programming",
    price: "$25/hr",
    category: "Tutoring",
    rating: 4.8,
    reviews: 42,
    provider: {
      name: "Maya Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MJ",
      major: "Computer Science",
      year: "Senior",
    },
    image: Service,
  },
  {
    id: 3,
    title: "Research Assistance",
    description: "Help with literature reviews, data analysis, and research methodology",
    price: "$30/hr",
    category: "Research",
    rating: 4.7,
    reviews: 18,
    provider: {
      name: "David Park",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DP",
      major: "Psychology",
      year: "Graduate",
    },
    image: Service,
  },
  {
    id: 4,
    title: "Essay Editing & Proofreading",
    description: "Professional editing for essays, papers, and applications with quick turnaround",
    price: "$20",
    category: "Writing",
    rating: 4.9,
    reviews: 35,
    provider: {
      name: "Sophia Martinez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "SM",
      major: "English",
      year: "Senior",
    },
    image: Service,
  },
  {
    id: 5,
    title: "Website Development",
    description: "Custom websites for personal portfolios, student organizations, or small businesses",
    price: "$150",
    category: "Development",
    rating: 4.8,
    reviews: 22,
    provider: {
      name: "James Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JW",
      major: "Information Systems",
      year: "Senior",
    },
    image: Service,
  },
  {
    id: 6,
    title: "Math & Statistics Tutoring",
    description: "Help with calculus, linear algebra, statistics, and probability courses",
    price: "$25/hr",
    category: "Tutoring",
    rating: 4.7,
    reviews: 31,
    provider: {
      name: "Emma Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EL",
      major: "Mathematics",
      year: "Junior",
    },
    image: Service,
  },
  {
    id: 7,
    title: "Video Production & Editing",
    description: "Professional video production for events, presentations, and social media content",
    price: "$50/hr",
    category: "Media",
    rating: 4.9,
    reviews: 19,
    provider: {
      name: "Ryan Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RT",
      major: "Film Studies",
      year: "Senior",
    },
    image: Service,
  },
  {
    id: 8,
    title: "Music Lessons",
    description: "Private lessons for piano, guitar, voice, and music theory",
    price: "$30/hr",
    category: "Music",
    rating: 4.8,
    reviews: 24,
    provider: {
      name: "Olivia Garcia",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "OG",
      major: "Music",
      year: "Junior",
    },
    image: Service,
  },
]

// Categories for filtering
const categories = ["Design", "Tutoring", "Research", "Writing", "Development", "Media", "Music", "Art"]

export default function ServicesPage() {
  return (
    <div className=" px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#6A0032]">Services</h1>
          <p className="text-muted-foreground">Browse services offered by talented CMU students</p>
        </div>
        <div className="flex w-full items-center gap-2 md:w-auto">
          <div className="relative flex-1 md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search services..." className="pl-8" />
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
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 ">
        {/* Filters Sidebar */}
        <div className="hidden md:block border rounded-xl p-4">
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-semibold text-[#6A0032]">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={`category-${category}`} />
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
              <h3 className="mb-2 text-lg font-semibold text-[#6A0032]">Price Range</h3>
              <div className="grid grid-cols-2 gap-2">
                <Input type="number" placeholder="Min" />
                <Input type="number" placeholder="Max" />
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <Checkbox id={`rating-${rating}`} />
                    <label
                      htmlFor={`rating-${rating}`}
                      className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {Array(rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      {Array(5 - rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-muted-foreground" />
                        ))}
                      <span className="ml-1">& Up</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full bg-[#6A0032]">Apply Filters</Button>
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
                          <Checkbox id={`mobile-category-${category}`} />
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
                    <h3 className="mb-2 text-lg font-semibold">Price Range</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Input type="number" placeholder="Min" />
                      <Input type="number" placeholder="Max" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-semibold">Rating</h3>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-2">
                          <Checkbox id={`mobile-rating-${rating}`} />
                          <label
                            htmlFor={`mobile-rating-${rating}`}
                            className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {Array(rating)
                              .fill(0)
                              .map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                              ))}
                            {Array(5 - rating)
                              .fill(0)
                              .map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-muted-foreground" />
                              ))}
                            <span className="ml-1">& Up</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full bg-[#6A0032]">Apply Filters</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Services Grid */}
        <div className="col-span-1 grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-3 lg:grid-cols-3">
          {services.map((service) => (
            <Link key={service.id} href={`/services/${service.id}`} className="group">
              <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                <div className="aspect-video w-full overflow-hidden">
                  {/* <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  /> */}
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge className="mb-2 bg-[#6A0032]">{service.category}</Badge>
                      <CardTitle className="line-clamp-1 text-lg">{service.title}</CardTitle>
                    </div>
                    <div className="text-lg font-bold text-red-600">{service.price}</div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="line-clamp-2 text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between p-4 pt-0">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={service.provider.avatar} alt={service.provider.name} />
                      <AvatarFallback className="bg-orange-400">{service.provider.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{service.provider.name}</p>
                      <p className="text-xs text-muted-foreground">{service.provider.major}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-1 h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-medium">{service.rating}</span>
                    <span className="text-xs text-muted-foreground">({service.reviews})</span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

