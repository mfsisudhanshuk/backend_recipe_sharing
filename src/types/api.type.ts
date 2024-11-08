export interface ApiResponse<T> {
  error: string | null;
  message: string | null;
  data: T | null;
  httpStatus: number;
}
