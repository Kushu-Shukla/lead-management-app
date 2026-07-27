"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Lead = {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
  assignedTo: { name: string } | null;
};

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated") {
      fetchLeads();
    }
  }, [status, router]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/leads");
      if (res.ok) {
        const json = await res.json();
        setLeads(json.data);
      }
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading" || loading) {
    return <div className="p-8 text-center text-slate-500">Loading...</div>;
  }

  if (!session) return null;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Lead Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Logged in as {session.user.name} ({session.user.role})</p>
        </div>
        <button 
          onClick={() => signOut()}
          className="text-sm text-slate-600 hover:text-slate-900 border border-slate-300 px-4 py-2 rounded-lg"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Email</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Assigned To</th>
              <th className="px-6 py-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{lead.name}</td>
                <td className="px-6 py-4 text-slate-600">{lead.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium
                    ${lead.status === 'NEW' ? 'bg-blue-100 text-blue-700' : 
                      lead.status === 'QUALIFIED' ? 'bg-green-100 text-green-700' : 
                      'bg-slate-100 text-slate-700'}`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">{lead.assignedTo?.name || "Unassigned"}</td>
                <td className="px-6 py-4 text-slate-500">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
