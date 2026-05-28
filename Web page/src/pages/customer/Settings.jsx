import { useState } from "react";
import { motion } from "framer-motion";
import { FiLock, FiSave, FiBell } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotions: false,
    newslatter: true,
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
          Settings
        </h1>
        <p className="text-slate-600 mt-1">Manage your preferences and security</p>
      </motion.div>

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
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {[
              { id: "emailNotifications", label: "Email Notifications" },
              { id: "smsNotifications", label: "SMS Notifications" },
              { id: "orderUpdates", label: "Order Updates" },
              { id: "promotions", label: "Promotional Offers" },
              { id: "newslatter", label: "Weekly Newsletter" },
            ].map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={item.id}
                  name={item.id}
                  checked={settings[item.id]}
                  onChange={handleChange}
                  className="h-4 w-4 rounded cursor-pointer"
                />
                <Label htmlFor={item.id} className="cursor-pointer font-medium">
                  {item.label}
                </Label>
              </div>
            ))}
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
            <div>
              <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                Current Password
              </Label>
              <Input type="password" className="rounded-xl" />
            </div>
            <div>
              <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                New Password
              </Label>
              <Input type="password" className="rounded-xl" />
            </div>
            <div>
              <Label className="text-sm font-semibold text-slate-700 mb-2 block">
                Confirm New Password
              </Label>
              <Input type="password" className="rounded-xl" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" className="rounded-xl px-6">
          Cancel
        </Button>
        <Button className="rounded-xl px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2">
          <FiSave className="h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}

export default Settings;

