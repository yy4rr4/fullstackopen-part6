import { create } from 'zustand'
import anecdoteService from './services/anecdoteService'
import { showNotification } from './notificationStore'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    vote: async (id) => {
      const anecdote = get().anecdotes.find((a) => a.id === id)
      const updatedAnecdote = await anecdoteService.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      })
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id ? updatedAnecdote : anecdote,
        ),
      }))

      showNotification(`You voted '${anecdote.content}'`)
    },
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set((state) => ({
        anecdotes: state.anecdotes.concat(newAnecdote),
      }))
      showNotification(`You added '${newAnecdote.content}'`)
    },
    remove: async (id) => {
      anecdoteService.remove(id)
      set((state) => ({
        anecdotes: state.anecdotes.filter((a) => a.id !== id),
      }))
    },
    setFilter: (value) => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set(() => ({ anecdotes }))
    },
  },
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  return anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase()),
  )
}
export const useFilter = () => useAnecdoteStore((state) => state.filter)
export const useAnecdotesActions = () =>
  useAnecdoteStore((state) => state.actions)
