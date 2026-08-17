import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function LoginScreen() {
  const { login } = useContext(AppContext);
  const [phone, setPhone] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState('');

  // Countdown timer for OTP
  useEffect(() => {
    let interval = null;
    if (showOtp && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [showOtp, timer]);

  const handleRequestOtp = (e) => {
    e.preventDefault();
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError('');
    setShowOtp(true);
    setTimer(30);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) {
      setError('Please enter the full 6-digit OTP code.');
      return;
    }
    // Mock OTP verification: accept any code
    setError('');
    login(phone);
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      setOtp(['', '', '', '', '', '']);
      setError('');
    }
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setError('Please enter a valid 10-digit mobile number in the input box first to Sign Up.');
      return;
    }
    setError('');
    setShowOtp(true);
    setTimer(30);
  };

  return (
    <div className="min-h-[100dvh] flex flex-col justify-center items-center px-4 pb-12 w-full bg-navy-bg text-on-surface font-body-md relative overflow-y-auto">
      {/* Atmospheric Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold-primary/20 via-navy-bg to-navy-bg z-0"></div>
      
      {/* Brand Anchor Header */}
      <div className="font-display-vertical text-display-vertical text-gold-primary tracking-[0.2em] flex items-center justify-center gap-2 mb-6 z-10">
        <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>temple_hindu</span>
        SANKALPAVANI
      </div>

      <div className="w-full max-w-md mx-auto relative z-10 flex flex-col gap-6 p-6 md:p-8 border border-white-muted/10 rounded-2xl bg-navy-surface shadow-2xl">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <h1 className="font-headline-lg text-headline-lg text-on-surface uppercase tracking-wide">
              {showOtp ? 'Verify OTP' : 'Welcome Back'}
            </h1>
            <p className="font-body-md text-body-md text-white-muted">
              {showOtp 
                ? `Enter the 6-digit verification code sent to +91 ${phone}` 
                : 'Enter your details to continue your spiritual journey.'}
            </p>
          </div>

          {error && (
            <div className="bg-error-container/20 border border-error/20 text-error p-3 rounded-lg text-center text-body-md">
              {error}
            </div>
          )}

          {/* Form */}
          <div className="bg-navy-surface p-6 rounded-xl border border-white-muted/5 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            {!showOtp ? (
              <form onSubmit={handleRequestOtp} className="space-y-6 relative z-10">
                {/* Phone Number Input */}
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider block" htmlFor="phone">Mobile Number</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-4 font-body-lg text-body-lg text-white-muted pointer-events-none">+91</span>
                    <input 
                      className="w-full bg-navy-bg border border-white-muted/20 text-on-surface font-body-lg text-body-lg rounded-lg pl-14 pr-4 py-3 focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-all duration-300 placeholder:text-white-muted/30" 
                      id="phone" 
                      maxLength="10"
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210" 
                      type="tel"
                      value={phone}
                    />
                    <span className="material-symbols-outlined absolute right-4 text-white-muted pointer-events-none">call</span>
                  </div>
                </div>

                {/* OTP Request Button */}
                <button 
                  className="w-full h-14 bg-gold-primary text-navy-bg font-headline-sm text-headline-sm uppercase rounded-lg hover:bg-gold-secondary transition-colors duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
                  type="submit"
                >
                  Request OTP
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
                </button>

                {/* Divider */}
                <div className="relative flex items-center justify-center py-2">
                  <div className="absolute inset-x-0 h-px bg-white-muted/10"></div>
                  <span className="relative bg-navy-surface px-4 font-label-caps text-label-caps text-white-muted uppercase">Or continue with</span>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    className="flex items-center justify-center gap-2 bg-navy-bg border border-white-muted/20 hover:border-gold-primary/50 text-on-surface font-body-md text-body-md py-3 rounded-lg transition-all duration-300 group" 
                    onClick={() => login('9876543210')}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-white-muted group-hover:text-gold-primary transition-colors">g_translate</span>
                    Google
                  </button>
                  <button 
                    className="flex items-center justify-center gap-2 bg-navy-bg border border-white-muted/20 hover:border-gold-primary/50 text-on-surface font-body-md text-body-md py-3 rounded-lg transition-all duration-300 group" 
                    onClick={() => login('9876543210')}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-white-muted group-hover:text-gold-primary transition-colors">apps</span>
                    Apple
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerify} className="space-y-6 relative z-10">
                {/* OTP Input Fields */}
                <div className="space-y-2">
                  <label className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider block text-center">Enter 6-Digit OTP</label>
                  <div className="flex justify-between gap-2 max-w-[280px] mx-auto">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        className="w-10 h-12 bg-navy-bg border border-white-muted/20 text-center font-headline-md text-headline-md text-gold-primary rounded-lg focus:outline-none focus:border-gold-primary focus:ring-1 focus:ring-gold-primary transition-colors"
                        id={`otp-${idx}`}
                        maxLength="1"
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        type="text"
                        value={digit}
                      />
                    ))}
                  </div>
                </div>

                {/* Submit Verification */}
                <button 
                  className="w-full h-14 bg-gold-primary text-navy-bg font-headline-sm text-headline-sm uppercase rounded-lg hover:bg-gold-secondary transition-colors duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
                  type="submit"
                >
                  Verify & Proceed
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </button>

                {/* Resend and back navigation */}
                <div className="flex flex-col items-center gap-3">
                  <p className="font-body-md text-body-md text-white-muted">
                    {timer > 0 
                      ? `Resend OTP in ${timer}s` 
                      : (
                        <button 
                          className="text-gold-primary hover:text-gold-secondary font-semibold border-b border-transparent hover:border-gold-primary transition-all"
                          onClick={handleResend}
                          type="button"
                        >
                          Resend OTP Code
                        </button>
                      )}
                  </p>
                  <button 
                    className="text-white-muted hover:text-gold-primary transition-colors font-label-caps text-label-caps uppercase"
                    onClick={() => { setShowOtp(false); setError(''); }}
                    type="button"
                  >
                    Change Phone Number
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Secondary Action */}
          <div className="text-center pt-2">
            <button 
              className="font-body-md text-body-md text-white-muted hover:text-gold-primary transition-colors inline-flex items-center gap-1 group"
              onClick={handleSignUpClick}
            >
              Don't have an account? <span className="font-headline-sm text-headline-sm uppercase text-gold-primary border-b border-transparent group-hover:border-gold-primary ml-1 transition-all">Sign Up</span>
            </button>
          </div>
        </div>
    </div>
  );
}
