'use client';

import { formatRupiah, localizeVehicleValue } from '@/lib/locale';


import React, { useState } from 'react';
import { AdminInquiry } from '@/data/mock-inquiries';
import {
  MessageSquare,
  Search,
  Send,
  Phone,
  Mail,
  Calendar,
  Car,
  Clock,
  CheckCircle2,
  Tag,
  Building2,
  UserCheck,
  Sparkles,
  X,
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
  { id: 'general_followup', title: 'Ketersediaan Unit dan Dokumen', description: 'Konfirmasi kondisi mobil, STNK/BPKB, pajak, dan jadwal kunjungan.',
    generateText: inq => `Halo ${inq.customerName}, terima kasih telah menghubungi Apex Auto Medan.\n\n${inq.carName} dengan harga ${formatRupiah(inq.carPriceIDR)} dapat dikonsultasikan melalui showroom ${inq.branch || 'Apex Auto Medan'}. Mohon konfirmasi jadwal untuk memeriksa kondisi unit, STNK/BPKB, pajak, dan riwayat servis.` },
  { id: 'test_drive_booking', title: 'Jadwal Kunjungan Showroom', description: 'Bantu calon pembeli menjadwalkan pemeriksaan unit di showroom.',
    generateText: inq => `Halo ${inq.customerName}, kami siap menjadwalkan kunjungan untuk melihat ${inq.carName}.\n\nLokasi: Apex Auto Medan, Jl. Ring Road No. 88, Medan. Jam operasional: Senin–Sabtu 09.00–18.00 WIB, Minggu 10.00–16.00 WIB. Kapan Anda ingin berkunjung?` },
  { id: 'loan_simulation', title: 'Simulasi Kredit dan Tukar Tambah', description: 'Jelaskan DP, tenor, asuransi, administrasi, dan nilai bersih tukar tambah.',
    generateText: inq => `Halo ${inq.customerName}, kami menindaklanjuti pertanyaan tentang ${inq.carName}.\n\nKami dapat membantu simulasi kredit bank/leasing serta penilaian mobil lama untuk tukar tambah. Mohon informasikan rencana DP dan tenor yang diinginkan. Biaya asuransi, administrasi, dan persetujuan kredit mengikuti penawaran pembiayaan.` },
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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-rose-50 text-rose-700 border border-rose-200 ">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            <span>Pertanyaan Baru</span>
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" />
            <span>Sudah Dihubungi</span>
          </span>
        );
      case 'scheduled_test_drive':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-sky-50 text-sky-700 border border-sky-200">
            <Calendar className="w-3 h-3" />
            <span>Kunjungan Dijadwalkan</span>
          </span>
        );
      case 'deal_closed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            <span>Transaksi Selesai</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase bg-zinc-100 text-zinc-500 border border-zinc-200">
            <span>Diarsipkan / Dibatalkan</span>
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
    setToastNotice(`WhatsApp dibuka dan status pertanyaan "${selectedInquiryForModal.customerName}" diperbarui.`);
    setSelectedInquiryForModal(null);

    setTimeout(() => setToastNotice(null), 4000);
  };

  const handleDirectWhatsAppClick = (inq: AdminInquiry) => {
    const cleanPhone = inq.phone.replace(/[^0-9]/g, '');
    const defaultMsg = `Halo ${inq.customerName}, kami dari Apex Auto Medan menindaklanjuti pertanyaan tentang ${inq.carName}. Apakah Anda ingin informasi spesifikasi, dokumen, atau jadwal kunjungan?`;
    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMsg)}`;

    window.open(waUrl, '_blank');
    if (inq.status === 'new') {
      onStatusChange(inq.id, 'contacted');
      setToastNotice("WhatsApp dibuka dan status diperbarui menjadi sudah dihubungi.");
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
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-emerald-700 text-xs animate-in fade-in shadow-none">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span className="font-semibold">{toastNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastNotice(null)}
            className="text-emerald-700/80 hover:text-emerald-700 font-semibold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header & Filter Controls */}
      <div className="bg-white/80 border border-zinc-200 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-700" />
            <span>Kelola Pertanyaan dan Calon Pembeli</span>
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Total {inquiries.length} pertanyaan • {countNew} baru • {countContacted} ditindaklanjuti • {countScheduled} kunjungan dijadwalkan
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pelanggan, mobil, telepon..."
              className="pl-9 pr-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-amber-500 transition-colors w-52 sm:w-60"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-2 px-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-amber-500 transition-colors font-semibold"
          >
            <option value="all">Semua Status ({inquiries.length})</option>
            <option value="new">Pertanyaan Baru ({countNew})</option>
            <option value="contacted">Sudah Dihubungi ({countContacted})</option>
            <option value="scheduled_test_drive">Kunjungan Dijadwalkan ({countScheduled})</option>
            <option value="deal_closed">Transaksi Selesai</option>
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
                className="bg-white/80 border border-zinc-200 rounded-xl p-6 space-y-4 hover:border-zinc-200 transition-colors shadow-none"
              >
                {/* Card Top: Customer Info & Status Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-semibold text-base border border-amber-200">
                      {inq.customerName.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-zinc-900">{inq.customerName}</span>
                        {getStatusBadge(inq.status)}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-500 mt-0.5">
                        <span className="flex items-center gap-1 font-mono text-zinc-600">
                          <Phone className="w-3 h-3 text-zinc-400" />
                          {inq.phone}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-zinc-400" />
                          {inq.email}
                        </span>
                        <span>•</span>
                        <span className="text-amber-700/90 font-mono">
                          {new Date(inq.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })},{' '}
                          {new Date(inq.createdAt).toLocaleDateString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0">
                    <select
                      value={inq.status}
                      onChange={(e) => onStatusChange(inq.id, e.target.value as AdminInquiry['status'])}
                      className="py-1.5 px-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 font-semibold focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
                    >
                      <option value="new">Tandai: Baru</option>
                      <option value="contacted">Tandai: Dihubungi</option>
                      <option value="scheduled_test_drive">Tandai: Kunjungan</option>
                      <option value="deal_closed">Tandai: Selesai</option>
                      <option value="cancelled">Tandai: Dibatalkan</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => handleOpenWhatsAppModal(inq)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-100 text-amber-700 text-xs font-semibold border border-amber-200 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Templat Pesan</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDirectWhatsAppClick(inq)}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Buka WhatsApp & Perbarui</span>
                    </button>
                  </div>
                </div>

                {/* Message Quote Block */}
                <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200/80 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="text-amber-700 font-semibold flex items-center gap-1.5">
                      <Car className="w-4 h-4" />
                      <span>Mobil Diminati: {inq.carName} (Rp{inq.carPriceIDR?.toLocaleString('id-ID') || "Tunai"})</span>
                    </div>
                    {inq.branch && (
                      <div className="text-zinc-500 flex items-center gap-1 text-[11px]">
                        <Building2 className="w-3 h-3 text-zinc-400" />
                        <span>{inq.branch}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed italic">
                    &ldquo;{inq.message}&rdquo;
                  </p>
                </div>

                {/* Additional Metadata Footnote */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-500 pt-1 border-t border-zinc-200">
                  <div className="flex items-center gap-3">
                    {inq.tradeInCar && inq.tradeInCar !== "Tidak ada" && (
                      <span className="inline-flex items-center gap-1 text-zinc-600">
                        <Tag className="w-3 h-3 text-amber-500" />
                        Tukar Tambah: <strong className="text-zinc-900">{inq.tradeInCar}</strong>
                      </span>
                    )}
                    {inq.loanType && (
                      <span className="text-zinc-600">
                        Pembayaran: <strong className="text-amber-700 uppercase font-mono">{localizeVehicleValue(inq.loanType)}</strong>
                      </span>
                    )}
                  </div>
                  {inq.salesAssigned && (
                    <div className="flex items-center gap-1 text-zinc-500">
                      <UserCheck className="w-3 h-3 text-emerald-700" />
                      <span>Penanggung Jawab: <strong className="text-zinc-700">{inq.salesAssigned}</strong></span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center bg-white/40 rounded-xl border border-zinc-200 space-y-2">
            <MessageSquare className="w-8 h-8 text-zinc-500 mx-auto" />
            <div className="text-sm font-semibold text-zinc-900">Belum ada pertanyaan pelanggan</div>
            <p className="text-xs text-zinc-500">Coba ubah kata pencarian atau filter.</p>
          </div>
        )}
      </div>

      {/* WhatsApp Quick Reply Template Modal */}
      {selectedInquiryForModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-zinc-950/35 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedInquiryForModal(null)}
        >
          <div
            className="bg-white border border-zinc-200 rounded-xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl relative animate-in zoom-in-95 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-zinc-900">
                    Balasan Cepat WhatsApp
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Penerima: <strong className="text-zinc-900">{selectedInquiryForModal.customerName}</strong> ({selectedInquiryForModal.phone})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiryForModal(null)}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Template Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-zinc-600">
                Pilih Templat Balasan:
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
                          ? 'bg-amber-50 border-amber-500 text-zinc-900'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:text-zinc-600 hover:border-zinc-200'
                      }`}
                    >
                      <div className="font-semibold text-xs text-zinc-900">{tpl.title}</div>
                      <div className="text-[11px] text-zinc-500 mt-0.5">{tpl.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message Preview / Edit */}
            <div>
              <label className="block text-xs font-semibold text-zinc-600 mb-1.5">
                Pratinjau / Ubah Pesan WhatsApp:
              </label>
              <textarea
                rows={5}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:border-emerald-500 font-sans leading-relaxed"
              />
            </div>

            {/* Submit Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-zinc-200">
              <div className="text-[11px] text-zinc-500">
                Status diperbarui saat WhatsApp dibuka.
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedInquiryForModal(null)}
                  className="w-1/3 sm:w-auto py-2.5 px-4 rounded-xl bg-zinc-100 hover:bg-zinc-100 text-zinc-600 text-xs font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={() => handleSendWhatsAppAndMark('scheduled_test_drive')}
                  className="flex-1 sm:flex-initial py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Kirim & Jadwalkan</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSendWhatsAppAndMark('contacted')}
                  className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md  cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim melalui WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
