import { AvailabilityRule, Coach } from '../types';

const defaultAvailability: AvailabilityRule[] = [
  { dayOfWeek: 1, startTime: '06:00', endTime: '21:00', bufferMinutes: 30, leadTimeHours: 24 },
  { dayOfWeek: 2, startTime: '06:00', endTime: '21:00', bufferMinutes: 30, leadTimeHours: 24 },
  { dayOfWeek: 3, startTime: '06:00', endTime: '21:00', bufferMinutes: 30, leadTimeHours: 24 },
  { dayOfWeek: 4, startTime: '06:00', endTime: '21:00', bufferMinutes: 30, leadTimeHours: 24 },
  { dayOfWeek: 5, startTime: '06:00', endTime: '21:00', bufferMinutes: 30, leadTimeHours: 24 },
  { dayOfWeek: 6, startTime: '08:00', endTime: '18:00', bufferMinutes: 30, leadTimeHours: 24 },
];

export const coaches: Coach[] = [
  {
    id: '1',
    name: 'Rafael Silva',
    bio: 'Black belt in Brazilian Jiu-Jitsu with over 15 years of experience. Multiple-time world champion with a passion for teaching fundamental techniques.',
    accolades: [
      'IBJJF World Champion 2019',
      'Pan-American Champion 2018, 2020',
      'Black Belt under Marcelo Garcia'
    ],
    socials: [
      { platform: 'instagram', url: 'https://instagram.com/rafaelsilva_bjj' }
    ],
    photo: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
    specialties: ['Brazilian Jiu-Jitsu', 'No-Gi Grappling', 'Competition Training'],
    availabilityRules: defaultAvailability,
    hourlyRate: 120,
    isActive: true,
  },
  {
    id: '2',
    name: 'Kru Sirisak',
    bio: 'Former Rajadamnern Stadium champion with over 200 professional fights. Brings authentic Muay Thai from Thailand to teach traditional techniques.',
    accolades: [
      'Rajadamnern Stadium Champion',
      'Lumpinee Stadium Tournament Winner',
      '200+ Professional Fights'
    ],
    socials: [
      { platform: 'instagram', url: 'https://instagram.com/krusirisak' }
    ],
    photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
    specialties: ['Muay Thai', 'Traditional Thai Boxing', 'Clinch Work'],
    availabilityRules: defaultAvailability,
    hourlyRate: 100,
    isActive: true,
  },
  {
    id: '3',
    name: 'Mike Thompson',
    bio: 'Professional boxer turned coach with amateur and professional experience. Specializes in developing fundamental boxing skills and fight IQ.',
    accolades: [
      'Golden Gloves Champion',
      '15-3 Professional Record',
      'Certified Boxing Coach'
    ],
    socials: [
      { platform: 'instagram', url: 'https://instagram.com/mikethompson_boxing' }
    ],
    photo: 'https://images.pexels.com/photos/1153867/pexels-photo-1153867.jpeg',
    specialties: ['Boxing', 'Footwork', 'Ring Strategy'],
    availabilityRules: defaultAvailability,
    hourlyRate: 90,
    isActive: true,
  },
  {
    id: '4',
    name: 'Amanda Rodriguez',
    bio: 'UFC veteran with extensive MMA experience. Expert in combining striking and grappling for complete mixed martial arts training.',
    accolades: [
      'UFC Veteran (8 fights)',
      'Regional Title Holder',
      'TUF Alumni'
    ],
    socials: [
      { platform: 'instagram', url: 'https://instagram.com/amandarodriguez_mma' }
    ],
    photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    specialties: ['MMA', 'Women\'s Self-Defense', 'Cage Work'],
    availabilityRules: defaultAvailability,
    hourlyRate: 140,
    isActive: true,
  },
  {
    id: '5',
    name: 'Carlos Mendez',
    bio: 'Wrestling coach and MMA specialist focusing on takedowns, ground control, and defensive grappling techniques.',
    accolades: [
      'D1 Wrestling All-American',
      'State Championship Coach',
      '10+ Years MMA Experience'
    ],
    socials: [
      { platform: 'instagram', url: 'https://instagram.com/carlosmendez_wrestling' }
    ],
    photo: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg',
    specialties: ['Wrestling', 'Takedowns', 'Ground Control'],
    availabilityRules: defaultAvailability,
    hourlyRate: 110,
    isActive: true,
  }
];