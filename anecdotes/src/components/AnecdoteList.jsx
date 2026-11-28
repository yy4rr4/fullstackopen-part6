import { useEffect } from 'react'
import { useAnecdotesActions } from '../store'
import { useAnecdotes } from '../store'

const AnecdoteList = () => {
  const { initialize, vote, remove } = useAnecdotesActions()
  const anecdotes = useAnecdotes()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <div>
      {anecdotes
        .toSorted((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
              {!anecdote.votes && (
                <button onClick={() => remove(anecdote.id)}>delete</button>
              )}
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
