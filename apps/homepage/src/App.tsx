import { MessageBoard } from "./components/MessageBoard/MessageBoard"

function App() {
  return (
    <div>
      <MessageBoard channel="common" />
      <MessageBoard channel="help" />
    </div>
  )
}

export default App
