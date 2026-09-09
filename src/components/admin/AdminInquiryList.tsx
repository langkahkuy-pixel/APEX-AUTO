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
  ExternalLink,
  Sparkles,
  X,
  FileText,
} from 'lucide-react';

interface AdminInquiryListProps {
  inquiries: AdminInquiry[];
  onStatusChange: (id: string, newStatus: AdminInquiry['status']) => void;
}

interface QuickTemplate {
  id: string;
  title: string;
  description: string;
  generateText: (inq: AdminInquiry) => string;
}

const TEMPLATES: QuickTemplate[] = [
  {
    id: 'general_followup',
    title: 'Konfirmasi Ketersediaan & COE Ready',
    description: 'Menyapa ramah, konfirmasi unit ready stock di showroom, dan kesiapan dokumen COE.',
    generateText: (inq) =>
      `Halo ${inq.customerName},\n\nTerima kasih telah menghubungi Apex Auto Singapore.\n\nUnit ${inq.carName} (S$${inq.carPriceSGD.toLocaleString('en-US')}) saat ini berstatus READY STOCK di showroom kami (${inq.branch || 'Leng Kee Flagship'}). Dokumen COE & sertifikasi inspeksi 160-titik STA Grade A lengkap siap dicek.\n\nApakah Anda berencana test drive akhir pekan ini?`,
  },
  {
    id: 'test_drive_booking',
    title: 'Jadwal Test Drive Resmi Showroom',
    description: 'Mengajak calon pembeli menentukan waktu dan cabang untuk test drive unit.',
    generateText: (inq) =>
      `Halo ${inq.customerName},\n\nKami siap mengatur sesi VIP Test Drive untuk unit ${inq.carName}.\n\nLokasi Hub: ${inq.branch || 'Apex Auto Flagship @ Leng Kee Road'}\nJam Operasional: 09:00 - 19:00 SGT\n\nKira-kira hari dan jam berapa yang paling nyaman untuk jadwal kunjungan Anda?`,
  },
  {
    id: 'loan_simulation',
    title: 'Simulasi Pembiayaan & Trade-In',
    description: 'Memberikan informasi skema DP promo, bunga kredit 1.88%, dan taksiran trade-in.',
    generateText: (inq) =>
      `Halo ${inq.customerName},\n\nMenindaklanjuti rencana pembelian unit ${inq.carName}${inq.tradeInCar && inq.tradeInCar !== 'None' ? ` dan rencana Trade-In (${inq.tradeInCar})` : ''}:\n\nKami memiliki program bunga loan preferensial mulai 1.88% flat/tahun dengan persetujuan cepat (DBS/OCBC/In-house).\n\nBoleh kami bantu buatkan simulasi angsuran bulanan sesuai budget DP Anda?`,
  },
];

export default function AdminInquiryList({
  inquiries,
  onStatusChange,
}: AdminInquiryListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiryForModal, setSelectedInquiryForModal] = useState<AdminInquiry | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('general_followup');
  const [customMessage, setCustomMessage] = useState<string>('');
  const [toastNotice, setToastNotice] = useState<string | null>(null);

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

  const handleOpenWhatsAppModal = (inq: AdminInquiry) => {
    setSelectedInquiryForModal(inq);
    const defaultTpl = TEMPLATES[0];
    setSelectedTemplateId(defaultTpl.id);
    setCustomMessage(defaultTpl.generateText(inq));
  };

  const handleSelectTemplate = (tplId: string) => {
    setSelectedTemplateId(tplId);
    if (!selectedInquiryForModal) return;
    const tpl = TEMPLATES.find((t) => t.id === tplId);
    if (tpl) {
      setCustomMessage(tpl.generateText(selectedInquiryForModal));
    }
  };

  const handleSendWhatsAppAndMark = (newStatus: AdminInquiry['status'] = 'contacted') => {
    if (!selectedInquiryForModal) return;

    const cleanPhone = selectedInquiryForModal.phone.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customMessage)}`;

    // Open WhatsApp
    window.open(waUrl, '_blank');

    // Update status
    onStatusChange(selectedInquiryForModal.id, newStatus);
    setToastNotice(`WhatsApp dibuka & status inquiry "${selectedInquiryForModal.customerName}" otomatis diperbarui.`);
    setSelectedInquiryForModal(null);

    setTimeout(() => setToastNotice(null), 4000);
  };

  const handleDirectWhatsAppClick = (inq: AdminInquiry) => {
    const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
    const defaultMsg = `Halo ${inq.customerName}, kami dari Apex Auto Singapore menindaklanjuti pesan Anda terkait unit ${inq.carName}. Apakah masih ada informasi spesifikasi atau jadwal test drive yang ingin dikoordinasikan?`;
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMsg)}`;

    window.open(waUrl, '_blank');
    if (inq.status === 'new') {
      onStatusChange(inq.id, 'contacted');
      setToastNotice(`WhatsApp dibuka & status diperbarui menjadi "Sudah Dihubungi".`);
      setTimeout(() => setToastNotice(null), 3000);
    }
  };

  const countNew = inquiries.filter((i) => i.status === 'new').length;
  const countContacted = inquiries.filter((i) => i.status === 'contacted').length;
  const countScheduled = inquiries.filter((i) => i.status === 'scheduled_test_drive').length;

  return (
    <div className="space-y-6">
      {/* Toast Notice */}
      {toastNotice && (
        <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between gap-3 text-emerald-400 text-xs animate-in fade-in shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span className="font-semibold">{toastNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastNotice(null)}
            className="text-emerald-400/80 hover:text-emerald-300 font-bold"
          >
            ✕
          </button>
        </div>
      )}

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

                    <button
                      type="button"
                      onClick={() => handleOpenWhatsAppModal(inq)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-amber-400 text-xs font-semibold border border-amber-500/20 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Template Pesan</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDirectWhatsAppClick(inq)}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Buka WhatsApp & Perbarui Status</span>
                    </button>
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

      {/* WhatsApp Quick Reply Template Modal */}
      {selectedInquiryForModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedInquiryForModal(null)}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Balas Pesan WhatsApp Resmi Showroom
                  </h3>
                  <p className="text-xs text-slate-400">
                    Kirim ke: <strong className="text-white">{selectedInquiryForModal.customerName}</strong> ({selectedInquiryForModal.phone})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiryForModal(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Template Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                Pilih Format Balasan Template Otomatis:
              </label>
              <div className="grid grid-cols-1 gap-2">
                {TEMPLATES.map((tpl) => {
                  const isSelected = tpl.id === selectedTemplateId;
                  return (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => handleSelectTemplate(tpl.id)}
                      className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 text-white'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold text-xs text-white">{tpl.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{tpl.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message Preview / Edit */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Isi Pesan WhatsApp yang Akan Terkirim:
              </label>
              <textarea
                rows={5}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500 font-sans leading-relaxed"
              />
            </div>

            {/* Submit Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <div className="text-[11px] text-slate-400">
                Status akan otomatis diperbarui setelah WhatsApp terbuka.
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedInquiryForModal(null)}
                  className="w-1/3 sm:w-auto py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => handleSendWhatsAppAndMark('scheduled_test_drive')}
                  className="flex-1 sm:flex-initial py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Kirim & Set Jadwal</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSendWhatsAppAndMark('contacted')}
                  className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
