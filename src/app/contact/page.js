// src/app/contact/page.js

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Contact.module.scss';
import { services } from '../../data/services';
import packagesContent from '../packages/packagesContent';

const packageDefinitions =
  packagesContent.sections.map((pkg) => ({
    slug: pkg.id,
    title: pkg.title,
    price: pkg.price,
    priceValue: pkg.priceValue,
    includes: pkg.includes || [],
    features: pkg.features || [],
    addon: pkg.addon || null,
  }));

/*
 * Interior/Exterior Photography is no longer displayed
 * as an A La Carte service.
 *
 * It can still be selected internally when a package
 * containing photography is chosen.
 */
const aLaCarteServices = services.filter(
  (service) => service.slug !== 'photography',
);

const today = new Date()
  .toISOString()
  .split('T')[0];

function getServiceDisplay(service) {
  if (
    service.slug ===
    'social-media-reel-with-realtor'
  ) {
    return {
      title:
        'Agent-On-Camera Social Media Reel',
      price: '$99.99',
    };
  }

  return {
    title: service.title,
    price: service.price,
  };
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    packages: [],
    services: [],
    street: '',
    city: '',
    province: 'Ontario',
    date: today,
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [loading, setLoading] =
    useState(false);

  const [
    submittedPhone,
    setSubmittedPhone,
  ] = useState('');

  /*
   * Automatically select package and reel/service
   * when arriving through a Book Now link.
   */
  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search,
    );

    const preService =
      params.get('service');

    const prePackage =
      params.get('package');

    const special =
      params.get('special');

    setForm((currentForm) => {
      const updated = {
        ...currentForm,

        packages: [
          ...currentForm.packages,
        ],

        services: [
          ...currentForm.services,
        ],
      };

      if (prePackage) {
        const selectedPackage =
          packageDefinitions.find(
            (pkg) =>
              pkg.slug === prePackage,
          );

        if (selectedPackage) {
          updated.packages = [
            selectedPackage.slug,
          ];

          updated.services =
            Array.from(
              new Set([
                ...updated.services,
                ...selectedPackage.includes,
              ]),
            );
        }
      }

      if (preService) {
        updated.services =
          Array.from(
            new Set([
              ...updated.services,
              preService,
            ]),
          );
      }

      if (
        special ===
        'first-time-client'
      ) {
        const tag =
          'First-time client';

        if (updated.message) {
          if (
            !updated.message.includes(
              tag,
            )
          ) {
            updated.message =
              `${tag} - ${updated.message}`;
          }
        } else {
          updated.message = tag;
        }
      }

      return updated;
    });
  }, []);

  const normalizePhoneDigits = (
    value,
  ) => {
    const digitsOnly =
      value.replace(/\D/g, '');

    return digitsOnly.slice(0, 10);
  };

  const formatPhoneNumber = (
    value,
  ) => {
    const digits =
      normalizePhoneDigits(value);

    if (digits.length === 10) {
      return digits.replace(
        /(\d{3})(\d{3})(\d{4})/,
        '$1-$2-$3',
      );
    }

    return digits;
  };

  const validate = () => {
    const validationErrors = {};

    if (!form.name.trim()) {
      validationErrors.name =
        'Name is required.';
    }

    if (
      !/^([0-9]{3}-[0-9]{3}-[0-9]{4})$/.test(
        form.phone,
      )
    ) {
      validationErrors.phone =
        'Enter a valid 10-digit phone number.';
    }

    if (!form.street.trim()) {
      validationErrors.street =
        'Street address is required.';
    }

    if (
      form.packages.length === 0 &&
      form.services.length === 0
    ) {
      validationErrors.services =
        'Select at least one service or package.';
    }

    if (!form.province.trim()) {
      validationErrors.province =
        'Province is required.';
    }

    if (!form.city.trim()) {
      validationErrors.city =
        'City is required.';
    }

    if (!form.date) {
      validationErrors.date =
        'Please choose a date.';
    }

    if (
      new Date(form.date) <
      new Date(today)
    ) {
      validationErrors.date =
        'Date cannot be in the past.';
    }

    setErrors(validationErrors);

    return (
      Object.keys(validationErrors)
        .length === 0
    );
  };

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    if (name === 'phone') {
      const digits =
        normalizePhoneDigits(value);

      setForm((currentForm) => ({
        ...currentForm,
        phone: digits,
      }));
    } else {
      setForm((currentForm) => ({
        ...currentForm,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors(
        (currentErrors) => ({
          ...currentErrors,
          [name]: '',
        }),
      );
    }
  };

  const handlePhoneBlur = (
    event,
  ) => {
    const formatted =
      formatPhoneNumber(
        event.target.value,
      );

    setForm((currentForm) => ({
      ...currentForm,
      phone: formatted,
    }));
  };

  /*
   * Manually changing a service that belongs to
   * a selected package deselects that package.
   */
  const handleServiceChange = (
    event,
  ) => {
    const { value, checked } =
      event.target;

    setForm((currentForm) => {
      let updatedPackages = [
        ...currentForm.packages,
      ];

      packageDefinitions.forEach(
        (pkg) => {
          if (
            pkg.includes.includes(
              value,
            ) &&
            currentForm.packages.includes(
              pkg.slug,
            )
          ) {
            updatedPackages =
              updatedPackages.filter(
                (packageSlug) =>
                  packageSlug !==
                  pkg.slug,
              );
          }
        },
      );

      const updatedServices =
        checked
          ? Array.from(
              new Set([
                ...currentForm.services,
                value,
              ]),
            )
          : currentForm.services.filter(
              (serviceSlug) =>
                serviceSlug !== value,
            );

      return {
        ...currentForm,
        services: updatedServices,
        packages: updatedPackages,
      };
    });

    if (errors.services) {
      setErrors(
        (currentErrors) => ({
          ...currentErrors,
          services: '',
        }),
      );
    }
  };

  /*
   * Selecting a package automatically selects
   * the services included in that package.
   */
  const handlePackageChange = (
    event,
  ) => {
    const { value, checked } =
      event.target;

    setForm((currentForm) => {
      if (checked) {
        const selectedPackage =
          packageDefinitions.find(
            (pkg) =>
              pkg.slug === value,
          );

        const includedServices =
          selectedPackage?.includes ||
          [];

        return {
          ...currentForm,

          packages: Array.from(
            new Set([
              ...currentForm.packages,
              value,
            ]),
          ),

          services: Array.from(
            new Set([
              ...currentForm.services,
              ...includedServices,
            ]),
          ),
        };
      }

      const remainingPackages =
        currentForm.packages.filter(
          (packageSlug) =>
            packageSlug !== value,
        );

      const remainingIncludedServices =
        remainingPackages.flatMap(
          (packageSlug) => {
            const pkg =
              packageDefinitions.find(
                (definition) =>
                  definition.slug ===
                  packageSlug,
              );

            return pkg?.includes || [];
          },
        );

      const removedPackage =
        packageDefinitions.find(
          (pkg) =>
            pkg.slug === value,
        );

      const servicesToRemove =
        removedPackage?.includes || [];

      const updatedServices =
        currentForm.services.filter(
          (serviceSlug) => {
            if (
              servicesToRemove.includes(
                serviceSlug,
              ) &&
              !remainingIncludedServices.includes(
                serviceSlug,
              )
            ) {
              return false;
            }

            return true;
          },
        );

      return {
        ...currentForm,

        packages:
          remainingPackages,

        services:
          updatedServices,
      };
    });

    if (errors.services) {
      setErrors(
        (currentErrors) => ({
          ...currentErrors,
          services: '',
        }),
      );
    }
  };

  const trackContactConversion =
    () => {
      try {
        if (
          typeof window ===
          'undefined'
        ) {
          return;
        }

        if (
          typeof window.gtag !==
          'function'
        ) {
          return;
        }

        window.gtag(
          'event',
          'ads_conversion_Contact_Us_1',
          {
            event_timeout: 2000,
          },
        );
      } catch {
        /*
         * Keep the contact form working
         * when tracking is unavailable.
         */
      }
    };

  const handleSubmit = async (
    event,
  ) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setStatus('');

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: form.name,
        phone: form.phone,

        packages:
          form.packages,

        services:
          form.services,

        address: {
          street: form.street,
          city: form.city,
          province: form.province,
        },

        date: form.date,
        message: form.message,
      };

      const response = await fetch(
        '/api/contact',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify(
            payload,
          ),
        },
      );

      if (!response.ok) {
        throw new Error();
      }

      trackContactConversion();

      setSubmittedPhone(
        form.phone,
      );

      setStatus('SENT');

      setForm({
        name: '',
        phone: '',
        packages: [],
        services: [],
        street: '',
        city: '',
        province: 'Ontario',
        date: today,
        message: '',
      });
    } catch {
      setStatus('ERROR');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'SENT') {
    return (
      <section
        className={styles.main}
        style={{
          paddingTop:
            'var(--header-offset, 100px)',

          textAlign: 'center',
        }}
      >
        <Image
          src="/images/Logo.png"
          alt="RealFrames Logo"
          width={120}
          height={120}
          className={
            styles.thankLogo
          }
          style={{
            margin: '0 auto',
            display: 'block',
          }}
        />

        <h1 className={styles.title}>
          Thank You!
        </h1>

        <p className={styles.intro}>
          We appreciate you reaching
          out. A member of our team
          will contact you at{' '}

          <strong>
            {submittedPhone}
          </strong>{' '}

          within the next 12 hours.
        </p>

        <p className={styles.intro}>
          If you need immediate
          assistance, please call us
          at{' '}

          <strong>
            647-533-2748
          </strong>
          .
        </p>
      </section>
    );
  }

  return (
    <section
      className={styles.main}
      style={{
        paddingTop:
          'var(--header-offset, 100px)',

        maxWidth: 1000,
        margin: '0 auto',
      }}
    >
      <h1
        className={styles.title}
        style={{
          textAlign: 'center',
        }}
      >
        Contact Us
      </h1>

      <p className={styles.intro}>
        You can reach us via{' '}

        <a href="tel:6475332748">
          phone
        </a>
        ,{' '}

        <a href="https://www.instagram.com/realframes.ca/?igsh=MWcyeGQ5NGhzNGNpNg%3D%3D#">
          Instagram
        </a>{' '}

        or{' '}

        <a href="https://www.tiktok.com/@realframes.ca?_t=ZS-8yVAStzmNwm&_r=1">
          TikTok
        </a>

        . If you’d rather not use
        those, fill out the form
        below and we’ll be in touch
        soon.
      </p>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
        aria-describedby="form-errors"
      >
        {/* Name */}

        <div
          className={
            styles.fieldGroup
          }
        >
          <label
            className={styles.label}
            htmlFor="name"
          >
            <span
              aria-hidden="true"
              className={styles.req}
            >
              *
            </span>{' '}

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
            aria-invalid={
              !!errors.name
            }
            aria-describedby={
              errors.name
                ? 'error-name'
                : undefined
            }
          />

          {errors.name && (
            <p
              className={styles.error}
              id="error-name"
              role="alert"
            >
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}

        <div
          className={
            styles.fieldGroup
          }
        >
          <label
            className={styles.label}
            htmlFor="phone"
          >
            <span
              aria-hidden="true"
              className={styles.req}
            >
              *
            </span>{' '}

            Phone
          </label>

          <div
            className={
              styles.phoneRow
            }
          >
            <div
              className={
                styles.plusOne
              }
              aria-hidden="true"
            >
              +1
            </div>

            <input
              id="phone"
              name="phone"
              type="tel"
              className={
                styles.input
              }
              value={form.phone}
              onChange={handleChange}
              onBlur={
                handlePhoneBlur
              }
              placeholder="123-456-7890"
              required
              aria-invalid={
                !!errors.phone
              }
              aria-describedby={
                errors.phone
                  ? 'error-phone'
                  : undefined
              }
            />
          </div>

          {errors.phone && (
            <p
              className={
                styles.error
              }
              id="error-phone"
              role="alert"
            >
              {errors.phone}
            </p>
          )}
        </div>

        {/* Address */}

        <div
          className={
            styles.addressWrapper
          }
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div
            className={
              styles.fieldGroup
            }
            style={{
              flex: '1 1 100%',
              minWidth: 0,
            }}
          >
            <label
              className={
                styles.label
              }
              htmlFor="street"
            >
              Street Address
            </label>

            <input
              id="street"
              name="street"
              type="text"
              className={
                styles.input
              }
              value={form.street}
              onChange={handleChange}
              required
              aria-invalid={
                !!errors.street
              }
              aria-describedby={
                errors.street
                  ? 'error-street'
                  : undefined
              }
            />

            {errors.street && (
              <p
                className={
                  styles.error
                }
                id="error-street"
                role="alert"
              >
                {errors.street}
              </p>
            )}
          </div>

          <div
            className={
              styles.fieldGroup
            }
            style={{
              flex: '1 1 50%',
              minWidth: 0,
            }}
          >
            <label
              className={
                styles.label
              }
              htmlFor="city"
            >
              <span
                aria-hidden="true"
                className={
                  styles.req
                }
              >
                *
              </span>{' '}

              City
            </label>

            <input
              id="city"
              name="city"
              type="text"
              className={
                styles.input
              }
              value={form.city}
              onChange={handleChange}
              required
              aria-invalid={
                !!errors.city
              }
              aria-describedby={
                errors.city
                  ? 'error-city'
                  : undefined
              }
            />

            {errors.city && (
              <p
                className={
                  styles.error
                }
                id="error-city"
                role="alert"
              >
                {errors.city}
              </p>
            )}
          </div>

          <div
            className={
              styles.fieldGroup
            }
            style={{
              flex: '1 1 50%',
              minWidth: 0,
            }}
          >
            <label
              className={
                styles.label
              }
              htmlFor="province"
            >
              <span
                aria-hidden="true"
                className={
                  styles.req
                }
              >
                *
              </span>{' '}

              Province
            </label>

            <input
              id="province"
              name="province"
              type="text"
              className={
                styles.input
              }
              value={form.province}
              readOnly
              required
              aria-invalid={
                !!errors.province
              }
              aria-describedby={
                errors.province
                  ? 'error-province'
                  : undefined
              }
            />

            {errors.province && (
              <p
                className={
                  styles.error
                }
                id="error-province"
                role="alert"
              >
                {errors.province}
              </p>
            )}
          </div>
        </div>

        {/* Packages and services */}

        <div
          className={
            styles.sectionRow
          }
        >
          <p className={styles.label}>
            <span
              aria-hidden="true"
              className={styles.req}
            >
              *
            </span>{' '}

            Package or Services
          </p>

          <div
            className={
              styles.inlineOptions
            }
            aria-label="Package and service selection"
          >
            {packageDefinitions.map(
              (pkg) => (
                <div
                  key={pkg.slug}
                  className={
                    styles.optionItem
                  }
                >
                  <input
                    type="checkbox"
                    id={`pkg-${pkg.slug}`}
                    name="packages"
                    value={pkg.slug}
                    checked={form.packages.includes(
                      pkg.slug,
                    )}
                    onChange={
                      handlePackageChange
                    }
                    aria-checked={form.packages.includes(
                      pkg.slug,
                    )}
                  />

                  <label
                    className={
                      styles.checkboxLabel
                    }
                    htmlFor={`pkg-${pkg.slug}`}
                  >
                    {/*
                     * Only the new package name is visible.
                     * Essential/Silver/Platinum are removed.
                     */}

                    <div>
                      <strong>
                        {pkg.title}
                      </strong>
                    </div>

                    <div
                      className={
                        styles.subtext
                      }
                    >
                      {pkg.price}
                    </div>

                    <div
                      className={
                        styles.subtext
                      }
                    >
                      Includes:{' '}

                      {pkg.features.join(
                        ', ',
                      )}
                    </div>

                    {pkg.addon && (
                      <div
                        className={
                          styles.subtext
                        }
                      >
                        Optional add-on:{' '}

                        {
                          pkg.addon
                            .label
                        }{' '}

                        —{' '}

                        {
                          pkg.addon
                            .price
                        }
                      </div>
                    )}
                  </label>
                </div>
              ),
            )}

            <div
              className={
                styles.aLaCarteLabel
              }
            >
              A La Carte
            </div>

            {/*
             * Photography has been filtered out here.
             */}

            {aLaCarteServices.map(
              (service) => {
                const id =
                  `service-${service.slug}`;

                const display =
                  getServiceDisplay(
                    service,
                  );

                const disabled =
                  form.packages.some(
                    (
                      packageSlug,
                    ) => {
                      const selectedPackage =
                        packageDefinitions.find(
                          (pkg) =>
                            pkg.slug ===
                            packageSlug,
                        );

                      return selectedPackage?.includes.includes(
                        service.slug,
                      );
                    },
                  );

                return (
                  <div
                    key={id}
                    className={
                      styles.optionItem
                    }
                  >
                    <input
                      type="checkbox"
                      id={id}
                      name="services"
                      value={
                        service.slug
                      }
                      checked={form.services.includes(
                        service.slug,
                      )}
                      onChange={
                        handleServiceChange
                      }
                      disabled={
                        disabled
                      }
                      aria-checked={form.services.includes(
                        service.slug,
                      )}
                    />

                    <label
                      className={
                        styles.checkboxLabel
                      }
                      htmlFor={id}
                      style={
                        disabled
                          ? {
                              opacity:
                                0.6,

                              cursor:
                                'not-allowed',
                            }
                          : {}
                      }
                    >
                      <div>
                        {
                          display.title
                        }
                      </div>

                      {display.price && (
                        <div
                          className={
                            styles.subtext
                          }
                        >
                          {
                            display.price
                          }
                        </div>
                      )}

                      {disabled && (
                        <div
                          className={
                            styles.subtext
                          }
                        >
                          Included in
                          selected package
                        </div>
                      )}
                    </label>
                  </div>
                );
              },
            )}
          </div>

          {errors.services && (
            <p
              className={
                styles.error
              }
              id="error-services"
              role="alert"
            >
              {errors.services}
            </p>
          )}
        </div>

        {/* Appointment date */}

        <div
          className={
            styles.fieldGroup
          }
        >
          <label
            className={styles.label}
            htmlFor="date"
          >
            <span
              aria-hidden="true"
              className={styles.req}
            >
              *
            </span>{' '}

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
            aria-invalid={
              !!errors.date
            }
            aria-describedby={
              errors.date
                ? 'error-date'
                : undefined
            }
          />

          {errors.date && (
            <p
              className={
                styles.error
              }
              id="error-date"
              role="alert"
            >
              {errors.date}
            </p>
          )}
        </div>

        {/* Additional message */}

        <div
          className={
            styles.fieldGroup
          }
        >
          <label
            className={styles.label}
            htmlFor="message"
          >
            Additional Message
          </label>

          <textarea
            id="message"
            name="message"
            className={
              styles.textarea
            }
            rows="4"
            value={form.message}
            onChange={handleChange}
          />
        </div>

        {/* Submit */}

        <div
          className={
            styles.addBtnWrap
          }
        >
          <button
            type="submit"
            className={
              styles.addBtn
            }
            disabled={loading}
            aria-busy={loading}
          >
            {loading
              ? 'Sending…'
              : 'Send Message'}
          </button>
        </div>

        {status === 'ERROR' && (
          <p
            className={styles.error}
            role="alert"
          >
            ❌ Something went wrong.
            Please try again.
          </p>
        )}
      </form>
    </section>
  );
}