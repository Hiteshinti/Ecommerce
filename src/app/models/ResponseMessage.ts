export interface ResponseMessage<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}