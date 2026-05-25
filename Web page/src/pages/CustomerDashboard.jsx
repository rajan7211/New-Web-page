import { useMemo } from "react";
import { FiShoppingBag,FiHeart } from "react-icons/fi";
import DashboardLayout from "../components/DashboardLayout";
import useAuth from "../hooks/useAuth";

function CustomerDashboard() {
  const { currentUser, getOrdersForCustomer } = useAuth();

  const orders = useMemo(() => getOrdersForCustomer(currentUser?.id), [getOrdersForCustomer, currentUser]);

  const totalOrders = orders.length;
  const activeOrders = orders.filter((order) => order.status !== "Delivered").length;
 
  return (
    <DashboardLayout
      title="Customer Dashboard"
      subtitle="Your account overview, order status, and profile details"
    >
      <section className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-3">
          <ProfileCard user={currentUser} />
          <SummaryCard title="Orders placed" value={totalOrders} icon={<FiShoppingBag />} />
          <SummaryCard title="Active items" value={activeOrders} icon={<FiHeart />} />
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-950">Recent orders</h3>
              <p className="mt-1 text-sm text-slate-500">Track the latest order details and shipping information.</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-600">Updated now</span>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-white text-slate-700">
                <tr>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-slate-50">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white">
                    <td className="px-4 py-4 text-slate-900">{order.id}</td>
                    <td className="px-4 py-4 text-slate-500">{order.placedAt}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${order.status === "Delivered" ? "bg-emerald-100 text-emerald-700" : "bg-sky-100 text-sky-700"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-900">${order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </DashboardLayout>
  );
}

function ProfileCard({ user }) {
  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm shadow-slate-900/5">
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-sky-100 text-2xl text-sky-700">{user?.name?.charAt(0)}</div>
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Welcome back</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">{user?.name}</h2>
        </div>
      </div>
      <div className="mt-6 space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
          <span>Email</span>
          <strong className="text-slate-900">{user?.email}</strong>
        </div>
        <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
          <span>Role</span>
          <strong className="text-slate-900">{user?.role}</strong>
        </div>
        <div className="flex items-center justify-between rounded-3xl bg-slate-50 p-4">
          <span>Status</span>
          <strong className="text-slate-900">{user?.status}</strong>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, icon }) {
  return (
    <div className="rounded-[2rem] bg-white p-6 shadow-sm shadow-slate-900/5">
      <div className="flex items-center gap-4">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-950 text-white">{icon}</div>
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
