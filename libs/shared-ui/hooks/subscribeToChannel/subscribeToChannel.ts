import {
  connect,
  ConnectionOptions,
  StringCodec,
} from 'nats.ws'

const codec = StringCodec()
const CHANNEL_URLS = "ws://localhost:23422/"

export interface ChannelOptions {
  subject: string,
  callback: (msg: string) => void
}

export interface SUCCESS {
  publish: (msg: string) => void,
  unsubscribe: () => Promise<void>
}

export type BrookerConnection = SUCCESS | null

export async function subscribeToChannel(options: ChannelOptions): Promise<BrookerConnection> {
  // Construct options
  const natsOptions: ConnectionOptions = {
    servers: CHANNEL_URLS,
  }

  // Try connecting to server
  const server = await connect(natsOptions)
  if (typeof server === 'number') return null

  // Subscribe to topic
  const subscription = server.subscribe(
    options.subject,
    {
      // Wrap callback
      callback: (err, msg) => {
        if (err) return null
        options.callback(codec.decode(msg.data)
        )
      }
    }
  )

  // Wrapper for publish function
  function publish(msg: string) {
    server.publish(options.subject, codec.encode(msg))
  }

  return {
    publish,
    unsubscribe: server.close
  }
}