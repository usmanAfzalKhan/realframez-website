"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Contact.module.scss";
import { services } from "../../data/services";

// Package definitions and their included service slugs
const packageDefinitions = [
  {
    slug: "essential",
    title: "Essential",
    includes: ["photography", "aerial-photography"],
    price: 199.99,
  },
  {
    slug: "silver",
    title: "Silver",
    includes: ["photography", "twilight-shoots", "aerial-photography"],
    price: 249.99,
  },
  {
    slug: "platinum",
    title: "Platinum",
    includes: [
      "photography",
      "twilight-shoots",
      "aerial-photography",
      "drone-aerial-video",
      "video-production",
      "social-media-reel-with-realtor",
    ],
    price: 479.99,
  },
];

const today = new Date().toISOString().split("T")[0];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    packages: [],
    services: [],
    street: "",
    city: "",
    province: "",
    date: today,
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [submittedPhone, setSubmittedPhone] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const preService = params.get("service");
    const prePackage = params.get("package");
    const special = params.get("special");
    setForm((f) => {
      const updated = { ...f };
      if (preService) {
        updated.services = [preService];
      }
      if (prePackage) {
        updated.packages = [prePackage];
      }
      if (special === "first-time-client") {
        const tag = "First-time client";
        if (updated.message) {
          if (!updated.message.includes(tag)) {
            updated.message = `${tag} - ${updated.message}`;
          }
        } else {
          updated.message = tag;
        }
      }
      return updated;
    });
  }, []);

  const normalizePhoneDigits = (val) => {
    const digitsOnly = val.replace(/\D/g, "");
    return digitsOnly.slice(0, 10);
  };

  const formatPhoneNumber = (value) => {
    const digits = normalizePhoneDigits(value);
    if (digits.length === 10) {
      return digits.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }
    return digits;
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!/^([0-9]{3}-[0-9]{3}-[0-9]{4})$/.test(form.phone))
      errs.phone = "Enter a valid 10-digit phone number.";
    if (!form.street.trim()) errs.street = "Street address is required.";
    if (form.packages.length === 0 && form.services.length === 0)
      errs.services = "Select at least one service or package.";
    if (!form.province.trim()) errs.province = "Province is required.";
    if (!form.city.trim()) errs.city = "City is required.";
    if (!form.date) errs.date = "Please choose a date.";
    if (new Date(form.date) < new Date(today))
      errs.date = "Date cannot be in the past.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const digits = normalizePhoneDigits(value);
      setForm((f) => ({ ...f, phone: digits }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const handlePhoneBlur = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setForm((f) => ({ ...f, phone: formatted }));
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setForm((f) => {
      let updatedPackages = [...f.packages];
      packageDefinitions.forEach((pkg) => {
        if (pkg.includes.includes(value) && f.packages.includes(pkg.slug)) {
          updatedPackages = updatedPackages.filter((p) => p !== pkg.slug);
        }
      });
      return {
        ...f,
        services: checked
          ? [...f.services, value]
          : f.services.filter((s) => s !== value),
        packages: updatedPackages,
      };
    });
    if (errors.services) setErrors((e) => ({ ...e, services: "" }));
  };

  const handlePackageChange = (e) => {
    const { value, checked } = e.target;
    setForm((f) => {
      if (checked) {
        const pkg = packageDefinitions.find((p) => p.slug === value);
        const addedServices = pkg ? pkg.includes : [];
        return {
          ...f,
          packages: [...f.packages, value],
          services: Array.from(new Set([...f.services, ...addedServices])),
        };
      } else {
        const remainingPackages = f.packages.filter((p) => p !== value);
        const remainingIncludes = remainingPackages.flatMap((slug) => {
          const p = packageDefinitions.find((pp) => pp.slug === slug);
          return p ? p.includes : [];
        });
        const toRemove = packageDefinitions.find((p) => p.slug === value)
          ?.includes || [];
        const newServices = f.services.filter((s) => {
          if (toRemove.includes(s) && !remainingIncludes.includes(s)) {
            return false;
          }
          return true;
        });
        return {
          ...f,
          packages: remainingPackages,
          services: newServices,
        };
      }
    });
    if (errors.services) setErrors((e) => ({ ...e, services: "" }));
  };

  const handleSelectAllServices = (e) => {
    const checked = e.target.checked;
    setForm((f) => ({
      ...f,
      services: checked ? services.map((s) => s.slug) : [],
      packages: [],
    }));
    if (errors.services) setErrors((e) => ({ ...e, services: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setStatus("");
    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        name: form.name,
        phone: form.phone,
        packages: form.packages,
        services: form.services,
        address: {
          street: form.street,
          city: form.city,
          province: form.province,
        },
        date: form.date,
        message: form.message,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setSubmittedPhone(form.phone);
      setStatus("SENT");
      setForm({
        name: "",
        phone: "",
        packages: [],
        services: [],
        street: "",
        city: "",
        province: "",
        date: today,
        message: "",
      });
    } catch {
      setStatus("ERROR");
    } finally {
      setLoading(false);
    }
  };

  if (status === "SENT") {
    return (
      <section
        className={styles.main}
        style={{
          paddingTop: "var(--header-offset, 100px)",
          textAlign: "center",
        }}
      >
        <Image
          src="/images/Logo.png"
          alt="RealFrames Logo"
          width={120}
          height={120}
          className={styles.thankLogo}
          style={{ margin: "0 auto", display: "block" }}
        />
        <h1 className={styles.title}>Thank You!</h1>
        <p className={styles.intro}>
          We appreciate you reaching out. A member of our team will contact you
          at <strong>{submittedPhone}</strong> within the next 2–5 business
          days.
        </p>
        <p className={styles.intro}>
          If you need immediate assistance, please call us at{" "}
          <strong>647-533-2748</strong>.
        </p>
      </section>
    );
  }

  return (
    <section
      className={styles.main}
      style={{
        paddingTop: "var(--header-offset, 100px)",
        maxWidth: 1000,
        margin: "0 auto",
      }}
    >
      <h1 className={styles.title} style={{ textAlign: "center" }}>
        Contact Us
      </h1>
      <p className={styles.intro}>
        You can reach us via <a href="tel:6475332748">phone</a>,{" "}
        <a href="https://www.instagram.com/realframes.ca/?igsh=MWcyeGQ5NGhzNGNpNg%3D%3D#">
          Instagram
        </a>{" "}
        or{" "}
        <a href="https://www.tiktok.com/@realframes.ca?_t=ZS-8yVAStzmNwm&_r=1">
          TikTok
        </a>
        . If you’d rather not use those, fill out the form below and we’ll be in
        touch soon.
      </p>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
        aria-describedby="form-errors"
      >
        {/* Name */}
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="name">
            <span aria-hidden="true" className={styles.req}>
              *
            </span>{" "}
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className={styles.input}
            value={form.name}
            onChange={handleChange}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "error-name" : undefined}
          />
          {errors.name && (
            <p className={styles.error} id="error-name" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="phone">
            <span aria-hidden="true" className={styles.req}>
              *
            </span>{" "}
            Phone
          </label>
          <div className={styles.phoneRow}>
            <div className={styles.plusOne} aria-hidden="true">
              +1
            </div>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={styles.input}
              value={form.phone}
              onChange={handleChange}
              onBlur={handlePhoneBlur}
              placeholder="123-456-7890"
              required
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "error-phone" : undefined}
            />
          </div>
          {errors.phone && (
            <p className={styles.error} id="error-phone" role="alert">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Address */}
        <div
          className={styles.addressWrapper}
          style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}
        >
          <div
            className={styles.fieldGroup}
            style={{ flex: "1 1 100%", minWidth: 0 }}
          >
            <label className={styles.label} htmlFor="street">
              Street Address
            </label>
            <input
              id="street"
              name="street"
              type="text"
              className={styles.input}
              value={form.street}
              onChange={handleChange}
              required
              aria-invalid={!!errors.street}
              aria-describedby={errors.street ? "error-street" : undefined}
            />
            {errors.street && (
              <p className={styles.error} id="error-street" role="alert">
                {errors.street}
              </p>
            )}
          </div>
          <div
            className={styles.fieldGroup}
            style={{ flex: "1 1 50%", minWidth: 0 }}
          >
            <label className={styles.label} htmlFor="city">
              <span aria-hidden="true" className={styles.req}>
                *
              </span>{" "}
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              className={styles.input}
              value={form.city}
              onChange={handleChange}
              required
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? "error-city" : undefined}
            />
            {errors.city && (
              <p className={styles.error} id="error-city" role="alert">
                {errors.city}
              </p>
            )}
          </div>
          <div
            className={styles.fieldGroup}
            style={{ flex: "1 1 50%", minWidth: 0 }}
          >
            <label className={styles.label} htmlFor="province">
              <span aria-hidden="true" className={styles.req}>
                *
              </span>{" "}
              Province
            </label>
            <input
              id="province"
              name="province"
              type="text"
              className={styles.input}
              value={form.province}
              onChange={handleChange}
              required
              aria-invalid={!!errors.province}
              aria-describedby={errors.province ? "error-province" : undefined}
            />
            {errors.province && (
              <p className={styles.error} id="error-province" role="alert">
                {errors.province}
              </p>
            )}
          </div>
        </div>

        {/* Package or Services */}
        <div className={styles.sectionRow}>
          <p className={styles.label}>
            <span aria-hidden="true" className={styles.req}>
              *
            </span>{" "}
            Package or Services
          </p>
          <div
            className={styles.inlineOptions}
            aria-label="Package and service selection"
          >
            {packageDefinitions.map((pkg) => (
              <div key={pkg.slug} className={styles.optionItem}>
                <input
                  type="checkbox"
                  id={`pkg-${pkg.slug}`}
                  name="packages"
                  value={pkg.slug}
                  checked={form.packages.includes(pkg.slug)}
                  onChange={handlePackageChange}
                  aria-checked={form.packages.includes(pkg.slug)}
                />
                <label
                  className={styles.checkboxLabel}
                  htmlFor={`pkg-${pkg.slug}`}
                >
                  <div>{pkg.title}</div>
                  {pkg.price && (
                    <div className={styles.subtext}>${pkg.price}</div>
                  )}
                  <div className={styles.subtext}>
                    Includes:{" "}
                    {pkg.includes
                      .map((slug) => {
                        const svc = services.find((s) => s.slug === slug);
                        return svc ? svc.title : slug;
                      })
                      .join(", ")}
                  </div>
                </label>
              </div>
            ))}

            {services.map((svc) => {
              const id = `service-${svc.slug}`;
              const disabled = form.packages.some((pkgSlug) => {
                const pkg = packageDefinitions.find((p) => p.slug === pkgSlug);
                return pkg?.includes.includes(svc.slug);
              });
              return (
                <div key={id} className={styles.optionItem}>
                  <input
                    type="checkbox"
                    id={id}
                    name="services"
                    value={svc.slug}
                    checked={form.services.includes(svc.slug)}
                    onChange={handleServiceChange}
                    disabled={disabled}
                    aria-checked={form.services.includes(svc.slug)}
                  />
                  <label
                    className={styles.checkboxLabel}
                    htmlFor={id}
                    style={
                      disabled ? { opacity: 0.6, cursor: "not-allowed" } : {}
                    }
                  >
                    <div>{svc.title}</div>
                    {svc.price && (
                      <div className={styles.subtext}>{svc.price}</div>
                    )}
                    {disabled && (
                      <div className={styles.subtext}>
                        Included in selected package
                      </div>
                    )}
                  </label>
                </div>
              );
            })}
          </div>
          {errors.services && (
            <p className={styles.error} id="error-services" role="alert">
              {errors.services}
            </p>
          )}
        </div>

        {/* Date */}
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="date">
            <span aria-hidden="true" className={styles.req}>
              *
            </span>{" "}
            Appointment Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            className={styles.input}
            value={form.date}
            onChange={handleChange}
            min={today}
            required
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? "error-date" : undefined}
          />
          {errors.date && (
            <p className={styles.error} id="error-date" role="alert">
              {errors.date}
            </p>
          )}
        </div>

        {/* Message */}
        <div className={styles.fieldGroup}>
          <label className={styles.label} htmlFor="message">
            Additional Message
          </label>
          <textarea
            id="message"
            name="message"
            className={styles.textarea}
            rows="4"
            value={form.message}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}
        <div className={styles.addBtnWrap}>
          <button
            type="submit"
            className={styles.addBtn}
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? "Sending…" : "Send Message"}
          </button>
        </div>

        {status === "ERROR" && (
          <p className={styles.error} role="alert">
            ❌ Something went wrong. Please try again.
          </p>
        )}
      </form>
    </section>
  );
}
