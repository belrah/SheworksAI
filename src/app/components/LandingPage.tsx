import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import svgPaths from "../../imports/Home/svg-3hh287w24v";
import imgImage4189 from "../../imports/Home/c6191cf441be9fb46d6c4e5dfc1c4e663ac287af.png";
import imgImage4195 from "../../imports/Home/289eb9fb89b244c9e8a27550a683b8d2c4d40d6b.png";
import imgImage4193 from "../../imports/Home/373e0b904404aa87161127617b18c6725108551e.png";
import imgImage4200 from "../../imports/Home/4cfa73344d41ef693892dff7431d922b625e15af.png";
import imgImage4199 from "../../imports/Home/cbf5070d355ad1571b4ac23444fba9e38992ab8a.png";
import imgImage4198 from "../../imports/Home/fbdc0e052d456b175cfb6fb94a4934d52bdeae3f.png";
import imgImage4194 from "../../imports/Home/0d5319d2b3f2be8e75630d49782724b10bac5e4b.png";
import imgImage4197 from "../../imports/Home/b9aaaa840c695fe12b6b5cc433068d9e0387b33e.png";
import imgLandingHeroTailorBHeMrTxOJpg from "../../imports/Home/0c16015718c3a453fbdfcd2d56d54079bb2a3d99.png";
import imgLandingFarmerAoqn06LoJpg from "../../imports/Home/37643caac6394791e2e081a60274c66acb3510a1.png";
import imgLandingCleanerDAjPlffvJpg from "../../imports/Home/1cb6503274c9c458058fbba9d03a69aed33e9e50.png";
import imgLandingEntrepreneurDskktpq9Jpg from "../../imports/Home/1d9ae262e6fc9a6be87f6393194764e1e395b7ab.png";
import imgLinkBrowseHairdressingJobs210Jobs from "../../imports/Home/449c8241994faa220e2df92ecda56a6e39ca672f.png";
import imgLinkBrowseCateringJobs180Jobs from "../../imports/Home/b31c12d7717f22966fd2bf1578e4c69cf4fb61c2.png";
import imgLinkBrowseChildcareJobs260Jobs from "../../imports/Home/0f21a2e200ee97f036b5056f9060f4f557b6c9f8.png";
import imgLinkBrowseTutoringJobs140Jobs from "../../imports/Home/a2ced68ae0255560f743cda08506d384568b9c9d.png";
import imgLinkBrowseMarketVendingJobs410Jobs from "../../imports/Home/4ac836209b7a251d1b3dbcb15141c0441b80838f.png";
import imgLinkBrowseElderCareJobs95Jobs from "../../imports/Home/aa8b651361a4ab8fbc7ae4f9876adcb46ee0376e.png";

