"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft, Search, Plus, School, Layers, GraduationCap,
  Pencil, Trash2, X, ChevronDown, RefreshCw,
} from "lucide-react";

type ApiList<T> = T[] | { results?: T[]; count?: number };
type AcademicYear = {
  id: number; name: string; institution_type: "school" | "college";
  start_date: string; end_date: string; is_current: boolean;
};
type ApiClass = {
  id: number; name: string; institution_type: "school" | "college";
  academic_year: number; program: number | null; level: string;
  is_active: boolean;
};
type ApiSection = {
  id: number; name: string; class_group: number; class_teacher: number | null;
};
type SchoolClass = ApiClass & {
  academicYearName: string; sections: ApiSection[];
};

type ClassForm = {
  name: string; institution_type: "school" | "college";
  academic_year: string; level: string; sections: string; is_active: boolean;
};

const emptyForm: ClassForm = {
  name: "", institution_type: "school", academic_year: "",
  level: "", sections: "A, B", is_active: true,
};
const API = "/api/academics";

async function readList<T>(url: string): Promise<T[]> {
  const response = await fetch(url, { cache: "no-store" });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.detail || `Request failed (${response.status})`);
  }
  if (Array.isArray(data)) return data as T[];
  return ((data as ApiList<T>)?.results ?? []) as T[];
}

