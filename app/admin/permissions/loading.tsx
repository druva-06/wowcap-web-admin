import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header Skeleton */}
                <div className="flex items-center justify-between">
                    <div>
                        <Skeleton className="h-10 w-80 mb-2" />
                        <Skeleton className="h-4 w-96" />
                    </div>
                    <div className="flex gap-2">
                        <Skeleton className="h-10 w-40" />
                        <Skeleton className="h-10 w-40" />
                    </div>
                </div>

                {/* Stats Cards Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <Card key={i}>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-2">
                                        <Skeleton className="h-3 w-24" />
                                        <Skeleton className="h-8 w-12" />
                                    </div>
                                    <Skeleton className="h-10 w-10 rounded-lg" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Search Skeleton */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex gap-4">
                            <Skeleton className="h-10 flex-1" />
                            <Skeleton className="h-10 w-[250px]" />
                        </div>
                    </CardContent>
                </Card>

                {/* Category Cards Skeleton */}
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Skeleton className="h-10 w-10 rounded-lg" />
                                        <Skeleton className="h-6 w-32" />
                                        <Skeleton className="h-6 w-12 rounded-full" />
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {[...Array(4)].map((_, j) => (
                                    <div key={j} className="flex items-start justify-between p-4 border-t">
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <Skeleton className="h-5 w-32" />
                                                <Skeleton className="h-5 w-40" />
                                                <Skeleton className="h-5 w-16" />
                                            </div>
                                            <Skeleton className="h-4 w-full max-w-md" />
                                        </div>
                                        <Skeleton className="h-8 w-8" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
