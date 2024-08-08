import { DoorOpen, Share2 } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import { Suspense } from "react"
import amaLogo from '../assets/ama-logo.svg'
import { CreateMessageForm } from "../components/create-message-form"
import { Messages } from "../components/messages"

export function Room() {
  const navigate = useNavigate()
  const { roomId } = useParams()

  function handleShareRoom() {
    const url = window.location.href.toString()

    if (navigator.share !== undefined && navigator.canShare()) {
      navigator.share({ url })
    } else {
      navigator.clipboard.writeText(url)

      toast.info('The Room link copied to clipboard!')
    }
  }

  return (
    <div className="mx-auto max-w-[640px] flex flex-col gap-6 py-10 px-4">
      <div className="flex items-center gap-3 px-3">
        <img src={amaLogo} alt="AMA" className="h-5" />

        <span className="text-sm text-zinc-500 truncate">
          Room code: <span className="text-zinc-300">{roomId}</span>
        </span>

        <button 
          type="submit" 
          onClick={handleShareRoom}
          className="ml-auto bg-zinc-800 text-zinc-300 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-zinc-700"
        >
          Share
          <Share2 className="size-4" />
        </button>
      </div>
     

      <div className="h-px w-full bg-zinc-900" />

      <CreateMessageForm />

      <Suspense fallback={<p>Loading...</p>}>
        <Messages />
      </Suspense>
      <div className="flex justify-end px-5 py-52">
        <button 
          type="submit" 
          onClick={() => navigate('/')}
          className="bg-orange-400 text-orange-950 px-3 py-1.5 gap-1.5 flex items-center rounded-lg font-medium text-sm transition-colors hover:bg-orange-500"
          >
          Exit room
          <DoorOpen className="size-4" />
        </button>
      </div>
      
    </div>
  )
}