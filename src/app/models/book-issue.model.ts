export type BookIssueStatus = 'ISSUED' | 'RETURNED';

export interface BookIssue {
  id: number;
  userId: number;
  userName: string;
  bookId: number;
  bookTitle: string;
  quantity: number;
  issueDate: string;
  dueDate: string;
  returnDate: string | null;
  status: BookIssueStatus;
}
