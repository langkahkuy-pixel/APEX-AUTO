import type { Car } from '@/types/car';

export const OFFER_LOAN_TERMS = [12, 24, 36, 48, 60, 72, 84] as const;

export interface OfferValues {
  offerAmount: string;
  downPayment: string;
  tradeInValue: string;
  payment: 'finance' | 'cash';
  term: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  consent: boolean;
}

export type OfferErrors = Partial<Record<keyof OfferValues, string>>;

export function formatOfferCurrency(value: number) {
  return `S$${value.toLocaleString('en-SG', { maximumFractionDigits: 2 })}`;
}

function amountInCents(value: string) {
  if (!value.trim()) return null;
  const amount = Number(value);
  const cents = Math.round(amount * 100);
  return Number.isFinite(amount) && amount >= 0 && Number.isSafeInteger(cents)
    ? cents
    : null;
}

export function getOfferTotals(values: OfferValues) {
  const offer = amountInCents(values.offerAmount) ?? 0;
  const downPayment = values.payment === 'finance'
    ? amountInCents(values.downPayment) ?? 0
    : 0;
  const tradeIn = amountInCents(values.tradeInValue) ?? 0;
  return {
    offer: offer / 100,
    downPayment: downPayment / 100,
    tradeIn: tradeIn / 100,
    balance: Math.max(0, offer - downPayment - tradeIn) / 100,
  };
}

export function validateOfferDetails(values: OfferValues): OfferErrors {
  const errors: OfferErrors = {};
  const offer = amountInCents(values.offerAmount);
  const downPayment = values.payment === 'finance' ? amountInCents(values.downPayment) : 0;
  const tradeIn = amountInCents(values.tradeInValue);
  if (offer === null || offer <= 0) {
    errors.offerAmount = 'Enter an offer amount greater than S$0.';
  }
  if (downPayment === null) {
    errors.downPayment = 'Enter a valid down payment of S$0 or more.';
  }
  if (tradeIn === null) {
    errors.tradeInValue = 'Enter a valid net trade-in value of S$0 or more.';
  } else if (offer !== null && offer > 0 && downPayment !== null && downPayment + tradeIn > offer) {
    errors.tradeInValue = 'Down payment and net trade-in value cannot exceed your offer.';
  }
  if (values.payment === 'finance' && !OFFER_LOAN_TERMS.some(term => String(term) === values.term)) {
    errors.term = 'Choose a preferred loan tenure.';
  }
  return errors;
}

export function normalizeOfferPhone(value: string) {
  const match = value.replace(/[\s()-]/g, '').match(/^(?:\+?65)?([689]\d{7})$/);
  return match ? `+65 ${match[1]}` : null;
}

export function validateOfferContact(values: OfferValues): OfferErrors {
  const errors: OfferErrors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your full name.';
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!normalizeOfferPhone(values.phone)) {
    errors.phone = 'Enter an 8-digit Singapore phone number starting with 6, 8 or 9.';
  }
  if (!values.consent) errors.consent = 'Please agree to be contacted about this enquiry.';
  return errors;
}

export function buildOfferMessage(car: Car, values: OfferValues) {
  const totals = getOfferTotals(values);
  return [
    'Hello Apex Auto, I would like to make an offer.',
    '',
    `Vehicle: ${car.year} ${car.brand} ${car.model}`,
    `Stock: ${car.id.toUpperCase()}`,
    `Listed price: ${formatOfferCurrency(car.price)}`,
    `My offer: ${formatOfferCurrency(totals.offer)}`,
    `Payment preference: ${values.payment === 'finance' ? 'Financing' : 'Cash purchase'}`,
    ...(values.payment === 'finance' ? [
      `Planned cash down payment: ${formatOfferCurrency(totals.downPayment)}`,
      `Preferred loan tenure: ${values.term} months`,
    ] : []),
    `Estimated net trade-in value: ${formatOfferCurrency(totals.tradeIn)}`,
    `${values.payment === 'finance' ? 'Requested financing amount' : 'Cash balance after trade-in'}: ${formatOfferCurrency(totals.balance)}`,
    '',
    `Name: ${values.name.trim()}`,
    `Phone: ${normalizeOfferPhone(values.phone)}`,
    ...(values.email.trim() ? [`Email: ${values.email.trim()}`] : []),
    ...(values.message.trim() ? ['', `Message: ${values.message.trim()}`] : []),
    '',
    'I agree to be contacted by Apex Auto about this vehicle offer.',
  ].join('\n');
}
