"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, ArrowLeft, Smartphone, Mail } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const [loginMethod, setLoginMethod] = useState<"email" | "mobile">("email")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mobile, setMobile] = useState("")
  const [otp, setOtp] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "")
    if (value.length <= 13) {
      setMobile(value)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (loginMethod === "email") {
      console.log("System Admin email login attempt:", { email, password })
    } else {
      console.log("System Admin mobile login attempt:", { mobile, otp })
    }
    setIsLoading(false)
  }

  const handleSendOtp = async () => {
    if (!mobile) return
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Sending OTP to admin mobile:", mobile)
    setOtpSent(true)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-600 p-3 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">System Admin</h1>
          <p className="text-slate-300">Secure administrative access</p>
        </div>

        <Card className="shadow-2xl border-slate-600">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              Administrator Login
            </CardTitle>
            <CardDescription>Enter your system administrator credentials to access the control panel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex mb-6 bg-slate-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("email")
                  setOtpSent(false)
                  setOtp("")
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  loginMethod === "email" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Mail className="h-4 w-4" />
                Email & Password
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginMethod("mobile")
                  setOtpSent(false)
                  setOtp("")
                }}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  loginMethod === "mobile" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Smartphone className="h-4 w-4" />
                Mobile OTP
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {/* Admin Role Info */}
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <div className="flex items-center gap-2 text-sm text-red-800">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">System Administrator Access</span>
                </div>
                <p className="text-xs text-red-700 mt-1">Full system access and management capabilities</p>
              </div>

              {loginMethod === "email" ? (
                <>
                  {/* Email Input */}
                  <div className="space-y-2">
                    <Label htmlFor="admin-email">Administrator Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      placeholder="admin@travelportal.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-slate-300"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input
                      id="admin-password"
                      type="password"
                      placeholder="Enter your secure password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-slate-300"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="admin-mobile">Administrator Mobile Number</Label>
                    <div className="flex gap-2">
                      <Input
                        id="admin-mobile"
                        type="tel"
                        placeholder="1234567890123"
                        value={mobile}
                        onChange={handleMobileChange}
                        required
                        className="border-slate-300"
                        maxLength={13}
                      />
                      {!otpSent && (
                        <Button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={!mobile || mobile.length < 10 || isLoading}
                          className="bg-red-600 hover:bg-red-700 text-white whitespace-nowrap"
                        >
                          {isLoading ? "Sending..." : "Send OTP"}
                        </Button>
                      )}
                    </div>
                  </div>

                  {otpSent && (
                    <div className="space-y-2">
                      <Label htmlFor="admin-otp">Enter OTP</Label>
                      <div className="flex gap-2">
                        <Input
                          id="admin-otp"
                          type="text"
                          placeholder="Enter 6-digit OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          required
                          className="border-slate-300"
                          maxLength={6}
                        />
                        <Button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={isLoading}
                          variant="outline"
                          className="whitespace-nowrap bg-transparent"
                        >
                          Resend
                        </Button>
                      </div>
                      <p className="text-sm text-slate-600">OTP sent to +{mobile}</p>
                    </div>
                  )}
                </>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={
                  isLoading ||
                  (loginMethod === "email" && (!email || !password)) ||
                  (loginMethod === "mobile" && (!mobile || !otpSent || !otp))
                }
              >
                {isLoading ? "Authenticating..." : "Access System"}
              </Button>
            </form>

            {/* Additional Links */}
            <div className="mt-6 space-y-4">
              <div className="text-center">
                <a href="#" className="text-sm text-red-600 hover:underline">
                  Forgot administrator password?
                </a>
              </div>

              <div className="text-center">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to User Login
                </Link>
              </div>

              <div className="text-center text-sm text-slate-600">
                Security issues? Contact{" "}
                <a href="#" className="text-red-600 hover:underline">
                  IT support
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-400">
          <p>© 2025 TravelPortal. Secure Administrative Access.</p>
        </div>
      </div>
    </div>
  )
}
