"use client"
import { Sidebar } from "@/components/sidebar/sidebar"
import { DashboardContent } from "@/components/dashboard-content/dashboard-content"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardPage() {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <main className="flex-1">
          <DashboardContent />
        </main>
      </div>
    </SidebarProvider>
  )
}
