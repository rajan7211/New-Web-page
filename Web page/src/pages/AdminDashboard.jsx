import { useMemo } from "react";
import { FiUsers, FiActivity } from "react-icons/fi";
import DashboardLayout from "../components/DashboardLayout";
import useAuth from "../hooks/useAuth";

function AdminDashboard() {
  const { getManagedCustomers } = useAuth();

  const customers = useMemo(() => getManagedCustomers(), [getManagedCustomers]);
  return (
    <DashboardLayout
      title="Admin Dashboard"
      subtitle="Manage customers and track activity"
    >
      <section className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <OverviewCard
            title="Customers"
            value={customers.length}
            icon={<FiUsers />}
          />

          <OverviewCard
            title="Active"
            value={customers.filter((c) => c.status === "active").length}
            icon={<FiActivity />}
          />
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3">Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map((customer) => (
                    <tr key={customer.id} className="border-b last:border-0">
                      <td className="py-3">{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            customer.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {customer.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-500">
                      No customers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

function OverviewCard({ title, value, icon }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="text-blue-600 bg-blue-50 p-3 rounded-xl text-2xl">{icon}</div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;




