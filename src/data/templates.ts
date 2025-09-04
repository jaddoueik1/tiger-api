import { ClassLevel, ClassTemplate } from '../types';

export const templates: ClassTemplate[] = [
  {
    id: '1',
    disciplineId: '1',
    title: 'BJJ Fundamentals',
    level: ClassLevel.BEGINNER,
    durationMin: 60,
    description: 'Learn the fundamental techniques of Brazilian Jiu-Jitsu including basic positions, escapes, and submissions.',
    gearNeeded: ['Gi or No-Gi attire', 'Mouthguard (optional)'],
    coachIds: ['1'],
    price: 30,
    prerequisites: ['No experience required']
  },
  {
    id: '2',
    disciplineId: '2',
    title: 'Muay Thai Basics',
    level: ClassLevel.BEGINNER,
    durationMin: 60,
    description: 'Introduction to Muay Thai fundamentals including stance, basic strikes, and pad work.',
    gearNeeded: ['Hand wraps', 'Boxing gloves', 'Shin guards'],
    coachIds: ['2'],
    price: 25,
  },
  {
    id: '3',
    disciplineId: '3',
    title: 'Boxing Basics',
    level: ClassLevel.BEGINNER,
    durationMin: 60,
    description: 'Learn proper boxing fundamentals including stance, footwork, and basic combinations.',
    gearNeeded: ['Hand wraps', 'Boxing gloves'],
    coachIds: ['3'],
    price: 25,
  },
  {
    id: '4',
    disciplineId: '4',
    title: 'MMA Fundamentals',
    level: ClassLevel.INTERMEDIATE,
    durationMin: 90,
    description: 'Mixed martial arts training combining striking, grappling, and transitions.',
    gearNeeded: ['MMA gloves', 'Shin guards', 'Mouthguard'],
    coachIds: ['4'],
    price: 35,
    prerequisites: ['Basic experience in at least one martial art']
  },
  {
    id: '5',
    disciplineId: '1',
    title: 'BJJ Advanced',
    level: ClassLevel.ADVANCED,
    durationMin: 75,
    description: 'Advanced Brazilian Jiu-Jitsu techniques, rolling, and competition preparation.',
    gearNeeded: ['Gi', 'Mouthguard'],
    coachIds: ['1'],
    price: 35,
    prerequisites: ['Blue belt or equivalent experience']
  },
  {
    id: '6',
    disciplineId: '2',
    title: 'Muay Thai Advanced',
    level: ClassLevel.ADVANCED,
    durationMin: 75,
    description: 'Advanced Muay Thai techniques including clinch work and sparring.',
    gearNeeded: ['Hand wraps', 'Boxing gloves', 'Shin guards', 'Headgear'],
    coachIds: ['2'],
    price: 30,
    prerequisites: ['6+ months Muay Thai experience']
  },
  {
    id: '7',
    disciplineId: '3',
    title: 'Boxing Competition',
    level: ClassLevel.ADVANCED,
    durationMin: 90,
    description: 'Competition-focused boxing training with sparring and fight preparation.',
    gearNeeded: ['Hand wraps', 'Boxing gloves', 'Headgear', 'Mouthguard'],
    coachIds: ['3'],
    price: 40,
    prerequisites: ['1+ year boxing experience', 'Coach approval']
  },
  {
    id: '8',
    disciplineId: '4',
    title: 'MMA Sparring',
    level: ClassLevel.ADVANCED,
    durationMin: 90,
    description: 'Live sparring and fight simulation for experienced practitioners.',
    gearNeeded: ['MMA gloves', 'Shin guards', 'Headgear', 'Mouthguard'],
    coachIds: ['4'],
    price: 45,
    prerequisites: ['6+ months MMA experience', 'Coach approval']
  }
];