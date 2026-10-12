import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getOfferTotals, validateOfferDetails, validateOfferContact, buildOfferMessage } from '../src/lib/car-offer.ts';

const valid = {
  offerAmount: '200000', downPayment: '80000', tradeInValue: '20000',
  payment: 'finance', term: '60', name: 'Customer Name', email: '',
  phone: '9123 4567', message: '', consent: true,
};

test('financing subtracts down payment and net trade-in without decimal rounding errors', () => {
  assert.equal(getOfferTotals(valid).balance, 100000);
  const decimals = { ...valid, offerAmount: '0.30', downPayment: '0.10', tradeInValue: '0.20' };
  assert.equal(getOfferTotals(decimals).balance, 0);
  assert.deepEqual(validateOfferDetails(decimals), {});
});

test('cash ignores a previously entered finance down payment', () => {
  const cash = { ...valid, payment: 'cash', downPayment: '-999999' };
  assert.equal(getOfferTotals(cash).balance, 180000);
  assert.deepEqual(validateOfferDetails(cash), {});
});

test('rejects zero, empty, non-finite and negative amounts and excessive contributions', () => {
  for (const value of ['0', '', 'Infinity', '-1', 'not a number']) {
    assert.ok(validateOfferDetails({ ...valid, offerAmount: value }).offerAmount);
  }
  assert.ok(validateOfferDetails({ ...valid, downPayment: '-1' }).downPayment);
  assert.ok(validateOfferDetails({ ...valid, tradeInValue: '-1' }).tradeInValue);
  assert.ok(validateOfferDetails({ ...valid, tradeInValue: '150000' }).tradeInValue);
  assert.ok(validateOfferDetails({ ...valid, term: '120' }).term);
});

test('requires valid name, Singapore phone and consent while email is optional', () => {
  assert.deepEqual(validateOfferContact(valid), {});
  assert.deepEqual(validateOfferContact({ ...valid, phone: '+65 (9123) 4567' }), {});
  assert.ok(validateOfferContact({ ...valid, phone: '12345678' }).phone);
  assert.ok(validateOfferContact({ ...valid, name: 'A' }).name);
  assert.ok(validateOfferContact({ ...valid, email: 'bad-email' }).email);
  assert.ok(validateOfferContact({ ...valid, consent: false }).consent);
});

test('WhatsApp draft includes the selected car and actual offer terms without test drive', () => {
  const car = { id: 'car-001', brand: 'BMW', model: '330i', year: 2022, price: 218000 };
  const draft = buildOfferMessage(car, { ...valid, email: 'customer@example.com', message: 'My trade-in is a 2019 sedan.' });
  assert.match(draft, /Vehicle: 2022 BMW 330i/);
  assert.match(draft, /My offer: S\$200,000/);
  assert.match(draft, /Requested financing amount: S\$100,000/);
  assert.match(draft, /Phone: \+65 91234567/);
  assert.match(draft, /customer@example.com/);
  assert.match(draft, /2019 sedan/);
  assert.doesNotMatch(draft, /test\s*drive/i);
  const cashDraft = buildOfferMessage(car, { ...valid, payment: 'cash' });
  assert.match(cashDraft, /Cash balance after trade-in: S\$180,000/);
  assert.doesNotMatch(cashDraft, /down payment|loan tenure|Requested financing/);
});
