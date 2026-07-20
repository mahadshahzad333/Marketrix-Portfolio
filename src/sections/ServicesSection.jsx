import React from 'react';
import FadeIn from '../components/FadeIn';

const SERVICES = [
  {
    num: '01',
    name: 'Cinematic Reels',
    desc: 'Professional reels designed to capture attention.',
  },
  {
    num: '02',
    name: 'Food Photography',
    desc: 'Premium restaurant and café shoots.',
  },
  {
    num: '03',
    name: 'Product Shoots',
    desc: 'Commercial-quality product photography.',
  },
  {
    num: '04',
    name: 'Events Coverage',
    desc: 'Corporate and promotional events.',
  },
  {
    num: '05',
    name: 'Influencer Shoots & Collabs',
    desc: 'Providing top-tier influecner shoots and collaborating with brands.',
  },
  {
    num: '06',
    name: 'Graphic Design',
    desc: 'Creative social media posts & branding.',
  },
  {
    num: '07',
    name: 'Menu Design',
    desc: 'Professional menus for restaurants.',
  },
  {
    num: '08',
    name: 'SEO, META & TikTok Ads',
    desc: 'Reach new audiences effectively and improve your online visibility.',
  },
  {
    num: '09',
    name: 'Web & App Development',
    desc: 'Providing Custom Websites and Android App Development.',
  },
  {
    num: '10',
    name: 'Social Media Handling',
    desc: 'Managing your socials and giving maximum growth.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="price"
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: '#FFFFFF' }}
    >
      {/* ── Heading ── */}
      <FadeIn delay={0} y={40}>
        <h2
          className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ color: '#c00000 ', fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      {/* ── Service list ── */}
      <ul className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.num} delay={i * 0.1} y={30}>
            <li
              className="flex items-start gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderTop: '1px solid rgba(12, 12, 12, 0.15)',
                borderBottom:
                  i === SERVICES.length - 1 ? '1px solid rgba(12, 12, 12, 0.15)' : 'none',
              }}
            >
              {/* Number */}
              <span
                className="font-black leading-none flex-shrink-0"
                style={{ color: '#c00000 ', fontSize: 'clamp(2rem, 8vw, 110px)' }}
              >
                {service.num}
              </span>

              {/* Name + description */}
              <div className="flex flex-col justify-center pt-2 sm:pt-3 md:pt-4">
                <p
                  className="font-medium uppercase leading-tight"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)', color: '#0C0C0C' }}
                >
                  {service.name}
                </p>
                <p
                  className="font-light leading-relaxed max-w-2xl mt-2"
                  style={{
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)',
                    color: '#0C0C0C',
                    opacity: 0.6,
                  }}
                >
                  {service.desc}
                </p>
              </div>
            </li>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
