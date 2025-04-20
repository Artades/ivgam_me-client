export interface ISendEmailDTO {
    sender: string | { name?: string; address: string },
    subject: string;
    message: string;
  }
  