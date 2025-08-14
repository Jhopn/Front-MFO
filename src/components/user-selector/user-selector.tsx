"use client"
import { ChevronDown, User, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { useClientsIdName } from '@/hooks/use-clients'

interface ClientData {
  id: string;
  name: string;
}

interface UserSelectorProps {
  selectedUserName?: string;
  onUserChange?: (client: ClientData) => void;
}

export function UserSelector({ selectedUserName, onUserChange }: UserSelectorProps) {
  const { data: clients, isLoading, isError, error } = useClientsIdName();

  if (isLoading) {
    return (
      <Skeleton className="h-10 w-56" />
    )
  }

  if (isError) {
    return (
      <div className="flex items-center text-red-500 bg-red-500/10 p-2 rounded-md border border-red-500/30">
        <AlertCircle className="h-4 w-4 mr-2" />
        <span className="text-sm">{error?.message || "Failed to fetch clients"}</span>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-56 justify-between bg-[#1B1B1B] border-gray-800 hover:bg-background/80"
          disabled={!selectedUserName}
        >
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-white" />
            <span className="text-white">{selectedUserName || "Select a client"}</span>
          </div>
          <ChevronDown className="h-4 w-4 ml-2 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {clients?.map((client: ClientData) => (
          <DropdownMenuItem
            key={client.id}
            onClick={() => onUserChange?.(client)}
            className="cursor-pointer"
          >
            <User className="h-4 w-4 mr-2" />
            {client.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
