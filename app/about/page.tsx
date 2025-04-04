"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Instagram,
  Facebook,
  Twitter,
  ChevronDown,
  Users,
  Palette,
  Globe,
  Star,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import Footer from "@/components/footer"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import Header from "@/components/header"

// Counter component for animating numbers
const Counter = ({
  value,
  label,
  icon,
  delay = 0,
}: { value: number; label: string; icon: React.ReactNode; delay?: number }) => {
  const [count, setCount] = useState(0)
  const counterRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(counterRef, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView) return

    const start = 0
    const duration = 2000 // 2 seconds
    const startTime = Date.now()

    const timer = setTimeout(() => {
      const updateCount = () => {
        const now = Date.now()
        const elapsedTime = now - startTime
        const progress = Math.min(elapsedTime / duration, 1)

        // Easing function for smoother animation
        const easeOutQuad = (t: number) => t * (2 - t)
        const easedProgress = easeOutQuad(progress)

        setCount(Math.floor(easedProgress * value))

        if (progress < 1) {
          requestAnimationFrame(updateCount)
        } else {
          setCount(value) // Ensure we end at the exact value
        }
      }

      requestAnimationFrame(updateCount)
    }, delay)

    return () => clearTimeout(timer)
  }, [isInView, value, delay])

  return (
    <motion.div
      ref={counterRef}
      className="text-center p-6 bg-white rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      viewport={{ once: true, amount: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(0,0,0,0.1)" }}
    >
      <div className="flex justify-center mb-3 text-mahogany">{icon}</div>
      <div className="text-4xl font-bold text-mahogany mb-2">{count.toLocaleString()}</div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  )
}

