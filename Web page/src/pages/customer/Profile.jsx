import { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiMapPin, FiSave } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function Profile() {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
    email: currentUser?.email,
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    bio: "Passionate about great products and services",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const userInitial = currentUser?.name?.charAt(0)?.toUpperCase() || "U";

  const fields = [
    { label: "First Name", name: "firstName", icon: <FiUser /> },
    { label: "Last Name", name: "lastName", icon: <FiUser /> },
    { label: "Email", name: "email", type: "email", icon: <FiMail /> },
    { label: "Phone", name: "phone", icon: <FiPhone /> },
    { label: "Address", name: "address", icon: <FiMapPin /> },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          My Profile
        </h1>
        <p className="text-slate-600 mt-1">Manage your personal information</p>
      </motion.div>

      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="rounded-2xl border-white/40 shadow-xl bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 ring-2 ring-blue-500/30 ring-offset-2">
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-2xl font-bold">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{currentUser?.name}</h2>
                  <p className="text-slate-600 mt-1">{currentUser?.email}</p>
                  <Badge className="mt-3 bg-green-100 text-green-700 hover:bg-green-100">✓ Verified</Badge>
                </div>
              </div>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                className="rounded-xl px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Profile Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="rounded-2xl border-white/40 shadow-xl bg-white/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-6 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.name}>
                  <Label htmlFor={field.name} className="text-sm font-semibold text-slate-700 flex items-center gap-2 mb-2">
                    {field.icon}
                    {field.label}
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={field.type || "text"}
                    value={profile[field.name]}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className={`rounded-xl ${!isEditing ? "bg-slate-100 cursor-not-allowed" : ""}`}
                  />
                </div>
              ))}
            </div>

            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex justify-end gap-3"
              >
                <Button variant="outline" onClick={() => setIsEditing(false)} className="rounded-xl">
                  Cancel
                </Button>
                <Button className="rounded-xl px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white gap-2">
                  <FiSave className="h-4 w-4" />
                  Save Changes
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";

export default Profile;