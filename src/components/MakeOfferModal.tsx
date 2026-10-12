'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, X } from 'lucide-react';
import type { Car } from '@/types/car';
import {
  buildOfferMessage,
  formatOfferCurrency,
  getOfferTotals,
  OFFER_LOAN_TERMS,
  validateOfferContact,
  validateOfferDetails,
  type OfferErrors,
  type OfferValues,
} from '@/lib/car-offer';

const focusStyle = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400';
const inputStyle = 'w-full rounded-none border-0 border-b border-white/25 bg-transparent px-0 py-3 text-base text-white outline-none placeholder:text-white/30 focus:border-amber-400';

export function MakeOfferModal({ car, onClose }: { car: Car; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<OfferValues>({
    offerAmount: String(car.price),
    downPayment: String(Math.round(car.price * 0.4)),
    tradeInValue: '0',
    payment: 'finance',
    term: '60',
    name: '',
    email: '',
    phone: '',
    message: '',
    consent: false,
  });
  const [errors, setErrors] = useState<OfferErrors>({});
  const [draftUrl, setDraftUrl] = useState('');
  const fullName = `${car.brand} ${car.model}`;
  const image = car.images.find(image => image.is_main) || car.images[0];
  const totals = getOfferTotals(values);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    headingRef.current?.focus();
  }, [step, draftUrl]);

  function update<K extends keyof OfferValues>(field: K, value: OfferValues[K]) {
    setValues(current => ({ ...current, [field]: value }));
    setErrors(current => ({ ...current, [field]: undefined }));
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = step === 1 ? validateOfferDetails(values) : validateOfferContact(values);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      dialogRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }
    setErrors({});
    if (step === 1) {
      setStep(2);
      return;
    }
    const url = `https://wa.me/6581234567?text=${encodeURIComponent(buildOfferMessage(car, values))}`;
    setDraftUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="offer-heading"
      aria-describedby="offer-description"
      onKeyDown={trapDialogFocus}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-3xl overflow-hidden border border-white/15 bg-[#252525] p-0 text-white shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm"
    >
      <form noValidate onSubmit={submit} className="flex max-h-[90dvh] flex-col">
        <header className="relative shrink-0 border-b border-white/10 px-6 py-6 sm:px-9">
          <h2 ref={headingRef} tabIndex={-1} id="offer-heading" className="pr-8 text-2xl font-bold leading-tight outline-none sm:text-3xl">
            Your offer for <span className="text-amber-400">{fullName}</span>
          </h2>
          <p id="offer-description" className="mt-3 text-sm leading-relaxed text-white/65">
            Prepare your offer for Apex Auto. All amounts are in Singapore dollars.
          </p>
          <button type="button" onClick={onClose} aria-label="Close offer form" className={`absolute right-4 top-5 grid h-9 w-9 place-items-center text-white/60 transition hover:text-amber-400 ${focusStyle}`}>
            <X className="h-5 w-5" />
          </button>
          {!draftUrl && <p className="mt-4 text-xs font-semibold text-white/45">Step {step} of 2 · {step === 1 ? 'Offer details' : 'Review & contact details'}</p>}
        </header>

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-9">
          {draftUrl ? (
            <div role="status" className="py-6 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber-400/15 text-amber-400"><Check className="h-7 w-7" /></span>
              <h3 className="mt-5 text-2xl font-bold">Your offer draft is ready</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-white/65">
                Send the prepared message in WhatsApp to complete your enquiry. Your offer has not been sent yet.
              </p>
              <a href={draftUrl} target="_blank" rel="noopener noreferrer" className={`mt-6 inline-flex items-center gap-3 rounded-full bg-amber-400 px-6 py-3 font-semibold text-black transition hover:bg-amber-300 ${focusStyle}`}>
                Open WhatsApp <ArrowRight className="h-5 w-5" />
              </a>
            </div>
          ) : step === 1 ? (
            <div className="space-y-7">
              <div className="grid gap-6 sm:grid-cols-3">
                <AmountField label="Offer amount" name="offerAmount" value={values.offerAmount} onChange={value => update('offerAmount', value)} error={errors.offerAmount} />
                {values.payment === 'finance' && <AmountField label="Cash down payment" name="downPayment" value={values.downPayment} onChange={value => update('downPayment', value)} error={errors.downPayment} />}
                <AmountField label="Net trade-in value" name="tradeInValue" value={values.tradeInValue} onChange={value => update('tradeInValue', value)} error={errors.tradeInValue} />
              </div>
              <p className="text-xs leading-relaxed text-white/45">
                Listed price: {formatOfferCurrency(car.price)}. Trade-in value should be after any outstanding loan and will be confirmed during appraisal.
              </p>
              <fieldset>
                <legend className="mb-4 text-sm text-white/60">Payment preference</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  {(['finance', 'cash'] as const).map(payment => (
                    <label key={payment} className="flex cursor-pointer items-center gap-3 text-base font-semibold">
                      <input type="radio" name="payment" value={payment} checked={values.payment === payment} onChange={() => update('payment', payment)} className="h-4 w-4 accent-amber-400" />
                      {payment === 'finance' ? 'Financing' : 'Cash purchase'}
                    </label>
                  ))}
                </div>
              </fieldset>
              {values.payment === 'finance' && (
                <fieldset>
                  <legend className="mb-4 text-sm text-white/60">Preferred loan tenure (months)</legend>
                  <div className="flex flex-wrap gap-x-6 gap-y-4">
                    {OFFER_LOAN_TERMS.map(term => (
                      <label key={term} className="flex cursor-pointer items-center gap-2 text-base font-semibold">
                        <input type="radio" name="term" value={term} checked={values.term === String(term)} onChange={() => update('term', String(term))} className="h-4 w-4 accent-amber-400" />{term}
                      </label>
                    ))}
                  </div>
                  {errors.term && <p role="alert" className="mt-2 text-xs text-red-300">{errors.term}</p>}
                </fieldset>
              )}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 px-5 py-4 text-sm">
                <span className="text-white/60">{values.payment === 'finance' ? 'Requested financing' : 'Cash balance after trade-in'}</span>
                <strong className="text-lg text-amber-400">{formatOfferCurrency(totals.balance)}</strong>
              </div>
              <p className="text-xs leading-relaxed text-white/45">
                Financing preferences are an enquiry, not a loan approval. Our team will confirm the valuation, available tenure, COE balance and lender terms.
              </p>
            </div>
          ) : (
            <div className="space-y-7">
              {image && <div className="relative aspect-[16/5] overflow-hidden rounded-xl bg-zinc-900"><Image src={image.url} alt={`${car.year} ${fullName}`} fill sizes="(max-width: 768px) 100vw, 700px" className="object-cover" /></div>}
              <dl className="space-y-3 rounded-xl bg-white/10 px-5 py-5 text-sm">
                <SummaryRow label="Listed price" value={formatOfferCurrency(car.price)} />
                <SummaryRow label="Your offer" value={formatOfferCurrency(totals.offer)} highlight />
                <SummaryRow label="Payment preference" value={values.payment === 'finance' ? 'Financing' : 'Cash purchase'} />
                {values.payment === 'finance' && <>
                  <SummaryRow label="Cash down payment" value={formatOfferCurrency(totals.downPayment)} />
                  <SummaryRow label="Preferred loan tenure" value={`${values.term} months`} />
                </>}
                <SummaryRow label="Estimated net trade-in" value={formatOfferCurrency(totals.tradeIn)} />
                <SummaryRow label={values.payment === 'finance' ? 'Requested financing' : 'Cash balance after trade-in'} value={formatOfferCurrency(totals.balance)} />
              </dl>
              <div className="grid gap-x-7 gap-y-5 sm:grid-cols-2">
                <ContactField label="Full name *" name="name" value={values.name} onChange={value => update('name', value)} error={errors.name} autoComplete="name" maxLength={100} />
                <ContactField label="Email (optional)" name="email" type="email" value={values.email} onChange={value => update('email', value)} error={errors.email} autoComplete="email" maxLength={150} />
                <ContactField label="Singapore phone *" name="phone" type="tel" value={values.phone} onChange={value => update('phone', value)} error={errors.phone} autoComplete="tel-national" maxLength={20} prefix="+65" placeholder="9123 4567" />
              </div>
              <div>
                <label htmlFor="offer-message" className="text-sm text-white/60">Message (optional)</label>
                <textarea id="offer-message" name="message" rows={3} maxLength={1000} value={values.message} onChange={event => update('message', event.target.value)} placeholder="Tell us about your trade-in or ask a question..." className={`${inputStyle} mt-2 resize-y`} />
              </div>
              <div>
                <label htmlFor="offer-consent" className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-white/65">
                  <input id="offer-consent" type="checkbox" name="consent" checked={values.consent} onChange={event => update('consent', event.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'offer-consent-error' : undefined} className="mt-1 h-4 w-4 shrink-0 accent-amber-400" />
                  I agree that Apex Auto may use the details provided to contact me about this offer via WhatsApp, phone or email.
                </label>
                {errors.consent && <p id="offer-consent-error" role="alert" className="mt-2 text-xs text-red-300">{errors.consent}</p>}
              </div>
              <p className="text-xs leading-relaxed text-white/45">
                Continue opens WhatsApp with your offer and contact details addressed to Apex Auto (+65 8123 4567). You send the message from WhatsApp.
              </p>
            </div>
          )}
        </div>

        <footer className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 py-5 sm:px-9">
          {draftUrl ? (
            <button type="button" onClick={onClose} className={`rounded-full border border-white/25 px-7 py-3 text-sm font-semibold hover:border-amber-400 ${focusStyle}`}>Done</button>
          ) : <>
            {step === 2 && <button type="button" onClick={() => { setErrors({}); setStep(1); }} className={`rounded-full border border-white/35 px-7 py-3 text-sm font-semibold transition hover:border-amber-400 hover:text-amber-400 ${focusStyle}`}>Back</button>}
            <button type="submit" className={`ml-auto flex min-w-48 shrink-0 items-center justify-between gap-4 whitespace-nowrap rounded-full bg-amber-400 py-2 pl-7 pr-2 text-sm font-semibold text-black transition hover:bg-amber-300 ${focusStyle}`}>
              {step === 1 ? 'Continue' : 'Continue to WhatsApp'}<span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-black text-amber-400"><ArrowRight className="h-5 w-5" /></span>
            </button>
          </>}
        </footer>
      </form>
    </dialog>
  );
}

