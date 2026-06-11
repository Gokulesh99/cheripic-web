import { useState } from 'react';
import { createPortal } from 'react-dom';
import Reveal from './Reveal';
import { categories } from '../data/content';
import { submitPartnerApplication } from '../services/apiService';

export default function ApplyForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message }

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const [form, setForm] = useState({
    business: '',
    contact: '',
    email: '',
    website: '',
    category: '',
    city: '',
    about: '',
  });

  const [errors, setErrors] = useState({});

  const update = (key) => (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    // Remove error when user starts typing
    setErrors((prev) => ({
      ...prev,
      [key]: '',
    }));

    // Editing again means starting a new application — re-enable the button.
    if (submitted) setSubmitted(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.business.trim()) {
      newErrors.business = 'Business Name is required';
    }

    if (!form.contact.trim()) {
      newErrors.contact = 'Contact Name is required';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
    ) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (
      form.website &&
      !/^https?:\/\/.+/i.test(form.website)
    ) {
      newErrors.website =
        'Website must start with http:// or https://';
    }

    if (!form.category) {
      newErrors.category = 'Please select a category';
    }

    if (!form.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!form.about.trim()) {
      newErrors.about = 'Tell us about your experience';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async () => {
    const isValid = validateForm();

    if (!isValid) return;

    try {
      setLoading(true);

      const payload = {
        businessName: form.business,
        contactName: form.contact,
        email: form.email,
        website: form.website,
        category: form.category,
        city: form.city,
        about: form.about,
      };

      const response = await submitPartnerApplication(payload);

      console.log('Success:', response);

      setSubmitted(true);
      showToast('success', "Application received! We'll respond within 48 hours.");

      // Re-enable the form so another application can be submitted.
      setTimeout(() => setSubmitted(false), 5000);

      setForm({
        business: '',
        contact: '',
        email: '',
        website: '',
        category: '',
        city: '',
        about: '',
      });

      setErrors({});
    } catch (error) {
      console.error('Submission failed:', error);
      showToast('error', 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="apply">
      {toast &&
        createPortal(
          <div className={`toast toast-${toast.type}`} role="status">
            <span className="toast-icon">{toast.type === 'success' ? '✓' : '!'}</span>
            <span>{toast.message}</span>
            <button
              className="toast-close"
              onClick={() => setToast(null)}
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>,
          document.body
        )}

      <div className="W">
        <Reveal className="form-hd">
          <span
            className="slbl"
            style={{
              display: 'block',
              textAlign: 'center',
            }}
          >
            Begin the Partnership
          </span>

          <div
            className="grule"
            style={{ margin: '0 auto 32px' }}
          />

          <h2>
            Let's Create Meaningful
            <br />
            Experiences Together
          </h2>

          <p>
            Tell us about your business. Every application
            is reviewed personally. We respond within 48
            hours.
          </p>
        </Reveal>

        <Reveal className="fg" as="div">
          {/* Business Name */}
          <div className="ff">
            <label>Business Name *</label>

            <input
              type="text"
              placeholder="Your business name"
              value={form.business}
              onChange={update('business')}
              className={errors.business ? 'error' : ''}
            />

            {errors.business && (
              <span className="error-text">
                {errors.business}
              </span>
            )}
          </div>

          {/* Contact Name */}
          <div className="ff">
            <label>Contact Name *</label>

            <input
              type="text"
              placeholder="Your full name"
              value={form.contact}
              onChange={update('contact')}
              className={errors.contact ? 'error' : ''}
            />

            {errors.contact && (
              <span className="error-text">
                {errors.contact}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="ff">
            <label>Email Address *</label>

            <input
              type="email"
              placeholder="you@yourbusiness.com"
              value={form.email}
              onChange={update('email')}
              className={errors.email ? 'error' : ''}
            />

            {errors.email && (
              <span className="error-text">
                {errors.email}
              </span>
            )}
          </div>

          {/* Website */}
          <div className="ff">
            <label>Website</label>

            <input
              type="url"
              placeholder="https://yourbusiness.com"
              value={form.website}
              onChange={update('website')}
              className={errors.website ? 'error' : ''}
            />

            {errors.website && (
              <span className="error-text">
                {errors.website}
              </span>
            )}
          </div>

          {/* Category */}
          <div className="ff">
            <label>Business Category *</label>

            <select
              value={form.category}
              onChange={update('category')}
              className={errors.category ? 'error' : ''}
            >
              <option value="">
                Select your category
              </option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>

            {errors.category && (
              <span className="error-text">
                {errors.category}
              </span>
            )}
          </div>

          {/* City */}
          <div className="ff">
            <label>City *</label>

            <input
              type="text"
              placeholder="Dubai, London, New York..."
              value={form.city}
              onChange={update('city')}
              className={errors.city ? 'error' : ''}
            />

            {errors.city && (
              <span className="error-text">
                {errors.city}
              </span>
            )}
          </div>

          {/* About */}
          <div className="ff full">
            <label>
              Tell Us About Your Experience *
            </label>

            <textarea
              placeholder="Describe what makes your experience unique and why it aligns with the CheriPic audience..."
              value={form.about}
              onChange={update('about')}
              className={errors.about ? 'error' : ''}
              rows={6}
            />

            {errors.about && (
              <span className="error-text">
                {errors.about}
              </span>
            )}
          </div>

          {/* Inline status message (always in document flow) */}
          {toast && (
            <div className={`fstatus fstatus-${toast.type}`} role="status">
              <span className="fstatus-icon">
                {toast.type === 'success' ? '✓' : '!'}
              </span>
              {toast.message}
            </div>
          )}

          {/* Submit Button */}
          <div className="fsubwrap">
            <button
              type="button"
              className="fsub"
              onClick={onSubmit}
              disabled={loading}
            >
              {loading
                ? 'Submitting...'
                : submitted
                ? 'Application Received ✓'
                : 'Apply For Partnership'}
            </button>
          </div>

          <div className="fnote">
            No fees. No contracts. Every application
            reviewed personally within 48 hours.
          </div>
        </Reveal>
      </div>
    </section>
  );
}