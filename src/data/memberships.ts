import { BillingPeriod, MembershipPlan } from '../types';

export const membershipPlans: MembershipPlan[] = [
  {
    id: '1',
    name: 'Drop-In',
    price: 30,
    currency: 'USD',
    period: BillingPeriod.MONTHLY,
    benefits: [
      'Single class access',
      'Equipment rental included',
      'Beginner-friendly'
    ],
    classAccess: ['all'],
    terms: 'Valid for single use only. No refunds.',
  },
  {
    id: '2',
    name: 'Class Pack - 10',
    price: 250,
    currency: 'USD',
    period: BillingPeriod.MONTHLY,
    benefits: [
      '10 classes to use within 3 months',
      'Equipment rental included',
      'Book up to 7 days in advance',
      'Free guest pass'
    ],
    maxClassesPerPeriod: 10,
    classAccess: ['all'],
    terms: 'Expires 90 days from purchase. No refunds on unused classes.',
  },
  {
    id: '3',
    name: 'Monthly Unlimited',
    price: 149,
    currency: 'USD',
    period: BillingPeriod.MONTHLY,
    benefits: [
      'Unlimited classes',
      'Equipment rental included',
      'Book up to 14 days in advance',
      'Free guest pass monthly',
      '10% shop discount'
    ],
    classAccess: ['all'],
    terms: 'Auto-renewing monthly subscription. Cancel anytime with 30 days notice.',
    isPopular: true,
  },
  {
    id: '4',
    name: 'Annual Unlimited',
    price: 1299,
    currency: 'USD',
    period: BillingPeriod.YEARLY,
    benefits: [
      'Unlimited classes',
      'Equipment rental included',
      'Priority booking (21 days advance)',
      'Monthly guest passes (2)',
      '15% shop discount',
      'Free private session monthly',
      'Access to members-only events'
    ],
    classAccess: ['all'],
    terms: 'Annual commitment required. Pause membership available.',
  },
  {
    id: '5',
    name: 'Student/Military',
    price: 99,
    currency: 'USD',
    period: BillingPeriod.MONTHLY,
    benefits: [
      'Unlimited classes',
      'Equipment rental included',
      'Valid student/military ID required',
      'Free guest pass monthly'
    ],
    classAccess: ['all'],
    terms: 'Proof of student enrollment or military service required.',
  }
];