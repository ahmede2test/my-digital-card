"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, X } from "lucide-react";

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

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/profile");
        const data = await res.json();
        if (data.profile) {
          setProfile(data.profile);
        } else {
          await fetch("/api/profile/seed", { method: "POST" });
          const res2 = await fetch("/api/profile");
          const data2 = await res2.json();
          setProfile(data2.profile);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center text-neutral-600">
        No profile found.
      </div>
    );
  }

  const avatarSrc = profile.avatarUrl || "/avatar.jpg";

  const socialLinks = [
    { icon: LinkedinIcon, url: profile.links.linkedin, color: "text-[#0077b5]", label: "LinkedIn" },
    { icon: GithubIcon, url: profile.links.github, color: "text-neutral-800", label: "GitHub" },
    { icon: GlobeIcon, url: profile.links.website, color: "text-sky-500", label: "Website" },
    { icon: FacebookIcon, url: profile.links.facebook, color: "text-[#1877F2]", label: "Facebook" },
    { icon: InstagramIcon, url: profile.links.instagram, color: "text-[#E4405F]", label: "Instagram" },
    { icon: EmailIcon, url: profile.links.email, color: "text-rose-500", label: "Email" },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center py-6 px-4">
      {/* Header */}
      <div className="w-full max-w-md flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
          Digital Business Card
        </span>
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${profile.available ? "bg-rose-500" : "bg-neutral-400"}`} />
          <span className="text-[10px] font-bold tracking-[0.15em] text-rose-500 uppercase">
            Available Now
          </span>
        </div>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-neutral-200/80 overflow-hidden"
      >
        {/* Top accent line */}
        <div className="h-1 bg-rose-500 w-full" />

        <div className="p-6 pt-5">
          {/* Profile Header */}
          <div className="flex items-start gap-4 mb-5">
            {/* Avatar - clickable */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowImageModal(true)}
              className="relative shrink-0 cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full p-[3px] bg-rose-500">
                <div className="w-full h-full rounded-full bg-white overflow-hidden">
                  <img
                    src={avatarSrc}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Online indicator */}
              <div className="absolute bottom-0 left-0 w-5 h-5 bg-emerald-500 rounded-full border-[2.5px] border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            </motion.button>

            {/* Name & Info */}
            <div className="flex-1 pt-1">
              <h1 className="text-xl font-bold text-neutral-900 leading-tight">
                {profile.name}{" "}
                <span className="text-rose-500">{profile.nameHighlight}</span>
              </h1>
              {profile.badge && (
                <div className="mt-2 inline-flex items-center gap-1.5 bg-neutral-900 text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                  {profile.badge}
                </div>
              )}
              <p className="mt-2 text-xs text-neutral-500 leading-relaxed">
                {profile.subtitle}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-neutral-200" />
            <div className="w-6 h-0.5 bg-rose-500 rounded-full" />
            <div className="h-px flex-1 bg-neutral-200" />
          </div>

          {/* Bio */}
          <div className="mb-7">
            <div className="relative overflow-hidden rounded-2xl border border-neutral-100 bg-gradient-to-br from-neutral-50 via-white to-white px-4 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full bg-rose-500" />
              <p className="pl-3 text-[14px] leading-[1.9] text-neutral-600 text-left font-normal tracking-[0.01em]">
                {profile.bio}
              </p>
            </div>
          </div>

          {/* Expertise */}
          <div className="mb-6">
            <h2 className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase mb-3">
              Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-neutral-200 rounded-lg text-xs text-neutral-700 font-medium"
                >
                  <span className="w-1 h-1 bg-rose-400 rounded-full" />
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div className="mb-6">
            <h2 className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase mb-3">
              Connect
            </h2>
            <div className="flex justify-between">
              {socialLinks.map(({ icon: Icon, url, color, label }) => (
                <a
                  key={label}
                  href={url || "#"}
                  target={url ? "_blank" : undefined}
                  rel={url ? "noopener noreferrer" : undefined}
                  onClick={(e) => !url && e.preventDefault()}
                  className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all bg-white ${
                    url
                      ? "border-neutral-200 hover:border-rose-300 hover:shadow-sm cursor-pointer"
                      : "border-neutral-100 opacity-40 cursor-not-allowed"
                  }`}
                  title={url ? label : `${label} (not set)`}
                >
                  <Icon className={`w-[18px] h-[18px] ${color}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Direct Contact */}
          <div className="mb-2">
            <h2 className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase mb-3">
              Direct Contact
            </h2>
            <div className="flex gap-3">
              {profile.links.phone && (
                <a
                  href={profile.links.phone}
                  className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 text-white text-xs font-bold tracking-wider uppercase py-3 rounded-xl hover:bg-neutral-800 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </a>
              )}
              {profile.links.whatsapp && (
                <a
                  href={profile.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white border border-neutral-200 text-emerald-500 text-xs font-bold tracking-wider uppercase py-3 rounded-xl hover:border-emerald-300 hover:shadow-sm transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-neutral-50 border-t border-neutral-100 py-3 px-6">
          <p className="text-center text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase">
            {profile.name} &bull; {new Date().getFullYear()} &bull; Digital Card
          </p>
        </div>
      </motion.div>

      {/* Admin Link */}
      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        href="/admin"
        className="mt-4 text-[10px] text-neutral-400 hover:text-rose-500 transition-colors tracking-wider uppercase font-medium"
      >
        Admin Panel
      </motion.a>

      {/* Image Modal */}
      <AnimatePresence>
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-3xl p-1.5 bg-gradient-to-br from-rose-500 to-rose-600 shadow-2xl">
                <div className="w-full h-full rounded-[1.35rem] overflow-hidden bg-white">
                  <img
                    src={avatarSrc}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <p className="text-center text-white text-sm font-medium mt-4">
                {profile.name} {profile.nameHighlight}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
