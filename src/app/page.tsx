
// import Sidebar from "@/components/sidebar";
// import Topbar from "@/components/topbar";

// export default function Home() {
//   return (
//     <div className="min-h-screen overflow-x-hidden bg-gray-50">
//       <Sidebar />

//       {/* Main content: sidebar ke right mein */}
//       <div className="min-w-0 md:ml-64">
//         <Topbar />

//         <main className="min-w-0 p-4 sm:p-5 md:p-6 lg:p-8">
//           {/* Dashboard Heading */}
//           <div className="mb-6">
//             <p className="text-sm font-medium text-gray-500">
//               Dashboard / Overview
//             </p>

//             <h1 className="mt-2 text-2xl font-bold text-gray-900">
//               Dashboard Overview
//             </h1>

//             <p className="mt-1 text-sm text-gray-500">
//               Here is what is happening at your institution today.
//             </p>
//           </div>

//           {/* Welcome Banner */}
//           <section className="rounded-2xl border border-yellow-200 bg-yellow-100 p-6 md:p-8">
//             <p className="text-sm font-semibold text-gray-700">
//               Welcome to your workspace!
//             </p>

//             <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
//               Manage your institution with EduFlow ERP
//             </h2>

//             <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-700">
//               Manage admissions, attendance, student information,
//               fees, and institutional reports from one place.
//             </p>
//           </section>

//           {/* Statistics Cards */}
//           <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//             {[
//               { title: "Total Students", value: "1,250" },
//               { title: "Total Teachers", value: "85" },
//               { title: "Today's Attendance", value: "92%" },
//               { title: "Pending Fees", value: "₹2.4L" },
//             ].map((stat) => (
//               <div
//                 key={stat.title}
//                 className="min-w-0 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
//               >
//                 <p className="text-sm font-medium text-gray-500">
//                   {stat.title}
//                 </p>

//                 <p className="mt-3 text-3xl font-bold text-gray-900">
//                   {stat.value}
//                 </p>

//                 <div className="mt-3 h-1.5 w-14 rounded-full bg-yellow-400" />
//               </div>
//             ))}
//           </section>

//           {/* Quick Actions */}
//           <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
//             <h2 className="text-lg font-bold text-gray-900">
//               Quick Actions
//             </h2>

//             <p className="mt-1 text-sm text-gray-500">
//               Frequently used institution management tasks.
//             </p>

