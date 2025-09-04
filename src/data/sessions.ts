import { addDays, setHours, setMinutes, startOfWeek } from 'date-fns';
import { ClassSession, SessionStatus } from '../types';

const generateWeeklySchedule = (): ClassSession[] => {
  const sessions: ClassSession[] = [];
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 });

  // Morning classes (6:00 AM - 11:00 AM)
  const morningSlots = [
    { time: 6, templateId: '1', coachId: '1' }, // BJJ Fundamentals
    { time: 7, templateId: '3', coachId: '3' }, // Boxing Basics
    { time: 8, templateId: '2', coachId: '2' }, // Muay Thai
    { time: 9, templateId: '4', coachId: '4' }, // MMA
    { time: 10, templateId: '5', coachId: '1' }, // BJJ Advanced
  ];

  // Evening classes (5:00 PM - 9:00 PM)
  const eveningSlots = [
    { time: 17, templateId: '1', coachId: '1' }, // BJJ Fundamentals
    { time: 18, templateId: '6', coachId: '2' }, // Muay Thai Advanced
    { time: 19, templateId: '7', coachId: '3' }, // Boxing Competition
    { time: 20, templateId: '8', coachId: '4' }, // MMA Sparring
  ];

  // Generate sessions for the week
  for (let day = 0; day < 7; day++) {
    const currentDay = addDays(startDate, day);
    
    // Skip Sunday for most classes
    if (day === 6) continue;

    // Morning classes (Monday to Saturday)
    morningSlots.forEach((slot, index) => {
      if (day === 5 && index > 2) return; // Fewer Saturday morning classes
      
      sessions.push({
        id: `morning-${day}-${index}`,
        templateId: slot.templateId,
        coachId: slot.coachId,
        locationId: '1',
        room: index % 2 === 0 ? 'Main Mat' : 'Secondary Mat',
        startAt: setMinutes(setHours(currentDay, slot.time), 0),
        endAt: setMinutes(setHours(currentDay, slot.time + 1), 0),
        capacity: 20,
        bookedCount: Math.floor(Math.random() * 18), // Random booking count
        waitlist: [],
        status: SessionStatus.SCHEDULED,
      });
    });

    // Evening classes (Monday to Friday)
    if (day < 5) {
      eveningSlots.forEach((slot, index) => {
        sessions.push({
          id: `evening-${day}-${index}`,
          templateId: slot.templateId,
          coachId: slot.coachId,
          locationId: '1',
          room: index % 2 === 0 ? 'Main Mat' : 'Secondary Mat',
          startAt: setMinutes(setHours(currentDay, slot.time), 0),
          endAt: setMinutes(setHours(currentDay, slot.time + 1), 0),
          capacity: 20,
          bookedCount: Math.floor(Math.random() * 22), // Some over capacity for waitlist demo
          waitlist: Math.floor(Math.random() * 22) > 19 ? ['user1', 'user2'] : [],
          status: SessionStatus.SCHEDULED,
        });
      });
    }
  }

  return sessions;
};

export const sessions = generateWeeklySchedule();