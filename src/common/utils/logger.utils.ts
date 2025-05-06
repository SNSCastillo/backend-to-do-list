import { Logger, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export class RegistroPersonalizado extends Logger implements LoggerService {
  private logDir = path.join(__dirname, '../../../logs');
  private logFilePath = path.join(this.logDir, 'crud-eventos.log');

  private writeToFile(message: string) {
    // Verifica si el directorio existe; si no, lo crea
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }

    const log = `[${new Date().toISOString()}] ${message}\n`;
    fs.appendFileSync(this.logFilePath, log, { encoding: 'utf8' });
    return "Log registrado correctamente."
  }

  log(message: string, context?: string) {
    super.log(message, context);
    this.writeToFile(`[LOG] ${context ? `[${context}] ` : ''}${message}`);
    return "Log registrado correctamente."
  }

  error(message: string, trace?: string, context?: string) {
    super.error(message, trace, context);
    this.writeToFile(
      `[ERROR] ${context ? `[${context}] ` : ''}${message} ${trace || ''}`,
    );
    return "Log registrado correctamente."
  }

  warn(message: string, context?: string) {
    super.warn(message, context);
    this.writeToFile(`[WARN] ${context ? `[${context}] ` : ''}${message}`);
    return "Log registrado correctamente."
  }
}
