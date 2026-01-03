// src/components/contact/ContactForm.tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ContactForm() {
 const [formData, setFormData] = useState({
   name: '',
   email: '',
   subject: '',
   message: ''
 })

 const [isSubmitting, setIsSubmitting] = useState(false)
 const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault()
   setIsSubmitting(true)

   try {
     const response = await fetch('/api/contact', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
       },
       body: JSON.stringify(formData)
     })

     if (response.ok) {
       setSubmitStatus('success')
       setFormData({
         name: '',
         email: '',
         subject: '',
         message: ''
       })
     } else {
       setSubmitStatus('error')
     }
   } catch (error) {
     setSubmitStatus('error')
   } finally {
     setIsSubmitting(false)
   }
 }

 return (
   <motion.div
     initial={{ opacity: 0, x: 20 }}
     animate={{ opacity: 1, x: 0 }}
     className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg"
   >
     <form onSubmit={handleSubmit} className="space-y-6">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div>
           <label htmlFor="name" className="block text-sm font-medium mb-2">
             Name
           </label>
           <input
             type="text"
             id="name"
             value={formData.name}
             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500"
             required
           />
         </div>
         <div>
           <label htmlFor="email" className="block text-sm font-medium mb-2">
             Email
           </label>
           <input
             type="email"
             id="email"
             value={formData.email}
             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
             className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500"
             required
           />
         </div>
       </div>
       <div>
         <label htmlFor="subject" className="block text-sm font-medium mb-2">
           Subject
         </label>
         <input
           type="text"
           id="subject"
           value={formData.subject}
           onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
           className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500"
           required
         />
       </div>
       <div>
         <label htmlFor="message" className="block text-sm font-medium mb-2">
           Message
         </label>
         <textarea
           id="message"
           rows={6}
           value={formData.message}
           onChange={(e) => setFormData({ ...formData, message: e.target.value })}
           className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-green-500"
           required
         />
       </div>
       <button
         type="submit"
         disabled={isSubmitting}
         className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
       >
         {isSubmitting ? 'Sending...' : 'Send Message'}
       </button>
       {submitStatus === 'success' && (
         <p className="text-green-600 text-center">Message sent successfully!</p>
       )}
       {submitStatus === 'error' && (
         <p className="text-red-600 text-center">Error sending message. Please try again.</p>
       )}
     </form>
   </motion.div>
 )
}