import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsInt, Max, Min } from 'class-validator';

export class TransactionDTO {
  @Expose({ name: 'ANO' })
  @IsInt({ message: 'O ano deve ser um número inteiro no formato aaaa' })
  @IsDefined({ message: 'Ano é obrigatório' })
  year: number;

  @Expose({ name: 'MÊS' })
  @Max(12, { message: 'O Mês deve ser passado entre 1 a 12' })
  @Min(1, { message: 'O Mês deve ser passado entre 1 a 12' })
  @Transform(({ value }) => parseInt(value))
  @IsDefined({ message: 'Mês é obrigatório' })
  month: number;

  @Expose({ name: 'MOVIMENTAÇÕES' })
  @IsDefined({ message: 'Registro é obrigatório' })
  register: string;

  @Expose({ name: 'VALOR' })
  @Transform(({ value }) => parseFloat(value))
  @IsDefined({ message: 'Valor é obrigatório' })
  value: number;

  @Expose({ name: 'CATEGORIA' })
  @IsDefined({ message: 'Categoria é obrigatório' })
  category: string;

  @Expose({ name: 'TIPO' })
  @IsDefined({ message: 'Tipo é obrigatório' })
  type: string;
}
