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
  },
  {
    firstName: 'Abeba',
    lastName: 'Yohannes',
    email: 'abeba@e.com',
    password: 'aaaaaa',
  },
];
