export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  roles: UserRole[];
  memberships: Membership[];
  credits: number;
  defaultPaymentMethod?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  GUEST = 'guest',
  MEMBER = 'member',
  COACH = 'coach',
  ADMIN = 'admin',
}

export interface ClassDiscipline {
  id: string;
  slug: string;
  name: string;
  description: string;
  tags: string[];
  media: MediaItem[];
}

export interface ClassTemplate {
  id: string;
  disciplineId: string;
  title: string;
  level: ClassLevel;
  durationMin: number;
  description: string;
  gearNeeded: string[];
  coachIds: string[];
  price?: number;
  prerequisites?: string[];
}

export enum ClassLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  ALL_LEVELS = 'all_levels',
}

export interface ClassSession {
  id: string;
  templateId: string;
  coachId: string;
  locationId: string;
  room: string;
  startAt: Date;
  endAt: Date;
  capacity: number;
  bookedCount: number;
  waitlist: string[];
  status: SessionStatus;
}

export enum SessionStatus {
  SCHEDULED = 'scheduled',
  CANCELLED = 'cancelled',
  FULL = 'full',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
}

export interface Coach {
  id: string;
  name: string;
  bio: string;
  accolades: string[];
  socials: SocialLink[];
  photo: string;
  specialties: string[];
  availabilityRules: AvailabilityRule[];
  hourlyRate?: number;
  isActive: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface AvailabilityRule {
  dayOfWeek: number; // 0-6
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  bufferMinutes: number;
  leadTimeHours: number;
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: BillingPeriod;
  benefits: string[];
  maxClassesPerPeriod?: number;
  classAccess: string[];
  terms: string;
  isPopular?: boolean;
}

export enum BillingPeriod {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

export interface Membership {
  id: string;
  userId: string;
  planId: string;
  status: MembershipStatus;
  startDate: Date;
  endDate?: Date;
  remainingClasses?: number;
}

export enum MembershipStatus {
  ACTIVE = 'active',
  PAUSED = 'paused',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

export interface Booking {
  id: string;
  userId: string;
  sessionId: string;
  status: BookingStatus;
  createdAt: Date;
  source: string;
  penaltyApplied?: boolean;
  waitlistPosition?: number;
}

export enum BookingStatus {
  BOOKED = 'booked',
  CANCELLED = 'cancelled',
  WAITLISTED = 'waitlisted',
  NO_SHOW = 'no_show',
  ATTENDED = 'attended',
}

export interface PrivateSession {
  id: string;
  userId: string;
  coachId: string;
  startAt: Date;
  endAt: Date;
  price: number;
  status: PrivateSessionStatus;
  notes?: string;
  paymentIntentId?: string;
}

export enum PrivateSessionStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  description: string;
  categoryId: string;
  images: string[];
  variants: ProductVariant[];
  price: number;
  compareAtPrice?: number;
  stock: number;
  attributes: ProductAttribute[];
  isActive: boolean;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  attributes: { [key: string]: string };
}

export interface ProductAttribute {
  key: string;
  value: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  paymentIntentId?: string;
  shippingAddress?: Address;
  billingAddress?: Address;
  createdAt: Date;
}

export interface OrderItem {
  productId: string;
  variantId?: string;
  quantity: number;
  price: number;
  title: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ContentBlock {
  id: string;
  key: string;
  locale: string;
  json: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string;
  caption?: string;
}

export interface Location {
  id: string;
  name: string;
  address: Address;
  phone: string;
  email: string;
  rooms: Room[];
  amenities: string[];
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  equipment: string[];
}

export interface ApiResponse<T> {
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface ApiError {
  error: string;
  message: string;
  statusCode: number;
  details?: any;
}