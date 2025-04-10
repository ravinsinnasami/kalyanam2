import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Get all wishes
app.get('/api/wishes', async (req, res) => {
  try {
    const wishes = await prisma.guestbook.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(wishes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch wishes' })
  }
})

// Add new wish
app.post('/api/wishes', async (req, res) => {
  const { name, message } = req.body
  
  if (!name || !message) {
    return res.status(400).json({ error: 'Name and message are required' })
  }

  try {
    const wish = await prisma.guestbook.create({
      data: { name, message }
    })
    res.json(wish)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create wish' })
  }
})

// Add this endpoint before app.listen()
app.delete('/api/wishes/:id', async (req, res) => {
    const { password } = req.body;
    
    // Verify admin password (change "admin123" to your actual password)
    if (password !== "admin123") {
      return res.status(401).json({ error: 'Incorrect password' });
    }
  
    try {
      // First verify the record exists
      const exists = await prisma.guestbook.findUnique({
        where: { id: req.params.id }
      });
      
      if (!exists) {
        return res.status(404).json({ error: 'Message not found' });
      }
  
      // Permanent deletion
      await prisma.guestbook.delete({
        where: { id: req.params.id }
      });
  
      res.json({ success: true });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: 'Database error' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
