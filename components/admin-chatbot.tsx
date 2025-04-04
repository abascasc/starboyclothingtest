"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquare, X, Send, Bot, User, ShoppingBag, Tag, Users, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

type Message = {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "link"
  links?: Array<{
    text: string
    url: string
  }>
}

export default function AdminChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! 👋 I'm Starbot Admin Assistant. How can I help you with your administrative tasks today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const router = useRouter()
  const [chatHistory, setChatHistory] = useState<string[]>([])
  const [isAdmin, setIsAdmin] = useState(false)

  // Check if user is admin
  useEffect(() => {
    setIsAdmin(user?.isAdmin || false)
  }, [user])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Persist chat history between sessions
  useEffect(() => {
    const savedHistory = localStorage.getItem("adminChatHistory")
    if (savedHistory && JSON.parse(savedHistory).length > 0) {
      const parsedHistory = JSON.parse(savedHistory)
      setMessages([
        {
          id: "1",
          content: "Welcome back! 👋 How can I help you with your admin tasks today?",
          sender: "bot",
          timestamp: new Date(),
        },
        ...parsedHistory.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      ])
      setChatHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Store chat history
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("adminChatHistory", JSON.stringify(messages.slice(1)))
    }
  }, [messages])

  // Enhanced response generation with admin-specific knowledge
  const getBotResponse = (message: string): Message => {
    const lowerMessage = message.toLowerCase()
    const timestamp = new Date()
    const messageId = Date.now().toString()

    // Dashboard navigation
    if (
      lowerMessage.includes("dashboard") ||
      lowerMessage.includes("admin panel") ||
      lowerMessage.includes("admin page")
    ) {
      return {
        id: messageId,
        content:
          "The admin dashboard provides access to all store management functions. You can navigate to different sections using the sidebar menu.",
        sender: "bot",
        timestamp,
        type: "link",
        links: [
          { text: "Go to Dashboard", url: "/admin/dashboard" },
          { text: "View Profile", url: "/admin/profile" },
        ],
      }
    }

    // Product management
    if (lowerMessage.includes("product") || lowerMessage.includes("inventory") || lowerMessage.includes("stock")) {
      return {
        id: messageId,
        content:
          "You can manage products in the Products section of the dashboard. This includes adding new products, editing existing ones, managing inventory, and categorizing items.",
        sender: "bot",
        timestamp,
        type: "link",
        links: [{ text: "Manage Products", url: "/admin/dashboard?tab=products" }],
      }
    }

    // Order management
    if (lowerMessage.includes("order") || lowerMessage.includes("shipping") || lowerMessage.includes("delivery")) {
      return {
        id: messageId,
        content:
          "Order management is handled in the Orders section. You can view all orders, update their status, process refunds, and manage shipping information.",
        sender: "bot",
        timestamp,
        type: "link",
        links: [{ text: "Manage Orders", url: "/admin/dashboard?tab=orders" }],
      }
    }

    // Voucher management
    if (
      lowerMessage.includes("voucher") ||
      lowerMessage.includes("discount") ||
      lowerMessage.includes("coupon") ||
      lowerMessage.includes("promo")
    ) {
      return {
        id: messageId,
        content:
          "You can create and manage discount vouchers in the Vouchers section. This includes setting discount amounts, expiration dates, and usage limits.",
        sender: "bot",
        timestamp,
        type: "link",
        links: [{ text: "Manage Vouchers", url: "/admin/dashboard?tab=vouchers" }],
      }
    }

    // Content management
    if (
      lowerMessage.includes("content") ||
      lowerMessage.includes("page") ||
      lowerMessage.includes("blog") ||
      lowerMessage.includes("article")
    ) {
      return {
        id: messageId,
        content:
          "Content management allows you to edit website pages, product descriptions, and other text content. You can also manage categories and tags.",
        sender: "bot",
        timestamp,
        type: "link",
        links: [{ text: "Manage Content", url: "/admin/dashboard?tab=content" }],
      }
    }

    // Media management
    if (
      lowerMessage.includes("media") ||
      lowerMessage.includes("image") ||
      lowerMessage.includes("photo") ||
      lowerMessage.includes("picture")
    ) {
      return {
        id: messageId,
        content:
          "The Media Library allows you to upload, organize, and manage all images and media files used on the website.",
        sender: "bot",
        timestamp,
        type: "link",
        links: [{ text: "Media Library", url: "/admin/dashboard?tab=media" }],
      }
    }

    // User management
    if (lowerMessage.includes("user") || lowerMessage.includes("customer") || lowerMessage.includes("account")) {
      return {
        id: messageId,
        content:
          "User management allows you to view and manage customer accounts, including order history, account status, and contact information.",
        sender: "bot",
        timestamp,
        type: "link",
        links: [{ text: "Manage Users", url: "/admin/dashboard?tab=users" }],
      }
    }

    // Admin team management
    if (
      lowerMessage.includes("admin team") ||
      lowerMessage.includes("admin user") ||
      lowerMessage.includes("staff") ||
      lowerMessage.includes("team member")
    ) {
      return {
        id: messageId,
        content:
          "Admin team management allows you to add new admin users, assign roles and permissions, and manage admin accounts.",
        sender: "bot",
        timestamp,
        type: "link",
        links: [
          { text: "Manage Admin Team", url: "/admin/dashboard?tab=admins" },
          { text: "Register New Admin", url: "/admin/register" },
        ],
      }
    }

    // Profile management
    if (
      lowerMessage.includes("profile") ||
      lowerMessage.includes("account settings") ||
      lowerMessage.includes("my account")
    ) {
      return {
        id: messageId,
        content:
          "You can manage your admin profile, including personal information, profile picture, and account settings.",
        sender: "bot",
        timestamp,
        type: "link",
        links: [{ text: "Edit Profile", url: "/admin/profile" }],
      }
    }

    // Help with specific admin tasks
    if (lowerMessage.includes("how to") || lowerMessage.includes("help with")) {
      return {
        id: messageId,
        content:
          "I can help with various administrative tasks. Here are some common actions you might want to perform:",
        sender: "bot",
        timestamp,
        type: "link",
        links: [
          { text: "Add a Product", url: "/admin/dashboard?tab=products" },
          { text: "Process Orders", url: "/admin/dashboard?tab=orders" },
          { text: "Create Vouchers", url: "/admin/dashboard?tab=vouchers" },
          { text: "Manage Users", url: "/admin/dashboard?tab=users" },
        ],
      }
    }

    // Greetings
    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey") ||
      lowerMessage === "yo"
    ) {
      const greetings = [
        `Hello ${user?.name || "admin"}! How can I assist you with your administrative tasks today?`,
        `Hi there! What admin functions would you like help with today?`,
        `Hey! I'm here to help with any questions about the admin dashboard or store management.`,
      ]
      return {
        id: messageId,
        content: greetings[Math.floor(Math.random() * greetings.length)],
        sender: "bot",
        timestamp,
      }
    }

    // Thanks
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks") || lowerMessage.includes("appreciate")) {
      return {
        id: messageId,
        content: "You're welcome! Is there anything else I can help you with regarding your admin tasks?",
        sender: "bot",
        timestamp,
      }
    }

    // Fallback response
    return {
      id: messageId,
      content:
        "I'm not sure I understand. As your admin assistant, I can help with product management, orders, vouchers, content, media, users, and admin team management. How can I assist you?",
      sender: "bot",
      timestamp,
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing and response
    setTimeout(() => {
      const botMessage = getBotResponse(userMessage.content)
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Only show for admin users
  if (!isAdmin) {
    return null
  }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-4 right-4 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          aria-label="Open admin assistant"
          style={{ display: isOpen ? "none" : "flex" }}
        >
          <MessageSquare className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-4 right-4 z-50 w-full sm:w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border"
          >
            {/* Header */}
            <div className="bg-green-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Starbot Admin Assistant</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-neutral-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex items-start max-w-[80%]">
                    {message.sender === "bot" && (
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Bot" />
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "user" ? "bg-green-600 text-white" : "bg-white border shadow-sm"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>

                      {/* Links */}
                      {message.type === "link" && message.links && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.links.map((link, index) => (
                            <Button key={index} variant="outline" size="sm" asChild className="text-xs h-7">
                              <Link href={link.url}>{link.text}</Link>
                            </Button>
                          ))}
                        </div>
                      )}

                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>

                    {message.sender === "user" && (
                      <Avatar className="h-8 w-8 ml-2">
                        <AvatarImage src={user?.profileImage || "/placeholder.svg?height=40&width=40"} alt="User" />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center mb-4">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Bot" />
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white border rounded-lg p-3 shadow-sm">
                    <div className="flex space-x-1">
                      <div
                        className="h-2 w-2 bg-neutral-300 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-neutral-300 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="h-2 w-2 bg-neutral-300 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick action buttons */}
            <div className="p-2 bg-neutral-50 border-t flex flex-wrap gap-1 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInputValue("How do I add a new product?")
                  setTimeout(() => handleSendMessage(), 100)
                }}
                className="text-xs"
              >
                <Package className="mr-1 h-3 w-3" /> Products
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInputValue("How do I manage orders?")
                  setTimeout(() => handleSendMessage(), 100)
                }}
                className="text-xs"
              >
                <ShoppingBag className="mr-1 h-3 w-3" /> Orders
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInputValue("How do I create a voucher?")
                  setTimeout(() => handleSendMessage(), 100)
                }}
                className="text-xs"
              >
                <Tag className="mr-1 h-3 w-3" /> Vouchers
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInputValue("How do I manage users?")
                  setTimeout(() => handleSendMessage(), 100)
                }}
                className="text-xs"
              >
                <Users className="mr-1 h-3 w-3" /> Users
              </Button>
            </div>

            {/* Input */}
            <div className="p-3 border-t">
              <div className="flex items-center">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className="flex-1 resize-none"
                  rows={1}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="ml-2 h-10 w-10 p-0 rounded-full bg-green-600 hover:bg-green-700"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">Ask about admin tasks, products, orders, or users</p>
                {messages.length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs"
                    onClick={() => {
                      setMessages([
                        {
                          id: "1",
                          content:
                            "Hi there! 👋 I'm Starbot Admin Assistant. How can I help you with your administrative tasks today?",
                          sender: "bot",
                          timestamp: new Date(),
                        },
                      ])
                      localStorage.removeItem("adminChatHistory")
                    }}
                  >
                    Clear Chat
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

