"use client"

import { useState } from "react"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState<"student" | "business">("student")
  const [termsAgreed, setTermsAgreed] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const router = useRouter();
  // Student state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [studentEmail, setStudentEmail] = useState("")
  const [studentPassword, setStudentPassword] = useState("")
  const [studentMajor, setStudentMajor] = useState("")
  const [studentYear, setStudentYear] = useState("")

  // Business state
  const [businessName, setBusinessName] = useState("")
  const [businessEmail, setBusinessEmail] = useState("")
  const [businessPassword, setBusinessPassword] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [location, setLocation] = useState("")

  const validateStudent = () => {
    const newErrors: { [key: string]: string } = {}
    if (!firstName.trim()) newErrors.firstName = "First name is required"
    if (!lastName.trim()) newErrors.lastName = "Last name is required"
    if (!studentEmail.trim()) newErrors.studentEmail = "Email is required"
    if (!studentPassword.trim()) newErrors.studentPassword = "Password is required"
    if (!studentMajor) newErrors.studentMajor = "Major is required"
    if (!studentYear) newErrors.studentYear = "Year is required"
    return newErrors
  }

  const validateBusiness = () => {
    const newErrors: { [key: string]: string } = {}
    if (!businessName.trim()) newErrors.businessName = "Business name is required"
    if (!businessEmail.trim()) newErrors.businessEmail = "Email is required"
    if (!businessPassword.trim()) newErrors.businessPassword = "Password is required"
    if (!businessType) newErrors.businessType = "Business type is required"
    if (!location.trim()) newErrors.location = "Location is required"
    return newErrors
  }

  const handleSubmit = () => {
    let newErrors = {}
    if (activeTab === "student") {
      newErrors = validateStudent()
      setErrors(newErrors)
      if (Object.keys(newErrors).length === 0) {
        toast.success("Student account created successfully!")
        console.log("Student Submitted", {
          firstName,
          lastName,
          studentEmail,
          studentPassword,
          studentMajor,
          studentYear,
          agreedToTerms: termsAgreed,
        })
        router.push("/");
      } else {
        toast.error("Please fill all required student fields.")
      }
    } else {
      newErrors = validateBusiness()
      setErrors(newErrors)
      if (Object.keys(newErrors).length === 0) {
        toast.success("Business account created successfully!")
        console.log("Business Submitted", {
          businessName,
          businessEmail,
          businessPassword,
          businessType,
          location,
          agreedToTerms: termsAgreed,
        })
       
      } else {
        toast.error("Please fill all required business fields.")
      }
    }
  }

  return (
    <div className="flex items-center justify-center px-4 py-12 md:px-6">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-[#6A0032]">Create an account</CardTitle>
          <CardDescription>Join CMUTalentHub to connect with talented students or offer your skills</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="student" className="mb-4" onValueChange={(val) => setActiveTab(val as "student" | "business")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">I'm a Student</TabsTrigger>
              <TabsTrigger value="business">I'm a Business</TabsTrigger>
            </TabsList>

            {/* STUDENT */}
            <TabsContent value="student" className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First name</Label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Last name</Label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} />
                {errors.studentEmail && <p className="text-xs text-red-500">{errors.studentEmail}</p>}
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" value={studentPassword} onChange={(e) => setStudentPassword(e.target.value)} />
                {errors.studentPassword && <p className="text-xs text-red-500">{errors.studentPassword}</p>}
              </div>
              <div className="space-y-2">
                <Label>Major</Label>
                <Select onValueChange={setStudentMajor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your major" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs">Computer Science</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="arts">Fine Arts</SelectItem>
                    <SelectItem value="humanities">Humanities</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.studentMajor && <p className="text-xs text-red-500">{errors.studentMajor}</p>}
              </div>
              <div className="space-y-2">
                <Label>Year</Label>
                <Select onValueChange={setStudentYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freshman">Freshman</SelectItem>
                    <SelectItem value="sophomore">Sophomore</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                  </SelectContent>
                </Select>
                {errors.studentYear && <p className="text-xs text-red-500">{errors.studentYear}</p>}
              </div>
            </TabsContent>

            {/* BUSINESS */}
            <TabsContent value="business" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label>Business name</Label>
                <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                {errors.businessName && <p className="text-xs text-red-500">{errors.businessName}</p>}
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={businessEmail} onChange={(e) => setBusinessEmail(e.target.value)} />
                {errors.businessEmail && <p className="text-xs text-red-500">{errors.businessEmail}</p>}
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" value={businessPassword} onChange={(e) => setBusinessPassword(e.target.value)} />
                {errors.businessPassword && <p className="text-xs text-red-500">{errors.businessPassword}</p>}
              </div>
              <div className="space-y-2">
                <Label>Business type</Label>
                <Select onValueChange={setBusinessType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="small">Small Business</SelectItem>
                    <SelectItem value="nonprofit">Non-profit</SelectItem>
                    <SelectItem value="campus">Campus Organization</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.businessType && <p className="text-xs text-red-500">{errors.businessType}</p>}
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} />
                {errors.location && <p className="text-xs text-red-500">{errors.location}</p>}
              </div>
            </TabsContent>
          </Tabs>

          {/* Terms */}
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox id="terms" checked={termsAgreed} onCheckedChange={(checked) => setTermsAgreed(checked === true)} />
            <label htmlFor="terms" className="text-sm font-medium leading-none">
              I agree to the{" "}
              <Link href="/terms" className="text-[#6A0032] hover:underline">terms of service</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-[#6A0032] hover:underline">privacy policy</Link>
            </label>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-[#6A0032] hover:bg-orange-500" onClick={handleSubmit} disabled={!termsAgreed}>
            Create account
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-[#6A0032] hover:underline">Sign in</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
