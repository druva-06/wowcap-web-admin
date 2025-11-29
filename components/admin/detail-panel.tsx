"use client"

import type React from "react"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DetailPanelTab {
  id: string
  label: string
  content: React.ReactNode
}

interface DetailPanelProps {
  isOpen: boolean
  onClose: () => void
  title: string
  tabs: DetailPanelTab[]
  actions?: React.ReactNode
}

export function DetailPanel({ isOpen, onClose, title, tabs, actions }: DetailPanelProps) {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-full sm:w-[500px] bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/20">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {actions && <div className="p-4 border-b bg-gray-50">{actions}</div>}

        <Tabs defaultValue={tabs[0]?.id} className="flex-1 flex flex-col">
          <TabsList className="w-full justify-start rounded-none border-b bg-white px-4">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollArea className="flex-1">
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="p-4 m-0">
                {tab.content}
              </TabsContent>
            ))}
          </ScrollArea>
        </Tabs>
      </div>
    </>
  )
}
