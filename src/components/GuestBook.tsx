import { useState, useEffect } from 'react';
import { FaSpinner, FaHeart } from 'react-icons/fa';

interface Wish {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export default function Guestbook() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/wishes')
      .then(res => res.json())
      .then(data => {
        setWishes(data);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });
      const newWish = await response.json();
      setWishes([newWish, ...wishes]);
      setName('');
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-gray-800 font-sans py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif text-gold mb-2">Guestbook</h2>
          <div className="w-20 h-0.5 bg-gold mx-auto"></div>
          <p className="mt-4 text-gray-600">Leave your wishes for the couple</p>
        </div>

        {/* Form */}
        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-sm mb-8 border border-beige">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-beige rounded focus:ring-1 focus:ring-gold focus:border-gold"
                placeholder="Enter your name"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={1000}
                className="w-full p-3 border border-beige rounded h-32 focus:ring-1 focus:ring-gold focus:border-gold"
                placeholder="Write your warm wishes..."
                required
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {message.length}/1000 characters
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gold hover:bg-darkgold text-white px-6 py-3 rounded w-full flex items-center justify-center gap-2 transition-colors disabled:bg-opacity-70"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <FaHeart className="text-white" />
                  Submit Wish
                </>
              )}
            </button>
          </form>
        </div>

        {/* Wishes List with Scroll */}
        <div className="bg-white bg-opacity-90 rounded-lg border border-beige p-1">
          <div className="max-h-[400px] overflow-y-auto px-4 py-2">
            {loading ? (
              <div className="flex justify-center py-12">
                <FaSpinner className="animate-spin text-2xl text-gold" />
              </div>
            ) : wishes.length > 0 ? (
              wishes.map((wish) => (
                <div key={wish.id} className="mb-4 pb-4 border-b border-beige last:border-0">
                  <div className="flex items-start gap-3">
                    <FaHeart className="text-gold mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-serif text-gold">{wish.name}</h3>
                      <p className="mt-1 text-gray-700">{wish.message}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(wish.createdAt).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-gray-500">No wishes yet. Be the first to share!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}