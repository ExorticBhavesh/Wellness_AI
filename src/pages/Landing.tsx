import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Activity, BarChart3, Stethoscope, ArrowRight, Sparkles, Shield, Zap, TrendingUp, Users } from 'lucide-react';

export default function LandingPage() {
  const features = [
    { 
      icon: Activity, 
      title: 'Lifestyle Tracking', 
      description: 'Log sleep, exercise, diet, and stress daily with beautiful visualizations',
      gradient: 'gradient-health',
    },
    { 
      icon: Stethoscope, 
      title: 'AI Symptom Checker', 
      description: 'Get AI-powered health risk assessments and personalized recommendations',
      gradient: 'gradient-energy',
    },
    { 
      icon: BarChart3, 
      title: 'Community Insights', 
      description: 'See anonymized regional health trends and compare your progress',
      gradient: 'gradient-purple',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '95%', label: 'Accuracy Rate' },
    { value: '50+', label: 'Health Metrics' },
    { value: '24/7', label: 'AI Available' },
  ];

  const benefits = [
    { icon: Shield, title: 'Privacy First', description: 'Your health data is encrypted and never shared' },
    { icon: Zap, title: 'Instant Insights', description: 'Get real-time AI analysis of your health data' },
    { icon: TrendingUp, title: 'Track Progress', description: 'Visualize your wellness journey over time' },
    { icon: Users, title: 'Community Support', description: 'Learn from anonymized community health trends' },
  ];

  const healthImages = [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', // Yoga
    'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&q=80', // Healthy food
    'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80', // Fresh vegetables
    'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800&q=80', // Running
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80', // Meditation
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80', // Doctor
  ];

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      {/* Animated Health Photos Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background/95 z-10" />
        
        {/* Animated floating health images */}
        <div className="absolute inset-0 grid grid-cols-3 gap-4 p-4 opacity-90">
          {healthImages.map((img, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-3xl"
              style={{
                animation: `floatImage ${15 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * -2.5}s`,
              }}
            >
              <img
                src={img}
                alt="Health lifestyle"
                className="w-full h-full object-cover scale-110 transition-transform duration-[20s] hover:scale-125"
                style={{
                  animation: `slowZoom ${20 + i * 3}s ease-in-out infinite alternate`,
                  animationDelay: `${i * -3}s`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Original animated blobs - now enhanced */}
        <div className="blob blob-1 w-96 h-96 -top-48 -left-48 opacity-80" />
        <div className="blob blob-2 w-80 h-80 top-1/3 right-0 opacity-80" />
        <div className="blob blob-3 w-72 h-72 bottom-0 left-1/3 opacity-80" />
      </div>

      {/* Hero Section */}
      <header className="relative">
        <nav className="relative z-10 flex items-center justify-between p-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-health shadow-lg shadow-primary/30 animate-pulse-glow">
              <Heart className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold">WellnessAI</span>
          </div>
          <Link to="/auth">
            <Button variant="outline" className="border-primary/30 hover:bg-primary/5 hover:border-primary/50 font-medium">
              Sign In
            </Button>
          </Link>
        </nav>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 py-20 sm:py-28">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Health Intelligence</span>
          </div>
          
          <h1 className="text-5xl font-bold tracking-tight sm:text-7xl font-display mb-8 animate-fade-in">
            Your Personal
            <span className="block gradient-text">Health Companion</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in leading-relaxed">
            Track your lifestyle, get AI health insights, and discover community wellness trends—all in one beautiful, privacy-first platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/auth">
              <Button size="lg" className="gradient-health text-lg px-8 py-6 rounded-2xl shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:scale-105 transition-all duration-300 btn-glow">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 rounded-2xl border-2 hover:bg-muted/50">
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 animate-fade-in">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-display">Everything You Need</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive health tracking powered by cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((f, i) => (
              <div key={f.title} className="feature-card group" style={{ animationDelay: `${i * 100}ms` }}>
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${f.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <f.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-xl mb-3">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-muted/30 relative">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 font-display">
                Built for Your
                <span className="block gradient-text">Privacy & Security</span>
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Your health data is precious. That's why we've built WellnessAI with privacy at its core. All data is encrypted, never sold, and you're always in control.
              </p>
              <div className="grid gap-6 sm:grid-cols-2">
                {benefits.map((b) => (
                  <div key={b.title} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <b.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{b.title}</h4>
                      <p className="text-sm text-muted-foreground">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 via-accent/20 to-info/20 p-8 relative overflow-hidden">
                <div className="absolute inset-4 rounded-2xl bg-card shadow-2xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto rounded-full gradient-health flex items-center justify-center mb-4 animate-pulse-glow">
                      <span className="text-5xl font-bold text-primary-foreground">85</span>
                    </div>
                    <p className="text-lg font-semibold">Health Score</p>
                    <p className="text-sm text-muted-foreground">Excellent</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0 gradient-hero opacity-90" />
            <div className="relative z-10 text-center py-16 px-8">
              <h2 className="text-4xl font-bold mb-4 font-display text-primary-foreground">
                Start Your Wellness Journey
              </h2>
              <p className="text-primary-foreground/80 mb-8 text-lg max-w-xl mx-auto">
                Join thousands of users improving their health with AI-driven insights. It's free to get started.
              </p>
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 rounded-2xl font-semibold hover:scale-105 transition-transform">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-6 bg-muted/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-health">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">WellnessAI</span>
          </div>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 WellnessAI. For informational purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
}
