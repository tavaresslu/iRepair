export interface Client {
  id: number
  name: string
  phone: number
  email: string
  created_at: string
}

export type NewClient = Omit<Client, 'id' | 'created_at'>