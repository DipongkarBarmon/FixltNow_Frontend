"use client";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Wrench, Zap, Droplet, Sparkles, Wind, Hammer,
  ShieldCheck, Clock, Star, ArrowRight, Search, CheckCircle2,
  ChevronRight, MapPin
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PublicNavbar } from "@/components/public/navbar";
import { PublicFooter } from "@/components/public/footer";
import type { Service, Category } from "@/types";
import { formatBDT } from "@/lib/utils";
import { useRef } from "react";

const iconMap: Record<string, any> = {
  Plumbing: Droplet, Electrical: Zap, Cleaning: Sparkles, "AC Repair": Wind, Carpentry: Hammer,
};

const FADE_UP_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
};

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const { data: services, isLoading: l1 } = useQuery({
    queryKey: ["home-services"],
    queryFn: async () => (await api.get("/services?limit=6&sort=-averageRating")).data?.data ?? [],
  });
  
  const { data: categories, isLoading: l2 } = useQuery({
    queryKey: ["home-cats"],
    queryFn: async () => (await api.get("/categories")).data?.data ?? [],
  });

  return (
    <div className="min-h-screen flex flex-col relative" ref={containerRef}>
      <PublicNavbar />
      
      {/* Decorative Aurora Background */}
      <div className="aurora-bg" />

      {/* --- HERO SECTION --- */}
      <section className="relative isolate overflow-hidden pt-32 pb-24 md:pt-48 md:pb-32 flex items-center justify-center min-h-[90vh]">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="hero-overlay absolute inset-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-sky-400/20 rounded-full blur-[100px] pointer-events-none" />
        </motion.div>

        <div className="container relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } },
            }}
            className="flex flex-col items-center max-w-4xl mx-auto"
          >
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS}>
              <Badge variant="info" className="mb-6 px-4 py-1.5 rounded-full border-primary/20 bg-primary/10 backdrop-blur-md text-primary font-medium shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                <Star className="h-4 w-4 mr-2 inline-block fill-primary" /> 
                Trusted by 10,000+ households
              </Badge>
            </motion.div>

            <motion.h1 variants={FADE_UP_ANIMATION_VARIANTS} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Expert services, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-sky-400 drop-shadow-sm">
                delivered instantly.
              </span>
            </motion.h1>

            <motion.p variants={FADE_UP_ANIMATION_VARIANTS} className="mt-4 text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Skip the hassle. Book verified technicians for plumbing, electrical, and cleaning in just three clicks.
            </motion.p>

            {/* Premium Glassmorphic Search Bar */}
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="mt-12 w-full max-w-3xl mx-auto relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-cyan-400 to-sky-400 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  const q = fd.get("q")?.toString().trim();
                  if (q) window.location.href = `/services?q=${encodeURIComponent(q)}`;
                }}
                className="relative flex flex-col sm:flex-row gap-2 rounded-3xl border border-white/20 bg-card/60 backdrop-blur-2xl p-2.5 shadow-2xl"
              >
                <div className="flex items-center flex-1 px-4">
                  <Search className="h-6 w-6 text-primary mr-3" />
                  <Input
                    name="q"
                    placeholder="What do you need help with?"
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0 h-14 text-lg md:text-xl placeholder:text-muted-foreground/70"
                  />
                </div>
                <div className="hidden sm:flex items-center px-4 border-l border-white/10 text-muted-foreground">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>Dhaka</span>
                </div>
                <Button type="submit" size="lg" className="h-14 px-8 rounded-2xl bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white shadow-lg text-lg font-medium transition-all hover:scale-[1.02]">
                  Find Pros
                </Button>
              </form>
            </motion.div>

            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="mt-8 flex flex-wrap justify-center gap-3 text-sm">
              <span className="text-muted-foreground flex items-center font-medium">Popular:</span>
              {["Plumbing", "AC Repair", "Cleaning", "Electrician"].map((t) => (
                <Link key={t} href={`/services?q=${t}`} className="rounded-full bg-secondary/50 backdrop-blur-md border border-border/50 px-4 py-1.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all shadow-sm">
                  {t}
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Background Icons */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <motion.div animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[20%] left-[10%] text-primary/10">
            <Wrench size={80} />
          </motion.div>
          <motion.div animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[30%] right-[12%] text-cyan-500/10">
            <Zap size={100} />
          </motion.div>
          <motion.div animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-[20%] left-[15%] text-sky-400/10">
            <Droplet size={70} />
          </motion.div>
        </div>
      </section>

      {/* --- TRUST BADGES --- */}
      <section className="border-y border-border/50 bg-muted/30 backdrop-blur-sm relative z-10 py-8">
        <div className="container">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <Trust icon={ShieldCheck} label="100% Verified Pros" />
            <Trust icon={Clock} label="On-Time Guarantee" />
            <Trust icon={CheckCircle2} label="Quality Assured" />
            <Trust icon={Star} label="4.8/5 Average Rating" />
          </div>
        </div>
      </section>

      {/* --- CATEGORIES --- */}
      <section className="container py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-3">Categories</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">What do you need done?</h2>
            <p className="text-xl text-muted-foreground mt-4">Select a category below to instantly find top-rated professionals ready to help.</p>
          </div>
          <Button asChild variant="ghost" className="hidden md:flex gap-2 group text-lg">
            <Link href="/categories">
              View all categories
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {l2 ? Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-48 rounded-3xl" />)
            : ((categories as Category[]) ?? []).slice(0, 5).map((c, i) => {
                const Icon = iconMap[c.name] ?? Wrench;
                return (
                  <Link key={c.id} href={`/services?category=${encodeURIComponent(c.name)}`}>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="h-full"
                    >
                      <Card className="h-full cursor-pointer border-border/50 bg-card/40 backdrop-blur-md hover:bg-card hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/20 rounded-3xl overflow-hidden card-halo">
                        <CardContent className="p-8 flex flex-col items-center text-center justify-center h-full gap-4">
                          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-cyan-500/10 text-primary group-hover:scale-110 transition-transform duration-500">
                            <Icon className="h-10 w-10 relative z-10" />
                            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <h3 className="font-bold text-lg">{c.name}</h3>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Link>
                );
              })}
        </div>
      </section>

      {/* --- TOP RATED SERVICES --- */}
      <section className="container py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl">
             <Badge variant="outline" className="mb-3">Featured</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Top-rated services</h2>
            <p className="text-xl text-muted-foreground mt-4">Discover the most booked and highly rated services in your area.</p>
          </div>
          <Button asChild variant="ghost" className="hidden md:flex gap-2 group text-lg">
            <Link href="/services">
              Browse all services
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {l1 ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-80 rounded-3xl" />)
            : ((services as Service[]) ?? []).map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/services/${s.id}`}>
                    <Card className="h-full overflow-hidden cursor-pointer group border-border/50 bg-card/60 backdrop-blur-md hover:border-primary/40 transition-all duration-300 rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-primary/10">
                      <div className="h-48 bg-gradient-to-br from-primary/20 via-cyan-400/20 to-sky-400/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10" />
                        
                        {/* Abstract Background for Service Image placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center text-primary/40 group-hover:scale-110 transition-transform duration-700">
                           <div className="absolute w-full h-full dot-grid opacity-50" />
                           <Wrench className="h-16 w-16 relative z-10 drop-shadow-lg" />
                        </div>
                        <Badge className="absolute top-4 left-4 z-20 backdrop-blur-md bg-white/10 dark:bg-black/20 border-white/20 text-foreground" variant="outline">
                          {s.category?.name ?? "Service"}
                        </Badge>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-xl line-clamp-1 group-hover:text-primary transition-colors">{s.title}</h3>
                        <p className="text-muted-foreground line-clamp-2 mt-2 leading-relaxed">{s.description}</p>
                        
                        <div className="mt-6 pt-6 border-t border-border/50 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-lg font-medium text-sm">
                            <Star className="h-4 w-4 fill-current" />
                            <span>{s.averageRating?.toFixed(1) ?? "New"}</span>
                            <span className="opacity-70 font-normal">({s.totalReviews ?? 0})</span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Starting at</span>
                            <span className="font-bold text-lg text-primary">{formatBDT(s.hourlyRate)}<span className="text-sm text-muted-foreground font-normal">/hr</span></span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="container py-24 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] bg-card border border-border/50 p-12 md:p-20 shadow-2xl"
        >
          {/* Dynamic background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-cyan-500/5 to-transparent dark:from-primary/20 dark:via-cyan-500/10" />
          
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-sky-400/20 blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl text-center md:text-left">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">For Professionals</Badge>
              <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                Turn your skills into <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">success.</span>
              </h2>
              <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
                Join thousands of verified pros on FixItNow. Set your own schedule, grow your business, and get paid securely.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
                <Button asChild size="xl" className="h-14 px-8 rounded-2xl bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-500/90 text-white shadow-lg shadow-primary/25 text-lg font-medium transition-all hover:scale-105">
                  <Link href="/register?role=TECHNICIAN">Become a Pro <ArrowRight className="h-5 w-5 ml-2" /></Link>
                </Button>
                <Button asChild variant="outline" size="xl" className="h-14 px-8 rounded-2xl border-border hover:bg-muted text-lg font-medium transition-all">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            
            <div className="hidden lg:block relative w-full max-w-sm">
               {/* Decorative card illustration */}
               <motion.div 
                 animate={{ y: [0, -15, 0] }} 
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                 className="relative z-20 bg-card border border-border/50 rounded-2xl p-6 shadow-2xl backdrop-blur-xl"
               >
                  <div className="flex items-center gap-4 border-b border-border/50 pb-4 mb-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-primary to-cyan-400 p-[2px]">
                      <div className="h-full w-full rounded-full bg-card border border-border flex items-center justify-center">
                        <Wrench className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold">New Job Request</h4>
                      <p className="text-sm text-muted-foreground">Just now</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-full bg-muted rounded-full" />
                    <div className="h-2 w-4/5 bg-muted rounded-full" />
                    <div className="flex justify-between items-center mt-4">
                       <span className="font-bold text-primary">$45/hr</span>
                       <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">Accept</Badge>
                    </div>
                  </div>
               </motion.div>
               
               <motion.div 
                 animate={{ y: [0, 15, 0] }} 
                 transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute -right-8 -bottom-8 z-10 bg-card border border-border/50 rounded-2xl p-5 shadow-2xl backdrop-blur-xl opacity-90"
               >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                      <Star className="h-5 w-5 fill-current" />
                    </div>
                    <div>
                      <h4 className="font-bold">5.0 Rating</h4>
                      <p className="text-xs text-muted-foreground">From last customer</p>
                    </div>
                  </div>
               </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <PublicFooter />
    </div>
  );
}

function Trust({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <div className="flex items-center gap-3 text-lg font-medium">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <span>{label}</span>
    </div>
  );
}