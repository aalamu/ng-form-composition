export class ApiResponse {

  public message: string;
  public readonly createdOn: Date;
  public readonly updatedOn: Date;

  public constructor(data: ApiResponse) {
    this.message = data.message ?? '';
    this.createdOn = data.createdOn ?? new Date();
    this.updatedOn = data.updatedOn ?? new Date();
  }
}

export class ErrorResponse {

  public message!: string;
  public status?: number;
  public reason: string | null;
  public type?: string | null;
  public path?: string | null;
  public timestamp?: Date | string;
  public fields?: any[];
  public details? : Record<any, any>;

  public constructor(data: ErrorResponse) {
    this.message = data.message ?? '';
    this.reason = data.type ?? null;
    this.status = data.status ?? 0;
    this.type = data.type ?? null;
    this.timestamp = data.timestamp ? new Date(data.timestamp) : new Date();
    this.fields = data.fields ?? [];
    this.details = data.details ?? {};
    this.path = data.path ?? null;
  }

  public static of(data: any): ErrorResponse {
    return new ErrorResponse(data);
  }
}
