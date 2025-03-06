import { plainToInstance } from 'class-transformer'
import { IsNotEmpty, IsString, validateSync } from 'class-validator'

class Env {
  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string

  @IsString()
  @IsNotEmpty()
  DATABASE_URL: string
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(Env, config, {
    enableImplicitConversion: true
  })
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}
