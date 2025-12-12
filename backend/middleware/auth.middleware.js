import { supabase } from '../config/supabase.js'

export const verifyUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    if (!token) return res.status(401).json({ error: 'Unauthorized' })

    const { data, error } = await supabase.auth.getUser(token)
    if (error || !data.user) return res.status(401).json({ error: 'Invalid token' })

    req.user = data.user
    next()
  } catch (err) {
    res.status(500).json({ error: 'Auth check failed' })
  }
}