export default function LandingPage() {
  const navigate = useNavigate();
  const [showMobileAppDialog, setShowMobileAppDialog] = useState(false);

  const handleFindWorkNow = () => {
    setShowMobileAppDialog(true);
  };

  const handleHiringTalents = () => {
    navigate('/employer/signup');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="h-[52px] w-[166px]">
              <svg className="w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 166 52">
                <path d={svgPaths.p30d9a670} fill="#F75524" />
                <path d={svgPaths.p1ac37880} fill="#232557" />
                <path d={svgPaths.p123a6680} fill="#232557" />
              </svg>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <a href="#" className="font-['Inter'] font-normal text-[20px] leading-[28px] text-[#f75524]">Home</a>
              <a href="#how-it-works" className="font-['Inter'] font-normal text-[20px] leading-[28px] text-[#374758] hover:text-[#f75524] transition-colors">How it Works</a>
              <a href="#jobs" className="font-['Inter'] font-normal text-[20px] leading-[28px] text-[#374758] hover:text-[#f75524] transition-colors">Jobs</a>
              <a href="#employers" className="font-['Inter'] font-normal text-[20px] leading-[28px] text-[#374758] hover:text-[#f75524] transition-colors">Employers</a>
              <a href="#contact" className="font-['Inter'] font-normal text-[20px] leading-[28px] text-[#374758] hover:text-[#f75524] transition-colors">Contact Us</a>
            </div>

            <button
              onClick={handleFindWorkNow}
              className="bg-[#f75524] hover:bg-[#e54414] text-white h-[52px] px-6 rounded-[50px] font-['Inter'] font-semibold text-[14px] leading-[20px] hidden md:block"
            >
              Join Our Community
            </button>

            <button className="lg:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="font-['Inter'] leading-tight text-[64px] font-bold">
              <span className="text-[#232557]">Real work, </span>
              <span className="text-[#f75524]">Real income</span>
              <span className="text-[#232557]"> for Every Woman in Africa.</span>
            </h1>
            <p className="font-['Inter'] text-[#374758] text-[18px] lg:text-[20px] leading-[28px] max-w-xl">
              Connect with flexible opportunities that fit your skills and schedule. Join thousands of women building their economic future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleFindWorkNow}
                className="bg-[#f75524] hover:bg-[#e54414] text-white h-14 px-8 rounded-full font-['Inter'] font-semibold text-[16px]"
              >
                Find Work Now
              </button>
              <button
                onClick={handleHiringTalents}
                className="bg-white border-2 border-[#fdcbbb] text-[#f75524] hover:bg-[#fff7f5] h-14 px-8 rounded-full font-['Inter'] font-medium text-[16px]"
              >
                I am Hiring Talents
              </button>
            </div>
          </div>
          <div className="relative">
            <img src={imgLandingHeroTailorBHeMrTxOJpg} alt="Woman working" className="rounded-2xl w-full h-auto" />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="bg-[#fff7f5] py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-center font-['Inter'] text-[#374758] text-[14px] mb-8">Backed by 12+ partners who believe in women's economic power</p>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            
            <img src={imgImage4195} alt="GIZ" className="h-10 w-auto" />
            <img src={imgImage4193} alt="Oxfam" className="h-10 w-auto" />
            <img src={imgImage4200} alt="SMEDAN" className="h-10 w-auto" />
            <img src={imgImage4199} alt="DFID" className="h-10 w-auto" />
            <img src={imgImage4198} alt="Enterprise" className="h-10 w-auto" />
            <img src={imgImage4194} alt="UN" className="h-10 w-auto" />
            <img src={imgImage4197} alt="Partner" className="h-10 w-auto" />
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div>
          <h2 className="font-['Inter'] leading-tight mb-4 text-[48px] font-bold"><span className="text-[#232557]">Numbers that Mean </span><span className="text-[#f75524]">Progress</span></h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <div>
              <p className="font-['Inter'] text-[56px] lg:text-[64px] mb-2 text-[#232557] font-bold">68,000</p>
              <p className="font-['Inter'] text-[#374758] text-[18px]">Active women in our community</p>
            </div>
            <div>
              <p className="font-['Inter'] text-[56px] lg:text-[64px] mb-2 text-[#232557] font-bold">92%</p>
              <p className="font-['Inter'] text-[#374758] text-[18px]">Job match success rate</p>
            </div>
            <div>
              <p className="font-['Inter'] text-[56px] lg:text-[64px] mb-2 text-[#232557] font-bold">1,200+</p>
              <p className="font-['Inter'] text-[#374758] text-[18px]">Trusted employers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hire Workforce Section */}
      <section className="bg-[#fff7f5] py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img src={imgLandingFarmerAoqn06LoJpg} alt="Workforce" className="rounded-2xl w-full h-auto" />
            </div>
            <div className="space-y-6">
              <h2 className="font-['Inter'] leading-tight text-[#232557] text-[48px] font-bold">
                Hire the workforce you need, skip the stress
              </h2>
              <p className="font-['Inter'] text-[#374758] text-[18px] leading-[28px]">
                Post jobs in minutes, get matched with qualified candidates instantly, and build your team with confidence.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#4CAF50] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-['Inter'] text-[#37 font-bold4758] text-[16px]">AI-powered matching finds the right talent</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#4CAF50] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-['Inter'] text-[#374758] text-[16px]">Verified profiles and background checks</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-[#4CAF50] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-['Inter'] text-[#374758] text-[16px]">Flexible hiring options for every need</span>
                </li>
              </ul>
              <button
                onClick={handleHiringTalents}
                className="bg-[#f75524] hover:bg-[#e54414] text-white h-14 px-8 rounded-full font-['Inter'] font-semibold text-[16px]"
              >
                Start Hiring Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Your Phone Section */}
      <section className="bg-[#2c2c2c] py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Inter'] leading-tight text-white mb-4 text-[48px] font-bold">Built for Your Phone in Your Hand</h2>
            <p className="font-['Inter'] text-[#ffffff]/80 text-[18px] max-w-2xl mx-auto">Smartphone or feature phone, signal or no signal SheWorks AI meets you where you are.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#3c3c3c] text-white p-8 rounded-2xl">
              <div className="w-12 h-12 bg-[#f75524] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-['Inter'] mb-2 text-[24px] font-bold">Find jobs</h3>
              <p className="font-['Inter'] text-gray-300 text-[14px]">Browse thousands of opportunities tailored to your skills</p>
            </div>

            <div className="bg-[#3c3c3c] text-white p-8 rounded-2xl">
              <div className="w-12 h-12 bg-[#f75524] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-['Inter'] mb-2 text-[24px] font-bold">Apply instantly</h3>
              <p className="font-['Inter'] text-gray-300 text-[14px]">One-click applications that work on any device</p>
            </div>

            <div className="bg-[#3c3c3c] text-white p-8 rounded-2xl">
              <div className="w-12 h-12 bg-[#f75524] rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-['Inter'] mb-2 text-[24px] font-bold">Get paid</h3>
              <p className="font-['Inter'] text-gray-300 text-[14px]">Secure payments delivered straight to your account</p>
            </div>
          </div>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="font-['Inter'] leading-tight text-[#232557] mb-4 text-[48px] font-bold">Everything You Need to Connect Work and Opportunity</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-[#fff7f5] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#f75524]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <h3 className="font-['Inter'] text-[#f75524] text-[24px] font-bold">Skill-based matching</h3>
            <p className="font-['Inter'] text-[#374758] text-[14px]">Get matched with jobs that fit your unique skills and experience</p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 bg-[#fff7f5] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#f75524]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-['Inter'] text-[#f75524] text-[24px] font-bold">Safe and trusted platform</h3>
            <p className="font-['Inter'] text-[#374758] text-[14px]">All employers are verified to ensure your safety and security</p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 bg-[#fff7f5] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#f75524]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-['Inter'] text-[#f75524] text-[24px] font-bold">Fast and easy payments</h3>
            <p className="font-['Inter'] text-[#374758] text-[14px]">Receive your earnings quickly and securely</p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 bg-[#fff7f5] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#f75524]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            </div>
            <h3 className="font-['Inter'] text-[#f75524] text-[24px] font-bold">SMS and USSD access</h3>
            <p className="font-['Inter'] text-[#374758] text-[14px]">Access opportunities even without internet connection</p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 bg-[#fff7f5] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#f75524]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-['Inter'] text-[#f75524] text-[24px] font-bold">Offline and scheduling</h3>
            <p className="font-['Inter'] text-[#374758] text-[14px]">Manage your work schedule and availability with ease</p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 bg-[#fff7f5] rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#f75524]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-['Inter'] text-[#f75524] text-[24px] font-bold">Analytics and reporting</h3>
            <p className="font-['Inter'] text-[#374758] text-[14px]">Connect with peers and mentors who understand your journey.</p>
          </div>
        </div>
      </section>

      {/* Work that Suits Your Lifestyle */}
      <section className="bg-[#fff7f5] py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-['Inter'] leading-tight text-[#232557] mb-4 text-[48px] font-bold">Work that Suits Your Lifestyle</h2>
            <p className="font-['Inter'] text-[#374758] text-[18px]">From a sewing machine in your living room to a small farm down the road wesurface the micro-work that pays today and the careers that grow tomorrow.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="relative overflow-hidden rounded-xl aspect-square">
              <img src={imgLinkBrowseHairdressingJobs210Jobs} alt="Hairdressing" className="w-full h-full object-cover" />
            </div>
            <div className="relative overflow-hidden rounded-xl aspect-square">
              <img src={imgLinkBrowseCateringJobs180Jobs} alt="Catering" className="w-full h-full object-cover" />
            </div>
            <div className="relative overflow-hidden rounded-xl aspect-square">
              <img src={imgLinkBrowseChildcareJobs260Jobs} alt="Childcare" className="w-full h-full object-cover" />
            </div>
            <div className="relative overflow-hidden rounded-xl aspect-square">
              <img src={imgLinkBrowseTutoringJobs140Jobs} alt="Tutoring" className="w-full h-full object-cover" />
            </div>
            <div className="relative overflow-hidden rounded-xl aspect-square">
              <img src={imgLinkBrowseMarketVendingJobs410Jobs} alt="Market Vending" className="w-full h-full object-cover" />
            </div>
            <div className="relative overflow-hidden rounded-xl aspect-square">
              <img src={imgLinkBrowseElderCareJobs95Jobs} alt="Elder Care" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-['Inter'] leading-tight text-[#232557] text-center mb-12 text-[48px] font-bold">Frequently asked questions</h2>

          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-[#f75524] transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="font-['Inter'] text-[18px] text-[#232557]">What is SheWorks AI?</h3>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-[#f75524] transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="font-['Inter'] text-[18px] text-[#232557]">How much does it cost to use SheWorks AI?</h3>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-[#f75524] transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="font-['Inter'] text-[18px] text-[#232557]">How are payments handled?</h3>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-[#f75524] transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="font-['Inter'] text-[18px] text-[#232557]">Is SheWorks AI a freelancing platform?</h3>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:border-[#f75524] transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <h3 className="font-['Inter'] text-[18px] text-[#232557]">Who can join SheWorks AI?</h3>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 lg:px-8 py-16 lg:py-24 text-center">
        <h2 className="font-['Inter'] leading-tight mb-4 text-[48px] font-bold">
          <span className="text-[#232557]">Your next job is </span>
          <span className="text-[#f75524]">a text away.</span>
        </h2>
        <p className="font-['Inter'] text-[#374758] text-[18px] mb-8 max-w-xl mx-auto">
          Join thousands of women already working and earning through our platform
        </p>
        <button
          onClick={handleFindWorkNow}
          className="bg-[#f75524] hover:bg-[#e54414] text-white h-14 px-8 rounded-full font-['Inter'] font-semibold text-[16px]"
        >
          Get Started
        </button>
      </section>

      {/* Footer */}
      <footer className="text-white py-12 bg-[#060404]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="h-[44px] w-[326px] max-w-full mb-4">
                <svg className="h-full w-auto" fill="none" viewBox="0 0 326 44">
                  <path d={svgPaths.p1d155800} fill="#F75524" />
                  <path d={svgPaths.p3cb39390} fill="white" />
                </svg>
              </div>
              <p className="font-['Inter'] text-[#fff7f5] text-[14px] max-w-xs leading-[24px]">
                Sheworks Africa is an AI-powered job matching and economic empowerment for women in underserved communities. Built with love across Africa.
              </p>
            </div>

            <div>
              <h3 className="font-['Inter'] font-semibold text-[20px] mb-4">PRODUCT</h3>
              <ul className="space-y-2 font-['Inter'] text-[#fff7f5] text-[16px]">
                <li><a href="#" className="hover:text-[#f75524] transition-colors">Find a Job</a></li>
                <li><a href="#" className="hover:text-[#f75524] transition-colors">SMS & USSD</a></li>
                <li><a href="#" className="hover:text-[#f75524] transition-colors">Create Account</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-['Inter'] font-semibold text-[20px] mb-4">FOR EMPLOYERS</h3>
              <ul className="space-y-2 font-['Inter'] text-[#fff7f5] text-[16px]">
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleHiringTalents(); }} className="hover:text-[#f75524] transition-colors">Post a Job</a></li>
                <li><a href="#" className="hover:text-[#f75524] transition-colors">Employer Hub</a></li>
                <li><a href="#" className="hover:text-[#f75524] transition-colors">Hiring Guild</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-['Inter'] font-semibold text-[20px] mb-4">GET IN TOUCH</h3>
              <ul className="space-y-2 font-['Inter'] text-[#fff7f5] text-[16px]">
                <li><a href="mailto:Hello@Sheworksai.org" className="hover:text-[#f75524] transition-colors">Hello@Sheworksai.org</a></li>
                <li><a href="tel:+234909897435" className="hover:text-[#f75524] transition-colors">+234 909 897 435</a></li>
              </ul>
              <div className="flex gap-3 mt-4">
                <div className="w-8 h-8 rounded-full border border-[#fff7f5] flex items-center justify-center hover:bg-[#f75524] hover:border-[#f75524] transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#fff7f5] flex items-center justify-center hover:bg-[#f75524] hover:border-[#f75524] transition-colors cursor-pointer">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-['Inter'] text-[#fff7f5] text-[14px]">© 2026 SheWorks AI, Incorporated or its affiliates. All rights reserved</p>
            <div className="flex gap-6 font-['Inter'] text-[#fff7f5] text-[14px]">
              <a href="#" className="hover:text-[#f75524] transition-colors">Privacy</a>
              <a href="#" className="hover:text-[#f75524] transition-colors">Terms</a>
              <a href="#" className="hover:text-[#f75524] transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile App Download Dialog */}
      <Dialog open={showMobileAppDialog} onOpenChange={setShowMobileAppDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-['Inter'] text-[24px] text-[#232557]">Download Our Mobile App</DialogTitle>
            <DialogDescription className="font-['Inter'] text-[16px] text-[#374758] mt-4">
              The SheWorks Africa mobile app provides the best experience for job seekers. You'll be redirected to download the app for your device.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#f75524] cursor-pointer transition-colors">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.523 15.341c-.107 0-2.134-.796-2.134-3.065 0-2.053 1.687-3.033 1.767-3.084-.963-1.407-2.464-1.601-2.998-1.621-1.277-.13-2.494.751-3.143.751-.65 0-1.652-.731-2.713-.711-1.396.02-2.681.81-3.401 2.063-1.448 2.511-.371 6.232 1.04 8.266.69.996 1.514 2.113 2.595 2.073 1.04-.04 1.433-.672 2.692-.672 1.26 0 1.613.672 2.712.652 1.121-.02 1.845-1.017 2.534-2.014.798-1.156 1.126-2.273 1.147-2.331-.025-.01-2.196-.843-2.217-3.342zm-2.018-5.969c.574-.695.962-1.662.856-2.625-.828.034-1.83.552-2.424 1.246-.533.617-1 1.605-.875 2.552.925.072 1.869-.47 2.443-1.173z"/>
              </svg>
              <div>
                <p className="font-['Inter'] font-semibold text-[16px] text-[#232557]">Download for iOS</p>
                <p className="font-['Inter'] text-[14px] text-[#374758]">Available on the App Store</p>
              </div>
            </div>

            <a
              href="https://drive.google.com/drive/folders/1JNgqBb4elTo3FE7m4hUQDefmkgR8A_Pc?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-[#f75524] cursor-pointer transition-colors"
            >
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
              </svg>
              <div>
                <p className="font-['Inter'] font-semibold text-[16px] text-[#232557]">Download for Android</p>
                <p className="font-['Inter'] text-[14px] text-[#374758]">Available on Google Play</p>
              </div>
            </a>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setShowMobileAppDialog(false)} className="font-['Inter']">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
