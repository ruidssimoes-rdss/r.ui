'use client';

/**
 * Footer Previews for Docs
 *
 * Uses web-native elements with Tailwind classes that reference CSS variables.
 */

function FooterLink({ children }: { children: React.ReactNode }) {
  return (
    <a href="#" className="text-sm text-[var(--component-text-muted)] hover:text-[var(--component-text)] transition-colors">
      {children}
    </a>
  );
}

function SocialIcon({ icon }: { icon: 'twitter' | 'github' | 'linkedin' | 'discord' }) {
  const icons = {
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    discord: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
      </svg>
    ),
  };

  return (
    <button className="w-10 h-10 rounded-lg bg-[var(--component-bg)] border border-[var(--component-border)] flex items-center justify-center text-[var(--component-text-muted)] hover:text-[var(--component-text)] hover:border-[var(--track-fill)] transition-colors">
      {icons[icon]}
    </button>
  );
}

export function FooterSimplePreview() {
  return (
    <div className="w-full max-w-3xl bg-[var(--preview-bg)] p-8 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--track-fill)] flex items-center justify-center text-white font-bold text-sm">
            r/
          </div>
          <span className="font-semibold text-[var(--component-text)]">r/ui</span>
        </div>
        <div className="flex gap-6">
          <FooterLink>Docs</FooterLink>
          <FooterLink>Components</FooterLink>
          <FooterLink>GitHub</FooterLink>
          <FooterLink>Discord</FooterLink>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-[var(--component-border)] flex items-center justify-between">
        <p className="text-sm text-[var(--component-text-muted)]">
          © {new Date().getFullYear()} r/ui. All rights reserved.
        </p>
        <div className="flex gap-2">
          <SocialIcon icon="twitter" />
          <SocialIcon icon="github" />
        </div>
      </div>
    </div>
  );
}

export function FooterColumnsPreview() {
  const links = {
    Product: ['Features', 'Pricing', 'Changelog', 'Roadmap'],
    Resources: ['Documentation', 'API Reference', 'Guides', 'Examples'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Legal: ['Privacy', 'Terms', 'License'],
  };

  return (
    <div className="w-full max-w-4xl bg-[var(--preview-bg)] p-8 rounded-xl">
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--track-fill)] flex items-center justify-center text-white font-bold text-sm">
              r/
            </div>
            <span className="font-semibold text-[var(--component-text)]">r/ui</span>
          </div>
          <p className="mt-4 text-sm text-[var(--component-text-muted)] max-w-xs">
            A modern UI library for building beautiful, accessible applications across all platforms.
          </p>
          <div className="mt-4 flex gap-2">
            <SocialIcon icon="twitter" />
            <SocialIcon icon="github" />
            <SocialIcon icon="discord" />
          </div>
        </div>
        {Object.entries(links).map(([title, items]) => (
          <div key={title}>
            <h4 className="font-semibold text-sm text-[var(--component-text)] mb-3">{title}</h4>
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <FooterLink key={item}>{item}</FooterLink>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-[var(--component-border)]">
        <p className="text-sm text-[var(--component-text-muted)]">
          © {new Date().getFullYear()} r/ui. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export function FooterWithNewsletterPreview() {
  return (
    <div className="w-full max-w-3xl bg-[var(--preview-bg)] p-8 rounded-xl">
      <div className="flex justify-between gap-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--track-fill)] flex items-center justify-center text-white font-bold text-sm">
              r/
            </div>
            <span className="font-semibold text-[var(--component-text)]">r/ui</span>
          </div>
          <p className="mt-3 text-sm text-[var(--component-text-muted)] max-w-xs">
            Build beautiful apps faster.
          </p>
        </div>
        <div className="max-w-xs">
          <h4 className="font-semibold text-[var(--component-text)]">Subscribe to our newsletter</h4>
          <p className="mt-1 text-sm text-[var(--component-text-muted)]">
            Get updates on new components and features.
          </p>
          <div className="mt-3 flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-10 px-3 rounded-lg bg-[var(--component-bg)] border border-[var(--component-border)] text-sm text-[var(--component-text)] placeholder:text-[var(--component-text-muted)]"
            />
            <button className="h-10 px-4 rounded-lg bg-[var(--track-fill)] text-white text-sm font-medium hover:opacity-90 transition-opacity">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-[var(--component-border)] flex items-center justify-between">
        <p className="text-sm text-[var(--component-text-muted)]">
          © {new Date().getFullYear()} r/ui. All rights reserved.
        </p>
        <div className="flex gap-4">
          <FooterLink>Privacy</FooterLink>
          <FooterLink>Terms</FooterLink>
        </div>
      </div>
    </div>
  );
}

export function FooterCenteredPreview() {
  return (
    <div className="w-full max-w-xl bg-[var(--preview-bg)] p-8 rounded-xl text-center">
      <div className="flex items-center justify-center gap-2">
        <div className="w-10 h-10 rounded-xl bg-[var(--track-fill)] flex items-center justify-center text-white font-bold">
          r/
        </div>
      </div>
      <p className="mt-4 text-sm text-[var(--component-text-muted)]">
        Beautiful UI components for React Native
      </p>
      <div className="mt-6 flex justify-center gap-6">
        <FooterLink>Home</FooterLink>
        <FooterLink>Docs</FooterLink>
        <FooterLink>Components</FooterLink>
        <FooterLink>GitHub</FooterLink>
      </div>
      <div className="mt-6 flex justify-center gap-2">
        <SocialIcon icon="twitter" />
        <SocialIcon icon="github" />
        <SocialIcon icon="linkedin" />
        <SocialIcon icon="discord" />
      </div>
      <p className="mt-6 text-sm text-[var(--component-text-muted)]">
        © {new Date().getFullYear()} r/ui. All rights reserved.
      </p>
    </div>
  );
}

export function FooterMinimalPreview() {
  return (
    <div className="w-full max-w-2xl bg-[var(--preview-bg)] p-6 rounded-xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--component-text-muted)]">
          © {new Date().getFullYear()} r/ui. All rights reserved.
        </p>
        <div className="flex gap-2">
          <SocialIcon icon="twitter" />
          <SocialIcon icon="github" />
          <SocialIcon icon="discord" />
        </div>
      </div>
    </div>
  );
}

export function FooterWithBrandPreview() {
  return (
    <div className="w-full max-w-3xl bg-[var(--preview-bg)] p-8 rounded-xl">
      <div className="flex items-start gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--track-fill)] to-purple-500 flex items-center justify-center text-white font-bold text-lg">
              r/
            </div>
            <div>
              <span className="block text-xl font-bold text-[var(--component-text)]">r/ui</span>
              <span className="text-xs text-[var(--component-text-muted)]">by the community</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-[var(--component-text-muted)] max-w-sm">
            A comprehensive React Native UI library built with accessibility and performance in mind. Open source and community-driven.
          </p>
        </div>
        <div className="flex gap-8">
          <div>
            <h4 className="font-semibold text-sm text-[var(--component-text)] mb-3">Links</h4>
            <div className="flex flex-col gap-2">
              <FooterLink>Documentation</FooterLink>
              <FooterLink>Components</FooterLink>
              <FooterLink>GitHub</FooterLink>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-[var(--component-text)] mb-3">Community</h4>
            <div className="flex flex-col gap-2">
              <FooterLink>Discord</FooterLink>
              <FooterLink>Twitter</FooterLink>
              <FooterLink>Discussions</FooterLink>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-[var(--component-border)]">
        <p className="text-sm text-[var(--component-text-muted)]">
          © {new Date().getFullYear()} r/ui. Released under the MIT License.
        </p>
      </div>
    </div>
  );
}
