import { SignUpSchema } from '@/schemas';

interface DemoUser extends SignUpSchema {
  photos?: string[];
}

export const demoUsers: DemoUser[] = [
  {
    firstName: 'Tom',
    lastName: 'Hope',
    email: 'tom@e.com',
    password: 'tttttt',
    photos: [],
  },
  {
    firstName: 'Edge',
    lastName: 'Brown',
    email: 'edge@e.com',
    password: 'eeeeee',
    photos: ['demo-edge-1.png', 'demo-edge-2.png', 'demo-edge-3.png'],
  },
  {
    firstName: 'Abeba',
    lastName: 'Yohannes',
    email: 'abeba@e.com',
    password: 'aaaaaa',
    photos: [
      'demo-abeba-1.png',
      'demo-abeba-2.png',
      'demo-abeba-3.png',
      'demo-abeba-4.png',
    ],
  },
  {
    firstName: 'Sarah',
    lastName: 'Miller',
    email: 'sarah@e.com',
    password: 'ssssss',
  },
  {
    firstName: 'Abdii',
    lastName: 'Beenoo',
    email: 'abdii@e.com',
    password: 'aaaaaa',
  },
  {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@e.com',
    password: 'jjjjjj',
  },
  {
    firstName: 'Chaltu',
    lastName: 'Borena',
    email: 'chaltu@e.com',
    password: 'cccccc',
  },
];
