export type Status = 'pending' | 'in-progress' | 'done';

export type Todo = {
  id: string;
  title: string;
  detail: string;
  status: Status;
}