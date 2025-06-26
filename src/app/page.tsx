import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Briefcase, MessageSquare, Star, Users,CheckCircle, Award } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import FeaturedServices from "@/components/featured-services"
import { BsStarFill } from "react-icons/bs";
import Banner from '../assets/banner.png'
import Brand from "../assets/landdd.webp"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col ">
      {/* Hero Section */}
      <section className="gradient-bg py-20 text-white bg-[#6A0032]">
        <div className=" px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                  Discover Student <span className="gradient-text text-[#FEC72D]">Talent</span> at CMU
                </h1>
                <p className="max-w-[600px] text-white/80 md:text-xl py-5">
                  Connect with skilled students offering services in design, tutoring, research, art, music and more. Build your
                  portfolio and earn while you learn.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/services">
                  <Button size="lg" className="bg-[#6A0032] text-white border hover:bg-orange-500">
                    Find Services
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="text-[#6A0032]">
                    Offer Your Skills
                  </Button>
                </Link>
              </div>

              <FadeIn direction="up" delay={0.5} duration={0.7}>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="inline-block h-8 w-8 overflow-hidden rounded-full border-2 border-white ">
                        <BsStarFill size={20} className="text-[#FFC72C] "/>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-white">
                    <Star className="mr-1 h-4 w-4 fill-cmu-gold text-cmu-gold" />
                    <span className="font-medium text-[#FFC72C]">4.9</span>
                    <span className="ml-1">(1.2k+ reviews)</span>
                  </div>
                </div>
              </FadeIn>
            </div>
            <div className="flex items-center justify-center">
            <FadeIn direction="right" duration={0.8}>
              <div className="relative flex items-center justify-center">
                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-lg bg-cmu-gold/30 blur-2xl" />
                <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-lg bg-cmu-maroon/30 blur-2xl" />
                <div className="relative overflow-hidden rounded-xl border bg-card shadow-xl">
                  <Image
                    alt="CMU Students collaborating"
                    className="aspect-video w-full object-cover object-center"
                    height="550"
                    src={Brand}
                    width="750"
                  />
                  {/* <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cmu-maroon via-cmu-light to-cmu-gold"
                  /> */}
                </div>

                <div className="absolute -bottom-5 -left-5 rounded-lg bg-white p-4 shadow-lg dark:bg-slate-900 sm:left-5">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" /> 
                    </div>
                    <span className="text-sm font-medium text-green-600">Verified Students</span>
                  </div>
                </div>

                <div className="absolute -right-5 -top-5 rounded-lg bg-white p-4 shadow-lg dark:bg-slate-900 sm:right-5">
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-amber-100 p-2 dark:bg-amber-900">
                      <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    </div>
                    <span className="text-sm font-medium text-amber-600">Top CMU Talent</span>
                  </div>
                </div>
              </div>
            </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#6A0032]">How It Works</h2>
              <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
                CMUTalentHub connects talented students with opportunities to showcase their skills and earn income
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Users className="h-12 w-12 text-[#a00850]" />
              <h3 className="text-xl font-bold">Create Profile</h3>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Showcase your skills, experience, and portfolio
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Briefcase className="h-12 w-12 text-[#a00850]" />
              <h3 className="text-xl font-bold">List Services</h3>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Offer your skills as services with clear pricing
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <MessageSquare className="h-12 w-12 text-[#a00850]" />
              <h3 className="text-xl font-bold">Communicate</h3>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Connect with clients through secure messaging
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <Star className="h-12 w-12 text-[#a00850]" />
              <h3 className="text-xl font-bold">Get Reviewed</h3>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                Build your reputation with client reviews
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="bg-slate-50 py-12 dark:bg-slate-900 md:py-24">
        <div className="px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#6A0032]">Featured Services</h2>
              <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
                Discover top-rated services offered by talented CMU students.
              </p>
            </div>
          </div>
          <FeaturedServices />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24">
        <div className=" px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#6A0032]">Ready to Get Started?</h2>
              <p className="max-w-[900px] text-slate-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-slate-400">
                Join CMUTalentHub today and connect with talented students or offer your skills
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register">
                <Button size="lg" className="bg-white text-[#6A0032] hover:bg-gray-100 border">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button size="lg" variant="outline" className="bg-[#6A0032] text-white border hover:bg-orange-500">
                  Browse Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

