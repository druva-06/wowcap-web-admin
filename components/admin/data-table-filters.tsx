"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Download, RefreshCw } from "lucide-react"

interface FilterOption {
  label: string
  value: string
}

interface DataTableFiltersProps {
  searchPlaceholder?: string
  filters?: {
    label: string
    options: FilterOption[]
    value?: string
    onChange?: (value: string) => void
  }[]
  onSearch?: (value: string) => void
  onExport?: () => void
  onRefresh?: () => void
}

export function DataTableFilters({
  searchPlaceholder = "Search...",
  filters = [],
  onSearch,
  onExport,
  onRefresh,
}: DataTableFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 p-4 bg-white border rounded-lg">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder={searchPlaceholder} className="pl-9" onChange={(e) => onSearch?.(e.target.value)} />
      </div>

      {filters.map((filter, index) => (
        <Select key={index} value={filter.value} onValueChange={filter.onChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder={filter.label} />
          </SelectTrigger>
          <SelectContent>
            {filter.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}

      <div className="flex gap-2">
        {onRefresh && (
          <Button variant="outline" size="icon" onClick={onRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        )}
        {onExport && (
          <Button variant="outline" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        )}
      </div>
    </div>
  )
}
