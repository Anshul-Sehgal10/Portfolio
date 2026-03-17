"use client";

import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';

type ContactSectionProps = {
  darkMode: boolean;
};

type FormDataState = {
  name: string;
  email: string;
  message: string;
  company: string;
};

type FormErrors = Partial<Record<'name' | 'email' | 'message' | 'form', string>>;

const initialForm: FormDataState = {
  name: '',
  email: '',
  message: '',
  company: '',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactSection({ darkMode }: ContactSectionProps) {
  const [formData, setFormData] = useState<FormDataState>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const startedAt = useMemo(() => Date.now(), []);

  const validateClient = (): FormErrors => {
    const newErrors: FormErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const message = formData.message.trim();

    if (name.length < 2 || name.length > 80) {
      newErrors.name = 'Name must be between 2 and 80 characters.';
    }

    if (!emailRegex.test(email) || email.length > 254) {
      newErrors.email = 'Enter a valid email address.';
    }

    if (message.length < 20 || message.length > 2000) {
      newErrors.message = 'Message must be between 20 and 2000 characters.';
    }

    return newErrors;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusMessage('');

    const clientErrors = validateClient();
    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      setStatus('error');
      setStatusMessage('Please correct the highlighted fields.');
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          company: formData.company,
          startedAt,
        }),
      });

      const result = (await response.json()) as {
        error?: string;
        fieldErrors?: FormErrors;
      };

      if (!response.ok) {
        setErrors(result.fieldErrors ?? {});
        setStatus('error');
        setStatusMessage(result.error || 'Unable to send message right now.');
        return;
      }

      setFormData(initialForm);
      setStatus('success');
      setStatusMessage('Message sent successfully. I will get back to you soon.');
    } catch {
      setStatus('error');
      setStatusMessage('Unable to send message right now. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-start">
        <div>
          <div className="mb-8 text-left">
            <div className="inline-flex flex-col items-start">
              <h2 className={`text-4xl sm:text-5xl font-extrabold tracking-wide ${darkMode ? 'text-white' : 'text-black'}`}>
                Get In Touch
              </h2>
              <div className={`mt-3 h-1 w-[72%] rounded-full ${darkMode ? 'bg-gradient-to-r from-[#838ce5] to-[#d6b9fc]' : 'bg-gradient-to-r from-[#50207A] to-[#838ce5]'}`} />
            </div>
          </div>

          <div className={`space-y-4 ${darkMode ? 'text-white/90' : 'text-black/90'}`}>
            <a href="https://github.com/Anshul-Sehgal10" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#838ce5] transition-colors">
              <Github className="w-5 h-5" />
              <span>github.com/Anshul</span>
            </a>
            <a href="https://www.linkedin.com/in/anshul-sehgal-624108355/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#838ce5] transition-colors">
              <Linkedin className="w-5 h-5" />
              <span>linkedin.com/in/Anshul</span>
            </a>
            <a href="mailto:anshulsehgal40601@gmail.com" className="flex items-center gap-3 hover:text-[#838ce5] transition-colors">
              <Mail className="w-5 h-5" />
              <span>anshulsehgal40601@gmail.com</span>
            </a>
            <a href="tel:+917206043563" className="flex items-center gap-3 hover:text-[#838ce5] transition-colors">
              <Phone className="w-5 h-5" />
              <span>+91 72060 43563</span>
            </a>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          noValidate
          className={`rounded-2xl p-8 transition-all duration-300 ${darkMode ? 'bg-black/50 border border-[#838ce5]/20 shadow-xl' : 'bg-white border border-[#838ce5]/35 shadow-lg'}`}
        >
          <div className="mb-6">
            <label className={`block mb-2 font-semibold ${darkMode ? 'text-white' : 'text-black/90'}`}>
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              minLength={2}
              maxLength={80}
              required
              aria-invalid={Boolean(errors.name)}
              className={`w-full px-4 py-3 rounded-xl transition-all duration-300 focus:scale-[1.02] ${darkMode ? 'bg-black/70 text-white border-[#838ce5]/30 placeholder-white/60' : 'bg-white text-black border-[#838ce5]/45 placeholder-black/55'} border-2 focus:outline-none focus:ring-2 focus:ring-[#838ce5]`}
              placeholder="Your name"
            />
            {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="mb-6">
            <label className={`block mb-2 font-semibold ${darkMode ? 'text-white' : 'text-black/90'}`}>
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              maxLength={254}
              required
              aria-invalid={Boolean(errors.email)}
              className={`w-full px-4 py-3 rounded-xl transition-all duration-300 focus:scale-[1.02] ${darkMode ? 'bg-black/70 text-white border-[#838ce5]/30 placeholder-white/60' : 'bg-white text-black border-[#838ce5]/45 placeholder-black/55'} border-2 focus:outline-none focus:ring-2 focus:ring-[#838ce5]`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="mb-6">
            <label className={`block mb-2 font-semibold ${darkMode ? 'text-white' : 'text-black/90'}`}>
              Message
            </label>
            <textarea
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              minLength={20}
              maxLength={2000}
              required
              aria-invalid={Boolean(errors.message)}
              className={`w-full px-4 py-3 rounded-xl transition-all duration-300 focus:scale-[1.02] ${darkMode ? 'bg-black/70 text-white border-[#838ce5]/30 placeholder-white/60' : 'bg-white text-black border-[#838ce5]/45 placeholder-black/55'} border-2 focus:outline-none focus:ring-2 focus:ring-[#838ce5]`}
              placeholder="Your message..."
            />
            {errors.message && <p className="mt-2 text-sm text-red-500">{errors.message}</p>}
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={formData.company}
              onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
            />
          </div>

          <p className={`mb-6 text-sm ${darkMode ? 'text-white/70' : 'text-black/65'}`}>
            This form is protected with server-side validation and anti-spam checks.
          </p>

          {statusMessage && (
            <p className={`mb-4 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-500'}`}>
              {statusMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-gradient-to-r from-[#50207A] to-[#838ce5] text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[#50207A]/50 shadow-lg hover:shadow-2xl"
          >
            {status === 'submitting' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
}