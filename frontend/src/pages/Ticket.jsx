import { useSelector, useDispatch } from "react-redux"
import { getTicket, reset } from "../features/tickets/ticketSlice"
import { BackButton } from "../components/BackButton"
import Spinner from "../components/Spinner"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { toast } from "react-toastify"

function Ticket() {
    const {ticket, isError, isLoading, isSuccess, message} = useSelector((state) => state.ticket)
    const params = useParams()
    const dispatch = useDispatch()
    const {ticketId} = useParams()

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
        // eslint-disable-next-line
    }, [isError, message, ticketId])

    if(isLoading){
        return <Spinner />
    }

    if(isError){
        return <h3>Something is went wrong</h3>
    }

  return (
    <>
    <div className="ticket-page">
        <header className="ticket-header">
            <BackButton url='/tickets' />
            <h2>
                Ticket ID: {ticket._id}
                <span className={`status status-${ticket.status}`}>{ticket.status}</span>
            </h2>
            <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
            <hr />
            <div className="ticket-desc">
                <h2>Description of the issue</h2>
                <p>{ticket.description}</p>
           </div>

        </header>
    </div>
    </>
  )
}

export default Ticket