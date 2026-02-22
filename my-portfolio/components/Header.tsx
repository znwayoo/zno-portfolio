"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, Terminal } from "lucide-react";
import { Button } from "./ui/button";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/insights", label: "Insights" },
];

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false);
    const pathname = usePathname();
    const isDev = process.env.NODE_ENV === "development";

    const closeMenu = () => setIsOpen(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm support-[backdrop-filter]:bg-background/60">
            <div className="container max-w-[var(--container-max-w)] mx-auto px-[var(--container-padding)] flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <Terminal className="w-6 h-6 text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110" />
                    <span className="font-bold text-xl tracking-tight hidden sm:inline-block">
                        ZNO<span className="text-blue-600 dark:text-blue-400">.</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${pathname === link.href
                                    ? "text-blue-600 dark:text-blue-400 font-bold"
                                    : "text-muted-foreground font-medium"
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    {isDev && (
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium text-destructive hover:text-destructive/80 transition-colors"
                        >
                            Dashboard
                        </Link>
                    )}
                    <ThemeToggle />
                </nav>

                {/* Mobile Nav Toggle */}
                <div className="flex lg:hidden items-center gap-4">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-sm border-t">
                    <nav className="flex flex-col items-center gap-8 p-8 max-w-sm mx-auto animate-in slide-in-from-bottom-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMenu}
                                className={`text-xl transition-colors hover:text-blue-600 dark:hover:text-blue-400 ${pathname === link.href
                                        ? "text-blue-600 dark:text-blue-400 font-bold"
                                        : "text-foreground font-semibold"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {isDev && (
                            <Link
                                href="/dashboard"
                                onClick={closeMenu}
                                className="text-xl font-semibold text-destructive hover:text-destructive/80 transition-colors"
                            >
                                Dashboard
                            </Link>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
}
