'use client';

import React, { useState } from 'react';
import { AdminInquiry } from '@/data/mock-inquiries';
import {
  MessageSquare,
  Search,
  Filter,
  Send,
  Phone,
  Mail,
  Calendar,
  Car,
  Clock,
  CheckCircle2,
  AlertCircle,
  Tag,
  Building2,
  UserCheck,
} from 'lucide-react';

interface AdminInquiryListProps {
  inquiries: AdminInquiry[];
  onStatusChange: (id: string, newStatus: AdminInquiry['status']) => void;
}

export default function AdminInquiryList({
  inquiries,
  onStatusChange,
}: AdminInquiryListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredInquiries = inquiries.filter((inq) => {
    const matchSearch =
      inq.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.carName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.message.toLowerCase().includes(searchQuery.toLowerCase());

    const matchStatus = statusFilter === 'all' || inq.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const getStatusBadge = (status: AdminInquiry['status']) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            <span>Pesan Baru</span>
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Clock className="w-3 h-3" />
            <span>Sudah Dihubungi</span>
          </span>
        );
      case 'scheduled_test_drive':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-sky-500/20 text-sky-300 border border-sky-500/40">
            <Calendar className="w-3 h-3" />
            <span>Jadwal Test Drive</span>
          </span>
        );
      case 'deal_closed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            <CheckCircle2 className="w-3 h-3" />
            <span>Deal Selesai (Sold)</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-800 text-slate-400 border border-slate-700">
            <span>Batal / Arsip</span>
          </span>
        );
    }
  };

  const countNew = inquiries.filter((i) => i.status === 'new').length;
  const countContacted = inquiries.filter((i) => i.status === 'contacted').length;
  const countScheduled = inquiries.filter((i) => i.status === 'scheduled_test_drive').length;

  return (
    <div className="space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <span>Pusat Pertanyaan & Inquiry Calon Pembeli</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Total {inquiries.length} pesan masuk • {countNew} baru • {countContacted} dalam proses • {countScheduled} jadwal test drive
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama, mobil, telp..."
              className="pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors w-52 sm:w-60"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors font-semibold"
          >
            <option value="all">Semua Status ({inquiries.length})</option>
            <option value="new">Pesan Baru ({countNew})</option>
            <option value="contacted">Sudah Dihubungi ({countContacted})</option>
            <option value="scheduled_test_drive">Jadwal Test Drive ({countScheduled})</option>
            <option value="deal_closed">Deal Selesai</option>
          </select>
        </div>
      </div>

      {/* Inquiry List Cards */}
      <div className="space-y-4">
        {filteredInquiries.length > 0 ? (
          filteredInquiries.map((inq) => {
            const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
            const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              `Halo ${inq.customerName}, kami dari Apex Auto Singapore menindaklanjuti pesan Anda terkait unit ${inq.carName}. Apakah masih ada informasi spesifikasi atau jadwal test drive yang ingin dikoordinasikan?`
            )}`;

            return (
              <div
                key={inq.id}
                className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-4 hover:border-slate-700 transition-colors shadow-lg"
              >
                {/* Card Top: Customer Info & Status Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-base border border-amber-500/20">
                      {inq.customerName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-white">{inq.customerName}</span>
                        {getStatusBadge(inq.status)}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span className="flex items-center gap-1 font-mono text-slate-300">
                          <Phone className="w-3 h-3 text-slate-500" />
                          {inq.phone}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-500" />
                          {inq.email}
                        </span>
                        <span>•</span>
                        <span className="text-amber-400/90 font-mono">
                          {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })},{' '}
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
                    <select
                      value={inq.status}
                      onChange={(e) => onStatusChange(inq.id, e.target.value as AdminInquiry['status'])}
                      className="py-1.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-semibold focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                    >
                      <option value="new">Tandai: Baru</option>
                      <option value="contacted">Tandai: Dihubungi</option>
                      <option value="scheduled_test_drive">Tandai: Jadwal Test Drive</option>
                      <option value="deal_closed">Tandai: Deal Selesai</option>
                      <option value="cancelled">Tandai: Batal</option>
                    </select>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => inq.status === 'new' && onStatusChange(inq.id, 'contacted')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Chat WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Message Quote Block */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="text-amber-400 font-bold flex items-center gap-1.5">
                      <Car className="w-4 h-4" />
                      <span>Unit Diminati: {inq.carName} (S${inq.carPriceSGD?.toLocaleString('en-US') || 'Nett'})</span>
                    </div>
                    {inq.branch && (
                      <div className="text-slate-400 flex items-center gap-1 text-[11px]">
                        <Building2 className="w-3 h-3 text-slate-500" />
                        <span>{inq.branch}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{inq.message}"
                  </p>
                </div>

                {/* Additional Metadata Footnote */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 pt-1 border-t border-slate-850">
                  <div className="flex items-center gap-3">
                    {inq.tradeInCar && inq.tradeInCar !== 'None' && (
                      <span className="inline-flex items-center gap-1 text-slate-300">
                        <Tag className="w-3 h-3 text-amber-500" />
                        Trade-In: <strong className="text-white">{inq.tradeInCar}</strong>
                      </span>
                    )}
                    {inq.loanType && (
                      <span className="text-slate-300">
                        Loan: <strong className="text-amber-400 uppercase font-mono">{inq.loanType.replace('_', ' ')}</strong>
                      </span>
                    )}
                  </div>
                  {inq.salesAssigned && (
                    <div className="flex items-center gap-1 text-slate-400">
                      <UserCheck className="w-3 h-3 text-emerald-400" />
                      <span>PIC Sales: <strong className="text-slate-200">{inq.salesAssigned}</strong></span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center bg-slate-900/40 rounded-3xl border border-slate-800 space-y-2">
            <MessageSquare className="w-8 h-8 text-slate-600 mx-auto" />
            <div className="text-sm font-semibold text-white">Tidak ada pesan inquiry ditemukan</div>
            <p className="text-xs text-slate-400">Coba ubah kata kunci pencarian atau filter status inquiry.</p>
          </div>
        )}
      </div>
    </div>
  );
}
