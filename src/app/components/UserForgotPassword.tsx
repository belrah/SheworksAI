import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
import svgPaths from "../../imports/Home/svg-3hh287w24v";
import { Mail, CheckCircle, ArrowLeft } from 'lucide-react';

type ForgotPasswordFormData = {
  email: string;
};

type ResetPasswordFormData = {
  code: string;
  newPassword: string;
  confirmPassword: string;
};

export default function UserForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'request' | 'verify' | 'success'>('request');
  const [userEmail, setUserEmail] = useState('');
  const [verificationCode] = useState('123456'); // Mock verification code

  const { register: registerRequest, handleSubmit: handleSubmitRequest, formState: { errors: errorsRequest } } =
    useForm<ForgotPasswordFormData>();

  const { register: registerReset, handleSubmit: handleSubmitReset, watch, formState: { errors: errorsReset } } =
    useForm<ResetPasswordFormData>();

  const newPassword = watch('newPassword');

  const onRequestReset = (data: ForgotPasswordFormData) => {
    // Check if email exists
    const storedData = localStorage.getItem('userData');

    if (!storedData) {
      toast.error('No account found with this email address.');
      return;
    }

    const userData = JSON.parse(storedData);

    if (data.email !== userData.email) {
      toast.error('No account found with this email address.');
      return;
    }

    setUserEmail(data.email);
    toast.success(`Verification code sent to ${data.email}`);
    toast.info(`Use code: ${verificationCode} (demo only)`);
    setStep('verify');
  };

  const onResetPassword = (data: ResetPasswordFormData) => {
    // Verify code
    if (data.code !== verificationCode) {
      toast.error('Invalid verification code. Please try again.');
      return;
    }

    // Validate password match
    if (data.newPassword !== data.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    // Update password in storage
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const userData = JSON.parse(storedData);
      userData.password = data.newPassword;
      localStorage.setItem('userData', JSON.stringify(userData));
    }

    toast.success('Password reset successful!');
    setStep('success');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f5] to-white flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button onClick={() => navigate('/')} className="inline-block h-[52px] w-[166px] mb-6">
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 166 52">
              <path d={svgPaths.p30d9a670} fill="#F75524" />
              <path d={svgPaths.p1ac37880} fill="#232557" />
              <path d={svgPaths.p123a6680} fill="#232557" />
            </svg>
          </button>
        </div>

        {/* Request Reset Card */}
        {step === 'request' && (
          <Card className="shadow-lg">
            <CardHeader>
              <div className="w-12 h-12 bg-[#fff7f5] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-[#f75524]" />
              </div>
              <CardTitle className="text-2xl text-[#232557] text-center">Forgot Password?</CardTitle>
              <CardDescription className="text-center">
                No worries, we'll send you reset instructions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitRequest(onRequestReset)} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...registerRequest('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    placeholder="you@example.com"
                    className="mt-1"
                  />
                  {errorsRequest.email && (
                    <p className="text-sm text-red-500 mt-1">{errorsRequest.email.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#f75524] hover:bg-[#e54414] text-white h-12"
                >
                  Send Reset Instructions
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate('/user/login')}
                  className="text-sm text-[#374758] hover:text-[#f75524] inline-flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Back to login
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Verify & Reset Card */}
        {step === 'verify' && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-[#232557] text-center">Reset Password</CardTitle>
              <CardDescription className="text-center">
                Enter the verification code sent to {userEmail}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitReset(onResetPassword)} className="space-y-4">
                <div>
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    {...registerReset('code', {
                      required: 'Verification code is required',
                    })}
                    placeholder="Enter 6-digit code"
                    className="mt-1 text-center text-2xl tracking-widest"
                    maxLength={6}
                  />
                  {errorsReset.code && (
                    <p className="text-sm text-red-500 mt-1">{errorsReset.code.message}</p>
                  )}
                  <p className="text-xs text-[#374758] mt-2 text-center">
                    Didn't receive the code?{' '}
                    <button
                      type="button"
                      className="text-[#f75524] hover:underline"
                      onClick={() => toast.success('Code resent!')}
                    >
                      Resend
                    </button>
                  </p>
                </div>

                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    {...registerReset('newPassword', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                    placeholder="Create a new password"
                    className="mt-1"
                  />
                  {errorsReset.newPassword && (
                    <p className="text-sm text-red-500 mt-1">{errorsReset.newPassword.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...registerReset('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value) => value === newPassword || 'Passwords do not match',
                    })}
                    placeholder="Re-enter your password"
                    className="mt-1"
                  />
                  {errorsReset.confirmPassword && (
                    <p className="text-sm text-red-500 mt-1">{errorsReset.confirmPassword.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#f75524] hover:bg-[#e54414] text-white h-12"
                >
                  Reset Password
                </Button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setStep('request')}
                  className="text-sm text-[#374758] hover:text-[#f75524] inline-flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Try different email
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success Card */}
        {step === 'success' && (
          <Card className="shadow-lg">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-[#232557] text-center">Password Reset!</CardTitle>
              <CardDescription className="text-center">
                Your password has been successfully reset.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => navigate('/user/login')}
                className="w-full bg-[#f75524] hover:bg-[#e54414] text-white h-12"
              >
                Continue to Login
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
