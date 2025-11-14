import { ClassDiscipline } from '../types';

export const disciplines: ClassDiscipline[] = [
  {
    id: '1',
    slug: 'brazilian-jiu-jitsu',
    name: 'Brazilian Jiu-Jitsu',
    description:
      'A refined grappling art built on leverage, timing, and strategic control. BJJ offers a highly technical system of sweeps, escapes, submissions, and positional dominance—ideal for self-defense, competition, and long-term athletic development. Suitable for all levels, with Gi and No-Gi pathways for focused progression.',
    tags: ['grappling', 'ground-game', 'submissions', 'self-defense'],
    media: [
      {
        type: 'image',
        src: 'https://images.pexels.com/photos/7045836/pexels-photo-7045836.jpeg',
        alt: 'BJJ training session'
      }
    ]
  },
  {
    id: '2',
    slug: 'muay-thai',
    name: 'Muay Thai',
    description:
      'The elegant yet powerful art of eight limbs—combining punches, elbows, knees, and kicks with sophisticated timing and balance. Our Muay Thai program emphasizes authentic Thai fundamentals, fight-proven clinch work, pad rhythm, conditioning, and ring intelligence. Ideal for beginners seeking structure and fighters preparing for competition.',
    tags: ['striking', 'kickboxing', 'clinch', 'conditioning'],
    media: [
      {
        type: 'image',
        src: 'https://images.pexels.com/photos/4761663/pexels-photo-4761663.jpeg',
        alt: 'Muay Thai training'
      }
    ]
  },
  {
    id: '3',
    slug: 'boxing',
    name: 'Boxing',
    description:
      'A precision striking discipline centered around footwork, defensive mastery, timing, and crisp punching mechanics. Our boxing program develops technical sharpness, ring awareness, and athletic endurance through structured drilling, mitt work, and controlled sparring pathways. Designed for both newcomers and advanced practitioners refining competitive skills.',
    tags: ['striking', 'footwork', 'defense', 'conditioning'],
    media: [
      {
        type: 'image',
        src: 'https://images.pexels.com/photos/4761517/pexels-photo-4761517.jpeg',
        alt: 'Boxing training'
      }
    ]
  },
  {
    id: '4',
    slug: 'mma',
    name: 'Mixed Martial Arts',
    description:
      'A complete and modern combat system integrating striking, wrestling, and Brazilian Jiu-Jitsu into one unified framework. Our MMA program follows a systematic progression—stand-up engagement, takedown entries, cage work, positional control, and finishing mechanics. Ideal for athletes seeking professional-level development and those wanting the most well-rounded combat experience.',
    tags: ['complete-fighting', 'striking', 'grappling', 'cage-work'],
    media: [
      {
        type: 'image',
        src: 'https://images.pexels.com/photos/4761547/pexels-photo-4761547.jpeg',
        alt: 'MMA training'
      }
    ]
  }
];
