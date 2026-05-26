import { useMemo } from "react";
import { FiShoppingBag, FiHeart } from "react-icons/fi";
import DashboardLayout from "../components/DashboardLayout";
import useAuth from "../hooks/useAuth";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

function CustomerDashboard() {
  const { currentUser, getOrdersForCustomer } = useAuth();
  const orders = useMemo(() => getOrdersForCustomer(currentUser?.id), [getOrdersForCustomer, currentUser]);

  const totalOrders  = orders.length;
  const activeOrders = orders.filter((o) => o.status !== "Delivered").length;

  return (
    <DashboardLayout
      title="Customer Dashboard"
      subtitle="Your account overview, order status, and profile details"
    >
      <section className="space-y-8">
        {/* Top cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          <ProfileCard user={currentUser} />
          <SummaryCard title="Orders placed" value={totalOrders} icon={<FiShoppingBag />} />
          <SummaryCard title="Active items"  value={activeOrders} icon={<FiHeart />} />
        </div>

        {/* Orders table */}
        <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base font-semibold text-slate-900">Recent Orders</CardTitle>
                <CardDescription className="mt-0.5 text-sm">
                  Track the latest order details and shipping information.
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-xs">Updated now</Badge>
            </div>
          </CardHeader>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-100">
                  <TableHead className="px-6 font-semibold text-slate-500">Order ID</TableHead>
                  <TableHead className="px-6 font-semibold text-slate-500">Date</TableHead>
                  <TableHead className="px-6 font-semibold text-slate-500">Status</TableHead>
                  <TableHead className="px-6 font-semibold text-slate-500">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-slate-50/60 border-slate-100 transition-colors">
                      <TableCell className="px-6 py-4 font-semibold text-slate-900">{order.id}</TableCell>
                      <TableCell className="px-6 py-4 text-slate-500 text-sm">{order.placedAt}</TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge
                          className={`text-xs font-semibold ${
                            order.status === "Delivered"
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                              : "bg-sky-100 text-sky-700 hover:bg-sky-100"
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4 font-semibold text-slate-900">${order.total}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="py-10 text-center text-slate-400">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>
    </DashboardLayout>
  );
}
function ProfileCard({ user }) {
  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="bg-sky-100 text-sky-700 text-xl font-semibold rounded-2xl">
              {initial}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">Welcome back</p>
            <h2 className="mt-0.5 text-xl font-bold text-slate-900">{user?.name}</h2>
          </div>
        </div>
        <div className="space-y-2.5 text-sm">
          {[
            { label: "Email",  value: user?.email },
            { label: "Role",   value: user?.role },
            { label: "Status", value: user?.status },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
              <span className="text-slate-500">{label}</span>
              <strong className="text-slate-900">{value}</strong>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SummaryCard({ title, value, icon }) {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white text-xl">
          {icon}
        </div>
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default CustomerDashboard;




