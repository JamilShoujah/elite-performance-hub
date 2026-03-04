import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = ["All", "Upper Body", "Lower Body", "Core", "Mobility", "Conditioning", "Full Body"];

const exercises = [
  { name: "Barbell Back Squat", category: "Lower Body", muscle: "Quads, Glutes", desc: "Fundamental compound movement for lower body strength and power." },
  { name: "Deadlift", category: "Full Body", muscle: "Posterior Chain", desc: "The king of total-body strength. Builds raw power from the ground up." },
  { name: "Bench Press", category: "Upper Body", muscle: "Chest, Triceps", desc: "Primary horizontal pressing movement for upper body development." },
  { name: "Pull-Ups", category: "Upper Body", muscle: "Lats, Biceps", desc: "Essential vertical pulling pattern for back width and grip strength." },
  { name: "Romanian Deadlift", category: "Lower Body", muscle: "Hamstrings, Glutes", desc: "Hip-hinge pattern targeting the posterior chain with eccentric control." },
  { name: "Overhead Press", category: "Upper Body", muscle: "Shoulders, Triceps", desc: "Vertical pressing for shoulder strength and stability." },
  { name: "Plank Variations", category: "Core", muscle: "Core", desc: "Anti-extension core training for trunk stability and endurance." },
  { name: "Hip 90/90 Stretch", category: "Mobility", muscle: "Hips", desc: "Internal and external hip rotation mobility drill." },
  { name: "Rowing Machine Intervals", category: "Conditioning", muscle: "Full Body", desc: "High-output cardiovascular conditioning with full-body engagement." },
  { name: "Bulgarian Split Squat", category: "Lower Body", muscle: "Quads, Glutes", desc: "Unilateral leg strength for balance and athletic performance." },
  { name: "Dumbbell Rows", category: "Upper Body", muscle: "Back, Biceps", desc: "Unilateral pulling for back thickness and posture correction." },
  { name: "Turkish Get-Up", category: "Full Body", muscle: "Full Body", desc: "Complex movement pattern for stability, mobility, and strength." },
  { name: "Pallof Press", category: "Core", muscle: "Core", desc: "Anti-rotation core exercise for functional stability." },
  { name: "Thoracic Spine Rotation", category: "Mobility", muscle: "Thoracic Spine", desc: "Rotation mobility for improved overhead position and posture." },
  { name: "Assault Bike Sprints", category: "Conditioning", muscle: "Full Body", desc: "Maximum intensity conditioning for anaerobic capacity." },
  { name: "Front Squat", category: "Lower Body", muscle: "Quads, Core", desc: "Anterior-loaded squat for quad dominance and core bracing." },
  { name: "Kettlebell Swing", category: "Conditioning", muscle: "Posterior Chain", desc: "Ballistic hip hinge for power endurance and conditioning." },
  { name: "Face Pulls", category: "Upper Body", muscle: "Rear Delts, Rotator Cuff", desc: "Shoulder health and postural correction exercise." },
];

const ExerciseLibrary = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return exercises.filter((ex) => {
      const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase()) ||
        ex.muscle.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || ex.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Performance Exercise Library
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Browse our curated collection of performance-focused exercises.
            </p>
          </motion.div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search exercises..."
                className="w-full bg-muted border border-border rounded-sm pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-sm border transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Exercise Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((ex, i) => (
              <motion.div
                key={ex.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="group bg-card rounded-sm p-6 border border-border hover:border-primary/40 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-lg font-semibold text-foreground">{ex.name}</h3>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-sm shrink-0 ml-2">
                    {ex.category}
                  </span>
                </div>
                <p className="text-xs text-primary font-medium mb-2">{ex.muscle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{ex.desc}</p>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No exercises found. Try a different search.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ExerciseLibrary;
