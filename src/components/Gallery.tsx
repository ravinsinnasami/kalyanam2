// src/components/Gallery.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';

// Import your gallery images
import img1 from '../assets/images/gallery1.jpg';
import img2 from '../assets/images/gallery2.jpg';
import img3 from '../assets/images/gallery3.jpg';
import img4 from '../assets/images/gallery4.jpg';
// import img5 from '../assets/images/gallery5.jpg';
// import img6 from '../assets/images/gallery6.jpg';
// Add more images as needed

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const images = [img1, img2, img3, img4 /* Add more images */];
  
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h3
          className="text-center font-serif text-3xl mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Our Moments
        </motion.h3>
        
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="aspect-square overflow-hidden cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedImage(img)}
            >
              <img 
                src={img} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img 
              src={selectedImage} 
              alt="Enlarged gallery image" 
              className="max-w-full max-h-[90vh] object-contain"
            />
            <button 
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
}