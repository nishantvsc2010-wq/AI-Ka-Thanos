import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Zap, 
  Cpu, 
  Layers, 
  Image as ImageIcon, 
  Mic, 
  Workflow, 
  ChevronRight, 
  CheckCircle2, 
  Plus, 
  Minus,
  MessageSquare,
  Globe,
  Shield,
  Clock,
  ArrowRight
} from 'lucide-react';
import ChatUI from './components/ChatUI';

const FeatureCard = ({ icon: Icon, title, description, color }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
  >
    <div className={`w-12 h-12 rounded-xl bg-${color}/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
      <Icon className={`w-6 h-6 text-${color}`} />
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-white/60 leading-relaxed">{description}</p>
  </motion.div>
);

const FAQItem = ({ question, answer }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:text-neon-teal transition-colors"
      >
        <span className="text-lg font-medium">{question}</span>
        {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-white/60 leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
};

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans selection:bg-neon-purple selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-teal flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">AI ka Thanos</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#models" className="hover:text-white transition-colors">Models</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-sm hover:bg-neon-teal hover:text-black transition-all glow-teal"
          >
            Launch App
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-neon-purple/20 blur-[120px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-neon-teal mb-6">
              The Ultimate AI Aggregator
            </span>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
              AI ka Thanos <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-neon-teal to-neon-purple">
                World's Most Powerful AI
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12">
              Many Premium AIs. One Subscription. Infinite Power. <br />
              Stop switching tabs. Start dominating.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsChatOpen(true)}
                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-neon-purple to-neon-teal text-white font-black text-lg hover:scale-105 transition-all glow-purple flex items-center justify-center gap-2"
              >
                Get Started Now <ChevronRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-all">
                Watch Demo
              </button>
            </div>
          </motion.div>

          {/* Hero Image Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple via-neon-teal to-neon-green rounded-3xl blur opacity-20" />
            <div className="relative bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl aspect-video flex items-center justify-center">
              <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/cyberpunk/1200/800')] bg-cover bg-center opacity-40 grayscale" />
              <div className="relative z-10 text-center p-12">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center mx-auto mb-6 border border-white/20">
                  <Zap className="w-10 h-10 text-neon-teal" />
                </div>
                <h3 className="text-3xl font-bold mb-4">The Thanos Interface</h3>
                <p className="text-white/50">Experience the unified power of 6+ AIs in a single, seamless workflow.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Built for Absolute Power</h2>
            <p className="text-white/60 text-lg">Everything you need to outpace the competition.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={Layers}
              title="Compare All AIs"
              description="Run your prompt across GPT, Claude, and Gemini simultaneously to find the best answer."
              color="neon-purple"
            />
            <FeatureCard 
              icon={Zap}
              title="Prompt Boost"
              description="Our proprietary engine auto-optimizes your prompts for maximum quality and accuracy."
              color="neon-green"
            />
            <FeatureCard 
              icon={ImageIcon}
              title="Multi-Modal"
              description="Generate stunning images and transcribe audio with professional-grade AI models."
              color="neon-teal"
            />
            <FeatureCard 
              icon={Workflow}
              title="Custom Workflows"
              description="Build complex automation with system instructions tailored to your specific needs."
              color="neon-purple"
            />
          </div>
        </div>
      </section>

      {/* Efficiency Section */}
      <section className="py-32 px-6 bg-white/5 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-neon-teal/5 blur-[100px] -z-10" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-neon-teal font-bold uppercase tracking-widest text-sm mb-4 block">Unmatched Efficiency</span>
            <h2 className="text-5xl md:text-6xl font-black mb-8 leading-tight">One Window. <br />Six Perspectives.</h2>
            <p className="text-xl text-white/60 mb-10 leading-relaxed">
              Why settle for one opinion when you can have six? AI ka Thanos runs your prompts across GPT, Claude, Gemini, and more instantly, giving you a 360-degree view of any problem.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Instant multi-model comparison",
                "Unified chat history across all AIs",
                "Zero latency switching",
                "Enterprise-grade security"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-lg">
                  <CheckCircle2 className="w-6 h-6 text-neon-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setIsChatOpen(true)}
              className="px-8 py-4 rounded-xl bg-white text-black font-bold hover:bg-neon-teal transition-colors flex items-center gap-2"
            >
              Try the Multi-Model Chat <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'GPT-4o', color: 'neon-green' },
                { name: 'Claude 3.5', color: 'neon-purple' },
                { name: 'Gemini 3.1', color: 'neon-teal' },
                { name: 'Perplexity', color: 'neon-green' },
                { name: 'Grok-1', color: 'neon-purple' },
                { name: 'Mistral Large', color: 'neon-teal' },
              ].map((model, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="p-6 rounded-2xl bg-black border border-white/10 flex flex-col items-center justify-center text-center gap-3"
                >
                  <div className={`w-10 h-10 rounded-full bg-${model.color}/20 flex items-center justify-center`}>
                    <Cpu className={`w-5 h-5 text-${model.color}`} />
                  </div>
                  <span className="font-bold">{model.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Model Highlights */}
      <section id="models" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">The Infinity Stones of AI</h2>
            <p className="text-white/60 text-lg">We've gathered the most powerful models in the universe.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'GPT-4o', strength: 'Creative Writing & Logic', desc: 'The gold standard for reasoning and creative tasks.' },
              { name: 'Claude 3.5 Sonnet', strength: 'Coding & Nuance', desc: 'Unbeatable for technical documentation and complex code.' },
              { name: 'Gemini 3.1', strength: 'Speed & Context', desc: 'Massive context window with lightning-fast responses.' },
              { name: 'Perplexity', strength: 'Real-time Research', desc: 'The ultimate research assistant with live web access.' },
              { name: 'Grok-1', strength: 'Unfiltered Insights', desc: 'Real-time data from X with a unique, witty personality.' },
              { name: 'DeepSeek V3', strength: 'Efficiency & Math', desc: 'High-performance model optimized for logical reasoning.' },
            ].map((model, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold mb-2">{model.name}</h3>
                <span className="text-neon-teal text-sm font-bold uppercase tracking-wider mb-4 block">{model.strength}</span>
                <p className="text-white/50">{model.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6">6 AIs for Half the Price of One</h2>
            <p className="text-white/60 text-lg">Choose the power level that fits your ambition.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Monthly */}
            <div className="p-10 rounded-3xl bg-black border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-white/10 rounded">Popular</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Monthly Power</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black">INR 1/-</span>
                <span className="text-white/50">/month</span>
              </div>
              <ul className="space-y-4 mb-10">
                {["Access to 6+ Premium AIs", "Unlimited Messages", "Prompt Boost Engine", "24/7 Support"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-neon-green" />
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl bg-white text-black font-bold hover:bg-neon-teal transition-colors">
                Get Started
              </button>
            </div>
            {/* Yearly */}
            <div className="p-10 rounded-3xl bg-gradient-to-br from-neon-purple/20 to-neon-teal/20 border border-neon-purple/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-neon-purple text-white rounded">Best Value</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Yearly Dominance</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl font-black">INR 99/-</span>
                <span className="text-white/50">/year</span>
              </div>
              <ul className="space-y-4 mb-10">
                {["Everything in Monthly", "Priority Model Access", "Early Beta Features", "Exclusive API Access"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-neon-teal" />
                    <span className="text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-purple to-neon-teal text-white font-bold hover:scale-105 transition-transform glow-purple">
                Claim Infinite Power
              </button>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-20 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-6 px-4 text-white/50 font-medium">Feature</th>
                  <th className="py-6 px-4 font-bold">Individual Subs</th>
                  <th className="py-6 px-4 font-bold text-neon-teal">AI ka Thanos</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { f: "Monthly Cost", i: "INR 12,000+", t: "INR 1" },
                  { f: "Model Switching", i: "Manual / 6 Tabs", t: "Instant / 1 Tab" },
                  { f: "Prompt Optimization", i: "None", t: "Included" },
                  { f: "Unified History", i: "No", t: "Yes" },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-6 px-4 text-white/70">{row.f}</td>
                    <td className="py-6 px-4 text-white/50">{row.i}</td>
                    <td className="py-6 px-4 font-bold text-neon-teal">{row.t}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">See the Power in Action</h2>
          <div className="relative rounded-3xl overflow-hidden border border-white/10 group cursor-pointer">
            <img 
              src="https://picsum.photos/seed/demo/1200/675" 
              alt="Demo Preview" 
              className="w-full aspect-video object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center glow-teal group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 fill-current" />
              </div>
            </div>
          </div>
          <p className="mt-8 text-xl text-white/60">"See how AI ka Thanos delivers what others miss."</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6 bg-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black mb-4">Frequently Asked Questions</h2>
            <p className="text-white/60">Everything you need to know about the snap.</p>
          </div>
          <div className="space-y-2">
            <FAQItem 
              question="How can it be so cheap (INR 1)?"
              answer="We use advanced load balancing and enterprise-scale API pooling to bring the cost down for our early adopters. This is a limited-time launch price."
            />
            <FAQItem 
              question="Is there a limit on messages?"
              answer="We offer truly unlimited messages for standard usage. For extreme power users, we have a fair usage policy that ensures everyone gets high-speed access."
            />
            <FAQItem 
              question="Which models are included?"
              answer="Currently, we support GPT-4o, Claude 3.5 Sonnet, Gemini 2.0, Perplexity, Grok-1, and DeepSeek V3. We add new models every month."
            />
            <FAQItem 
              question="Can I cancel anytime?"
              answer="Yes, you can cancel your subscription with a single click. No hidden fees, no complicated forms."
            />
            <FAQItem 
              question="How often are models updated?"
              answer="We update our model endpoints within 24 hours of any major release from OpenAI, Anthropic, or Google."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-neon-purple/20 -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">Ready to Unleash the Power of AI ka Thanos?</h2>
          <p className="text-xl text-white/60 mb-12">Join 50,000+ power users who have already made the switch.</p>
          <button 
            onClick={() => setIsChatOpen(true)}
            className="px-12 py-6 rounded-2xl bg-white text-black font-black text-xl hover:bg-neon-teal transition-all glow-teal"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-purple to-neon-teal flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase">AI ka Thanos</span>
              </div>
              <p className="text-white/50 max-w-sm leading-relaxed">
                The world's most powerful AI aggregator. Bringing the infinity stones of artificial intelligence into one unified interface.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><a href="#" className="hover:text-neon-teal transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-neon-teal transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-neon-teal transition-colors">Models</a></li>
                <li><a href="#" className="hover:text-neon-teal transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-white/50">
                <li><a href="#" className="hover:text-neon-teal transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-neon-teal transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-neon-teal transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-neon-teal transition-colors">About</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-white/30">
            <p>© 2026 AI ka Thanos. All rights reserved.</p>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <Globe className="w-4 h-4" />
              <Shield className="w-4 h-4" />
              <Clock className="w-4 h-4" />
            </div>
          </div>
        </div>
      </footer>

      {/* Chat UI Modal */}
      <AnimatePresence>
        {isChatOpen && (
          <ChatUI onClose={() => setIsChatOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
