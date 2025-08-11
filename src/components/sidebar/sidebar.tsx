"use client"

import { Users, LayoutDashboard, TrendingUp, History, UserPlus } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const navigation = [
  { name: "Clientes", icon: Users, href: "/clientes" },
  { name: "Dashboard", icon: LayoutDashboard, href: "/", current: true },
  { name: "Projeção", icon: TrendingUp, href: "/projecao" },
  { name: "Histórico", icon: History, href: "/historico" },
  { name: "Prospects", icon: UserPlus, href: "/prospects" },
]

export function Sidebar() {
  return (
    <SidebarPrimitive className="border-r border-border/40">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-600">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <span className="text-lg font-semibold text-orange-600">Anka</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                isActive={item.current}
                className={cn("w-full justify-start gap-3 px-6 py-3", item.current && "bg-muted")}
              >
                <a href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </SidebarPrimitive>
  )
}