async function send<T>(url: string, method: string, body?: unknown): Promise<T | null> {
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    const message = data?.detail || Object.entries(data || {})
      .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : String(value)}`)
      .join("; ") || `Request failed (${response.status})`;
    throw new Error(message);
  }
  return data as T | null;
}

function parseSections(value: string) {
  return [...new Set(value.split(",").map((part) => part.trim().toUpperCase()).filter(Boolean))];
}

export default function ClassesPage() {
  const router = useRouter();
  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [years, setYears] = useState<AcademicYear[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<ClassForm>(emptyForm);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageError, setPageError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setPageError("");
    try {
      const [classRows, sectionRows, yearRows] = await Promise.all([
        readList<ApiClass>(`${API}/classes/`),
        readList<ApiSection>(`${API}/sections/`),
        readList<AcademicYear>(`${API}/academic-years/`),
      ]);
      setYears(yearRows);
      setClasses(classRows.map((item) => ({
        ...item,
        academicYearName: yearRows.find((year) => year.id === item.academic_year)?.name ?? `Academic year #${item.academic_year}`,
        sections: sectionRows.filter((section) => section.class_group === item.id),
      })));
    } catch (err) {
      setPageError(err instanceof Error ? err.message : "Could not load classes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadData(); }, [loadData]);

  const filteredClasses = useMemo(() => classes.filter((item) => {
    const text = `${item.name} ${item.level} ${item.institution_type} ${item.academicYearName} ${item.sections.map((s) => s.name).join(" ")}`;
    return text.toLowerCase().includes(search.toLowerCase().trim());
  }), [classes, search]);

  const totalSections = classes.reduce((sum, item) => sum + item.sections.length, 0);

  function openCreate() {
    setEditingId(null);
    const defaultYear = years.find((year) => year.is_current) ?? years[0];
    setForm({ ...emptyForm, academic_year: defaultYear ? String(defaultYear.id) : "" });
    setError("");
    setModalOpen(true);
  }

  function openEdit(item: SchoolClass) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      institution_type: item.institution_type,
      academic_year: String(item.academic_year),
      level: item.level,
      sections: item.sections.map((section) => section.name).join(", "),
      is_active: item.is_active,
    });
    setError("");
    setModalOpen(true);
  }

  async function saveClass(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const name = form.name.trim();
    const sectionNames = parseSections(form.sections);
    if (!name || !form.academic_year || sectionNames.length === 0) {
      setError("Enter a class name, select an academic year, and add at least one section.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        name,
        institution_type: form.institution_type,
        academic_year: Number(form.academic_year),
        program: null,
        level: form.level.trim(),
        is_active: form.is_active,
      };
      let classId = editingId;
      if (editingId === null) {
        const created = await send<ApiClass>(`${API}/classes/`, "POST", payload);
        if (!created) throw new Error("The backend did not return the created class.");
        classId = created.id;
      } else {
        await send(`${API}/classes/${editingId}/`, "PATCH", payload);
      }

      const existingSections = classes.find((item) => item.id === classId)?.sections ?? [];
      const existingNames = new Set(existingSections.map((section) => section.name.toUpperCase()));
      for (const sectionName of sectionNames) {
        if (!existingNames.has(sectionName)) {
          await send(`${API}/sections/`, "POST", { name: sectionName, class_group: classId, class_teacher: null });
        }
      }
      for (const section of existingSections) {
        if (!sectionNames.includes(section.name.toUpperCase())) {
          await send(`${API}/sections/${section.id}/`, "DELETE");
        }
      }
      setModalOpen(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the class.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteClass() {
    if (deleteId === null) return;
    setError("");
    try {
      await send(`${API}/classes/${deleteId}/`, "DELETE");
      if (selectedClass?.id === deleteId) setSelectedClass(null);
      setDeleteId(null);
      await loadData();
    } catch (err) {
      setPageError(err instanceof Error ? err.message : "Could not delete this class.");
      setDeleteId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <button onClick={() => router.back()} aria-label="Go back" className="mt-1 flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-2.5 hover:bg-slate-50"><ArrowLeft size={19} />Back</button>
            <div><h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Class &amp; Section</h1><p className="mt-1 text-sm text-slate-500">Manage classes, sections and academic years.</p></div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => void loadData()} className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50"><RefreshCw size={16} />Refresh</button>
            <button onClick={openCreate} className="flex items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-slate-900 hover:bg-amber-300"><Plus size={18} />Add Class</button>
          </div>
        </div>

        {pageError && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{pageError} <button onClick={() => void loadData()} className="ml-2 font-bold underline">Try again</button></div>}
        {!loading && years.length === 0 && <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">No academic years exist yet. Add an academic year in Django Admin before creating classes.</div>}

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Metric title="Total Classes" value={classes.length} icon={<School size={21} />} />
          <Metric title="Total Sections" value={totalSections} icon={<Layers size={21} />} />
          <Metric title="Academic Years" value={years.length} icon={<GraduationCap size={21} />} />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="relative max-w-lg"><Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search class, section, or academic year..." className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-3 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100" /></div>
          <p className="mt-3 text-xs text-slate-500">Showing {filteredClasses.length} of {classes.length} classes</p>
        </section>

        {loading ? <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">Loading classes from EduFlow backend…</div> : <section className="grid gap-5 lg:grid-cols-2">
          {filteredClasses.map((item) => <article key={item.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6">
            <div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-800"><GraduationCap size={24} /></div><div><h2 className="text-lg font-bold text-slate-900">{item.name}</h2><p className="text-sm text-slate-500">{item.institution_type === "school" ? "School" : "College"} · {item.academicYearName}</p></div></div><div className="flex gap-1"><button onClick={() => openEdit(item)} aria-label={`Edit ${item.name}`} className="rounded-lg border border-slate-200 p-2 hover:bg-amber-50"><Pencil size={16} /></button><button onClick={() => setDeleteId(item.id)} aria-label={`Delete ${item.name}`} className="rounded-lg border border-slate-200 p-2 text-red-600 hover:bg-red-50"><Trash2 size={16} /></button></div></div>
            <div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Sections</p><p className="mt-1 text-xl font-bold">{item.sections.length}</p></div><div className="rounded-xl bg-slate-50 p-3"><p className="text-xs text-slate-500">Status</p><p className="mt-1 text-xl font-bold">{item.is_active ? "Active" : "Inactive"}</p></div></div>
            {item.level && <p className="mt-4 text-sm"><span className="text-slate-500">Level: </span><strong>{item.level}</strong></p>}
            <div className="mt-5"><p className="mb-2 text-sm font-semibold text-slate-700">Sections</p><div className="flex flex-wrap gap-2">{item.sections.map((section) => <button key={section.id} onClick={() => setSelectedClass(item)} className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100">Section {section.name}</button>)}{item.sections.length === 0 && <span className="text-sm text-slate-400">No sections added</span>}</div></div>
            <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4"><div><p className="text-xs text-slate-500">Class teacher</p><p className="mt-1 text-sm font-semibold text-slate-800">{item.sections.find((section) => section.class_teacher !== null)?.class_teacher ? `User #${item.sections.find((section) => section.class_teacher !== null)?.class_teacher}` : "Not assigned"}</p></div><button onClick={() => setSelectedClass(item)} className="flex items-center gap-1 text-sm font-semibold text-amber-700 hover:text-amber-900">View details <ChevronDown size={16} /></button></div>
          </article>)}
        </section>}
        {!loading && filteredClasses.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center"><School className="mx-auto text-slate-400" size={32} /><p className="mt-3 font-semibold">No classes found</p><p className="mt-1 text-sm text-slate-500">Try a different search or add a class.</p></div>}
      </div>

      {modalOpen && <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4"><form onSubmit={saveClass} className="my-auto w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between"><h2 className="text-xl font-bold text-slate-900">{editingId !== null ? "Edit Class" : "Add New Class"}</h2><button type="button" onClick={() => setModalOpen(false)} aria-label="Close" className="rounded-lg p-2 hover:bg-slate-100"><X size={19} /></button></div>
        <Field label="Class Name"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Class 8 or BCA" className={inputStyle} /></Field>
        <Field label="Institution Type"><select value={form.institution_type} onChange={(e) => setForm({ ...form, institution_type: e.target.value as ClassForm["institution_type"] })} className={inputStyle}><option value="school">School</option><option value="college">College</option></select></Field>
        <Field label="Academic Year"><select required value={form.academic_year} onChange={(e) => setForm({ ...form, academic_year: e.target.value })} className={inputStyle}><option value="">Select academic year</option>{years.filter((year) => year.institution_type === form.institution_type).map((year) => <option key={year.id} value={year.id}>{year.name}{year.is_current ? " (Current)" : ""}</option>)}</select></Field>
        <Field label="Level (optional)"><input value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} placeholder="e.g. Grade 8, Semester 2, Year 1" className={inputStyle} /></Field>
        <Field label="Sections (comma separated)"><input required value={form.sections} onChange={(e) => setForm({ ...form, sections: e.target.value })} placeholder="A, B, C" className={inputStyle} /><span className="mt-1 block text-xs text-slate-500">New sections will be saved to the Sections API.</span></Field>
        <label className="flex items-center gap-2 text-sm font-medium"><input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />Active class</label>
        {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-4"><button type="button" onClick={() => setModalOpen(false)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50">Cancel</button><button disabled={saving || years.filter((year) => year.institution_type === form.institution_type).length === 0} type="submit" className="rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-bold text-slate-900 hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60">{saving ? "Saving…" : "Save Class"}</button></div>
      </form></div>}

      {selectedClass && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"><div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">{selectedClass.name} Details</h2><button onClick={() => setSelectedClass(null)} aria-label="Close details" className="rounded-lg p-2 hover:bg-slate-100"><X size={19} /></button></div><div className="mt-5 space-y-4 text-sm"><p><span className="text-slate-500">Institution: </span><strong>{selectedClass.institution_type}</strong></p><p><span className="text-slate-500">Academic year: </span><strong>{selectedClass.academicYearName}</strong></p><p><span className="text-slate-500">Level: </span><strong>{selectedClass.level || "Not specified"}</strong></p><p><span className="text-slate-500">Class teacher: </span><strong>{selectedClass.sections.find((section) => section.class_teacher !== null)?.class_teacher ? `User #${selectedClass.sections.find((section) => section.class_teacher !== null)?.class_teacher}` : "Not assigned"}</strong></p><div><p className="mb-2 text-slate-500">Sections</p>{selectedClass.sections.map((section) => <div key={section.id} className="mb-2 flex items-center justify-between rounded-lg bg-slate-50 p-3"><span>Section {section.name}</span><span className="font-semibold">{section.class_teacher ? `Teacher #${section.class_teacher}` : "No teacher assigned"}</span></div>)}{selectedClass.sections.length === 0 && <p>No sections added.</p>}</div></div><button onClick={() => setSelectedClass(null)} className="mt-5 w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800">Close</button></div></div>}

      {deleteId !== null && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"><div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"><h2 className="text-lg font-bold">Delete this class?</h2><p className="mt-2 text-sm leading-6 text-slate-500">This sends a delete request to the Django backend. If student records depend on this class, the backend may prevent deletion.</p><div className="mt-5 flex justify-end gap-3"><button onClick={() => setDeleteId(null)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold">Cancel</button><button onClick={() => void deleteClass()} className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Delete</button></div></div></div>}
    </main>
  );
}

const inputStyle = "w-full rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100";
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</span>{children}</label>; }
function Metric({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) { return <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div><p className="text-sm text-slate-500">{title}</p><p className="mt-2 text-3xl font-bold text-slate-900">{value}</p></div><div className="rounded-xl bg-amber-100 p-3 text-amber-800">{icon}</div></div>; }
