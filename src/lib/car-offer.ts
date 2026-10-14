import type { Car } from '@/types/car';

export const OFFER_LOAN_TERMS = [12, 24, 36, 48, 60] as const;
export interface OfferValues {
  offerAmount: string; downPayment: string; tradeInValue: string;
  payment: 'finance' | 'cash'; term: string;
  name: string; email: string; phone: string; message: string; consent: boolean;
}
export type OfferErrors = Partial<Record<keyof OfferValues, string>>;

export function formatOfferCurrency(value: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value).replace(/\u00a0/g, ' ');
}
function parseRupiah(value: string) {
  if (!value.trim()) return null;
  const amount = Number(value);
  return Number.isSafeInteger(amount) && amount >= 0 ? amount : null;
}
export function getOfferTotals(values: OfferValues) {
  const offer = parseRupiah(values.offerAmount) ?? 0;
  const downPayment = values.payment === 'finance' ? parseRupiah(values.downPayment) ?? 0 : 0;
  const tradeIn = parseRupiah(values.tradeInValue) ?? 0;
  return { offer, downPayment, tradeIn, balance: Math.max(0, offer - downPayment - tradeIn) };
}
export function validateOfferDetails(values: OfferValues): OfferErrors {
  const errors: OfferErrors = {};
  const offer = parseRupiah(values.offerAmount);
  const downPayment = values.payment === 'finance' ? parseRupiah(values.downPayment) : 0;
  const tradeIn = parseRupiah(values.tradeInValue);
  if (offer === null || offer <= 0) errors.offerAmount = 'Masukkan harga penawaran dalam rupiah, lebih dari Rp0.';
  if (downPayment === null) errors.downPayment = 'Masukkan uang muka yang valid, minimal Rp0.';
  if (tradeIn === null) errors.tradeInValue = 'Masukkan nilai bersih tukar tambah yang valid, minimal Rp0.';
  else if (offer !== null && offer > 0 && downPayment !== null && downPayment + tradeIn > offer) errors.tradeInValue = 'Uang muka dan nilai bersih tukar tambah tidak boleh melebihi harga penawaran.';
  if (values.payment === 'finance' && !OFFER_LOAN_TERMS.some(term => String(term) === values.term)) errors.term = 'Pilih tenor kredit yang diinginkan.';
  return errors;
}
export function normalizeOfferPhone(value: string) {
  const match = value.replace(/[\s()-]/g, '').match(/^(?:\+?62|0)?(8\d{8,11})$/);
  return match ? `+62${match[1]}` : null;
}
export function validateOfferContact(values: OfferValues): OfferErrors {
  const errors: OfferErrors = {};
  if (values.name.trim().length < 2) errors.name = 'Masukkan nama lengkap Anda.';
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Masukkan alamat email yang valid.';
  if (!normalizeOfferPhone(values.phone)) errors.phone = 'Masukkan nomor WhatsApp Indonesia yang valid, diawali 08 atau +62.';
  if (!values.consent) errors.consent = 'Setujui untuk dihubungi terkait penawaran ini.';
  return errors;
}
export function buildOfferMessage(car: Car, values: OfferValues) {
  const totals = getOfferTotals(values);
  return [
    'Halo Apex Auto Medan, saya ingin mengajukan penawaran mobil.', '',
    `Mobil: ${car.year} ${car.brand} ${car.model}`, `Kode unit: ${car.id.toUpperCase()}`,
    `Harga tunai: ${formatOfferCurrency(car.price)}`, `Penawaran saya: ${formatOfferCurrency(totals.offer)}`,
    `Metode pembayaran: ${values.payment === 'finance' ? 'Kredit bank/leasing' : 'Tunai'}`,
    ...(values.payment === 'finance' ? [`Rencana uang muka (DP): ${formatOfferCurrency(totals.downPayment)}`, `Tenor kredit: ${values.term} bulan`] : []),
    `Nilai bersih tukar tambah: ${formatOfferCurrency(totals.tradeIn)}`,
    `${values.payment === 'finance' ? 'Pokok pembiayaan yang diajukan' : 'Sisa pembayaran tunai'}: ${formatOfferCurrency(totals.balance)}`,
    '', `Nama: ${values.name.trim()}`, `WhatsApp: ${normalizeOfferPhone(values.phone)}`,
    ...(values.email.trim() ? [`Email: ${values.email.trim()}`] : []),
    ...(values.message.trim() ? ['', `Pesan: ${values.message.trim()}`] : []), '',
    'Mohon konfirmasi kondisi unit, STNK/BPKB, status pajak, dan rincian biaya sebelum transaksi.',
    'Saya setuju dihubungi Apex Auto mengenai penawaran ini.',
  ].join('\n');
}
