import { SignIn } from '@clerk/react';
import React, { useState } from 'react';

export default function AdminLogin() {
  return(
    <div className='flex h-dvh w-full justify-center items-center'>
      <SignIn />
    </div>
  )
}