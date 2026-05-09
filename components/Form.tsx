'use client';

import { useState } from "react";
import { WaitlistSchema, CITY_OPTIONS, ROLE_OPTIONS } from "@/lib/validation";

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function Form() {
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [role, setRole] = useState('');
  const [phone, setPhone] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');

  const [state, setState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit() {
    setState('submitting');
    setErrorMessage('');

    const parsed = WaitlistSchema.safeParse({
      email,
      city,
      role,
      phone,
      instagramHandle,
    });

    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message ?? 'Check the form';
      setErrorMessage(firstError);
      setState('error');
      return;
    }

    try {
      const sourceHandle = new URLSearchParams(window.location.search).get('src') ?? undefined;

      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...parsed.data, sourceHandle }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(data?.error ?? 'Something broke. Try again.');
        setState('error');
        return;
      }

      setState('success');
    } catch (err) {
      console.error('[waitlist] submit failed:', err);
      setErrorMessage('Network error. Check your connection.');
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <div className="mt-12 max-w-md">
        <div className="mono text-[10px] text-white-32 mb-3">YOU&apos;RE ON THE LIST</div>
        <p className="display text-3xl md:text-4xl mb-3">
          See you<span className="punct">.</span>
        </p>
        <p className="text-white-55 text-sm leading-relaxed">
          Check your inbox for a confirmation. We&apos;ll be in touch as the drop gets closer.
        </p>
      </div>
    );
  }

  const inputClass = "w-full bg-transparent border border-white-25 rounded-sm px-4 py-3 text-white text-sm placeholder:text-white-40 focus:border-white-55 focus:outline-none transition-colors";
  const labelClass = "mono text-[10px] text-white-32 mb-2 block";

  return (
    <div className="mt-12 max-w-md">
      <div className="mono text-[10px] text-white-40 mb-6">JOIN THE WAITLIST</div>

      <div className="space-y-5">
        <div>
          <label className={labelClass} htmlFor="email">EMAIL</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@somewhere.com"
            className={inputClass}
            autoComplete="email"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="city">CITY</label>
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            <option value="" disabled>Select a city</option>
            {CITY_OPTIONS.map((c) => (
              <option key={c.value} value={c.value} className="bg-ink">{c.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="role">YOU ARE</label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`${inputClass} appearance-none cursor-pointer`}
          >
            <option value="" disabled>Pick one</option>
            {ROLE_OPTIONS.map((r) => (
              <option key={r.value} value={r.value} className="bg-ink">{r.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="phone">PHONE <span className="text-white-25">(OPTIONAL)</span></label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 XXXXX XXXXX"
            className={inputClass}
            autoComplete="tel"
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="ig">INSTAGRAM <span className="text-white-25">(OPTIONAL)</span></label>
          <input
            id="ig"
            type="text"
            value={instagramHandle}
            onChange={(e) => setInstagramHandle(e.target.value)}
            placeholder="@yourhandle"
            className={inputClass}
            autoComplete="off"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={state === 'submitting'}
        className="mt-8 w-full bg-white text-ink font-semibold text-xs uppercase tracking-[0.32em] py-4 rounded-sm hover:bg-white-70 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {state === 'submitting' ? 'JOINING...' : 'JOIN THE WAITLIST'}
      </button>

      {state === 'error' && errorMessage && (
        <div className="mt-4 mono text-[10px] text-white-55">
          ERROR &middot; {errorMessage}
        </div>
      )}
    </div>
  );
}
