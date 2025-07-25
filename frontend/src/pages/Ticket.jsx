import { useSelector, useDispatch } from "react-redux"
import { closeTicket, getTicket, reset } from "../features/tickets/ticketSlice"
import { getNotes, reset as notesReset } from "../features/notes/noteSlice"
import { BackButton } from "../components/BackButton"
import Spinner from "../components/Spinner"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import NoteItem from "../components/NoteItem"

function Ticket() {
    const {ticket, isError, isLoading, isSuccess, message} = useSelector((state) => state.ticket)
    const {notes, isLoading: notesIsLoading} = useSelector((state) => state.note)

    const params = useParams()
    const dispatch = useDispatch()
    const {ticketId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(isError){
            toast.error(message)
        }
        dispatch(getTicket(ticketId))
        dispatch(getNotes(ticketId))

        // eslint-disable-next-line
    }, [isError, message, ticketId])

    // Close Ticket
    const onTicketClose = () => {
        dispatch(closeTicket(ticketId))
        toast.success('Ticket Cloase')
        navigate('/tickets')
    }

    if(isLoading || notesIsLoading){
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
            <h3>Product: {ticket.product}</h3>
            <hr />
            <div className="ticket-desc">
                <h2>Description of the issue</h2>
                <p>{ticket.description}</p>
           </div>
        </header>

       {ticket.status !== 'closed' && (
        <>
           <h2>Notes:</h2>
           {notes.map((note) => (
           <NoteItem key={note._id} note={note} />
           ))}
         </>
       )}

        {ticket.status !== 'closed' && (
            <button onClick={onTicketClose} className="btn btn-block btn-danger">Close Ticket</button>
        )}
    </div>
    </>
  )
}

export default Ticket