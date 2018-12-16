import { Task } from './task';

export const TASKS: Task[] = [
  { id: 1, name: 'Study heat transfer', status : 'ongoing', description: 'Radiative balance',startingDate: '01/10', endingDate:'05/10' },
  { id: 2, name: 'Draw a model', status : 'ongoing', description: 'Using the software, draw a model of the satellite',startingDate: '02/10',endingDate:'05/10'},
  { id: 3, name: 'Upload on software',status : 'ongoing', description: 'The goal is to make it work on the heat transfer software',startingDate: '03/10',endingDate:'05/10'},
  { id: 4, name: 'Draw a second model',status : 'ongoing', description: 'one',startingDate: '04/10',endingDate:'05/10'},
  { id: 5, name: 'Calculate dimensions',status : 'ongoing', description: 'one',startingDate: '05/10',endingDate:'06/10'},
  
];