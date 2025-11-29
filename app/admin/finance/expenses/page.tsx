"use client"

import { useState } from "react"
import { Search, Plus, Download, TrendingUp, TrendingDown, DollarSign, Calendar, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ExpensesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [addExpenseDialogOpen, setAddExpenseDialogOpen] = useState(false)

  const expenses = [
    {
      id: 1,
      category: "Salaries",
      description: "Monthly staff salaries - March 2025",
      amount: "₹5,00,000",
      date: "2025-03-01",
      status: "Paid",
      paymentMethod: "Bank Transfer",
      vendor: "Payroll Department",
    },
    {
      id: 2,
      category: "Marketing",
      description: "Facebook Ads Campaign - Spring Intake",
      amount: "₹75,000",
      date: "2025-03-05",
      status: "Paid",
      paymentMethod: "Credit Card",
      vendor: "Meta Platforms",
    },
    {
      id: 3,
      category: "Office Rent",
      description: "Office rent for March 2025",
      amount: "₹1,00,000",
      date: "2025-03-01",
      status: "Paid",
      paymentMethod: "Bank Transfer",
      vendor: "Property Management",
    },
    {
      id: 4,
      category: "Marketing",
      description: "Google Ads - Study Abroad Keywords",
      amount: "₹50,000",
      date: "2025-03-08",
      status: "Pending",
      paymentMethod: "Credit Card",
      vendor: "Google LLC",
    },
    {
      id: 5,
      category: "Travel",
      description: "Education Fair - Delhi",
      amount: "₹35,000",
      date: "2025-03-10",
      status: "Paid",
      paymentMethod: "Cash",
      vendor: "Event Organizer",
    },
    {
      id: 6,
      category: "Software",
      description: "CRM Software Subscription - Annual",
      amount: "₹1,20,000",
      date: "2025-03-12",
      status: "Pending",
      paymentMethod: "Credit Card",
      vendor: "Salesforce",
    },
    {
      id: 7,
      category: "Utilities",
      description: "Electricity and Internet - March",
      amount: "₹15,000",
      date: "2025-03-05",
      status: "Paid",
      paymentMethod: "Bank Transfer",
      vendor: "Utility Providers",
    },
    {
      id: 8,
      category: "Training",
      description: "Staff Training Workshop - Customer Service",
      amount: "₹25,000",
      date: "2025-03-15",
      status: "Paid",
      paymentMethod: "Bank Transfer",
      vendor: "Training Institute",
    },
  ]

  const categoryTotals = [
    { category: "Salaries", amount: "₹5,00,000", percentage: 55.6, trend: "up" },
    { category: "Marketing", amount: "₹1,25,000", percentage: 13.9, trend: "up" },
    { category: "Office Rent", amount: "₹1,00,000", percentage: 11.1, trend: "stable" },
    { category: "Software", amount: "₹1,20,000", percentage: 13.3, trend: "down" },
    { category: "Travel", amount: "₹35,000", percentage: 3.9, trend: "up" },
    { category: "Utilities", amount: "₹15,000", percentage: 1.7, trend: "stable" },
    { category: "Training", amount: "₹25,000", percentage: 2.8, trend: "up" },
  ]

  const handleAddExpense = () => {
    toast({
      title: "Expense Added",
      description: "New expense has been recorded successfully.",
    })
    setAddExpenseDialogOpen(false)
  }

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearch =
      expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || expense.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Expense Management</h1>
          <p className="text-gray-600 mt-1">Track and manage all business expenses</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={addExpenseDialogOpen} onOpenChange={setAddExpenseDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>Record a new business expense</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select defaultValue="marketing">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="salaries">Salaries</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="rent">Office Rent</SelectItem>
                        <SelectItem value="software">Software</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                        <SelectItem value="utilities">Utilities</SelectItem>
                        <SelectItem value="training">Training</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Amount (₹)</Label>
                    <Input type="number" placeholder="Enter amount" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Vendor/Payee</Label>
                  <Input placeholder="Enter vendor or payee name" />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea placeholder="Enter expense description" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <Select defaultValue="bank">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="credit">Credit Card</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="cheque">Cheque</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Receipt/Invoice (Optional)</Label>
                  <Input type="file" accept="image/*,application/pdf" />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setAddExpenseDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddExpense} className="bg-blue-600 hover:bg-blue-700">
                  Add Expense
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Expenses</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₹9.0L</p>
                <p className="text-xs text-red-600 mt-1">+12% from last month</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₹9.0L</p>
                <p className="text-xs text-gray-500 mt-1">March 2025</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">₹1.7L</p>
                <p className="text-xs text-gray-500 mt-1">2 expenses</p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <DollarSign className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Budget Remaining</p>
                <p className="text-2xl font-bold text-green-600 mt-1">₹6.0L</p>
                <p className="text-xs text-gray-500 mt-1">40% of budget</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <TrendingDown className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Expense by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categoryTotals.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-32">
                    <p className="text-sm font-medium text-gray-900">{item.category}</p>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 rounded-full" style={{ width: `${item.percentage}%` }} />
                    </div>
                  </div>
                  <div className="w-24 text-right">
                    <p className="text-sm font-semibold text-gray-900">{item.amount}</p>
                  </div>
                  <div className="w-16 text-right">
                    <p className="text-sm text-gray-600">{item.percentage}%</p>
                  </div>
                  <div className="w-12">
                    {item.trend === "up" && <TrendingUp className="h-4 w-4 text-red-600" />}
                    {item.trend === "down" && <TrendingDown className="h-4 w-4 text-green-600" />}
                    {item.trend === "stable" && <div className="h-1 w-4 bg-gray-400 rounded" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by description, vendor, or category..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="salaries">Salaries</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="office rent">Office Rent</SelectItem>
                <SelectItem value="software">Software</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="training">Training</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Expenses Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Description</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Vendor</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Payment Method</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{expense.date}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{expense.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{expense.description}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{expense.vendor}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{expense.paymentMethod}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">{expense.amount}</td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          expense.status === "Paid" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                        }
                      >
                        {expense.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
