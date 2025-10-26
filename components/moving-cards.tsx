"use client"
import React from 'react';
import { motion } from 'framer-motion';

const ScrollingCards = () => {
    const imageCards1 = [
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop'
    ];

    const comments = [
        { name: 'Emma Thompson', username: '@emmastyle', initial: 'E', text: 'Absolutely stunning! The craftsmanship is incredible. I receive compliments every time I wear my necklace. Worth every penny!', stars: 5 },
        { name: 'Sophia Martinez', username: '@sophiam', initial: 'S', text: 'The quality exceeded my expectations. Beautiful packaging and the jewelry itself is gorgeous. Will definitely order again!', stars: 5 },
        { name: 'Olivia Chen', username: '@oliviac', initial: 'O', text: 'Perfect gift for my anniversary! My wife was thrilled. The attention to detail is remarkable. Highly recommend!', stars: 5 },
        { name: 'Isabella Rose', username: '@isabellar', initial: 'I', text: 'Elegant, timeless, and beautifully made. This has become my go-to jewelry brand. Customer service is exceptional too!', stars: 5 },
        { name: 'Ava Williams', username: '@avaw', initial: 'A', text: 'I\'m obsessed! The ring fits perfectly and sparkles beautifully. Fast shipping and amazing quality. Love it!', stars: 5 },
        { name: 'Mia Anderson', username: '@miaanderson', initial: 'M', text: 'Luxurious and affordable! These pieces look way more expensive than they are. So happy with my purchase!', stars: 5 },
        { name: 'Grace Taylor', username: '@gracet', initial: 'G', text: 'Beautiful designs! I own three pieces now and each one is perfect. The quality is consistently excellent.', stars: 5 },
        { name: 'Chloe Davis', username: '@chloed', initial: 'C', text: 'Amazing experience from start to finish. The jewelry is even more beautiful in person. Will be back!', stars: 5 }
    ];

    const imageCards3 = [
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1589674781759-c0c97b8264b3?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1612534847738-b3af9bc6e97c?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=600&h=400&fit=crop'
    ];

    const ImageCard = ({ src, idx }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ scale: 1.05, y: -8 }}
            className="flex-shrink-0 w-[320px] h-[220px] rounded-2xl overflow-hidden shadow-2xl"
        >
            <img
                src={src}
                alt={`Jewelry collection ${idx}`}
                className="w-full h-full object-cover"
            />
        </motion.div>
    );

    const CommentCard = ({ data }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            className="flex-shrink-0 w-[300px] bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-2xl transition-shadow duration-300 border border-amber-100"
        >
            <div className="flex items-center mb-3">
                <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center text-white font-bold text-base mr-3 shadow-lg"
                >
                    {data.initial}
                </motion.div>
                <div>
                    <h4 className="text-base font-semibold text-gray-800">{data.name}</h4>
                    <div className="text-amber-600 text-xs">{data.username}</div>
                </div>
            </div>
            <div className="text-gray-700 leading-relaxed text-xs mb-2">{data.text}</div>
            <div className="text-amber-500 text-base">{'★'.repeat(data.stars)}</div>
        </motion.div>
    );

    return (
        <div className="bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 min-h-screen py-20 overflow-hidden">
            <style jsx>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(calc(-100% / 3)); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scrollLeft 50s linear infinite;
        }
        .animate-scroll-right {
          animation: scrollRight 55s linear infinite;
        }
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
        .blur-area {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(251, 207, 232, 0.4));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
      `}</style>

            <div className="max-w-full mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 px-4"
                >
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl font-bold mb-4 bg-gradient-to-r from-amber-600 via-rose-500 to-pink-600 bg-clip-text text-transparent"
                    >
                        What Our Customers Say
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-gray-600"
                    >
                        Trusted by jewelry lovers worldwide
                    </motion.p>
                </motion.div>

                {/* Top Row: Jewelry Images Gallery (Left scroll) */}
                <div className="relative overflow-hidden mb-8">
                    <div className="flex gap-6 animate-scroll-left">
                        {[...imageCards1, ...imageCards1, ...imageCards1].map((img, idx) => (
                            <ImageCard key={idx} src={img} idx={idx} />
                        ))}
                    </div>
                </div>

                {/* Middle Row: Customer Reviews (Right scroll) with CTA Buttons */}
                <div className="relative overflow-hidden mb-8">
                    <div className="flex gap-6 animate-scroll-right">
                        {[...comments, ...comments, ...comments].map((comment, idx) => (
                            <CommentCard key={idx} data={comment} />
                        ))}
                    </div>

                    {/* Blur overlay only in button area */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 0.8, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="absolute inset-0 flex justify-center items-center pointer-events-none"
                    >
                        <div className="w-[450px] h-[200px] rounded-3xl blur-area"></div>
                    </motion.div>

                    {/* CTA Buttons - Positioned over blur */}
                    <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-10">
                        <div className="relative z-10 flex flex-col gap-4 pointer-events-auto">
                            <motion.button
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                whileHover={{ scale: 1.1, rotate: 1 }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-amber-600 hover:to-orange-700 flex items-center justify-center gap-3"
                            >
                                <motion.svg
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </motion.svg>
                                Visit Gallery
                            </motion.button>
                            <motion.button
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                whileHover={{ scale: 1.1, rotate: -1 }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:from-pink-600 hover:to-rose-700 flex items-center justify-center gap-3"
                            >
                                <motion.svg
                                    whileHover={{ rotate: 15 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-6 h-6"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </motion.svg>
                                Follow us on Instagram
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Bottom Row: Jewelry Images Gallery (Left scroll) */}
                <div className="relative overflow-hidden">
                    <div className="flex gap-6 animate-scroll-left">
                        {[...imageCards3, ...imageCards3, ...imageCards3].map((img, idx) => (
                            <ImageCard key={idx} src={img} idx={idx} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScrollingCards;