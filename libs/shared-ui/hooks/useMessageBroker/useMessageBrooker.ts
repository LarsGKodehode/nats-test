import { ConnectionOptions, connect } from 'nats.ws'

export interface BrookerOptions {
  /**
   * A server URL or a list of server URLs
   */
  servers: string | string[],
  /**
   * The subject channel to subscribe to
   */
  subject: string,
}

export interface IMessageBrooker {

}

/**
 * Contains all the error information we want to expose
 */
export interface BrookerError {
  errors: Error[]
}

export async function useMessageBrooker(
  brookerOptions: BrookerOptions
): Promise<IMessageBrooker | BrookerError> {
  // Construct options
  const options: ConnectionOptions = {
    servers: brookerOptions.servers
  }

  // Stores any errors
  const errors: Error[] = []

  // Try connecting to server
  let connection = await connect(options)
    .catch(error => { errors.push(new Error("failed to connect to any server")); return 0 })
  if (typeof (connection) === "number") return { errors }

  console.log(`connected to ${connection.getServer()}`);

  // Subscribe to a subject
  const subscription = connection.subscribe(brookerOptions.subject)

  const success = {
    subscription,
    close: subscription.drain
  }

  return errors || success
}