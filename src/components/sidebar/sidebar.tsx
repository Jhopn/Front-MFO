"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, LayoutDashboard, TrendingUp, History, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const navigation = [
  { name: "Clientes", icon: Users, href: "/client" },
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Projeção", icon: TrendingUp, href: "/projection" },
  { name: "Histórico", icon: History, href: "/history" },
]

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userProfile = session?.user?.email ? {
    name: session.user.email.split('@')[0].split('.').map(capitalize).join(' '),
    email: session.user.email,
    initials: session.user.email.split('@')[0].split('.').map(n => n[0]).join('').toUpperCase(),
  } : null;

  return (
    <SidebarPrimitive className="border-r border-border/40 dark flex flex-col h-full">
      <div className="w-full">
        <SidebarHeader className="p-6">
          <div className="flex items-center justify-center rounded-lg ">
            <Image src={'/images/logo-anka.png'} width={150} height={150} alt="Logo Anka Tech" />
          </div>
        </SidebarHeader>
        <SidebarContent className="px-3">
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  className={cn("w-full justify-start text-center gap-3 px-3 py-3")}
                >
                  <Link href={item.href}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </div>

      <SidebarFooter className="mt-auto relative p-4">
        {userProfile && (
          <div className="flex items-center gap-3 z-10 relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white font-bold">
              {userProfile.initials}
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium text-white truncate">{userProfile.name}</span>
              <span className="text-xs text-gray-400 truncate">{userProfile.email}</span>
            </div>
            <button className="ml-auto text-gray-400 hover:text-white">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        )}
        <Image 
            src={'/images/background-sidebar.png'} 
            alt='Background Sidebar' 
            layout="fill" 
            objectPosition="bottom"
            className="pointer-events-none p-2" 
        />
      </SidebarFooter>
    </SidebarPrimitive>
  )
}