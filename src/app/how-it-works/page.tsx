import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle, Users, Briefcase, MessageSquare, Star, CreditCard, Shield, Award } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className=" px-4 py-12 md:px-6 md:py-24">
      {/* Hero Section */}
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          How <span className="text-[#6A0032]">CMUTalentHub</span> Works
        </h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Connect with talented students, showcase your skills, and grow your professional network all in one place.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/register">
            <Button size="lg" className="bg-[#6A0032] hover:bg-orange-500">
              Get Started
            </Button>
          </Link>
          <Link href="/services">
            <Button size="lg" variant="outline" className="border-[#6A0032] text-[#6A0032] hover:bg-[#6A0032]/10">
              Browse Services
            </Button>
          </Link>
        </div>
      </div>

      {/* For Students Section */}
      <div className="mb-24">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-[#6A0032]">For Students Offering Services</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Showcase your skills, build your portfolio, and earn income while studying
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="card-hover-effect">
            <CardHeader className="pb-2">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-cmu-maroon/10">
                <Users className="h-32 w-32 text-[#6A0032]" />
              </div>
              <CardTitle>Create Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Sign up and create a detailed profile showcasing your skills, experience, and education.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Highlight your academic achievements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Showcase your portfolio</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">List your skills and expertise</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-hover-effect">
            <CardHeader className="pb-2">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-cmu-maroon/10">
                <Briefcase className="h-32 w-32 text-[#6A0032]" />
              </div>
              <CardTitle>List Services</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create service listings with detailed descriptions, pricing, and delivery timeframes.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Set your own rates and terms</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Offer package options</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Upload examples of your work</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-hover-effect">
            <CardHeader className="pb-2">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-cmu-maroon/10">
                <MessageSquare className="h-32 w-32 text-[#6A0032]" />
              </div>
              <CardTitle>Manage Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Communicate with clients, deliver work, and manage your ongoing projects.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Secure messaging system</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">File sharing capabilities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Project milestone tracking</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-hover-effect">
            <CardHeader className="pb-2">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-cmu-maroon/10">
                <Star className="h-32 w-32 text-[#6A0032]" />
              </div>
              <CardTitle>Build Reputation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Receive reviews and ratings to build your professional reputation.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Collect client testimonials</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Showcase your rating</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Earn verification badges</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* For Clients Section */}
      <div className="mb-24">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-[#6A0032]">For Students & Businesses Hiring</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Find talented students to help with your projects, events, and business needs
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <Card className="card-hover-effect">
            <CardHeader className="pb-2">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-cmu-maroon/10">
                <Users className="h-32 w-32 text-[#6A0032]" />
              </div>
              <CardTitle>Browse Talent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Explore profiles of talented students with various skills and expertise.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Search by skill or category</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Filter by rating and experience</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">View detailed portfolios</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-hover-effect">
            <CardHeader className="pb-2">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-cmu-maroon/10">
                <Briefcase className="h-32 w-32 text-[#6A0032]" />
              </div>
              <CardTitle>Post Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create job listings for your projects and receive proposals from qualified students.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Detailed job descriptions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Set budget and timeline</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Receive targeted applications</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-hover-effect">
            <CardHeader className="pb-2">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-cmu-maroon/10">
                <CreditCard className="h-32 w-32 text-[#6A0032]" />
              </div>
              <CardTitle>Secure Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Pay for services through our secure payment system with escrow protection.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Funds held in escrow</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Release payment upon approval</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Multiple payment methods</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-hover-effect">
            <CardHeader className="pb-2">
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-cmu-maroon/10">
                <Shield className="h-32 w-32 text-[#6A0032]" />
              </div>
              <CardTitle>Quality Assurance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Ensure quality with our review system and satisfaction guarantee.</p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Verified student profiles</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Dispute resolution</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="mr-2 mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">Satisfaction guarantee</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Trust & Safety Section */}
      <div className="mb-24">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-[#6A0032]">Trust & Safety</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We prioritize creating a safe and trusted environment for all users
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="card-hover-effect">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cmu-maroon/10">
                <Shield className="h-32 w-32 text-[#6A0032]" />
              </div>
              <CardTitle>Verified Profiles</CardTitle>
              <CardDescription>
                All students are verified through their university email and credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We verify the identity and student status of all users to ensure a trusted community. Additional
                verification badges can be earned through document verification and completed projects.
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover-effect">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cmu-maroon/10">
                <CreditCard className="h-32 w-32 text-[#6A0032]" />
              </div>
              <CardTitle>Secure Payments</CardTitle>
              <CardDescription>All transactions are protected with secure payment processing</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our escrow system holds payment until both parties are satisfied with the completed work. This protects
                both service providers and clients throughout the transaction process.
              </p>
            </CardContent>
          </Card>

          <Card className="card-hover-effect">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cmu-maroon/10">
                <Award className="h-32 w-32 text-[#6A0032]" />
              </div>
              <CardTitle>Quality Standards</CardTitle>
              <CardDescription>We maintain high standards for all services offered on our platform</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our review and rating system helps maintain quality standards across the platform. We also provide
                dispute resolution services to ensure fair outcomes for all parties.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-xl bg-[#6A0032] p-8 text-center text-white md:p-12">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl ">Ready to Get Started?</h2>
        <p className="mx-auto mb-8 max-w-2xl text-white/80">
          Join CMUTalentHub today to connect with talented students or offer your skills to the community.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/register">
            <Button size="lg" className="bg-white text-[#6A0032] hover:bg-gray-100">
              Sign Up Now
            </Button>
          </Link>
          <Link href="/services">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-[#6A0032]/10">
              Browse Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

