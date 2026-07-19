export interface Client {
  id: number
  name: string
  phone: string
  email: string
  created_at: string
}

export type NewClient = Omit<Client, 'id' | 'created_at'>