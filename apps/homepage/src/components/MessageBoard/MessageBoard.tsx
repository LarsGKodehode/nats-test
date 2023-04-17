import {
  BrookerConnection,
  subscribeToChannel
} from "@nats-test/shared-ui"
import React,
{
  ChangeEvent,
  SetStateAction,
  useEffect,
  useState
} from "react"

function handleSubmit(
  event: React.FormEvent<HTMLFormElement>,
  msg: string,
  brooker: BrookerConnection,
) {
  event.preventDefault()
  if (msg.length === 0) return
  if (!brooker) return
  brooker.publish(msg)
}

function handleFormChange(
  event: ChangeEvent<HTMLInputElement>,
  callback: React.Dispatch<SetStateAction<string>>
) {
  callback(event.target.value)
}

function newMessage(
  message: string,
  callback: React.Dispatch<SetStateAction<string[]>>
) {
  callback(prev => [...prev, message])
}

interface MessageBoardProps {
  channel: string,
}

export function MessageBoard({
  channel = "common"
}: MessageBoardProps) {
  const [brooker, setBrooker] = useState<BrookerConnection>(null)
  const [msg, setMessage] = useState("")
  const [chat, updateChat] = useState<string[]>([])

  useEffect(
    () => {
      subscribeToChannel({
        subject: channel,
        callback: (msg) => newMessage(msg, updateChat)
      }).then(setBrooker)
    },
    []
  )

  return (
    <div>
      <h1>Message Board</h1>
      <form onSubmit={(event) => handleSubmit(event, msg, brooker)}>
        <input
          type="text"
          name=""
          id=""
          placeholder="Comment..."
          value={msg}
          onChange={(event) => handleFormChange(event, setMessage)}
        />
        <button type="submit">Comment</button>
      </form>
      <hr />
      <ul>
        {
          chat.map(
            (messages) => <li><h5>{messages}</h5></li>
          )
        }
      </ul>
    </div>
  )
}