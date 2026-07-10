'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { INQUIRY_TYPES } from '@/lib/contact-schema';

interface FormValues {
  name: string;
  email: string;
  inquiryType: string;
  groupSize: string;
  preferredDate: string;
  message: string;
  consent: boolean;
  company: string; // honeypot
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactForm() {
  const t = useTranslations('ContactForm');
  const [status, setStatus] = useState<Status>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      email: '',
      inquiryType: '',
      groupSize: '',
      preferredDate: '',
      message: '',
      consent: false,
      company: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        className="rounded-2xl border border-gold/40 bg-gold/10 p-8 text-center"
      >
        <p className="font-serif text-2xl font-semibold text-ink-900">{t('successTitle')}</p>
        <p className="mt-3 text-ink-700">{t('successBody')}</p>
        <button type="button" onClick={() => setStatus('idle')} className="btn-secondary mt-6">
          {t('sendAnother')}
        </button>
      </div>
    );
  }

  const fieldClass =
    'mt-1.5 w-full rounded-xl border border-sand-200 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-700/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40';
  const labelClass = 'block text-sm font-medium text-ink-800';
  const errorClass = 'mt-1 text-sm text-clay';
  const hint = (kind: 'required' | 'optional') => (
    <span className="ml-1 text-xs font-normal text-ink-700/50">({t(kind)})</span>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot — visually hidden, off the tab order. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            {t('name')}
            {hint('required')}
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder={t('namePlaceholder')}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={fieldClass}
            {...register('name', { required: t('errors.nameRequired') })}
          />
          {errors.name && (
            <p id="name-error" className={errorClass}>
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            {t('email')}
            {hint('required')}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={fieldClass}
            {...register('email', {
              required: t('errors.emailRequired'),
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('errors.emailInvalid') },
            })}
          />
          {errors.email && (
            <p id="email-error" className={errorClass}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="inquiryType" className={labelClass}>
            {t('inquiryType')}
            {hint('optional')}
          </label>
          <select id="inquiryType" className={fieldClass} {...register('inquiryType')}>
            <option value="">—</option>
            {INQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {t(
                  type === 'experience'
                    ? 'typeExperience'
                    : type === 'catering'
                      ? 'typeCatering'
                      : type === 'group'
                        ? 'typeGroup'
                        : 'typeOther',
                )}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="groupSize" className={labelClass}>
            {t('groupSize')}
            {hint('optional')}
          </label>
          <input
            id="groupSize"
            type="text"
            placeholder={t('groupSizePlaceholder')}
            className={fieldClass}
            {...register('groupSize')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="preferredDate" className={labelClass}>
          {t('preferredDate')}
          {hint('optional')}
        </label>
        <input
          id="preferredDate"
          type="date"
          className={`${fieldClass} sm:max-w-xs`}
          {...register('preferredDate')}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          {t('message')}
          {hint('required')}
        </label>
        <textarea
          id="message"
          rows={5}
          placeholder={t('messagePlaceholder')}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={fieldClass}
          {...register('message', {
            required: t('errors.messageRequired'),
            minLength: { value: 10, message: t('errors.messageShort') },
          })}
        />
        {errors.message && (
          <p id="message-error" className={errorClass}>
            {errors.message.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-ink-700">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-sand-200 text-gold focus:ring-gold"
            aria-invalid={errors.consent ? 'true' : 'false'}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            {...register('consent', { required: t('errors.consentRequired') })}
          />
          <span>
            {t('consent')}{' '}
            <Link href="/privacy" className="font-medium text-clay underline underline-offset-2">
              {t('consentLink')}
            </Link>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className={errorClass}>
            {errors.consent.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <div role="alert" className="rounded-xl border border-clay/40 bg-clay/10 px-4 py-3 text-sm text-clay">
          <p className="font-semibold">{t('errorTitle')}</p>
          <p>{t('errorBody')}</p>
        </div>
      )}

      <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full sm:w-auto">
        {status === 'submitting' ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}
