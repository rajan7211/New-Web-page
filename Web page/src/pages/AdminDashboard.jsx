import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiActivity, FiUserCheck, FiEye } from "react-icons/fi";
import DashboardLayout from "../components/DashboardLayout";
import useAuth from "../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AdminDashboard() {
  const { getManagedCustomers, canImpersonate, startImpersonating,
          getDashboardRoute, isImpersonating } = useAuth();
  const customers = useMemo(() => getManagedCustomers(), [getManagedCustomers]);
  const navigate = useNavigate();

  const stats = [
    { title: "Total Customers", value: customers.length,                                       icon: <FiUsers />,    color: "text-blue-600",    bg: "bg-blue-50" },
    { title: "Active",          value: customers.filter((c) => c.status === "active").length,  icon: <FiActivity />, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  const handleImpersonate = (customer) => {
    startImpersonating(customer);
    navigate(getDashboardRoute(customer.role), { replace: true });
  };

  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Manage customers and track activity">
      <section className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(({ title, value, icon, color, bg }) => (
            <Card key={title} className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-4 p-5">
                <div className={`rounded-xl p-3 text-2xl ${bg} ${color}`}>{icon}</div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</p>
                  <p className="text-2xl font-bold text-slate-900">{value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Customer table */}
        <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-100">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle className="text-base font-bold text-slate-800">Customer List</CardTitle>
            
            </div>
          </CardHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-100">
                  <TableHead className="text-slate-500 font-semibold px-6">Name</TableHead>
                  <TableHead className="text-slate-500 font-semibold px-6">Email</TableHead>
                  <TableHead className="text-slate-500 font-semibold px-6">Status</TableHead>
                  <TableHead className="text-slate-500 font-semibold px-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.length > 0 ? (
                  customers.map((customer) => {
                    const impersonatable = canImpersonate(customer);
                    return (
                      <TableRow key={customer.id} className="hover:bg-slate-50/60 border-slate-100 transition-colors">
                        <TableCell className="px-6 py-3 font-semibold text-slate-900">{customer.name}</TableCell>
                        <TableCell className="px-6 py-3 text-slate-600 text-sm">{customer.email}</TableCell>
                        <TableCell className="px-6 py-3">
                          <Badge className={`text-xs font-semibold capitalize ${
                            customer.status === "active"
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
                              : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                          }`}>
                            {customer.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="px-6 py-3">
                          {impersonatable ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleImpersonate(customer)}
                                    className="gap-1.5 text-xs rounded-lg border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-400 transition-all"
                                  >
                                    <FiUserCheck className="w-3.5 h-3.5" />
                                    Impersonate
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>View dashboard as {customer.name}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <span className="text-xs text-slate-400 italic">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="py-10 text-center text-slate-400">
                      No customers found.
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

export default AdminDashboard;







