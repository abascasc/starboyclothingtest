"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, X, Bot, User, ShoppingBag, Tag, Package, CreditCard } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { usePathname } from "next/navigation"
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

// Mock product knowledge base
const productKnowledge = {
  materials: {
    tshirts: "Our t-shirts are made from 100% organic cotton, pre-shrunk and enzyme-washed for extra softness.",
    hoodies: "Our hoodies feature a premium blend of 80% cotton and 20% polyester for durability and comfort.",
    jeans: "Our jeans are crafted from high-quality denim with a touch of elastane for stretch and comfort.",
    caps: "Our caps are made from 100% cotton twill with embroidered ventilation holes and adjustable straps.",
  },
  sizing: {
    general: "Our clothing generally runs true to size. For a more relaxed fit, we recommend sizing up.",
    tshirts:
      'T-shirts are available in sizes XS to XXL. For chest measurements: XS (34-36"), S (36-38"), M (38-40"), L (40-42"), XL (42-44"), XXL (44-46").',
    hoodies: "Hoodies are available in sizes XS to XXL. They have a slightly oversized fit by design.",
    jeans: 'Jeans are available in waist sizes 28" to 38" with length options 30", 32", and 34".',
  },
  orders: {
    tracking:
      "You can track your order by visiting the 'My Orders' section in your account or using the tracking number provided in your shipping confirmation email.",
    processing: "Orders are typically processed within 1-2 business days before shipping.",
    shipping:
      "Standard shipping takes 3-5 business days within the Philippines. Express shipping (1-2 days) is available for an additional fee.",
    international:
      "International shipping is available to select countries with delivery times ranging from 7-14 business days.",
  },
  returns: {
    policy: "We offer a 30-day return policy for unworn items in original condition with tags attached.",
    process:
      "To initiate a return, please visit the 'My Orders' section in your account or contact our customer service.",
    refunds: "Refunds are processed within 7-10 business days after we receive your return.",
    exchanges: "Size exchanges are available for unworn items. Please contact customer service to arrange an exchange.",
  },
  policies: {
    privacy:
      "We respect your privacy and only collect necessary information to process orders and improve your shopping experience. View our full privacy policy for details.",
    terms:
      "Our terms of service outline the rules for using our website and purchasing our products. By placing an order, you agree to these terms.",
    warranty: "All products come with a 90-day warranty against manufacturing defects under normal use conditions.",
  },
  payment: {
    methods: "We accept major credit cards (Visa, Mastercard, American Express), PayPal, GCash, and bank transfers.",
    security:
      "All payment information is encrypted and processed securely. We never store your full credit card details.",
    installments: "We offer installment payment options through partner banks for purchases over ₱5,000.",
  },
  store: {
    locations:
      "Our flagship store is located at 123 Fashion Street, Makati City. We also have branches in BGC, SM Megamall, and Ayala Cebu.",
    hours: "Our stores are open Monday to Saturday from 10am to 8pm, and Sunday from 11am to 7pm.",
    events: "We regularly host product launches and community events. Check our social media for upcoming events.",
  },
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! 👋 I'm Starbot Client Assistant. How can I help you with your shopping today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const pathname = usePathname()
  const [chatHistory, setChatHistory] = useState<string[]>([])

  // Check if user is admin or if we're on an admin page
  const isAdmin = user?.isAdmin || false
  const isAdminPage = pathname?.startsWith("/admin")

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Persist chat history between sessions
  useEffect(() => {
    const savedHistory = localStorage.getItem("clientChatHistory")
    if (savedHistory && JSON.parse(savedHistory).length > 0) {
      const parsedHistory = JSON.parse(savedHistory)
      setMessages([
        {
          id: "1",
          content: "Welcome back! 👋 How can I help you with your shopping today?",
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
      localStorage.setItem("clientChatHistory", JSON.stringify(messages.slice(1)))
    }
  }, [messages])

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

  const getBotResponse = (message: string): Message => {
    const lowerMessage = message.toLowerCase()
    const timestamp = new Date()
    const messageId = Date.now().toString()

    // Material questions
    if (lowerMessage.includes("material") || lowerMessage.includes("made of") || lowerMessage.includes("products") || lowerMessage.includes("fabric")) {
      if (lowerMessage.includes("t-shirt") || lowerMessage.includes("tee")) {
        return {
          id: messageId,
          content: productKnowledge.materials.tshirts,
          sender: "bot",
          timestamp,
          type: "link",
          links: [{ text: "View T-shirts", url: "/collections/t-shirts" }],
        }
      } else if (lowerMessage.includes("hoodie") || lowerMessage.includes("sweatshirt")) {
        return {
          id: messageId,
          content: productKnowledge.materials.hoodies,
          sender: "bot",
          timestamp,
          type: "link",
          links: [{ text: "View Hoodies", url: "/collections/sweaters" }],
        }
      } else if (lowerMessage.includes("jeans") || lowerMessage.includes("denim")) {
        return {
          id: messageId,
          content: productKnowledge.materials.jeans,
          sender: "bot",
          timestamp,
          type: "link",
          links: [{ text: "View Jeans", url: "/collections/jeans" }],
        }
      } else if (lowerMessage.includes("cap") || lowerMessage.includes("hat")) {
        return {
          id: messageId,
          content: productKnowledge.materials.caps,
          sender: "bot",
          timestamp,
        }
      }
      return {
        id: messageId,
        content:
          "Our products are made with high-quality materials selected for both comfort and durability. Is there a specific item you're interested in?",
        sender: "bot",
        timestamp,
        type: "link",
        links: [
          { text: "T-shirts", url: "/collections/t-shirts" },
          { text: "Hoodies", url: "/collections/sweaters" },
          { text: "Jeans", url: "/collections/jeans" },
        ],
      }
    }

    // Sizing questions
    if (lowerMessage.includes("size") || lowerMessage.includes("fit") || lowerMessage.includes("measurement")) {
      if (lowerMessage.includes("t-shirt") || lowerMessage.includes("tee")) {
        return {
          id: messageId,
          content: productKnowledge.sizing.tshirts,
          sender: "bot",
          timestamp,
          type: "link",
          links: [
            { text: "Size Guide", url: "/help/size-guide" },
            { text: "View T-shirts", url: "/collections/t-shirts" },
          ],
        }
      } else if (lowerMessage.includes("hoodie") || lowerMessage.includes("sweatshirt")) {
        return {
          id: messageId,
          content: productKnowledge.sizing.hoodies,
          sender: "bot",
          timestamp,
          type: "link",
          links: [
            { text: "Size Guide", url: "/help/size-guide" },
            { text: "View Hoodies", url: "/collections/sweaters" },
          ],
        }
      } else if (lowerMessage.includes("jeans") || lowerMessage.includes("denim")) {
        return {
          id: messageId,
          content: productKnowledge.sizing.jeans,
          sender: "bot",
          timestamp,
          type: "link",
          links: [
            { text: "Size Guide", url: "/help/size-guide" },
            { text: "View Jeans", url: "/collections/jeans" },
          ],
        }
      }
      return {
        id: messageId,
        content: productKnowledge.sizing.general,
        sender: "bot",
        timestamp,
        type: "link",
        links: [{ text: "Size Guide", url: "/help/size-guide" }],
      }
    }

    // Order questions
    if (lowerMessage.includes("order") || lowerMessage.includes("track") || lowerMessage.includes("shipping")) {
      if (lowerMessage.includes("track")) {
        return {
          id: messageId,
          content: productKnowledge.orders.tracking,
          sender: "bot",
          timestamp,
          type: "link",
          links: [{ text: "My Orders", url: "/account/orders" }],
        }
      } else if (lowerMessage.includes("process") || lowerMessage.includes("long")) {
        return {
          id: messageId,
          content: productKnowledge.orders.processing,
          sender: "bot",
          timestamp,
        }
      } else if (lowerMessage.includes("international") || lowerMessage.includes("abroad")) {
        return {
          id: messageId,
          content: productKnowledge.orders.international,
          sender: "bot",
          timestamp,
          type: "link",
          links: [{ text: "Shipping Info", url: "/help/shipping-returns" }],
        }
      }
      return {
        id: messageId,
        content: productKnowledge.orders.shipping,
        sender: "bot",
        timestamp,
        type: "link",
        links: [{ text: "Shipping Info", url: "/help/shipping-returns" }],
      }
    }

    // Return questions
    if (lowerMessage.includes("return") || lowerMessage.includes("refund") || lowerMessage.includes("exchange")) {
      if (lowerMessage.includes("policy") || lowerMessage.includes("days")) {
        return {
          id: messageId,
          content: productKnowledge.returns.policy,
          sender: "bot",
          timestamp,
          type: "link",
          links: [{ text: "Return Policy", url: "/help/shipping-returns" }],
        }
      } else if (lowerMessage.includes("process") || lowerMessage.includes("how")) {
        return {
          id: messageId,
          content: productKnowledge.returns.process,
          sender: "bot",
          timestamp,
          type: "link",
          links: [
            { text: "My Orders", url: "/account/orders" },
            { text: "Contact Us", url: "/help/contact" },
          ],
        }
      } else if (lowerMessage.includes("refund")) {
        return {
          id: messageId,
          content: productKnowledge.returns.refunds,
          sender: "bot",
          timestamp,
        }
      } else if (lowerMessage.includes("exchange")) {
        return {
          id: messageId,
          content: productKnowledge.returns.exchanges,
          sender: "bot",
          timestamp,
          type: "link",
          links: [{ text: "Contact Us", url: "/help/contact" }],
        }
      }
      return {
        id: messageId,
        content: productKnowledge.returns.policy,
        sender: "bot",
        timestamp,
        type: "link",
        links: [{ text: "Return Policy", url: "/help/shipping-returns" }],
      }
    }

    // Payment questions
    if (lowerMessage.includes("payment") || lowerMessage.includes("pay") || lowerMessage.includes("credit card")) {
      if (lowerMessage.includes("method") || lowerMessage.includes("accept")) {
        return {
          id: messageId,
          content: productKnowledge.payment.methods,
          sender: "bot",
          timestamp,
        }
      } else if (lowerMessage.includes("secure") || lowerMessage.includes("safe")) {
        return {
          id: messageId,
          content: productKnowledge.payment.security,
          sender: "bot",
          timestamp,
        }
      } else if (lowerMessage.includes("installment") || lowerMessage.includes("monthly")) {
        return {
          id: messageId,
          content: productKnowledge.payment.installments,
          sender: "bot",
          timestamp,
        }
      }
      return {
        id: messageId,
        content: productKnowledge.payment.methods,
        sender: "bot",
        timestamp,
      }
    }

    // Store questions
    if (lowerMessage.includes("store") || lowerMessage.includes("shop") || lowerMessage.includes("location")) {
      if (lowerMessage.includes("location") || lowerMessage.includes("where")) {
        return {
          id: messageId,
          content: productKnowledge.store.locations,
          sender: "bot",
          timestamp,
        }
      } else if (lowerMessage.includes("hour") || lowerMessage.includes("open")) {
        return {
          id: messageId,
          content: productKnowledge.store.hours,
          sender: "bot",
          timestamp,
        }
      } else if (lowerMessage.includes("event")) {
        return {
          id: messageId,
          content: productKnowledge.store.events,
          sender: "bot",
          timestamp,
        }
      }
      return {
        id: messageId,
        content: productKnowledge.store.locations,
        sender: "bot",
        timestamp,
      }
    }

    // General greeting
    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey") ||
      lowerMessage === "yo"
    ) {
      const greetings = [
        `Hello${user?.name ? " " + user.name : ""}! How can I assist you with your shopping today?`,
        `Hi there! What can I help you find today?`,
        `Hey! I'm here to help with any questions about our products or services.`,
      ]
      return {
        id: messageId,
        content: greetings[Math.floor(Math.random() * greetings.length)],
        sender: "bot",
        timestamp,
      }
    }

    // Help request
    if (lowerMessage.includes("help") || lowerMessage.includes("assist")) {
      return {
        id: messageId,
        content:
          "I'd be happy to help! I can provide information about our products, materials, sizing, orders, returns, and store locations. What would you like to know?",
        sender: "bot",
        timestamp,
        type: "link",
        links: [
          { text: "Products", url: "/products" },
          { text: "Size Guide", url: "/help/size-guide" },
          { text: "Shipping", url: "/help/shipping-returns" },
          { text: "FAQs", url: "/help/faqs" },
        ],
      }
    }

    // Thanks
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks") || lowerMessage.includes("appreciate")) {
      return {
        id: messageId,
        content: "You're welcome! Is there anything else I can help you with today?",
        sender: "bot",
        timestamp,
      }
    }

    // Fallback response
    return {
      id: messageId,
      content:
        "I'm not sure I understand your question. I can help with information about our products, materials, sizing, orders, returns, payment methods, and store locations. Could you please rephrase your question?",
      sender: "bot",
      timestamp,
      type: "link",
      links: [
        { text: "Browse Products", url: "/products" },
        { text: "FAQs", url: "/help/faqs" },
        { text: "Contact Us", url: "/help/contact" },
      ],
    }
  }

  // Don't render if user is admin or on admin page
  if (isAdmin || isAdminPage) {
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
          className="bg-mahogany text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          aria-label="Open client assistant"
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
            <div className="bg-mahogany text-white p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                <h3 className="font-medium">Starbot Client Assistant</h3>
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
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "user" ? "bg-mahogany text-white" : "bg-white border shadow-sm"
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
                  setInputValue("Tell me about your products")
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
                  setInputValue("How do I track my order?")
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
                  setInputValue("What's your return policy?")
                  setTimeout(() => handleSendMessage(), 100)
                }}
                className="text-xs"
              >
                <Tag className="mr-1 h-3 w-3" /> Returns
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInputValue("What payment methods do you accept?")
                  setTimeout(() => handleSendMessage(), 100)
                }}
                className="text-xs"
              >
                <CreditCard className="mr-1 h-3 w-3" /> Payment
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
                  className="ml-2 h-10 w-10 p-0 rounded-full bg-mahogany hover:bg-mahogany/90"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-muted-foreground">Ask about products, sizing, orders, or returns</p>
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
                            "Hi there! 👋 I'm Starbot Client Assistant. How can I help you with your shopping today?",
                          sender: "bot",
                          timestamp: new Date(),
                        },
                      ])
                      localStorage.removeItem("clientChatHistory")
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

