// Declare the 'http' module
declare module "http" {
  import { EventEmitter } from "events"
  import { Readable, Writable } from "stream"

  export interface IncomingMessage extends Readable {
    url?: string
    method?: string
    headers: Record<string, string | string[] | undefined>
  }

  export interface ServerResponse extends Writable {
    statusCode?: number
    setHeader(name: string, value: string | number | string[]): void
    end(chunk: any, encoding?: string, callback?: () => void): void
  }

  export function createServer(
    requestListener?: (req: IncomingMessage, res: ServerResponse) => void
  ): Server

  export class Server extends EventEmitter {
    listen(
      port: number,
      hostname?: string,
      backlog?: number,
      callback?: () => void
    ): this
    listen(port: number, hostname?: string, callback?: () => void): this
    listen(port: number, callback?: () => void): this
    listen(callback?: () => void): this
    close(callback?: (err?: Error) => void): this
  }
}

// Declare the 'stream' module
declare module "stream" {
  import { EventEmitter } from "events"

  export class Readable extends EventEmitter {
    read(size?: number): any
  }

  export class Writable extends EventEmitter {
    write(
      chunk: any,
      encoding?: string,
      callback?: (error?: Error) => void
    ): boolean
    end(chunk?: any, encoding?: string, callback?: () => void): void
  }
}

// Declare the 'events' module
declare module "events" {
  export class EventEmitter {
    on(event: string, listener: (...args: any[]) => void): this
    emit(event: string, ...args: any[]): boolean
  }
}

// Declare global types for Node.js
declare const require: (module: string) => any
declare const module: { exports: any }
declare const process: {
  exit(code?: number): void
  env: Record<string, string>
}
