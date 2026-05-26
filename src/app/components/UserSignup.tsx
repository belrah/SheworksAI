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
import { Badge } from './ui/badge';
import { toast } from 'sonner';
import svgPaths from "../../imports/Home/svg-3hh287w24v";
import { X } from 'lucide-react';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  country: string;
  city: string;
  address: string;
  category: string;
  skills: string[];
  experience: string;
  bio: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

const jobCategories = [
  'Domestic Services',
  'Childcare & Nanny',
  'Elder Care',
  'Cooking & Catering',
  'Cleaning Services',
  'Hairdressing & Beauty',
  'Tailoring & Fashion',
  'Craft & Handwork',
  'Sales & Retail',
  'Delivery Services',
  'Other',
];

const skillOptions = [
  'Cooking', 'Cleaning', 'Childcare', 'Elder Care',
  'Laundry', 'Ironing', 'Shopping', 'Driving',
  'Pet Care', 'Gardening', 'Hairdressing', 'Makeup',
  'Tailoring', 'Craft Making', 'Sales', 'Customer Service',
  'Food Preparation', 'Nursing', 'First Aid', 'Teaching',
];

export default function UserSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { register, handleSubmit, watch, formState: { errors }, setValue, trigger, getValues } = useForm<FormData>();

  const password = watch('password');
  const progress = (step / totalSteps) * 100;

  const toggleSkill = (skill: string) => {
    const newSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter(s => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(newSkills);
    setValue('skills', newSkills);
  };

  const validateStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = [];

    if (step === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'dateOfBirth', 'gender'];
      const values = getValues();
      if (!values.gender) {
        toast.error('Please select your gender');
        return false;
      }
    } else if (step === 2) {
      fieldsToValidate = ['email', 'phone', 'country', 'city', 'address'];
      const values = getValues();
      if (!values.country) {
        toast.error('Please select your country');
        return false;
      }
    } else if (step === 3) {
      fieldsToValidate = ['category', 'experience'];
      const values = getValues();
      if (!values.category) {
        toast.error('Please select a job category');
        return false;
      }
      if (!values.experience) {
        toast.error('Please select your experience level');
        return false;
      }
      if (selectedSkills.length === 0) {
        toast.error('Please select at least one skill');
        return false;
      }
    }

    const isValid = await trigger(fieldsToValidate);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid) {
      setStep(step + 1);
    }
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
    if (selectedSkills.length === 0) {
      toast.error('Please select at least one skill');
      return;
    }

    const userData = {
      ...data,
      skills: selectedSkills,
      id: Date.now().toString(),
      registeredAt: new Date().toISOString(),
      profileComplete: true,
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('isUserLoggedIn', 'false');
    toast.success('Registration successful! Please log in.');
    navigate('/user/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f5] to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block h-[52px] w-[166px] mb-4">
            <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 166 52">
              <path d={svgPaths.p30d9a670} fill="#F75524" />
              <path d={svgPaths.p1ac37880} fill="#232557" />
              <path d={svgPaths.p123a6680} fill="#232557" />
            </svg>
          </div>
          <h1 className="text-3xl lg:text-4xl text-[#232557] mb-2">Find Your Perfect Job</h1>
          <p className="text-[#374758] text-lg">Join thousands of women earning real income</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-[#374758]">Step {step} of {totalSteps}</span>
            <span className="text-sm text-[#374758]">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-[#232557]">
              {step === 1 && 'Personal Information'}
              {step === 2 && 'Contact & Location'}
              {step === 3 && 'Skills & Experience'}
              {step === 4 && 'Account Security'}
            </CardTitle>
            <CardDescription>
              {step === 1 && 'Let us know about you'}
              {step === 2 && 'Where can we reach you?'}
              {step === 3 && 'Tell us about your skills'}
              {step === 4 && 'Create your login credentials'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" {...register('firstName', { required: 'First name is required' })} placeholder="Enter first name" className="mt-1" />
                      {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" {...register('lastName', { required: 'Last name is required' })} placeholder="Enter last name" className="mt-1" />
                      {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input id="dateOfBirth" type="date" {...register('dateOfBirth', { required: 'Date of birth is required' })} className="mt-1" />
                    {errors.dateOfBirth && <p className="text-sm text-red-500 mt-1">{errors.dateOfBirth.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender *</Label>
                    <Select onValueChange={(value) => setValue('gender', value, { shouldValidate: true })}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Select gender" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" {...register('gender', { required: 'Gender is required' })} />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" {...register('email', { required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } })} placeholder="you@example.com" className="mt-1" />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" type="tel" {...register('phone', { required: 'Phone number is required' })} placeholder="+234 800 000 0000" className="mt-1" />
                    {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Select onValueChange={(value) => setValue('country', value, { shouldValidate: true })}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Select country" /></SelectTrigger>
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
                    <input type="hidden" {...register('country', { required: 'Country is required' })} />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" {...register('city', { required: 'City is required' })} placeholder="Enter city" className="mt-1" />
                    {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Textarea id="address" {...register('address', { required: 'Address is required' })} placeholder="Enter your address" className="mt-1" rows={3} />
                    {errors.address && <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="category">Job Category *</Label>
                    <Select onValueChange={(value) => setValue('category', value, { shouldValidate: true })}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Select your primary job category" /></SelectTrigger>
                      <SelectContent>
                        {jobCategories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input type="hidden" {...register('category', { required: 'Job category is required' })} />
                  </div>
                  <div>
                    <Label>Skills * (Select all that apply)</Label>
                    <div className="mt-2 flex flex-wrap gap-2 p-4 border rounded-lg max-h-60 overflow-y-auto">
                      {skillOptions.map((skill) => (
                        <Badge key={skill} variant={selectedSkills.includes(skill) ? 'default' : 'outline'} className={`cursor-pointer transition-colors ${selectedSkills.includes(skill) ? 'bg-[#f75524] hover:bg-[#e54414]' : 'hover:bg-[#fff7f5]'}`} onClick={() => toggleSkill(skill)}>
                          {skill}
                          {selectedSkills.includes(skill) && <X size={14} className="ml-1" />}
                        </Badge>
                      ))}
                    </div>
                    {selectedSkills.length > 0 && <p className="text-sm text-[#374758] mt-2">Selected: {selectedSkills.length} skill{selectedSkills.length !== 1 ? 's' : ''}</p>}
                  </div>
                  <div>
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Select onValueChange={(value) => setValue('experience', value, { shouldValidate: true })}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Select experience level" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">Less than 1 year</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-10">5-10 years</SelectItem>
                        <SelectItem value="10+">10+ years</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" {...register('experience', { required: 'Experience is required' })} />
                  </div>
                  <div>
                    <Label htmlFor="bio">About You (Optional)</Label>
                    <Textarea id="bio" {...register('bio')} placeholder="Tell employers about your experience and what makes you great at what you do..." className="mt-1" rows={4} />
                    <p className="text-xs text-[#374758] mt-1">A good bio helps you stand out to employers</p>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="password">Password *</Label>
                    <Input id="password" type="password" {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } })} placeholder="Create a strong password" className="mt-1" />
                    {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
                    <p className="text-xs text-[#374758] mt-1">Must be at least 8 characters long</p>
                  </div>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm Password *</Label>
                    <Input id="confirmPassword" type="password" {...register('confirmPassword', { required: 'Please confirm your password', validate: (value) => value === password || 'Passwords do not match' })} placeholder="Re-enter your password" className="mt-1" />
                    {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
                  </div>
                  <div className="flex items-start space-x-2 mt-6">
                    <Checkbox id="terms" {...register('agreeToTerms', { required: true })} onCheckedChange={(checked) => setValue('agreeToTerms', checked as boolean)} />
                    <label htmlFor="terms" className="text-sm text-[#374758] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      I agree to the <a href="#" className="text-[#f75524] hover:underline">Terms of Service</a> and <a href="#" className="text-[#f75524] hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                  {errors.agreeToTerms && <p className="text-sm text-red-500">You must accept the terms and conditions</p>}
                </div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 && <Button type="button" variant="outline" onClick={() => setStep(step - 1)} className="border-[#374758] text-[#374758] hover:bg-[#fff7f5]">Previous</Button>}
                {step < totalSteps ? (
                  <Button type="button" onClick={handleNext} className="bg-[#f75524] hover:bg-[#e54414] text-white ml-auto">Next</Button>
                ) : (
                  <Button type="submit" className="bg-[#f75524] hover:bg-[#e54414] text-white ml-auto">Complete Registration</Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-[#374758]">
            Already have an account? <button onClick={() => navigate('/user/login')} className="text-[#f75524] hover:underline">Log in</button>
          </p>
        </div>
      </div>
    </div>
  );
}
