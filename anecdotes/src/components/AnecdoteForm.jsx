import { useAnecdotesActions } from '../store'

const AnecdoteForm = () => {
  const { add } = useAnecdotesActions()

  const handleAnecdoteCreation = (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.reset()
    add(content)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAnecdoteCreation}>
        <div>
          <input data-testid="new" name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
