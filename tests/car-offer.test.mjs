import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getOfferTotals, validateOfferDetails, validateOfferContact, buildOfferMessage, normalizeOfferPhone, formatOfferCurrency } from '../src/lib/car-offer.ts';
import { formatRupiah, formatDate } from '../src/lib/locale.ts';
const valid = { offerAmount: '850000000', downPayment: '255000000', tradeInValue: '150000000', payment: 'finance', term: '48', name: 'Budi Santoso', email: '', phone: '0812 0000 0000', message: '', consent: true };

test('rupiah memakai pemisah ribuan Indonesia tanpa pecahan sen', () => {
  assert.equal(formatOfferCurrency(885000000), 'Rp 885.000.000');
  assert.equal(formatRupiah(885000000), formatOfferCurrency(885000000));
  assert.match(formatDate('2027-08-20'), /20 Agustus 2027/);
});
test('pokok kredit mengurangi DP dan nilai bersih tukar tambah', () => {
  assert.equal(getOfferTotals(valid).balance, 445000000);
  assert.deepEqual(validateOfferDetails(valid), {});
});
test('tunai tidak memakai DP atau tenor dari pilihan kredit sebelumnya', () => {
  const cash = { ...valid, payment: 'cash', downPayment: '-999999', term: '999' };
  assert.equal(getOfferTotals(cash).balance, 700000000);
  assert.deepEqual(validateOfferDetails(cash), {});
});
test('nominal tidak valid dan uang muka melebihi harga ditolak', () => {
  for (const value of ['0', '', 'Infinity', '-1', '0.30', 'not a number']) assert.ok(validateOfferDetails({ ...valid, offerAmount: value }).offerAmount);
  assert.ok(validateOfferDetails({ ...valid, downPayment: '-1' }).downPayment);
  assert.ok(validateOfferDetails({ ...valid, tradeInValue: '-1' }).tradeInValue);
  assert.ok(validateOfferDetails({ ...valid, tradeInValue: '650000000' }).tradeInValue);
  assert.ok(validateOfferDetails({ ...valid, term: '84' }).term);
});
test('nomor lokal dan awalan 08, +62, atau 62 dinormalisasi ke WhatsApp Indonesia', () => {
  assert.equal(normalizeOfferPhone('812 0000 0000'), '+6281200000000');
  assert.equal(normalizeOfferPhone('0812 0000 0000'), '+6281200000000');
  assert.equal(normalizeOfferPhone('+62 (812) 0000-0000'), '+6281200000000');
  assert.equal(normalizeOfferPhone('6281200000000'), '+6281200000000');
  for (const phone of ['+65 9123 4567', '0812', '08120000abc', '12345678']) assert.equal(normalizeOfferPhone(phone), null);
  assert.deepEqual(validateOfferContact(valid), {});
  assert.ok(validateOfferContact({ ...valid, phone: '+65 91234567' }).phone);
  assert.ok(validateOfferContact({ ...valid, name: 'A' }).name);
  assert.ok(validateOfferContact({ ...valid, email: 'bad-email' }).email);
  assert.ok(validateOfferContact({ ...valid, consent: false }).consent);
});
test('draf bahasa Indonesia menyertakan unit, rupiah, dokumen, dan rincian kredit', () => {
  const car = { id: 'car-001', brand: 'Mercedes-Benz', model: 'E200', year: 2022, price: 885000000 };
  const draft = buildOfferMessage(car, { ...valid, email: 'budi@example.com', message: 'Mobil tukar tambah saya masih kredit.' });
  assert.match(draft, /Mobil: 2022 Mercedes-Benz E200/);
  assert.match(draft, /Penawaran saya: Rp 850.000.000/);
  assert.match(draft, /Pokok pembiayaan yang diajukan: Rp 445.000.000/);
  assert.match(draft, /WhatsApp: \+6281200000000/);
  assert.match(draft, /STNK\/BPKB/);
  assert.doesNotMatch(draft, /SGD|COE|LTA|test\s*drive|Singapore|S\$/i);
  const cashDraft = buildOfferMessage(car, { ...valid, payment: 'cash' });
  assert.match(cashDraft, /Sisa pembayaran tunai: Rp 700.000.000/);
  assert.doesNotMatch(cashDraft, /Rencana uang muka|Tenor kredit|Pokok pembiayaan/);
});
