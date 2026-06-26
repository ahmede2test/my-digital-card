"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  Plus,
  X,
  ArrowLeft,
  User,
  FileText,
  Image,
  Link2,
  Loader2,
  ToggleLeft,
  ToggleRight,
  Lock,
  Eye,
  EyeOff,
  Upload,
} from "lucide-react";

const ADMIN_PASSWORD = "admin123";

interface Profile {
  id: number;
  name: string;
  nameHighlight: string;
  badge: string;
  subtitle: string;
  bio: string;
  avatarUrl: string | null;
  skills: string[];
  links: {
    linkedin?: string;
    github?: string;
    website?: string;
    facebook?: string;
    instagram?: string;
    email?: string;
    phone?: string;
    whatsapp?: string;
  };
  available: boolean;
}

const defaultProfile: Omit<Profile, "id"> = {
  name: "",
  nameHighlight: "",
  badge: "",
  subtitle: "",
  bio: "",
  avatarUrl: "",
  skills: [],
  links: {
    linkedin: "",
    github: "",
    website: "",
    facebook: "",
    instagram: "",
    email: "",
    phone: "",
    whatsapp: "",
  },
  available: true,
};

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_auth", "true");
      onLogin();
    } else {
      setError("Wrong password");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-neutral-800/80 border border-neutral-700 rounded-2xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <Lock className="w-8 h-8 text-rose-500" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-center text-white mb-2">Admin Panel</h1>
          <p className="text-sm text-neutral-400 text-center mb-6">
            Enter password to access admin settings
          </p>

          <form onSubmit={handleSubmit}>
            <motion.div
              animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="relative mb-4"
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-3 pr-12 bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all"
                placeholder="Password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </motion.div>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400 mb-4 text-center"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 rounded-xl font-bold text-sm transition-all shadow-lg"
            >
              Login
            </button>
          </form>

          <a
            href="/"
            className="flex items-center justify-center gap-2 mt-6 text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Card
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<Omit<Profile, "id">>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setCheckingAuth(false);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (data.profile) {
          setProfile(data.profile);
          setForm({
            name: data.profile.name,
            nameHighlight: data.profile.nameHighlight,
            badge: data.profile.badge,
            subtitle: data.profile.subtitle,
            bio: data.profile.bio,
            avatarUrl: data.profile.avatarUrl || "",
            skills: data.profile.skills || [],
            links: data.profile.links || {},
            available: data.profile.available ?? true,
          });
        } else {
          await fetch("/api/profile/seed", { method: "POST" });
          const res2 = await fetch("/api/profile");
          const data2 = await res2.json();
          if (data2.profile) {
            setProfile(data2.profile);
            setForm({
              name: data2.profile.name,
              nameHighlight: data2.profile.nameHighlight,
              badge: data2.profile.badge,
              subtitle: data2.profile.subtitle,
              bio: data2.profile.bio,
              avatarUrl: data2.profile.avatarUrl || "",
              skills: data2.profile.skills || [],
              links: data2.profile.links || {},
              available: data2.profile.available ?? true,
            });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [isAuthenticated]);

  function updateField<K extends keyof Omit<Profile, "id">>(
    field: K,
    value: Omit<Profile, "id">[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateLink(key: string, value: string) {
    setForm((prev) => ({
      ...prev,
      links: { ...prev.links, [key]: value },
    }));
  }

  function addSkill() {
    if (newSkill.trim() && !form.skills.includes(newSkill.trim())) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill("");
    }
  }

  function removeSkill(skill: string) {
    setForm((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  async function handleUpload() {
    if (!selectedFile) return;
    setUploading(true);
    try {
      const data = new FormData();
      data.append("file", selectedFile);
      const res = await fetch("/api/upload", { method: "POST", body: data });
      const result = await res.json();
      if (res.ok && result.url) {
        updateField("avatarUrl", result.url);
        setSelectedFile(null);
        setPreviewUrl(null);
        setMessage("Image uploaded!");
        setTimeout(() => setMessage(""), 2000);
      } else {
        setMessage("Upload failed.");
      }
    } catch (err) {
      setMessage("Upload error.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage("Profile saved successfully!");
        const data = await res.json();
        setProfile(data.profile);
      } else {
        setMessage("Failed to save profile.");
      }
    } catch (err) {
      setMessage("An error occurred.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
      </div>
    );
  }

  const inputClasses =
    "w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all";

  const labelClasses = "flex items-center gap-2 text-sm font-medium text-neutral-300 mb-2";

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Header */}
      <div className="border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Card</span>
          </a>
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 rounded-xl font-medium text-sm transition-all disabled:opacity-50 shadow-lg"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Changes
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mb-6 px-4 py-3 rounded-xl text-sm font-medium ${
                message.includes("success")
                  ? "bg-emerald-900/50 border border-emerald-700 text-emerald-300"
                  : "bg-red-900/50 border border-red-700 text-red-300"
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Basic Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-800/50 border border-neutral-700 rounded-2xl p-6 mb-6"
        >
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-rose-500" />
            Basic Information
          </h2>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>First Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={inputClasses}
                  placeholder="Ahmed Osman"
                />
              </div>
              <div>
                <label className={labelClasses}>Highlighted Name</label>
                <input
                  type="text"
                  value={form.nameHighlight}
                  onChange={(e) => updateField("nameHighlight", e.target.value)}
                  className={inputClasses}
                  placeholder="Elsisi"
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Badge</label>
              <input
                type="text"
                value={form.badge}
                onChange={(e) => updateField("badge", e.target.value)}
                className={inputClasses}
                placeholder="IT SPECIALIST"
              />
            </div>

            <div>
              <label className={labelClasses}>Subtitle / Job Line</label>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) => updateField("subtitle", e.target.value)}
                className={inputClasses}
                placeholder="IT Technical Support · Company · Flutter Expert"
              />
            </div>

            <div>
              <label className={labelClasses}>
                <FileText className="w-4 h-4" /> Bio
              </label>
              <textarea
                value={form.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                rows={4}
                className={inputClasses}
                placeholder="Short bio about yourself"
              />
            </div>

            <div>
              <label className={labelClasses}>
                <Image className="w-4 h-4" /> Avatar
              </label>

              {/* Preview */}
              {(previewUrl || form.avatarUrl) && (
                <div className="mb-3">
                  <div className="w-16 h-16 rounded-xl border border-neutral-600 overflow-hidden">
                    <img
                      src={previewUrl || form.avatarUrl || ""}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* File Upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2.5 bg-neutral-700 hover:bg-neutral-600 rounded-xl text-sm transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  {selectedFile ? selectedFile.name : "Choose from device"}
                </button>
                {selectedFile && (
                  <button
                    type="button"
                    onClick={handleUpload}
                    disabled={uploading}
                    className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 rounded-xl text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                    Upload
                  </button>
                )}
              </div>

              {/* Or URL */}
              <p className="text-xs text-neutral-500 mb-1.5">Or paste image URL:</p>
              <input
                type="text"
                value={form.avatarUrl || ""}
                onChange={(e) => updateField("avatarUrl", e.target.value)}
                className={inputClasses}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateField("available", !form.available)}
                className="flex items-center gap-2 text-sm"
              >
                {form.available ? (
                  <ToggleRight className="w-6 h-6 text-rose-500" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-neutral-500" />
                )}
                <span className={form.available ? "text-rose-400" : "text-neutral-400"}>
                  Available Now
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-neutral-800/50 border border-neutral-700 rounded-2xl p-6 mb-6"
        >
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-rose-500" />
            Expertise / Skills
          </h2>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              className={inputClasses}
              placeholder="Add a skill (e.g. Flutter)"
            />
            <button
              onClick={addSkill}
              className="px-4 py-3 bg-neutral-700 hover:bg-neutral-600 rounded-xl transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {form.skills.map((skill) => (
              <motion.span
                key={skill}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-700 rounded-lg text-sm"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-neutral-400 hover:text-red-400 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-neutral-800/50 border border-neutral-700 rounded-2xl p-6 mb-6"
        >
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-rose-500" />
            Social Links
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { key: "linkedin", label: "LinkedIn" },
              { key: "github", label: "GitHub" },
              { key: "website", label: "Website" },
              { key: "facebook", label: "Facebook" },
              { key: "instagram", label: "Instagram" },
              { key: "email", label: "Email (mailto:)" },
              { key: "phone", label: "Phone (tel:)" },
              { key: "whatsapp", label: "WhatsApp" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label className={labelClasses}>{label}</label>
                <input
                  type="text"
                  value={(form.links[key as keyof typeof form.links] as string) || ""}
                  onChange={(e) => updateLink(key, e.target.value)}
                  className={inputClasses}
                  placeholder={`Enter ${label} URL`}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Save Button Bottom */}
        <div className="flex justify-end pb-8">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 rounded-xl font-bold text-base transition-all disabled:opacity-50 shadow-lg"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Save All Changes
          </button>
        </div>
      </div>
    </div>
  );
}
