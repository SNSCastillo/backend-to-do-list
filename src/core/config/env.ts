import { Logger } from "@nestjs/common";
import { z } from "zod";
import * as dotenv from 'dotenv';

dotenv.config();


const logger = new Logger("Variables entorno");

const parseBoolean = (value: unknown): boolean => {
  if (typeof value !== "string") return false;
  const normalizedValue = value.toLowerCase();
  return normalizedValue === "true";
};

const envSchema = z.object({
  TYPE: z.string(),
  HOST: z.string(),
  PORT: z.coerce.number().positive(),
  NAMEUSER: z.string(),
  PASSWORD: z.string(),
  DATABASE: z.string(),
  SSL: z.preprocess(parseBoolean, z.boolean()),
  JWT_SECRET: z.string().min(10),
  URL_FRONTEND: z.string(),
  CORREO: z.string(),
  CORREO_PASSWORD: z.string(),
  ENABLE_SWAGGER: z.preprocess(parseBoolean, z.boolean()),
  SWAGGER_URL: z.string(),
  SWAGGER_JSON_URL: z.string(),
  PORT_NEST: z.coerce.number().positive(),
});


const parseEnv = envSchema.safeParse(process.env);


if (!parseEnv.success) {
  logger.error("❌ Invalid environment variables:");
  logger.error(`⚠️ ${JSON.stringify(parseEnv.error.format())}`);
  throw new Error("🚫 Invalid environment variables");
}

// Log de variables cargadas
logger.log("✅ Variable de entorno cargados correctamente.");

// Variables to use the environment variables in a type-safe way
export const envVars = parseEnv.data;
console.log(typeof envVars.CORREO);


// Type to have the environment variables in a type-safe way
export type Env = z.infer<typeof envSchema>;
