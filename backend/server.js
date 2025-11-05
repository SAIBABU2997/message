require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Message schema
const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
}, { timestamps: true });

const Message = mongoose.model('Message', MessageSchema);

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Get all messages
app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Post a new message
app.post('/messages', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Message text is required' });

    const msg = new Message({ text });
    await msg.save();
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Delete a message
app.delete('/messages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Message.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Message not found' });

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
