import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MessageSquare, CheckCircle, Briefcase, GraduationCap, MapPin, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import Servicee from "@/assets/landdd.webp"
import Serviceee from "@/assets/designn.jpg"
import Serviceeee from "@/assets/landd.jpg"
import Design from "@/assets/user.webp"
import Image from "next/image"

// Mock student data
const student = {
  id: 1,
  name: "Alex Chen",
  avatar: "/placeholder.svg?height=400&width=400",
  initials: "AC",
  major: "Design",
  year: "Junior",
  location: "Mount Pleasant, MI",
  joinedDate: "September 2022",
  skills: [
    { name: "Graphic Design", level: 95 },
    { name: "UI/UX Design", level: 90 },
    { name: "Brand Identity", level: 85 },
    { name: "Adobe Creative Suite", level: 92 },
    { name: "Typography", level: 88 },
    { name: "Illustration", level: 75 },
  ],
  languages: [
    { name: "English", level: "Native" },
    { name: "Mandarin", level: "Fluent" },
    { name: "Spanish", level: "Intermediate" },
  ],
  education: [
    {
      institution: "Carnegie Mellon University",
      degree: "Bachelor of Design",
      field: "Communication Design",
      years: "2021 - 2025",
    },
    {
      institution: "Design Summer Academy",
      degree: "Certificate",
      field: "UI/UX Design",
      years: "Summer 2022",
    },
  ],
  experience: [
    {
      position: "Design Intern",
      company: "Creative Solutions Agency",
      duration: "Summer 2023",
      description:
        "Worked on branding and marketing materials for various clients. Assisted in UI/UX design for web and mobile applications.",
    },
    {
      position: "Graphic Designer",
      company: "CMU Student Activities Board",
      duration: "2022 - Present",
      description:
        "Create promotional materials for campus events, including posters, social media graphics, and digital signage.",
    },
  ],
  rating: 4.9,
  reviews: [
    {
      id: 1,
      user: {
        name: "Jamie Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
      },
      rating: 5,
      date: "October 15, 2023",
      project: "Logo Design",
      comment:
        "Alex created an amazing logo for our student organization. The design perfectly captured our mission and has helped us stand out on campus. Highly recommend!",
    },
    {
      id: 2,
      user: {
        name: "Taylor Wong",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "TW",
      },
      rating: 5,
      date: "September 28, 2023",
      project: "Event Posters",
      comment:
        "I needed posters for an event with a tight deadline, and Alex delivered high-quality work quickly. The designs were creative and exactly what I was looking for.",
    },
    {
      id: 3,
      user: {
        name: "Jordan Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JL",
      },
      rating: 4,
      date: "August 12, 2023",
      project: "Brand Identity",
      comment:
        "Great work on our club's branding package. The only reason for 4 stars instead of 5 is that we needed an extra revision round, but Alex was accommodating and the final result was excellent.",
    },
  ],
  completedProjects: 42,
  responseRate: "98%",
  responseTime: "Within 2 hours",
  verified: true,
  verifications: ["Email", "Student ID", "Portfolio", "Payment Method"],
  bio: "I'm a junior studying Design with a focus on digital media and brand identity. I've worked with several campus organizations and local businesses to create branding materials and marketing collateral. My passion lies in creating visually compelling designs that effectively communicate brand messages and engage target audiences.",
  portfolio: [
    {
      title: "Brand Identity for Local Cafe",
      image: Design.src,
      description: "Complete brand identity including logo, color palette, typography, and marketing materials.",
    },
    {
      title: "Mobile App UI Design",
      image: Serviceee.src,
      description: "User interface design for a fitness tracking mobile application.",
    },
    {
      title: "Event Poster Series",
      image: Serviceeee.src,
      description: "Series of posters for campus events with consistent visual language.",
    },
    {
      title: "E-commerce Website Redesign",
      image: Servicee.src,
      description:
        "Complete redesign of an e-commerce website focusing on user experience and conversion optimization.",
    },
  ],
  services: [
    {
      id: 1,
      title: "Logo Design & Brand Identity",
      price: "$150",
      description:
        "Professional logo design and brand identity package including logo variations, color palette, typography, and basic brand guidelines.",
      deliveryTime: "7 days",
      rating: 5.0,
      reviews: 15,
    },
    {
      id: 2,
      title: "Social Media Graphics Package",
      price: "$80",
      description: "Set of 10 custom social media graphics designed for your brand, optimized for various platforms.",
      deliveryTime: "5 days",
      rating: 4.8,
      reviews: 12,
    },
    {
      id: 3,
      title: "UI/UX Design",
      price: "$200",
      description:
        "User interface and experience design for websites or mobile applications, including wireframes and high-fidelity mockups.",
      deliveryTime: "10 days",
      rating: 4.9,
      reviews: 8,
    },
  ],
}

