export const navigationConfig = {
  mainNav: [
    { title: 'Home', href: '/' },
    { title: 'Blog', href: '/blog' },
  ],
  
  footerNav: {
    product: [
      { title: 'Features', href: '/#features' },
      { title: 'Pricing', href: '/#pricing' },
      { title: 'FAQ', href: '/#faq' },
    ],
    legal: [
      { title: 'Privacidade', href: '/privacy' },
      { title: 'Termos', href: '/terms' },
    ],
  },
} as const
