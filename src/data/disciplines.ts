import { ClassDiscipline } from '../types';

export const disciplines: ClassDiscipline[] = [
  {
    id: '1',
    slug: 'brazilian-jiu-jitsu',
    name: 'Brazilian Jiu-Jitsu',
    description: 'The gentle art focusing on ground fighting, leverage, and technique over strength.',
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
    description: 'The art of eight limbs utilizing fists, elbows, knees, and shins.',
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
    description: 'Sweet science of punching with precision, footwork, and defensive skills.',
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
    description: 'Complete fighting system combining striking, grappling, and ground fighting.',
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