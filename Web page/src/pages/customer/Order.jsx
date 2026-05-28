import { useMemo } from "react";
import { motion } from "framer-motion";
import { FiPackage, FiCalendar, FiDollarSign } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import DataTable from "../../components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function Orders() {
  const { currentUser, getOrdersForCustomer } = useAuth();
  const orders = useMemo(() => getOrdersForCustomer(currentUser?.id), [getOrdersForCustomer, currentUser]);

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: <FiPackage />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Delivered",
      value: orders.filter(o => o.status === "Delivered").length,
      icon: <FiPackage />,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Total Spent",
      value: `$${orders.reduce((sum, o) => sum + o.total, 0)}`,
      icon: <FiDollarSign />,
      color: "from-amber-500 to-amber-600",
    },
  ];

  const columns = useMemo(
    () => [
      {
        key: "id",
        label: "Order ID",
        sortable: true,
        render: (order) => (
          <div className="flex items-center gap-2">
            <FiPackage className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-slate-900">{order.id}</span>
          </div>
        ),
      },
      {
        key: "placedAt",
        label: "Date",
        sortable: true,
        render: (order) => (
          <div className="flex items-center gap-2 text-slate-600">
            <FiCalendar className="h-4 w-4" />
            {order.placedAt}
          </div>
        ),
      },
      {
        key: "items",
        label: "Items",
        sortable: true,
        render: (order) => <span className="font-medium">{order.items} items</span>,
      },
      {
        key: "status",
        label: "Status",
        sortable: true,
        render: (order) => (
          <Badge
            className={order.status === "Delivered" ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-blue-100 text-blue-700 hover:bg-blue-100"}
          >
            {order.status}
          </Badge>
        ),
      },
      {
        key: "total",
        label: "Total",
        sortable: true,
        render: (order) => (
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <FiDollarSign className="h-4 w-4 text-amber-600" />
            {order.total}
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          My Orders
        </h1>
        <p className="text-slate-600 mt-1">View and track all your orders</p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="rounded-2xl border-white/40 shadow-xl bg-white/60 backdrop-blur-sm hover:shadow-2xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg text-2xl`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <DataTable
        data={orders}
        columns={columns}
        searchKeys={["id", "status"]}
        pageSize={10}
      />
    </div>
  );
}

export default Orders;

