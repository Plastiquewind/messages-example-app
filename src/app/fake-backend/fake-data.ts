import { User } from '../shared/models/user';
import { Message } from '../shared/models/message';
import { UserProfile } from '../shared/models/user-profile';

export const users: User[] = [
  {
    id: 1,
    name: 'Plastiquewind'
  },
  {
    id: 2,
    name: 'Joey'
  },
  {
    id: 3,
    name: 'Chandler'
  }
];

export const userProfiles: UserProfile[] = [
  {
    ...users[0],
    bio: `Hi! I'm a full-stack .NET developer with experience in Angular 2+, AngularJS and ASP.NET MVC/WebAPI/Core.
      Currently I'm looking for a pure front-end position because I'd really like to develop my skills
      of using Angular and Typescript. <3`,
    registrationDate: '2019-08-20T00:00:00Z'
  },
  {
    ...users[1],
    bio: `Joey doesn't share food!`,
    registrationDate: '2019-09-13T00:00:00Z'
  },
  {
    ...users[2],
    bio: `I've had a very long, hard day`,
    registrationDate: '2019-09-13T00:00:00Z'
  }
];

export const messages: Message[] = [
  {
    id: 6,
    author: users[1],
    text: `I don't like it when people take food off of my plate, okay?`,
    created: '2019-09-19T12:03:19Z'
  },
  {
    id: 5,
    author: users[2],
    text: `Someone on the subway licked my neck! LICKED MY NECK!`,
    created: '2019-09-19T12:02:25Z'
  },
  {
    id: 4,
    author: users[1],
    text: `Pizza! We like PIZZA!`,
    created: '2019-09-19T12:01:38Z'
  },
  {
    id: 3,
    author: users[2],
    text: `I just realized I can sleep with my eyes open`,
    created: '2019-09-19T12:01:04Z'
  },
  {
    id: 2,
    author: users[1],
    text: `Well, the fridge broke, so I had to eat everything`,
    created: '2019-09-19T11:58:23Z'
  },
  {
    id: 1,
    author: users[0],
    text: 'First here!',
    created: '2019-08-20T00:10:00Z'
  }
];
