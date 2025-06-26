"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip } from "lucide-react"

// Mock data for conversations
const conversations = [
  {
    id: 1,
    user: {
      id: 101,
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
      status: "online",
    },
    lastMessage: {
      text: "Hi, I'm interested in your graphic design service. Do you have availability next week?",
      time: "10:42 AM",
      isRead: false,
      isFromMe: false,
    },
    project: "Logo Design",
  },
  {
    id: 2,
    user: {
      id: 102,
      name: "Morning Brew Cafe",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MB",
      status: "offline",
    },
    lastMessage: {
      text: "The website looks great! Can we schedule a call to discuss a few minor changes?",
      time: "Yesterday",
      isRead: true,
      isFromMe: false,
    },
    project: "Website Development",
  },
  {
    id: 3,
    user: {
      id: 103,
      name: "Taylor Wong",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "TW",
      status: "online",
    },
    lastMessage: {
      text: "I've sent over the final payment for the project. Thanks for your help!",
      time: "Apr 2",
      isRead: true,
      isFromMe: false,
    },
    project: "Essay Editing",
  },
]

// Mock data for messages in a conversation
const messages = [
  {
    id: 1,
    text: "Hi, I'm interested in your graphic design service. Do you have availability next week?",
    time: "10:42 AM",
    isFromMe: false,
    user: {
      id: 101,
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
    },
  },
  {
    id: 2,
    text: "Hi Jamie! Yes, I have availability next week. What kind of design project do you have in mind?",
    time: "10:45 AM",
    isFromMe: true,
    user: {
      id: 999,
      name: "Me",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ME",
    },
  },
  {
    id: 3,
    text: "I need a logo for my student club. We're organizing a science fair and want something that looks professional but also fun.",
    time: "10:48 AM",
    isFromMe: false,
    user: {
      id: 101,
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
    },
  },
  {
    id: 4,
    text: "That sounds like a great project! I'd be happy to help. Could you tell me a bit more about the club and the science fair? Any specific colors or themes you want to incorporate?",
    time: "10:52 AM",
    isFromMe: true,
    user: {
      id: 999,
      name: "Me",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ME",
    },
  },
  {
    id: 5,
    text: "We're the CMU Physics Club, and the fair is focused on renewable energy innovations. Our club colors are blue and green, and we'd like something that represents both science and sustainability.",
    time: "10:55 AM",
    isFromMe: false,
    user: {
      id: 101,
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JS",
    },
  },
]

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // In a real app, this would send the message to the backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <div className="container flex h-[calc(100vh-4rem)] flex-col px-0 py-0 md:px-0 md:py-6">
      <div className="flex flex-1 overflow-hidden rounded-lg border">
        {/* Conversations Sidebar */}
        <div className="w-full border-r md:w-80">
          <div className="flex h-14 items-center justify-between border-b px-4">
            <h2 className="font-semibold">Messages</h2>
            <Button variant="ghost" size="sm">
              New
            </Button>
          </div>
          <div className="h-[calc(100vh-4rem-3.5rem)] overflow-y-auto p-2 md:h-[calc(100vh-4rem-3.5rem-1.5rem)]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`mb-2 flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted ${
                  activeConversation.id === conversation.id ? "bg-muted" : ""
                }`}
                onClick={() => setActiveConversation(conversation)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                    <AvatarFallback>{conversation.user.initials}</AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                      conversation.user.status === "online" ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{conversation.user.name}</h3>
                    <span className="text-xs text-muted-foreground">{conversation.lastMessage.time}</span>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">{conversation.lastMessage.text}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {conversation.project}
                    </Badge>
                    {!conversation.lastMessage.isRead && !conversation.lastMessage.isFromMe && (
                      <span className="h-2 w-2 rounded-full bg-red-600" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Conversation */}
        <div className="hidden flex-1 flex-col md:flex">
          {activeConversation ? (
            <>
              <div className="flex h-14 items-center justify-between border-b px-4">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activeConversation.user.avatar} alt={activeConversation.user.name} />
                    <AvatarFallback>{activeConversation.user.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{activeConversation.user.name}</h3>
                    <p className="text-xs text-muted-foreground">Project: {activeConversation.project}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Project
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                  <div key={message.id} className={`mb-4 flex ${message.isFromMe ? "justify-end" : "justify-start"}`}>
                    <div className="flex max-w-[80%] gap-2">
                      {!message.isFromMe && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.user.avatar} alt={message.user.name} />
                          <AvatarFallback>{message.user.initials}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div className={`rounded-lg p-3 ${message.isFromMe ? "bg-red-600 text-white" : "bg-muted"}`}>
                          <p>{message.text}</p>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{message.time}</p>
                      </div>
                      {message.isFromMe && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.user.avatar} alt={message.user.name} />
                          <AvatarFallback>{message.user.initials}</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Button type="button" variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-red-600 hover:bg-red-700">
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <h3 className="text-lg font-medium">No conversation selected</h3>
                <p className="text-muted-foreground">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>

        {/* Mobile View - When a conversation is selected */}
        <div className="flex flex-1 flex-col md:hidden">
          {activeConversation ? (
            <>
              <div className="flex h-14 items-center justify-between border-b px-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setActiveConversation(null)}>
                    Back
                  </Button>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activeConversation.user.avatar} alt={activeConversation.user.name} />
                    <AvatarFallback>{activeConversation.user.initials}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium">{activeConversation.user.name}</h3>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {messages.map((message) => (
                  <div key={message.id} className={`mb-4 flex ${message.isFromMe ? "justify-end" : "justify-start"}`}>
                    <div className="flex max-w-[80%] gap-2">
                      {!message.isFromMe && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.user.avatar} alt={message.user.name} />
                          <AvatarFallback>{message.user.initials}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <div className={`rounded-lg p-3 ${message.isFromMe ? "bg-red-600 text-white" : "bg-muted"}`}>
                          <p>{message.text}</p>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">{message.time}</p>
                      </div>
                      {message.isFromMe && (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={message.user.avatar} alt={message.user.name} />
                          <AvatarFallback>{message.user.initials}</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Button type="button" variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" className="bg-red-600 hover:bg-red-700">
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

