import { useMemo } from "react";
import { motion } from "framer-motion";
import { FiShoppingBag, FiHeart, FiTrendingUp, FiCheckCircle } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

function Dashboard() {
  const { currentUser, getOrdersForCustomer } = useAuth();
  const orders = useMemo(() => getOrdersForCustomer(currentUser?.id), [getOrdersForCustomer, currentUser]);

  const totalOrders = orders.length;
  const activeOrders = orders.filter((o) => o.status !== "Delivered").length;
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);

  const userInitial = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="space-y-8">
      {/* Top Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-6 lg:grid-cols-3"
      >
        {/* Profile Card */}
        <Card className="rounded-2xl border-white/40 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="h-16 w-16 ring-2 ring-blue-500/30 ring-offset-2">
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-lg font-bold">
                  {userInitial}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-400 font-medium">Welcome back</p>
                <h2 className="mt-0.5 text-2xl font-bold text-slate-900">{currentUser?.name}</h2>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-white/70 px-4 py-3">
                <span className="text-slate-600 text-sm">Email</span>
                <strong className="text-slate-900 text-sm">{currentUser?.email}</strong>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/70 px-4 py-3">
                <span className="text-slate-600 text-sm">Role</span>
                <strong className="text-slate-900 text-sm">{currentUser?.role}</strong>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/70 px-4 py-3">
                <span className="text-slate-600 text-sm">Status</span>
                <strong className="text-green-600 text-sm">✓ Active</strong>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl border-white/40 shadow-xl bg-white/60 backdrop-blur-sm hover:shadow-2xl transition-all h-full">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg text-2xl">
                <FiShoppingBag />
              </div>
              <div>
                <p className="text-sm text-slate-600">Orders placed</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">{totalOrders}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-2xl border-white/40 shadow-xl bg-white/60 backdrop-blur-sm hover:shadow-2xl transition-all h-full">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg text-2xl">
                <FiHeart />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total spent</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">${totalSpent}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="rounded-2xl border-white/40 shadow-xl bg-white/60 backdrop-blur-sm overflow-hidden">
          <CardHeader className="border-b border-white/30">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <FiCheckCircle className="text-green-600" />
                  Recent Orders
                </CardTitle>
              </div>
              <Badge variant="secondary" className="text-xs">
                {totalOrders} Total
              </Badge>
            </div>
          </CardHeader>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-white/30">
                  <TableHead className="text-slate-500 font-semibold px-6">Order ID</TableHead>
                  <TableHead className="text-slate-500 font-semibold px-6">Date</TableHead>
                  <TableHead className="text-slate-500 font-semibold px-6">Status</TableHead>
                  <TableHead className="text-slate-500 font-semibold px-6 text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-slate-50/60 border-b border-white/20 transition-colors">
                      <TableCell className="px-6 py-4 font-semibold text-slate-900">{order.id}</TableCell>
                      <TableCell className="px-6 py-4 text-slate-500 text-sm">{order.placedAt}</TableCell>
                      <TableCell className="px-6 py-4">
                        <Badge
                          className={`text-xs font-semibold ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          }`}
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-6 py-4 font-semibold text-slate-900 text-right">${order.total}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="py-12 text-center text-slate-400">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default Dashboard;