export default function StudentProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className=" px-4 py-8 md:px-6 md:py-12">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Student Profile Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                    <AvatarFallback>{student.initials}</AvatarFallback>
                  </Avatar>
                  {student.verified && (
                    <div className="absolute -right-2 bottom-0 rounded-full bg-cmu-maroon p-1 text-white">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                  )}
                </div>
                <h1 className="mt-4 text-2xl font-bold">{student.name}</h1>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {student.major}, {student.year}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{student.location}</span>
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="ml-1 font-bold">{student.rating}</span>
                    <span className="ml-1 text-muted-foreground">({student.reviews.length} reviews)</span>
                  </div>
                </div>
                <div className="mt-6 grid w-full grid-cols-2 gap-4">
                  <Button className="bg-[#6A0032] hover:bg-cmu-dark">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                  <Button variant="outline">View Resume</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{student.bio}</p>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member since</span>
                  <span className="font-medium">{student.joinedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Projects completed</span>
                  <span className="font-medium">{student.completedProjects}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response rate</span>
                  <span className="font-medium">{student.responseRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Response time</span>
                  <span className="font-medium">{student.responseTime}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {student.skills.map((skill, index) => (
                <div key={index}>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Languages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {student.languages.map((language, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-medium">{language.name}</span>
                    <Badge variant="outline">{language.level}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {student.verifications.map((verification, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>{verification} Verified</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="portfolio" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="services">Services</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {student.portfolio.map((item, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <Image src={item.image} alt={item.title} width={600} height={400} className="object-cover" />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                {student.services.map((service) => (
                  <Card key={service.id} className="overflow-hidden">
                    <CardHeader className="p-4">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <div className="text-lg font-bold text-cmu-maroon">{service.price}</div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="mb-4 text-sm text-muted-foreground">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{service.deliveryTime}</span>
                        </div>
                        <div className="flex items-center">
                          <Star className="mr-1 h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm">
                            {service.rating} ({service.reviews})
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <div className="border-t p-4">
                      <Button className="w-full bg-[#6A0032] hover:bg-cmu-dark">Request Service</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="education" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {student.education.map((edu, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cmu-maroon/10">
                          <GraduationCap className="h-5 w-5 text-cmu-maroon" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            {edu.degree} in {edu.field}
                          </h3>
                          <p className="text-muted-foreground">{edu.institution}</p>
                          <p className="text-sm text-muted-foreground">{edu.years}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {student.experience.map((exp, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-cmu-maroon/10">
                          <Briefcase className="h-5 w-5 text-cmu-maroon" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{exp.position}</h3>
                          <p className="text-muted-foreground">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">{exp.duration}</p>
                          <p className="mt-2 text-sm">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Client Reviews</CardTitle>
                    <CardDescription>Feedback from previous clients</CardDescription>
                  </div>
                  <div className="flex items-center">
                    <Star className="mr-1 h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="font-bold">{student.rating}</span>
                    <span className="ml-1 text-muted-foreground">({student.reviews.length} reviews)</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {student.reviews.map((review) => (
                      <div key={review.id} className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
                              <AvatarFallback>{review.user.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <span className="font-medium">{review.user.name}</span>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {Array(review.rating)
                              .fill(0)
                              .map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                              ))}
                            {Array(5 - review.rating)
                              .fill(0)
                              .map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-muted-foreground" />
                              ))}
                          </div>
                        </div>
                        <Badge variant="outline" className="mb-2">
                          {review.project}
                        </Badge>
                        <p className="text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
