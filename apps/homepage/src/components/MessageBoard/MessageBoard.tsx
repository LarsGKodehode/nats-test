import { useMessageBrooker } from "@nats-test/shared-ui"
import { useEffect } from "react"

interface MessageBoardProps {

}

const MESSAGE_SERVER_URLS = ""

export function MessageBoard(props: MessageBoardProps) {

  useEffect(
    () => {
      useMessageBrooker({
        servers: MESSAGE_SERVER_URLS,
        subject: "test"
      })


    }
  )

  return (
    <div>
      <h1>Message Board</h1>
    </div>
  )
}