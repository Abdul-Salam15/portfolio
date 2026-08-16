"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, Mail, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ContactModal } from "@/components/contact-modal"
import { profile } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Resume", href: "/resume" },
  { name: "Portfolio", href: "/portfolio" },
]

const socialLinks = [
  { name: "GitHub", href: profile.github, icon: Github },
  { name: "LinkedIn", href: profile.linkedin, icon: Linkedin },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const pathname = usePathname()

  const handleEmailClick = () => {
    setIsContactModalOpen(true)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2" aria-label={`${profile.name}, home`}>
              <Image src="/logo.png" alt={`${profile.name} logo`} width={60} height={20} priority />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary border-b-2 ",
                    pathname === item.href ? "text-primary border-primary" : "text-muted-foreground border-transparent",
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEmailClick}
                className="hover:text-primary hover:bg-primary/10 !cursor-pointer"
                aria-label="Contact via Email"
              >
                <Mail className="h-4 w-4 cursor-pointer" />
              </Button>
              {socialLinks.map((link) => (
                <Button
                  key={link.name}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="hover:text-primary hover:bg-primary/10"
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                    <link.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="h-11 w-11 md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 text-base font-medium rounded-md transition-colors",
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Social Links */}
                <div className="flex items-center space-x-4 px-3 py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      handleEmailClick()
                      setIsOpen(false)
                    }}
                    className="hover:text-primary hover:bg-primary/10"
                    aria-label="Contact via Email"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  {socialLinks.map((link) => (
                    <Button
                      key={link.name}
                      variant="ghost"
                      size="sm"
                      asChild
                      className="hover:text-primary hover:bg-primary/10"
                    >
                      <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                        <link.icon className="h-4 w-4" />
                      </a>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </>
  )
}
