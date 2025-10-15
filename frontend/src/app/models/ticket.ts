export interface Ticket {
  id?: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  severity: string;
  reporterId?: number;
  reporterUsername?: string;  // Added reporter username
  assigneeId?: number;
  assigneeUsername?: string;  // Added assignee username
  createdAt?: Date;
  updatedAt?: Date;
}
