export type BookRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface BookRequest {
  id: number;
  userId: number;
  userName: string;
  bookId: number;
  bookTitle: string;
  quantity: number;
  requestDate: string;
  status: BookRequestStatus;
}