export default function AboutPage() {
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null)
  const storyRef = useRef<HTMLDivElement>(null)
  const missionRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const processRef = useRef<HTMLDivElement>(null)
  const storeRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)

  // InView states for sections
  const storyInView = useInView(storyRef, { once: false, amount: 0.3 })
  const missionInView = useInView(missionRef, { once: false, amount: 0.3 })
  const valuesInView = useInView(valuesRef, { once: false, amount: 0.3 })
  const processInView = useInView(processRef, { once: false, amount: 0.3 })
  const statsInView = useInView(statsRef, { once: false, amount: 0.3 })
  const teamInView = useInView(teamRef, { once: false, amount: 0.3 })

  // Scroll animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // State for interactive elements
  const [expandedValue, setExpandedValue] = useState<string | null>(null)
  const [showTeam, setShowTeam] = useState(false)
  const [activeTeamIndex, setActiveTeamIndex] = useState(0)

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Team members data
  const teamMembers = [
    { name: "Alex Chen", role: "Co-Founder & Creative Director", image: "/placeholder.svg?height=300&width=300" },
    { name: "Michael Chen", role: "Co-Founder & Business Director", image: "/placeholder.svg?height=300&width=300" },
    { name: "Sarah Kim", role: "Lead Designer", image: "/placeholder.svg?height=300&width=300" },
    { name: "David Park", role: "Marketing Manager", image: "/placeholder.svg?height=300&width=300" },
    { name: "Jessica Wong", role: "Product Development Lead", image: "/placeholder.svg?height=300&width=300" },
  ]

  // Team carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTeamIndex((prev) => (prev + 1) % teamMembers.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [teamMembers.length])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Parallax */}
        <motion.div
          ref={heroRef}
          className="relative h-[80vh] overflow-hidden flex items-center justify-center"
          style={{ scale: heroScale, opacity: heroOpacity }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10" />
          <motion.img
            src="/placeholder.svg?height=1080&width=1920"
            alt="Starboy Brand"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          <motion.div
            className="relative z-20 text-center text-white px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">About Starboy</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">Where street culture meets cosmic inspiration</p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-mahogany hover:bg-mahogany/90 text-white" onClick={() => scrollToTop()}>
                Explore Our Story
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <ChevronDown className="h-8 w-8 text-white" />
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          className="py-16 px-4 md:px-8 bg-gray-50"
          initial={{ opacity: 0 }}
          animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-mahogany">Starboy by the Numbers</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Counter value={25000} label="Happy Customers" icon={<Users className="h-8 w-8" />} delay={0} />
              <Counter value={120} label="Unique Designs" icon={<Palette className="h-8 w-8" />} delay={200} />
              <Counter value={15} label="Countries Shipped" icon={<Globe className="h-8 w-8" />} delay={400} />
              <Counter value={7} label="Years of Excellence" icon={<Star className="h-8 w-8" />} delay={600} />
            </div>
          </div>
        </motion.div>

        {/* Our Story Section */}
        <motion.div
          ref={storyRef}
          className="py-20 px-4 md:px-8 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={storyInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial={{ x: -100 }}
            animate={storyInView ? { x: 0 } : { x: -100 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-mahogany">Our Story</h2>
              <div className="space-y-4">
                <p>
                  Starboy was founded in 2016 by brothers Alex and Michael Chen, who shared a passion for streetwear and
                  cosmic aesthetics. What began as a small t-shirt printing venture has grown into one of the most
                  recognized streetwear brands with a distinctive stellar-inspired style.
                </p>
                <p>
                  The name "Starboy" emerged from the founders' fascination with astronomy and the infinite
                  possibilities of the universe. They believed in creating clothing that makes everyone feel like a
                  star—unique, brilliant, and part of something greater.
                </p>
              </div>
              <motion.button
                className="mt-6 text-mahogany font-medium flex items-center"
                whileHover={{ x: 5 }}
                onClick={() => setShowTeam(!showTeam)}
              >
                Meet our founders {showTeam ? "−" : "+"}
              </motion.button>
            </div>
            <motion.div
              className="relative h-[400px] rounded-lg overflow-hidden"
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src="/placeholder.svg?height=800&width=600" alt="Founders" className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>

          {/* Team Members Carousel */}
          <AnimatePresence>
            {showTeam && (
              <motion.div
                ref={teamRef}
                className="mt-12 relative overflow-hidden py-8"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-center mb-6">
                  <div className="flex space-x-2">
                    {teamMembers.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${index === activeTeamIndex ? "bg-mahogany" : "bg-gray-300"}`}
                        onClick={() => setActiveTeamIndex(index)}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative h-[300px]">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={member.name}
                      className="absolute top-0 left-0 w-full h-full flex justify-center"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{
                        opacity: index === activeTeamIndex ? 1 : 0,
                        x: index === activeTeamIndex ? 0 : index < activeTeamIndex ? -100 : 100,
                        scale: index === activeTeamIndex ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.5 }}
                      whileHover={{ scale: index === activeTeamIndex ? 1.05 : 0.9 }}
                    >
                      <div className="text-center max-w-xs">
                        <div className="rounded-full overflow-hidden h-40 w-40 mx-auto mb-4 shadow-lg">
                          <img
                            src={member.image || "/placeholder.svg"}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-gray-600">{member.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-between mt-6">
                  <motion.button
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveTeamIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)}
                  >
                    <ArrowLeft className="h-5 w-5 text-mahogany" />
                  </motion.button>
                  <motion.button
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setActiveTeamIndex((prev) => (prev + 1) % teamMembers.length)}
                  >
                    <ArrowRight className="h-5 w-5 text-mahogany" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Our Mission Section */}
        <motion.div
          ref={missionRef}
          className="py-20 px-4 md:px-8 bg-gray-50"
          initial={{ opacity: 0 }}
          animate={missionInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ y: 50 }}
              animate={missionInView ? { y: 0 } : { y: 50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-mahogany">Our Mission</h2>
              <p className="max-w-3xl mx-auto text-lg">
                At Starboy, our mission is to create authentic streetwear that serves as a canvas for self-expression.
                We believe clothing is more than just fabric—it's a statement, a form of art, and a way to connect with
                like-minded individuals who share our passion for street culture and cosmic inspiration.
              </p>
            </motion.div>

            <motion.div
              className="relative h-[400px] rounded-lg overflow-hidden"
              initial={{ scale: 0.9, opacity: 0.8 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <img
                src="/placeholder.svg?height=800&width=1600"
                alt="Starboy Mission"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">Creating with Purpose</h3>
                  <p className="max-w-2xl">
                    We're committed to producing high-quality, limited-edition pieces that stand out from mass-produced
                    fashion. Each collection tells a story and represents our journey as a brand and as individuals.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Our Values Section */}
        <motion.div
          ref={valuesRef}
          className="py-20 px-4 md:px-8 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          animate={valuesInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-mahogany">Our Values</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Authenticity",
                description:
                  "We stay true to our roots and create designs that reflect our genuine passion for street culture and stellar aesthetics.",
                icon: "🌟",
              },
              {
                title: "Community",
                description:
                  "We foster a community of creatives, artists, and fashion enthusiasts who support and inspire each other.",
                icon: "👥",
              },
              {
                title: "Quality",
                description:
                  "We never compromise on the quality of our products, using premium materials and meticulous craftsmanship.",
                icon: "✨",
              },
              {
                title: "Innovation",
                description: "We continuously push boundaries with fresh designs and creative collaborations.",
                icon: "💡",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                className={`p-6 rounded-lg border ${expandedValue === value.title ? "bg-mahogany/5 border-mahogany" : "bg-white border-gray-200"}`}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                onClick={() => setExpandedValue(expandedValue === value.title ? null : value.title)}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p>{value.description}</p>

                {expandedValue === value.title && (
                  <motion.div
                    className="mt-4 pt-4 border-t border-gray-200"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p className="text-sm">
                      Click to learn more about how we embody {value.title.toLowerCase()} in everything we do at
                      Starboy.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Process Section */}
        <motion.div
          ref={processRef}
          className="py-20 px-4 md:px-8 bg-gray-900 text-white"
          initial={{ opacity: 0 }}
          animate={processInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={processInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              Our Process
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "01",
                  title: "Concept & Design",
                  description:
                    "Each collection begins with a concept that resonates with our team. We sketch designs and create mood boards to guide our vision.",
                },
                {
                  step: "02",
                  title: "Material Selection",
                  description:
                    "We carefully select premium fabrics and materials that meet our quality standards and align with our sustainability goals.",
                },
                {
                  step: "03",
                  title: "Local Production",
                  description:
                    "We work closely with local manufacturers to ensure every piece meets our standards while supporting local talent and industries.",
                },
              ].map((process, index) => (
                <motion.div
                  key={process.step}
                  className="relative"
                  initial={{ opacity: 0, x: -30 }}
                  animate={processInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="text-6xl font-bold text-mahogany/30 mb-2">{process.step}</div>
                  <h3 className="text-xl font-bold mb-3">{process.title}</h3>
                  <p className="text-gray-300">{process.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Visit Our Store Section */}
        <motion.div
          ref={storeRef}
          className="py-20 px-4 md:px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-mahogany">Visit Our Store</h2>
              <p className="text-lg mb-6">
                Experience Starboy in person at our flagship store. Browse our latest collections, meet our team, and
                become part of our community.
              </p>
              <div className="mb-6">
                <address className="not-italic mb-4 text-lg">
                  123 Fashion Street
                  <br />
                  Makati City, Metro Manila
                  <br />
                  Philippines
                </address>
                <p className="mb-2">
                  <strong>Hours:</strong> Monday-Saturday, 10am-8pm
                </p>
                <p>
                  <strong>Phone:</strong> (02) 8123-4567
                </p>
              </div>

              <div className="flex space-x-4 mb-8">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </a>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="outline" size="icon" asChild>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </a>
                  </Button>
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-mahogany hover:bg-mahogany/90 text-white"
                  onClick={() => scrollToTop()}
                >
                  <Link href="/products">Shop Now</Link>
                </Button>
              </motion.div>
            </div>

            <motion.div
              className="relative h-[500px] rounded-lg overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="/placeholder.svg?height=1000&width=800"
                alt="Starboy Store"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Join the Starboy Family */}
        <motion.div
          className="py-20 px-4 md:px-8 bg-gradient-to-r from-mahogany/90 to-mahogany/70 text-white text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-6"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              Join the Starboy Family
            </motion.h2>
            <motion.p
              className="text-xl mb-8 max-w-2xl mx-auto"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              Explore our latest collections and become part of our growing community of fashion enthusiasts and
              creatives.
            </motion.p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-mahogany hover:bg-white/90"
                onClick={() => scrollToTop()}
              >
                <Link href="/products">Shop Now</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}

