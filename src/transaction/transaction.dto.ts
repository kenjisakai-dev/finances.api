import { Transform } from 'class-transformer';
import { IsDefined, IsInt, Max, Min } from 'class-validator';

export class TransactionDTO {
  @IsInt({ message: 'O ano deve ser um número inteiro no formato aaaa' })
  @IsDefined({ message: 'Ano é obrigatório' })
  year: number;

  @Max(12, { message: 'O Mês deve ser passado entre 1 a 12' })
  @Min(1, { message: 'O Mês deve ser passado entre 1 a 12' })
  @Transform(({ value }) => parseInt(value))
  @IsDefined({ message: 'Mês é obrigatório' })
  month: number;

  @IsDefined({ message: 'Registro é obrigatório' })
  register: string;

  @Transform(({ value }) => parseFloat(value))
  @IsDefined({ message: 'Valor é obrigatório' })
  value: number;

  @IsDefined({ message: 'Categoria é obrigatório' })
  category: string;

  @IsDefined({ message: 'Tipo é obrigatório' })
  type: string;
}
