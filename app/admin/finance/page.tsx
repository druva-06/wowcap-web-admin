"use client"

import { Search, Plus, Download, DollarSign, TrendingUp, Receipt, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { mockData } from "@/lib/mock-data"
import { useState } from "react"

export default function FinancePage() {
  const transactions = mockData.transactions
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const totalRevenue = transactions.filter((t) => t.status === "Paid").reduce((sum, t) => sum + t.amountNumber, 0)
  const pendingPayments = transactions
    .filter((t) => t.status === "Pending" || t.status === "Overdue")
    .reduce((sum, t) => sum + t.amountNumber, 0)
  const commissionsPaid = transactions
    .filter((t) => t.type === "Commission" && t.status === "Paid")
    .reduce((sum, t) => sum + t.amountNumber, 0)

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      searchTerm === "" ||
      transaction.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || transaction.type.toLowerCase() === typeFilter

    const matchesStatus = statusFilter === "all" || transaction.status.toLowerCase() === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Finance</h1>
          <p className="text-gray-600 mt-1">Manage payments, commissions, and financial reports</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₹{(totalRevenue / 100000).toFixed(1)}L</p>
                <p className="text-xs text-green-600 mt-1">+23% from last month</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Payments</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₹{(pendingPayments / 100000).toFixed(1)}L</p>
                <p className="text-xs text-gray-500 mt-1">
                  {transactions.filter((t) => t.status === "Pending" || t.status === "Overdue").length} transactions
                </p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Commissions Paid</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">₹{(commissionsPaid / 100000).toFixed(1)}L</p>
                <p className="text-xs text-gray-500 mt-1">This month</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Profit Margin</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {(((totalRevenue - commissionsPaid) / totalRevenue) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  ₹{((totalRevenue - commissionsPaid) / 100000).toFixed(1)}L profit
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Receipt className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Payments Alert */}
      {transactions.filter((t) => t.status === "Overdue" || t.status === "Pending").length > 0 && (
        <Card className="bg-amber-50 border-amber-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900">Pending Payment Reminders</h3>
                <div className="mt-2 space-y-2">
                  {transactions
                    .filter((t) => t.status === "Overdue" || t.status === "Pending")
                    .slice(0, 2)
                    .map((t) => (
                      <div key={t.id} className="flex items-center justify-between">
                        <p className="text-sm text-amber-800">
                          {t.studentName}: {t.amount} ({t.status === "Overdue" ? "Overdue" : "Due soon"})
                        </p>
                        <Button size="sm" variant="outline" className="border-amber-300 bg-transparent">
                          {t.status === "Overdue" ? "Call Now" : "Send Reminder"}
                        </Button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by student, college, transaction..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="commission">Commission</SelectItem>
                <SelectItem value="counseling fee">Counseling Fee</SelectItem>
                <SelectItem value="application fee">Application Fee</SelectItem>
                <SelectItem value="document fee">Document Fee</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions ({filteredTransactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Student</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">College</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Counselor</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{transaction.date}</td>
                    <td className="py-3 px-4">
                      <Badge variant="secondary">{transaction.type}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">{transaction.studentName}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{transaction.college}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{transaction.counselorName}</td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">{transaction.amount}</td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          transaction.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : transaction.status === "Overdue"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Link href={`/admin/finance/transactions/${transaction.id}`}>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Commission Breakdown */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Commission Split Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Harvard Enrollment - Priya Sharma</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Commission</span>
                    <span className="font-semibold text-gray-900">₹1,65,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Counselor (Vinayak - 60%)</span>
                    <span className="font-semibold text-blue-600">₹99,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Company (40%)</span>
                    <span className="font-semibold text-gray-900">₹66,000</span>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Generate Payout</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Salaries</span>
                <span className="font-semibold text-gray-900">₹5L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Marketing</span>
                <span className="font-semibold text-gray-900">₹2L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Office Rent</span>
                <span className="font-semibold text-gray-900">₹1L</span>
              </div>
              <div className="flex justify-between pt-3 border-t">
                <span className="text-sm font-semibold text-gray-900">Total Expenses</span>
                <span className="font-bold text-gray-900">₹8L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-900">Revenue</span>
                <span className="font-bold text-green-600">₹{(totalRevenue / 100000).toFixed(1)}L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-900">Profit</span>
                <span className="font-bold text-blue-600">₹{((totalRevenue - 800000) / 100000).toFixed(1)}L</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
