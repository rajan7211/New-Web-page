import { useState } from "react";
import { motion } from "framer-motion";
import { FiSettings, FiSave, FiBell, FiLock } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function Settings() {
  const [settings, setSettings] = useState({
    notifyNewCustomers: true,
    notifyOrders: true,
    emailUpdates: false,
    twoFactor: true,
  });

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : false
    }));
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Admin Settings
        </h1>
        <p className="text-slate-600 mt-1">Manage your preferences</p>
      </motion.div>

      <div className="grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="rounded-2xl border-white/40 shadow-xl bg-white/60 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <FiBell className="h-5 w-5" />
              </div>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="notifyNewCustomers"
                  name="notifyNewCustomers"
                  checked={settings.notifyNewCustomers}
                  onChange={handleChange}
                  className="h-4 w-4 rounded cursor-pointer"
                />
                <Label htmlFor="notifyNewCustomers" className="cursor-pointer">
                  Notify when new customers join
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="notifyOrders"
                  name="notifyOrders"
                  checked={settings.notifyOrders}
                  onChange={handleChange}
                  className="h-4 w-4 rounded cursor-pointer"
                />
                <Label htmlFor="notifyOrders" className="cursor-pointer">
                  Notify when new orders are placed
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="emailUpdates"
                  name="emailUpdates"
                  checked={settings.emailUpdates}
                  onChange={handleChange}
                  className="h-4 w-4 rounded cursor-pointer"
                />
                <Label htmlFor="emailUpdates" className="cursor-pointer">
                  Send email updates
                </Label>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="rounded-2xl border-white/40 shadow-xl bg-white/60 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-3 rounded-lg bg-red-100 text-red-600">
                <FiLock className="h-5 w-5" />
              </div>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="twoFactor"
                  name="twoFactor"
                  checked={settings.twoFactor}
                  onChange={handleChange}
                  className="h-4 w-4 rounded cursor-pointer"
                />
                <Label htmlFor="twoFactor" className="cursor-pointer">
                  Enable two-factor authentication
                </Label>
              </div>
              <Button variant="outline" className="w-full rounded-xl mt-4">
                Change Password
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" className="rounded-xl px-6">
          Cancel
        </Button>
        <Button 
          className="rounded-xl px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2"
        >
          <FiSave className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}

export default Settings;