//             <div className="mt-5 flex flex-wrap gap-3">
//               {[
//                 "New Admission",
//                 "Mark Attendance",
//                 "Collect Fees",
//                 "View Students",
//               ].map((action) => (
//                 <button
//                   key={action}
//                   type="button"
//                   className="rounded-xl border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm font-semibold text-gray-800 transition hover:bg-yellow-400"
//                 >
//                   {action}
//                 </button>
//               ))}
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ArrowRight,
  Users,
  GraduationCap,
  CalendarCheck,
  Building2,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  Clock3,
  IndianRupee,
  ClipboardList,
} from "lucide-react";

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Attendance", href: "#attendance" },
  
  { label: "Teacher", href: "#teachers" },
  { label: "Department", href: "#departments" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const features = [
  {
    id: "attendance",
    title: "Smart Attendance",
    description:
      "Track daily attendance, monitor absences and review attendance records from one dashboard.",
    icon: CalendarCheck,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "attendance",
    title: "Attendance Records",
    description:
      "Manage attendance profiles, attendance details, documents and  records efficiently.",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "teachers",
    title: "Teacher Management",
    description:
      "Organize teacher information, assignments and department-wise staff records.",
    icon: GraduationCap,
    color: "bg-violet-50 text-violet-600",
  },
  {
    id: "departments",
    title: "Departments",
    description:
      "Create and manage departments, designations and institutional structures.",
    icon: Building2,
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: "reports",
    title: "Reports & Analytics",
    description:
      "Understand attendance and workforce information with clear summaries and reports.",
    icon: BarChart3,
    color: "bg-rose-50 text-rose-600",
  },
  {
    id: "security",
    title: "Secure Admin Access",
    description:
      "Keep user management and administrative operations restricted to authorized admins.",
    icon: ShieldCheck,
    color: "bg-teal-50 text-teal-600",
  },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleContact(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-800">
      {/* Navbar */}
     
      <header className="fixed inset-x-0 top-0 z-50 border-b border-yellow-200 bg-white/95 shadow-sm backdrop-blur">

        <nav className="mx-auto flex min-h-19 max-w-360 items-center justify-between gap-5 px-5 py-3 lg:px-10">
          {/* Left: Brand */}
          <a href="#overview" className="flex shrink-0 items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-white">
              <Building2 size={23} />
            </span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Edu <span className="text-yellow-400">Flow</span>
              <p className="text-sm text-yellow-400">
              Erp Management
            </p>
            </span>
            
          </a>

          {/* Center: Navigation */}
          <div className="hidden items-center gap-7 xl:flex 2xl:gap-7">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="whitespace-nowrap text-sm font-bold text-slate-600 transition hover:text-yellow-400"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right: Sign in */}
          <div className="hidden shrink-0 xl:block">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-yellow-400"
            >
              Sign In <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-slate-200 p-2 text-slate-700 xl:hidden"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </nav>

        {/* Responsive mobile navigation */}
        {menuOpen && (
          <div className="border-t border-slate-100 bg-white px-5 py-4 xl:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-yellow-50 hover:text-yellow-400"
                >
                  {item.label}
                </a>
              ))}
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-lg bg-yellow-600 px-4 py-3 text-center font-semibold text-white"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero / Overview */}
      <section
        id="overview"
        className="relative scroll-mt-24 overflow-hidden bg-linear-to-b from-emerald-50 via-white to-white"
      >
        <div className="pointer-events-none absolute -right-28 -top-20 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-2 lg:px-10 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-4 py-2 text-sm font-semibold text-yellow-400 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-yellow-400" />
              One platform. Smarter management.
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Manage Your Institution with{" "}
              <span className="text-yellow-400">EduFlow ERP</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Simplify attendance, employee records, teacher management and
              departments with one organized platform designed for modern
              institutions.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-yellow-400"
              >
                Get Started <ArrowRight size={18} />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:border-yellow-400 hover:text-yellw-400"
              >
                Explore Features
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-yellow-400" />
                Centralized records
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-yellow-400" />
                Admin-controlled access
              </span>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 rounded-4xl bg-emerald-100/70 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/80">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div>
                  <p className="font-bold text-slate-900">Admin Overview</p>
                  <p className="mt-1 text-xs text-slate-500">
                    EduFlow management dashboard
                  </p>
                </div>
                <span className="rounded-lg bg-emerald-50 p-2 text-yellow-400">
                  <BarChart3 size={21} />
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3">
                {[
                  {
                    label: "Employees",
                    value: "248",
                    icon: Users,
                    color: "text-blue-600 bg-blue-50",
                  },
                  {
                    label: "Teachers",
                    value: "36",
                    icon: GraduationCap,
                    color: "text-violet-600 bg-violet-50",
                  },
                  {
                    label: "Departments",
                    value: "12",
                    icon: Building2,
                    color: "text-amber-600 bg-amber-50",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="rounded-xl border border-slate-100 p-3"
                    >
                      <span
                        className={`inline-flex rounded-lg p-2 ${item.color}`}
                      >
                        <Icon size={18} />
                      </span>
                      <p className="mt-3 text-2xl font-bold text-slate-900">
                        {item.value}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="px-4 pb-4">
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-800">
                        Attendance Summary
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Sample dashboard visualization
                      </p>
                    </div>
                    <CalendarCheck className="text-yellow-400" size={23} />
                  </div>

                  <div className="mt-5 flex h-28 items-end gap-3">
                    {[55, 75, 62, 88, 70, 96, 80].map((height, index) => (
                      <div
                        key={index}
                        className="flex flex-1 flex-col items-center gap-2"
                      >
                        <div
                          className="w-full rounded-t-md bg-yellow-400"
                          style={{ height: `${height}%` }}
                        />
                        <span className="text-[10px] text-slate-500">
                          {["M", "T", "W", "T", "F", "S", "S"][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-slate-100 bg-white px-5 py-4">
                <span className="rounded-full bg-emerald-100 p-2 text-emerald-700">
                  <ShieldCheck size={19} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Centralized administration
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Manage access and records in one place
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -left-5 top-1/3 hidden items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 shadow-lg sm:flex">
              <span className="rounded-lg bg-emerald-50 p-2 text-yellow-400">
                <Clock3 size={20} />
              </span>
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Daily operations
                </p>
                <p className="text-[11px] text-slate-500">
                  One organized workspace
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary strip */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 sm:grid-cols-4 lg:px-10">
          {[
            { value: "01", label: "Centralized Platform" },
            { value: "24/7", label: "Access to Your Workspace" },
            { value: "360°", label: "Management Overview" },
            { value: "1", label: "Unified Admin Workspace" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-2xl font-extrabold text-yellow-400">
                {item.value}
              </p>
              <p className="mt-2 text-xs font-medium text-slate-500 sm:text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-400">
              Everything in one place
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Powerful Features for Your ERP
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Reduce manual work and keep your institution&apos;s operations
              organized with dedicated management modules.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  id={feature.id}
                  key={feature.title}
                  className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-400 hover:shadow-xl hover:shadow-white-300"
                >
                  <span className={`inline-flex rounded-xl p-3 ${feature.color}`}>
                    <Icon size={24} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {feature.description}
                  </p>
                  <a
                    href="#contact"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-yellow-400 hover:text-yellow-400"
                  >
                    Learn more <ArrowRight size={16} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Attendance section */}
      <section className="scroll-mt-24 bg-slate-50 px-5 py-20 lg:px-10" id="attendance">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-400">
              Attendance & tracking
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Keep Attendance Organized and Accessible
            </h2>
            <p className="mt-5 leading-8 text-slate-600">
              Review daily records, identify absences and keep attendance
              information together instead of relying on disconnected
              spreadsheets.
            </p>
            <ul className="mt-6 space-y-4">
              {[
                "Daily attendance records",
                "Attendance summaries and reports",
                "Quick access to employee information",
                "Clear visibility into attendance status",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-yellow-400"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900">
                  Attendance Activity
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Illustrative weekly overview
                </p>
              </div>
              <CalendarCheck className="text-yellow-400" size={26} />
            </div>

            <div className="mt-7 space-y-5">
              {[
                { day: "Monday", value: 92 },
                { day: "Tuesday", value: 86 },
                { day: "Wednesday", value: 95 },
                { day: "Thursday", value: 82 },
                { day: "Friday", value: 89 },
              ].map((item) => (
                <div key={item.day}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-slate-600">
                      {item.day}
                    </span>
                    <span className="font-bold text-slate-800">
                      {item.value}%
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-yellow-400"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-800">
              Sample figures for design preview only. Live values require
              connected attendance records.
            </p>
          </div>
        </div>
      </section>

      {/* Management modules */}
      <section className="px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-400">
              Connected operations
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Built Around Your Institution
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Bring your teams, departments and administrative workflows into
              one structured system.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-purple-100 p-7">
              <Users size={30} className="text-yellow-400" />
              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Attendance Records
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Keep attendance profiles, contact information and attendance
                details organized.
              </p>
              <a
                id="employees"
                href="#contact"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-purple-500"
              >
                Explore management <ArrowRight size={16} />
              </a>
            </div>

            <div className="rounded-2xl bg-blue-50 p-7">
              <GraduationCap size={30} className="text-blue-700" />
              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Teacher Management
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Organize teacher details and connect staff information with
                departmental workflows.
              </p>
              <a
                id="teachers"
                href="#contact"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-700"
              >
                Explore management <ArrowRight size={16} />
              </a>
            </div>

            <div className="rounded-2xl bg-amber-50 p-7">
              <Building2 size={30} className="text-amber-700" />
              <h3 className="mt-5 text-xl font-bold text-slate-900">
                Department Management
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Structure departments and designations so administrative
                records stay consistent.
              </p>
              <a
                id="departments"
                href="#contact"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-amber-700"
              >
                Explore management <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-24 bg-slate-50 px-5 py-20 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-yellow-400">
              Pricing
            </span>
            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              A Plan That Fits Your Institution
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Discuss your requirements and get a plan suited to your
              institution&apos;s size and workflows.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-emerald-200 bg-white p-8 shadow-xl shadow-emerald-900/5">
            <span className="inline-flex rounded-full bg-yellow-50 px-3 py-1 text-xs font-bold text-emerald-700">
              CUSTOM PLAN
            </span>
            <h3 className="mt-5 text-2xl font-extrabold text-slate-900">
              EduFlow ERP
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              A tailored solution based on your users, modules and
              implementation requirements.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <IndianRupee size={25} className="text-emerald-600" />
              <span className="text-2xl font-extrabold text-slate-900">
                Request a quote
              </span>
            </div>
            <ul className="mt-7 space-y-4">
              {[
                "Employee and teacher management",
                "Attendance and department modules",
                "Admin workspace and reporting",
                "Implementation based on requirements",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-sm text-slate-600">
                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-emerald-600"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-300 px-5 py-3.5 font-semibold text-white transition hover:bg-yellow-400"
            >
              Contact for Pricing <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 px-5 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600">
              Contact us
            </span>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Ready to Organize Your ERP Operations?
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              Tell us about your institution and the modules you need. Our
              team can use those details to understand your requirements.
            </p>
            <div className="mt-7 flex items-start gap-3">
              <span className="rounded-xl bg-yellow-50 p-3 text-yellow-300">
                <ClipboardList size={22} />
              </span>
              <div>
                <p className="font-semibold text-slate-900">
                  Discuss your requirements
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Employee management, attendance, teachers and departments.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleContact}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8"
          >
            <h3 className="text-xl font-bold text-slate-900">
              Request Information
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Enter your email to register your interest.
            </p>
            <label
              htmlFor="contact-email"
              className="mt-6 block text-sm font-semibold text-slate-700"
            >
              Work email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setSubmitted(false);
              }}
              placeholder="you@institution.com"
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            />
            <button
              type="submit"
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-400 px-5 py-3.5 font-semibold text-white transition hover:bg-yellow-300 cursor-pointer"
            >
              Submit Interest <ArrowRight size={17} />
            </button>
            {submitted && (
              <p
                role="status"
                className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800"
              >
                Thank you! This is a frontend demo. Connect an API to save your
                enquiry.
              </p>
            )}
          </form>
        </div>
      </section>

      
{/* Professional Footer */}
<footer className="bg-gray-800 px-5 py-12 text-white lg:px-10">
  <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">

    {/* Brand */}
    <div>
      <a href="#overview" className="flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400 text-slate-950">
          <Building2 size={23} />
        </span>
        <span className="text-xl font-extrabold tracking-tight">
          EduFlow <span className="text-yellow-400">ERP</span>
        </span>
      </a>

      <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
        A smarter way to manage attendance, employees, teachers and
        institutional operations in one place.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="font-bold text-white">Quick Links</h3>
      <div className="mt-5 flex flex-col gap-3">
        {[
          ["Overview", "#overview"],
          ["Attendance", "#attendance"],
          ["Teacher", "#teachers"],
          ["Department", "#departments"],
        ].map(([label, href]) => (
          <a
            key={label}
            href={href}
            className="w-fit text-sm text-slate-400 transition hover:text-yellow-400"
          >
            {label}
          </a>
        ))}
      </div>
    </div>

    {/* Resources */}
    <div>
      <h3 className="font-bold text-white">Explore</h3>
      <div className="mt-5 flex flex-col gap-3">
        <a
          href="#features"
          className="w-fit text-sm text-slate-400 transition hover:text-yellow-400"
        >
          ERP Features
        </a>
        <a
          href="#pricing"
          className="w-fit text-sm text-slate-400 transition hover:text-yellow-400"
        >
          Pricing
        </a>
        <a
          href="#contact"
          className="w-fit text-sm text-slate-400 transition hover:text-yellow-400"
        >
          Contact Us
        </a>
        <Link
          href="/login"
          className="w-fit text-sm text-slate-400 transition hover:text-yellow-400"
        >
          Admin Sign In
        </Link>
      </div>
    </div>

    {/* Contact CTA */}
    <div>
      <h3 className="font-bold text-white">Get Started</h3>
      <p className="mt-5 text-sm leading-7 text-slate-400">
        Discover how EduFlow ERP can simplify your daily operations.
      </p>
      <a
        href="#contact"
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-yellow-400 px-4 py-3 text-sm font-bold text-slate-950 transition hover:bg-yellow-300"
      >
        Contact Our Team <ArrowRight size={16} />
      </a>
    </div>
  </div>

  {/* Copyright */}
  <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
    <p>
      © 2026 EduFlow ERP. All rights reserved.
    </p>
    <p className="text-slate-400">
      Designed for smarter institutional management.
    </p>
  </div>
</footer>

    </main>
  );
}


