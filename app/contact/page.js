'use client';

import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {

  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  useEffect(() => {
    emailjs.init(publicKey);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      from_message: formData.message,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams);
      setStatus('message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('something went wrong...');
    }
  };

  return (
    <main className="flex flex-col items-center text-center justify-center">
      <div className="max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold text-center">contact</h1>

        <p className='text-center'>
          email me at:{" "}
          <a href="mailto:sharjeelsoh@gmail.com" className="underline text-blue-600">
            sharjeelsoh@gmail.com
          </a>
          <br></br>
          linkedin:{" "}
          <a href="https://www.linkedin.com/in/sharjeelsoh/" className="underline text-blue-600">
            https://www.linkedin.com/in/sharjeelsoh/
          </a>
          <br></br>
          github:{" "}
          <a href="https://github.com/sharjeelsoh" className="underline text-blue-600">
            https://github.com/sharjeelsoh
          </a>
          <br></br>
          depop:{" "}
          <a href="https://depop.com/sharjeelsoh" className="underline text-blue-600">
            https://depop.com/sharjeelsoh
          </a>
        </p>

        <p className='text-center'>or you can just fill out this form below</p>

        {status && (
          <p className="text-sm text-center text-green-600">{status}</p>
        )}

        <form className="space-y-2" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              id="name"
              name="name"
              placeholder='full name'
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 px-3 py-2 bg-white text-black"
              required
            />
          </div>

          <div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='email'
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 px-3 py-2 bg-white text-black"
              required
            />
          </div>

          <div>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder='message'
              rows="4"
              className="mt-1 block w-full border border-gray-300 px-3 py-2 bg-white text-black"
              required
            ></textarea>
          </div>
          
          <div className="text-right">
            <button
                type="submit"
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors group"
                >
                send
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </form>

      </div>
    </main>
  );
}
