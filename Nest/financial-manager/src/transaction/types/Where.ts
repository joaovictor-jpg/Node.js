import { FindOperator } from 'typeorm';

export type Where = {
  idUser: string;
  data?: Date | FindOperator<Date>;
  category?: string;
  value?: number | FindOperator<number>;
};
