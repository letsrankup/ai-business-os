"use client";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ProposalForm from "@/components/ProposalForm";

export default function ProposalPage() {
  return (
    <div className="flex h-screen bg-[#0a0a0f] text-white font-mono overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-6 space-y-8">
          <div>
            <h1 className="text-3xl font-bold">Proposal <span className="text-[#f5a000]">Generator</span></h1>
            <p className="text-gray-400 mt-1 text-sm">Create professional client proposals in seconds</p>
          </div>
          <ProposalForm />
        </main>
      </div>
    </div>
  );
}
