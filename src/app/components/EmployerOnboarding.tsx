import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { toast } from 'sonner';
import svgPaths from "../../imports/Home/svg-3hh287w24v";

type FormData = {
  companyName: string;
  industry: string;
  companySize: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  position: string;
  country: string;
  city: string;
  address: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

export default function EmployerOnboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<FormData>();

  const password = watch('password');
  const progress = (step / totalSteps) * 100;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const onSubmit = (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!data.agreeToTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    // Store employer data in localStorage (in production, this would be an API call)
    const employerData = {
      ...data,
      id: Date.now().toString(),
      registeredAt: new Date().toISOString(),
    };

    localStorage.setItem('employerData', JSON.stringify(employerData));
    localStorage.setItem('isEmployerLoggedIn', 'false');

    toast.success('Registration successful! Please log in.');
    navigate('/employer/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f5] to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block h-[52px] w-[166px] mb-4">
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 166 52">
              <path d={svgPaths.p30d9a670} fill="#F75524" />
              <path d={svgPaths.p1ac37880} fill="#232557" />
              <path d={svgPaths.p123a6680} fill="#232557" />
            </svg>
          </div>
          <h1 className="text-3xl lg:text-4xl text-[#232557] mb-2">Start Hiring Today</h1>
          <p className="text-[#374758] text-lg">Join 1,200+ employers finding great talent</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-[#374758]">Step {step} of {totalSteps}</span>
            <span className="text-sm text-[#374758]">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-[#232557]">
              {step === 1 && 'Company Information'}
              {step === 2 && 'Contact Person Details'}
              {step === 3 && 'Location Information'}
              {step === 4 && 'Account Security'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Tell us about your company'}
              {step === 2 && 'Who will be the main contact?'}
              {step === 3 && 'Where is your company located?'}
              {step === 4 && 'Create your login credentials'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Step 1: Company Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      {...register('companyName', { required: 'Company name is required' })}
                      placeholder="Enter your company name"
                      className="mt-1"
                    />
                    {errors.companyName && (
                      <p className="text-sm text-red-500 mt-1">{errors.companyName.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="industry">Industry *</Label>
                    <Select onValueChange={(value) => setValue('industry', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="domestic">Domestic Services</SelectItem>
                        <SelectItem value="care">Care Services</SelectItem>
                        <SelectItem value="hospitality">Hospitality</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="agriculture">Agriculture</SelectItem>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.industry && (
                      <p className="text-sm text-red-500 mt-1">{errors.industry.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="companySize">Company Size *</Label>
                    <Select onValueChange={(value) => setValue('companySize', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">201-500 employees</SelectItem>
                        <SelectItem value="500+">500+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.companySize && (
                      <p className="text-sm text-red-500 mt-1">{errors.companySize.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Contact Person Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        {...register('firstName', { required: 'First name is required' })}
                        placeholder="Enter first name"
                        className="mt-1"
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        {...register('lastName', { required: 'Last name is required' })}
                        placeholder="Enter last name"
                        className="mt-1"
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="position">Position/Title *</Label>
                    <Input
                      id="position"
                      {...register('position', { required: 'Position is required' })}
                      placeholder="e.g., HR Manager, CEO, Owner"
                      className="mt-1"
                    />
                    {errors.position && (
                      <p className="text-sm text-red-500 mt-1">{errors.position.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email">Work Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      placeholder="you@company.com"
                      className="mt-1"
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...register('phone', { required: 'Phone number is required' })}
                      placeholder="+234 800 000 0000"
                      className="mt-1"
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Location Information */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select onValueChange={(value) => setValue('country', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nigeria">Nigeria</SelectItem>
                        <SelectItem value="kenya">Kenya</SelectItem>
                        <SelectItem value="ghana">Ghana</SelectItem>
                        <SelectItem value="south-africa">South Africa</SelectItem>
                        <SelectItem value="uganda">Uganda</SelectItem>
                        <SelectItem value="tanzania">Tanzania</SelectItem>
                        <SelectItem value="rwanda">Rwanda</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      {...register('city', { required: 'City is required' })}
                      placeholder="Enter city"
                      className="mt-1"
                    />
                    {errors.city && (
                      <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="address">Business Address *</Label>
                    <Textarea
                      id="address"
                      {...register('address', { required: 'Address is required' })}
                      placeholder="Enter your business address"
                      className="mt-1"
                      rows={3}
                    />
                    {errors.address && (
                      <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Account Security */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters',
                        },
                      })}
                      placeholder="Create a strong password"
                      className="mt-1"
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                    )}
                    <p className="text-xs text-[#374758] mt-1">
                      Must be at least 8 characters long
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      {...register('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value) => value === password || 'Passwords do not match',
                      })}
                      placeholder="Re-enter your password"
                      className="mt-1"
                    />
                    {errors.confirmPassword && (
                      <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <div className="flex items-start space-x-2 mt-6">
                    <Checkbox
                      id="terms"
                      {...register('agreeToTerms', { required: true })}
                      onCheckedChange={(checked) => setValue('agreeToTerms', checked as boolean)}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-[#374758] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{' '}
                      <a href="#" className="text-[#f75524] hover:underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-[#f75524] hover:underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  {errors.agreeToTerms && (
                    <p className="text-sm text-red-500">You must accept the terms and conditions</p>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="border-[#374758] text-[#374758] hover:bg-[#fff7f5]"
                  >
                    Previous
                  </Button>
                )}
                {step < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#f75524] hover:bg-[#e54414] text-white ml-auto"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-[#f75524] hover:bg-[#e54414] text-white ml-auto"
                  >
                    Complete Registration
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Already have an account */}
        <div className="text-center mt-6">
          <p className="text-[#374758]">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/employer/login')}
              className="text-[#f75524] hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
