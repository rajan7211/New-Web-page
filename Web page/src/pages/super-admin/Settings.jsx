import { useState } from "react";
import { motion } from "framer-motion";
import { FiSettings, FiSave, FiBell, FiLock, FiGlobe } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

function Settings() {
  const [settings, setSettings] = useState({
    siteName: "Whitepace",
    adminEmail: "admin@whitepace.com",
    timezone: "UTC",
    notifications: true,
    twoFactor: true,
    maintenanceMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  const settingsSections = [
    {
      title: "General Settings",
      icon: <FiGlobe />,
      color: "from-blue-500 to-blue-600",
      fields: [
        { label: "Site Name", name: "siteName", type: "text" },
        { label: "Admin Email", name: "adminEmail", type: "email" },
        { label: "Timezone", name: "timezone", type: "text" },
      ]
    },
    {
      title: "Security",
      icon: <FiLock />,
      color: "from-red-500 to-red-600",
      fields: [
        { label: "Two-Factor Authentication", name: "twoFactor", type: "checkbox" },
        { label: "Maintenance Mode", name: "maintenanceMode", type: "checkbox" },
      ]
    },
    {
      title: "Notifications",
      icon: <FiBell />,
      color: "from-amber-500 to-amber-600",
      fields: [
        { label: "Enable Notifications", name: "notifications", type: "checkbox" },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          System Settings
        </h1>
        <p className="text-slate-600 mt-1">Configure system settings and preferences</p>
      </motion.div>

      {/* Settings Cards */}
      <div className="grid gap-6">
        {settingsSections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="rounded-2xl border-white/40 shadow-xl bg-white/60 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center gap-3">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${section.color} text-white`}>
                  {section.icon}
                </div>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {section.fields.map(field => (
                  <div key={field.name}>
                    {field.type === 'checkbox' ? (
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={field.name}
                          name={field.name}
                          checked={settings[field.name]}
                          onChange={handleChange}
                          className="h-4 w-4 rounded border-slate-300 text-blue-600 cursor-pointer"
                        />
                        <Label htmlFor={field.name} className="cursor-pointer font-medium">
                          {field.label}
                        </Label>
                      </div>
                    ) : (
                      <div>
                        <Label htmlFor={field.name} className="text-sm font-medium text-slate-700">
                          {field.label}
                        </Label>
                        <Input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          value={settings[field.name]}
                          onChange={handleChange}
                          className="mt-2 rounded-xl"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: settingsSections.length * 0.1 }}
        className="flex justify-end gap-3"
      >
        <Button variant="outline" className="rounded-xl px-6">
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          className="rounded-xl px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2"
        >
          <FiSave className="h-4 w-4" />
          Save Settings
        </Button>
      </motion.div>
    </div>
  );
}

export default Settings;