function trapDialogFocus(event: React.KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== 'Tab') return;
  const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
    'button, a[href], input, select, textarea, [tabindex]',
  )).filter(control => control.tabIndex >= 0 && !control.hasAttribute('disabled') && control.getClientRects().length > 0);
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (!first || !last) return;
  if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement as HTMLElement))) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function AmountField({ label, name, value, onChange, error }: {
  label: string; name: string; value: string; onChange: (value: string) => void; error?: string;
}) {
  return (
    <div>
      <label htmlFor={`offer-${name}`} className="text-sm text-white/60">{label}</label>
      <div className="relative mt-2">
        <span className="pointer-events-none absolute left-0 top-3 text-base text-white/55">S$</span>
        <input id={`offer-${name}`} name={name} type="number" min="0" step="0.01" inputMode="decimal" value={value} onChange={event => onChange(event.target.value)} aria-invalid={!!error} aria-describedby={error ? `offer-${name}-error` : undefined} className={`${inputStyle} pl-7`} />
      </div>
      {error && <p id={`offer-${name}-error`} role="alert" className="mt-2 text-xs text-red-300">{error}</p>}
    </div>
  );
}

function ContactField({ label, name, value, onChange, error, prefix, ...props }: {
  label: string; name: string; value: string; onChange: (value: string) => void; error?: string; prefix?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  return (
    <div>
      <label htmlFor={`offer-${name}`} className="text-sm text-white/60">{label}</label>
      <div className="relative mt-2">
        {prefix && <span className="pointer-events-none absolute left-0 top-3 text-base text-white/55">{prefix}</span>}
        <input id={`offer-${name}`} name={name} value={value} onChange={event => onChange(event.target.value)} aria-invalid={!!error} aria-describedby={error ? `offer-${name}-error` : undefined} className={`${inputStyle} ${prefix ? 'pl-10' : ''}`} {...props} />
      </div>
      {error && <p id={`offer-${name}-error`} role="alert" className="mt-2 text-xs text-red-300">{error}</p>}
    </div>
  );
}

function SummaryRow({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return <div className="flex justify-between gap-4"><dt className="text-white/60">{label}</dt><dd className={`text-right font-semibold ${highlight ? 'text-amber-400' : 'text-white'}`}>{value}</dd></div>;
}
