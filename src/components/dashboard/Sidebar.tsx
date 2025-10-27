"use client";
import { useState } from "react";
import Link from "next/link";
// , Workflow
import { BarChart, FileText, LayoutDashboard, MessageCircle, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Mobile Sidebar */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" className="md:hidden m-4">
                        <LayoutDashboard className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[250px]">
                    <SheetTitle className="text-xl font-bold pl-6">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold">
                                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                                    Next
                                </span>
                                <span className="text-foreground">Blog</span>
                            </span>
                        </Link>
                    </SheetTitle>
                    <DashboardSidebar closeSheet={() => setIsOpen(false)} isOpen={isOpen} />
                </SheetContent>
            </Sheet>
            <div className="hidden md:block h-screen w-[250px] border-r bg-background">
                <DashboardSidebar closeSheet={() => setIsOpen(false)} />
            </div>
        </div>
    )
}

export default Sidebar;

function DashboardSidebar({
    isOpen,
    closeSheet,
}: {
    isOpen?: boolean;
    closeSheet?: () => void;
}) {
    return (
        <div className="h-full px-4 py-6">
            {
                !isOpen && (
                    <div className="flex items-center gap-2 mb-8 px-2">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-2xl font-bold">
                                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                                    Next
                                </span>
                                <span className="text-foreground">Blog</span>
                            </span>
                        </Link>
                    </div>
                )
            }
            <nav className="space-y-1">
                <Link href={"/dashboard"}>
                    <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={closeSheet}
                    >
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Overview
                    </Button>
                </Link>

                <Link href={"/dashboard/articles"}>
                    <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={closeSheet}
                    >
                        <FileText className="mr-2 h-4 w-4" />
                        Articles
                    </Button>
                </Link>
                {/* <Link href={"/dashboard/projects"}>
                    <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={closeSheet}
                    >
                        <Workflow className="mr-2 h-4 w-4" />
                        Projects - MotionFolio
                    </Button>
                </Link> */}
                <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={closeSheet}
                >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Comments
                </Button>
                <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={closeSheet}
                >
                    <BarChart className="mr-2 h-4 w-4" />
                    Analytics
                </Button>
                <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={closeSheet}
                >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </Button>
            </nav>
        </div>
    );
}