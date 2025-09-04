import { useState, useEffect, useRef } from "react";

export default function App() {
  const [spotsLeft, setSpotsLeft] = useState(12);
  const [auditSpots, setAuditSpots] = useState(38);
  const [countdown, setCountdown] = useState({
    days: 2,
    hours: 15,
    minutes: 42,
    seconds: 18
  });
  const [assessmentScore, setAssessmentScore] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userResponses, setUserResponses] = useState([null, null, null, null]);
  const [showResults, setShowResults] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    managers: 0,
    promotions: 0,
    salary: 0
  });
  const statsRef = useRef(null);

  const questions = [
    {
      question: "How often are you invited to roadmap strategy meetings where business outcomes (not just technical delivery) are decided?",
      options: [
        { label: "Never", value: 0, description: "You're explaining Jira metrics but not shaping vision" },
        { label: "Rarely (once a quarter)", value: 2, description: "You're consulted after decisions are made" },
        { label: "Sometimes (once a month)", value: 3, description: "You're starting to get strategic input requests" },
        { label: "Regularly (weekly)", value: 4, description: "You're a trusted voice in strategic discussions" }
      ]
    },
    {
      question: "When presenting technical work, how often do you frame it in terms of business outcomes (revenue, customer retention, market position)?",
      options: [
        { label: "Never", value: 0, description: "You focus solely on technical delivery" },
        { label: "Occasionally", value: 2, description: "You try but struggle to connect to business value" },
        { label: "Frequently", value: 3, description: "You regularly make the connection but not consistently" },
        { label: "Always", value: 4, description: "You lead with business impact in all communications" }
      ]
    },
    {
      question: "How often do leaders from other departments (Product, Sales, Marketing) proactively seek your input on their strategic initiatives?",
      options: [
        { label: "Never", value: 0, description: "You're only consulted within your own team" },
        { label: "Rarely", value: 2, description: "Only when your technical expertise is needed" },
        { label: "Sometimes", value: 3, description: "Increasingly consulted for strategic input" },
        { label: "Frequently", value: 4, description: "You're a go-to person for strategic guidance" }
      ]
    },
    {
      question: "When was the last time you shaped a business decision (not just technical implementation) that impacted revenue or customer experience?",
      options: [
        { label: "Never", value: 0, description: "You execute decisions made by others" },
        { label: "Over 6 months ago", value: 2, description: "Occasionally influence decisions after they're made" },
        { label: "Within the last 3 months", value: 3, description: "Starting to shape decisions consistently" },
        { label: "Within the last month", value: 4, description: "Regularly shaping business outcomes" }
      ]
    }
  ];

  const testimonials = [
    {
      name: "Itay",
      title: "CXO Coach and Executive Growth Advisor",
      company: "Former Engineering Director at Google",
      quote: "This framework helped me transition from technical manager to strategic leader in just 3 weeks. I went from explaining Jira metrics to shaping our product vision at the executive level. My strategic seat count increased from 0.2 to 4.7 in 30 days.",
      metrics: "Promoted to VP within 6 months • $32K salary increase • Invited to 5 strategic discussions/week"
    },
    {
      name: "Sarah K.",
      title: "Senior Engineering Manager",
      company: "TechCorp (FAANG)",
      quote: "I was stuck in execution mode for years. The Strategic Seat Readiness Audit revealed exactly where I was falling short. Now I'm invited to roadmap meetings and my influence has doubled.",
      metrics: "200% increase in strategic invitations • 37% faster promotion cycle • $18K salary increase"
    },
    {
      name: "Marcus T.",
      title: "Engineering Lead",
      company: "Innovate Labs",
      quote: "The 'Map the Spine' exercise alone was worth the investment. I finally understand how to navigate organizational politics and position myself as a strategic partner.",
      metrics: "From 1 to 5 strategic seats in 30 days • Promoted to Director • 42% reduction in firefighting"
    }
  ];

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Simulate spot depletion
  useEffect(() => {
    const spotTimer = setInterval(() => {
      if (auditSpots > 0) {
        setAuditSpots(prev => prev - 1);
      }
      if (spotsLeft > 0 && Math.random() > 0.7) {
        setSpotsLeft(prev => prev - 1);
      }
    }, 120000); // Every 2 minutes
    
    return () => clearInterval(spotTimer);
  }, [auditSpots, spotsLeft]);

  // Animate stats when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const targetManagers = 200;
          const targetPromotions = 87;
          const targetSalary = 15;
          
          const duration = 2000;
          const steps = 60;
          const interval = duration / steps;
          
          let currentStep = 0;
          const incrementManagers = targetManagers / steps;
          const incrementPromotions = targetPromotions / steps;
          const incrementSalary = targetSalary / steps;
          
          const timer = setInterval(() => {
            currentStep++;
            setAnimatedStats({
              managers: Math.min(Math.round(currentStep * incrementManagers), targetManagers),
              promotions: Math.min(Math.round(currentStep * incrementPromotions), targetPromotions),
              salary: Math.min(Math.round(currentStep * incrementSalary), targetSalary)
            });
            
            if (currentStep >= steps) {
              clearInterval(timer);
            }
          }, interval);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  // Auto-advance testimonials
  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(testimonialTimer);
  }, [testimonials.length]);

  const handleAnswer = (value) => {
    const newResponses = [...userResponses];
    newResponses[currentQuestion] = value;
    setUserResponses(newResponses);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score (out of 16, convert to 0-100 scale)
      const total = newResponses.reduce((sum, val) => sum + (val || 0), 0);
      const score = Math.round((total / 16) * 100);
      setAssessmentScore(score);
      setShowResults(true);
    }
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, you would send the email to your backend
    setTimeout(() => {
      // Simulate email delivery and redirect to full audit
      alert('Your Strategic Seat Readiness Report has been sent to your email! Check your inbox for the full diagnostic and your personalized 3-step action plan.');
    }, 1000);
  };

  const getTierInfo = (score) => {
    if (score < 30) {
      return {
        tier: "At Risk - Managing Jira, Not Strategy",
        interpretation: "You're still explaining delivery metrics while others shape vision. Your expertise is 'mansplained' despite years of experience.",
        meetingExample: "In roadmap meetings, you're asked to explain technical dependencies rather than contribute to strategic direction.",
        nextStep: "Identify one upcoming strategic meeting and prepare a 1-pager connecting your team's work to business outcomes."
      };
    } else if (score < 60) {
      return {
        tier: "Stuck in Execution Mode",
        interpretation: "You ship features on time, but promotions go to others. You're seen as reliable but not strategic.",
        meetingExample: "You're occasionally consulted after decisions are made, rather than helping shape them.",
        nextStep: "Map the 'spine' of your organization - identify the 3 decision-makers who control your career trajectory."
      };
    } else if (score < 80) {
      return {
        tier: "Emerging Strategic Voice",
        interpretation: "You're starting to get strategic input requests but not consistently shaping vision.",
        meetingExample: "You're invited to some roadmap sessions but often revert to explaining Jira metrics.",
        nextStep: "Build shared cadence with one cross-functional leader by scheduling bi-weekly strategy syncs."
      };
    } else {
      return {
        tier: "Strategic Leader in Waiting",
        interpretation: "You're close to becoming indispensable. One breakthrough will transform your career trajectory.",
        meetingExample: "You're regularly asked for input on business decisions beyond your immediate team.",
        nextStep: "Unblock your team by driving clarity on one strategic initiative that impacts revenue."
      };
    }
  };

  const tierInfo = assessmentScore ? getTierInfo(assessmentScore) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent"></div>
        <div className="container mx-auto px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="text-red-400">Still Managing Jira?</span>
              <br />
              <span className="text-white">You're On the Layoff List</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed">
              If you're not in the room when strategy is shaped, you'll be the first out when budgets shrink. 
              53% of tech managers feel replaceable. Are you ready to become indispensable?
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <button 
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-12 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                onClick={() => document.getElementById('micro-assessment').scrollIntoView({ behavior: 'smooth' })}
              >
                Start the Free Audit Now
              </button>
              <button 
                className="border border-slate-600 hover:border-white text-white font-bold text-lg px-12 py-4 rounded-lg transition-all duration-300 hover:bg-white/10"
                onClick={() => document.getElementById('testimonial-section').scrollIntoView({ behavior: 'smooth' })}
              >
                Get My Personalized Influence Review
              </button>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-600 max-w-2xl mx-auto">
              <div className="flex items-center justify-center space-x-2 text-slate-300">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>3 tech leaders claimed spots in the last 24 hours • Only {auditSpots} audit spots left this week</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Micro-Assessment Section */}
      <section id="micro-assessment" className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-6">Discover Your Strategic Seat Readiness Level</h2>
            <p className="text-xl text-slate-300 text-center mb-12">Answer 4 quick questions to get your personalized readiness score</p>
            
            {!showResults ? (
              <div className="bg-slate-800/70 p-8 rounded-xl border border-slate-600">
                <div className="text-center mb-6">
                  <div className="inline-block bg-slate-700/50 text-slate-300 px-4 py-1 rounded-full text-sm">
                    Question {currentQuestion + 1} of {questions.length}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-8 text-center">{questions[currentQuestion].question}</h3>
                
                <div className="space-y-4">
                  {questions[currentQuestion].options.map((option, index) => (
                    <div 
                      key={index}
                      className={`p-5 rounded-lg border cursor-pointer transition-all duration-300 ${
                        userResponses[currentQuestion] === option.value 
                          ? 'border-red-500 bg-red-500/10' 
                          : 'border-slate-600 hover:border-slate-400'
                      }`}
                      onClick={() => handleAnswer(option.value)}
                    >
                      <div className="font-bold text-lg mb-1">{option.label}</div>
                      <div className="text-slate-400 text-sm">{option.description}</div>
                    </div>
                  ))}
                </div>
                
                {userResponses[currentQuestion] !== null && (
                  <div className="mt-8 text-center">
                    <button 
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300"
                      onClick={() => {
                        if (currentQuestion < questions.length - 1) {
                          setCurrentQuestion(currentQuestion + 1);
                        } else {
                          const total = userResponses.reduce((sum, val) => sum + (val || 0), 0);
                          const score = Math.round((total / 16) * 100);
                          setAssessmentScore(score);
                          setShowResults(true);
                        }
                      }}
                    >
                      {currentQuestion < questions.length - 1 ? 'Next Question' : 'Get My Score'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-slate-800/70 p-8 rounded-xl border border-slate-600 animate-fade-in">
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-red-400 mb-4">{assessmentScore}</div>
                  <h3 className="text-2xl font-bold mb-2">Strategic Seat Readiness Score</h3>
                  <p className="text-slate-300">
                    {assessmentScore < 30 && "Your career is at risk. You're still managing Jira and explaining delivery metrics."}
                    {assessmentScore >= 30 && assessmentScore < 60 && "You're stuck in execution mode. Strategic opportunities are passing you by."}
                    {assessmentScore >= 60 && assessmentScore < 80 && "You're starting to get strategic input requests, but not consistently shaping vision."}
                    {assessmentScore >= 80 && "You're close to becoming a strategic leader. One breakthrough will transform your career."}
                  </p>
                </div>
                
                <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden mb-8">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all duration-1000"
                    style={{ width: `${assessmentScore}%` }}
                  ></div>
                  <div className="absolute inset-0 flex justify-between px-2 text-xs text-slate-400">
                    <span>At Risk</span>
                    <span>Stuck</span>
                    <span>Emerging</span>
                    <span>Strategic Leader</span>
                  </div>
                </div>
                
                <div className="bg-slate-700/50 p-6 rounded-lg mb-8">
                  <h4 className="font-bold text-lg mb-3">{tierInfo.tier}</h4>
                  <p className="text-slate-300 mb-2"><strong>What this means for your career:</strong> {tierInfo.interpretation}</p>
                  <p className="text-slate-300 mb-2"><strong>What this looks like in meetings:</strong> {tierInfo.meetingExample}</p>
                  <p className="text-slate-300"><strong>Your immediate next step:</strong> {tierInfo.nextStep}</p>
                </div>
                
                {!submitted ? (
                  <form onSubmit={handleSubmitEmail} className="space-y-4">
                    <p className="text-slate-300 text-center">
                      Want your complete Strategic Seat Readiness Report with your personalized 3-step action plan (MVP-3)?
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-red-500"
                        required
                      />
                      <button 
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300"
                      >
                        Get Full Report
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 text-center">
                      No payment required • Complete your audit by Sunday to secure your spot in Monday's cohort
                    </p>
                  </form>
                ) : (
                  <div className="text-center p-6 bg-green-500/10 border border-green-500 rounded-lg">
                    <div className="text-green-400 font-bold mb-2">Thank you!</div>
                    <p className="text-slate-300">
                      Your Strategic Seat Readiness Report has been sent to {email}. 
                      Check your inbox for the full diagnostic and your personalized 3-step action plan.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">The Invisible Manager's Dilemma</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="space-y-8">
                  <div className="bg-slate-700/50 p-6 rounded-lg border border-slate-600 hover:border-slate-500 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-red-400 mb-4">Career Plateau</h3>
                    <p className="text-slate-300">You ship features on time, but promotions go to others. You're stuck at senior level despite high performance. Advancement requires impact, not just output.</p>
                  </div>
                  <div className="bg-slate-700/50 p-6 rounded-lg border border-slate-600 hover:border-slate-500 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-red-400 mb-4">Tech Anxiety</h3>
                    <p className="text-slate-300">Fear of obsolescence. Worried AI will replace you. Constant pressure to keep up with rapid technological change while being seen as just an executor.</p>
                  </div>
                  <div className="bg-slate-700/50 p-6 rounded-lg border border-slate-600 hover:border-slate-500 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-red-400 mb-4">Feeling Replaceable</h3>
                    <p className="text-slate-300">53% of the American workforce feels replaceable. You're seen as overhead, not leadership. Your expertise is "mansplained" despite years of experience.</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-700/30 p-8 rounded-xl border border-slate-600">
                <h3 className="text-2xl font-bold mb-6">Take the Strategic Seat Readiness Audit</h3>
                <p className="text-slate-300 mb-6">Discover your exact readiness level for strategic leadership with our outcome-based assessment.</p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-slate-300">Brutally honest assessment (not another personality test)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-slate-300">Based on real leadership potential assessments used by FAANG companies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-slate-300">Diagnosis + prescription (MVP-3) with specific actions to take</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-slate-300">Measures the single KPI that predicts promotion velocity</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm text-slate-400 mb-2">Complete by Sunday to join Monday's cohort</div>
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Time Left</span>
                    <span>{countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-purple-600 rounded-full"
                      style={{ 
                        width: `${(1 - (countdown.days * 86400 + countdown.hours * 3600 + countdown.minutes * 60 + countdown.seconds) / (3 * 86400)) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <button 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all duration-300"
                  onClick={() => document.getElementById('micro-assessment').scrollIntoView({ behavior: 'smooth' })}
                >
                  Take the Free Audit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Visualization */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-8">Your Success Metric: Strategic Seats per Manager</h2>
            <p className="text-xl text-slate-300 mb-12">
              We track what matters: the number of strategic discussions you're invited to in the next 30 days. 
              This single KPI predicts promotion velocity and demonstrates your transformation from executor to trusted advisor.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-700/50 p-8 rounded-xl border border-slate-600 mb-10">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-red-400 mb-2">0.2</div>
                  <div className="text-slate-300">Average strategic discussions per week</div>
                  <div className="text-sm text-slate-400 mt-2">"Just managing Jira"</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-400 mb-2">3.7</div>
                  <div className="text-slate-300">Strategic discussions per week</div>
                  <div className="text-sm text-slate-400 mt-2">"Shaping product vision"</div>
                </div>
              </div>
            </div>
            
            <div ref={statsRef} className="bg-slate-700/50 p-8 rounded-xl border border-slate-600 mb-10">
              <h3 className="text-2xl font-bold mb-6 text-center">Real Impact on Your Career</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">{animatedStats.managers}+</div>
                  <div className="text-slate-300">Tech managers transformed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{animatedStats.promotions}%</div>
                  <div className="text-slate-300">Faster promotion cycle</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">${animatedStats.salary}K+</div>
                  <div className="text-slate-300">Average salary increase</div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-700/50 p-8 rounded-xl border border-slate-600">
              <h3 className="text-2xl font-bold mb-6 text-center">What "Strategic Seats" Actually Look Like</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="font-bold text-red-400 mb-2">Before</div>
                  <ul className="space-y-2 text-slate-300">
                    <li>• "Can you give me an update on the Jira board?"</li>
                    <li>• "How long will this ticket take to complete?"</li>
                    <li>• "Please explain the technical dependencies"</li>
                    <li>• "When can we deliver this feature?"</li>
                  </ul>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-lg">
                  <div className="font-bold text-green-400 mb-2">After</div>
                  <ul className="space-y-2 text-slate-300">
                    <li>• "How does this align with our strategic goals?"</li>
                    <li>• "What's your recommendation for the Q3 roadmap?"</li>
                    <li>• "Can you present your vision to the executive team?"</li>
                    <li>• "How would you approach this business challenge?"</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">THE PUSH Framework</h2>
            <p className="text-2xl text-slate-300 mb-4">3 Weeks. 1 KPI. Career Rewritten.</p>
            <p className="text-xl text-slate-400">A tactical system to transform from operational manager to strategic leader</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-600 text-center hover:border-slate-500 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
              <h3 className="text-2xl font-bold mb-4">Map the Spine</h3>
              <p className="text-slate-300">Understand organizational dynamics and build relationship capital. Navigate politics and identify key decision-makers who control your career trajectory.</p>
              <div className="mt-4 text-slate-400 text-sm">
                "From knowing only my team to having direct access to C-suite executives"
              </div>
            </div>
            
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-600 text-center hover:border-slate-500 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
              <h3 className="text-2xl font-bold mb-4">Build Shared Cadence</h3>
              <p className="text-slate-300">Establish structured communication that builds trust and demonstrates reliability. Transform from reactive manager to proactive strategic partner.</p>
              <div className="mt-4 text-slate-400 text-sm">
                "From 20+ hours of meetings to 5 strategic check-ins that drive real outcomes"
              </div>
            </div>
            
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-600 text-center hover:border-slate-500 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
              <h3 className="text-2xl font-bold mb-4">Unblock the Team</h3>
              <p className="text-slate-300">Drive clarity and remove obstacles. Shift from managing tasks to enabling strategic outcomes that impact the business bottom line.</p>
              <div className="mt-4 text-slate-400 text-sm">
                "From firefighting to focusing on initiatives that move the needle"
              </div>
            </div>
          </div>
          
          {/* Identity Transformation Section */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Your Week in the Life: Before & After</h2>
            <div className="bg-slate-800/50 rounded-xl border border-slate-600 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="p-6 border-r border-slate-600">
                  <div className="text-2xl font-bold text-red-400 mb-4 text-center">Operational Manager</div>
                  <div className="space-y-4">
                    <div className="bg-slate-700/50 p-3 rounded">
                      <div className="font-bold">Monday 9am</div>
                      <div className="text-slate-300">Jira standup: "What tickets are you working on today?"</div>
                    </div>
                    <div className="bg-slate-700/50 p-3 rounded">
                      <div className="font-bold">Wednesday 2pm</div>
                      <div className="text-slate-300">"Can you explain the technical debt impact on this sprint?"</div>
                    </div>
                    <div className="bg-slate-700/50 p-3 rounded">
                      <div className="font-bold">Friday 10am</div>
                      <div className="text-slate-300">"Here's the delivery timeline for the next feature set"</div>
                    </div>
                    <div className="bg-slate-700/50 p-3 rounded">
                      <div className="font-bold">Email Example</div>
                      <div className="text-slate-300">"Per your request, here are the sprint metrics showing we're on track to deliver all committed tickets."</div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-2xl font-bold text-green-400 mb-4 text-center">Strategic Leader</div>
                  <div className="space-y-4">
                    <div className="bg-slate-700/50 p-3 rounded">
                      <div className="font-bold">Monday 9am</div>
                      <div className="text-slate-300">"Based on market data, I recommend we shift focus to X"</div>
                    </div>
                    <div className="bg-slate-700/50 p-3 rounded">
                      <div className="font-bold">Wednesday 2pm</div>
                      <div className="text-slate-300">"Here's how our initiative aligns with Q3 business goals"</div>
                    </div>
                    <div className="bg-slate-700/50 p-3 rounded">
                      <div className="font-bold">Friday 10am</div>
                      <div className="text-slate-300">"I've secured buy-in from Product on our strategic direction"</div>
                    </div>
                    <div className="bg-slate-700/50 p-3 rounded">
                      <div className="font-bold">Email Example</div>
                      <div className="text-slate-300">"I've analyzed the market opportunity and recommend we pivot our roadmap to capture $2M in potential revenue."</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonial-section" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">They Transformed Their Careers</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-600 mb-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeTestimonial ? 'bg-white' : 'bg-slate-600'
                    }`}
                    onClick={() => setActiveTestimonial(index)}
                  />
                ))}
              </div>
              
              <div className="transition-all duration-500 ease-in-out">
                <p className="text-slate-300 mb-6 italic text-lg">"{testimonials[activeTestimonial].quote}"</p>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center text-lg font-bold mr-4">
                    {testimonials[activeTestimonial].name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-xl">{testimonials[activeTestimonial].name}</div>
                    <div className="text-slate-400">{testimonials[activeTestimonial].title}</div>
                    <div className="text-slate-500">{testimonials[activeTestimonial].company}</div>
                  </div>
                </div>
                <div className="text-sm text-green-400 border-t border-slate-600 pt-4">
                  {testimonials[activeTestimonial].metrics}
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-block bg-slate-800/50 px-6 py-3 rounded-full border border-slate-600">
                <span className="text-2xl font-bold text-green-400">200+</span> tech managers have already escaped the Jira trap
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-8">You're Not Broken—You've Just Been Invisible</h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              In 3 weeks, you'll either be seen differently—or stay in the same loop. 
              The next QBR could be your promotion meeting. The choice is yours.
            </p>
            
            <div className="bg-slate-800/50 p-8 rounded-xl border border-slate-600 mb-8">
              <h3 className="text-2xl font-bold mb-4">ROI Is Simple</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-400">$15K+</div>
                  <div className="text-slate-300">Average salary increase after promotion</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400">3 Weeks</div>
                  <div className="text-slate-300">Time to transform your career trajectory</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400">∞</div>
                  <div className="text-slate-300">Long-term career momentum and security</div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-600">
                <div className="text-lg font-bold mb-3">Your New Reality</div>
                <p className="text-slate-300">
                  Instead of explaining Jira metrics, you'll be shaping product vision. 
                  Instead of firefighting, you'll be driving strategic outcomes. 
                  Instead of feeling replaceable, you'll be seen as indispensable.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <button 
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-12 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
                onClick={() => document.getElementById('micro-assessment').scrollIntoView({ behavior: 'smooth' })}
              >
                Start the Free Audit Now
              </button>
              <button 
                className="border border-slate-600 hover:border-white text-white font-bold text-lg px-12 py-4 rounded-lg transition-all duration-300 hover:bg-white/10 w-full sm:w-auto"
                onClick={() => document.getElementById('testimonial-section').scrollIntoView({ behavior: 'smooth' })}
              >
                Get My Personalized Influence Review
              </button>
            </div>
            
            <p className="text-slate-400 text-sm">
              Only {spotsLeft} spots left for this month's activation cycle • Join 200+ tech managers who have already escaped the Jira trap
            </p>
          </div>
        </div>
      </section>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-t border-slate-700 p-4 z-50 animate-slide-up">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-white mb-4 sm:mb-0 sm:mr-8 text-sm">
              <span className="text-red-400 font-bold">Only {spotsLeft} Audit Spots Remaining THIS WEEK</span> — Complete by Sunday to secure your place in Monday's cohort!
            </p>
            <div className="flex gap-4">
              <button 
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 text-sm"
                onClick={() => document.getElementById('micro-assessment').scrollIntoView({ behavior: 'smooth' })}
              >
                Start the Free Audit
              </button>
              <button 
                className="border border-slate-600 hover:border-white text-white font-bold px-8 py-3 rounded-lg transition-all duration-300 hover:bg-white/10 text-sm"
                onClick={() => document.getElementById('testimonial-section').scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
