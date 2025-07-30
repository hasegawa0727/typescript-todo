export type Status = 'pending' | 'in-progress' | 'done';

export const statusLabel: {[key in Status]: string} = {
  pending: '未着手',
  'in-progress': '進行中',
  done: '完了'
};


export type Todo = {
  id: string;
  title: string;
  detail: string;
  status: Status;
}