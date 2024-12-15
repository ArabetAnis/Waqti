import { Bell, ChevronDown, HelpCircle, Home, LogOut, Menu, Moon, Search, Settings, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

// Note: this page should probably be restarted from scratch this was just a try

export default function Personal() {
  return(
  <main className="p-4">
  <Card>
    <CardHeader className="flex flex-row items-center justify-between">
      <CardTitle>On hold</CardTitle>
      <div className="flex gap-2">
        <Button variant="outline" className="gap-2">
          Category
          <ChevronDown className="h-4 w-4" />
        </Button>
        <Button variant="outline" className="gap-2">
          Sort By: Deadline
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="flex items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-red-500" />
          <span>Study for the test of SID</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-500">
            Pending
          </span>
          <span className="text-sm text-red-500">Critical</span>
          <span className="text-sm text-muted-foreground">1 Hour Left</span>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="flex items-center gap-4">
          <div className="h-2 w-2 rounded-full bg-yellow-500" />
          <span>Learn NextJs</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-500">
            In Progress
          </span>
          <span className="text-sm text-yellow-500">Normal</span>
          <span className="text-sm text-muted-foreground">4 Days Left</span>
        </div>
      </div>
      <Button className="gap-2">
        Add Task
      </Button>
    </CardContent>
  </Card>
</main>)
}