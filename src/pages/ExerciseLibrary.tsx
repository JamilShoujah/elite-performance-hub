import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowLeft, X, CheckCircle, AlertTriangle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

const categories = ["All", "Upper Body", "Lower Body", "Core", "Mobility", "Conditioning", "Full Body"];

interface Exercise {
  name: string;
  category: string;
  muscle: string;
  desc: string;
  gifUrl: string;
  tips: string[];
  commonMistakes: string[];
}

const exercises: Exercise[] = [
  {
    name: "Barbell Back Squat",
    category: "Lower Body",
    muscle: "Quads, Glutes",
    desc: "Fundamental compound movement for lower body strength and power.",
    gifUrl: "https://media.giphy.com/media/1qfKN8Dt0CRdCRxz9q/giphy.gif",
    tips: [
      "Keep your chest up and core braced throughout the movement",
      "Push your knees out in line with your toes",
      "Aim for parallel or below — hip crease at or below knee level",
      "Drive through your full foot, not just your toes",
    ],
    commonMistakes: [
      "Letting knees cave inward",
      "Rounding the lower back at the bottom",
      "Rising on toes during the lift",
    ],
  },
  {
    name: "Deadlift",
    category: "Full Body",
    muscle: "Posterior Chain",
    desc: "The king of total-body strength. Builds raw power from the ground up.",
    gifUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    tips: [
      "Set up with the bar over mid-foot, shins close to the bar",
      "Brace your core hard before pulling — think 'push the floor away'",
      "Keep the bar close to your body throughout the lift",
      "Lock out by squeezing glutes at the top, not hyperextending your back",
    ],
    commonMistakes: [
      "Rounding the back during the pull",
      "Starting with hips too high or too low",
      "Jerking the bar off the floor instead of building tension",
    ],
  },
  {
    name: "Bench Press",
    category: "Upper Body",
    muscle: "Chest, Triceps",
    desc: "Primary horizontal pressing movement for upper body development.",
    gifUrl: "https://media.giphy.com/media/7YCC7NnSgAx9nQKoCz/giphy.gif",
    tips: [
      "Retract and depress your shoulder blades — pinch them together",
      "Plant your feet firmly on the ground for leg drive",
      "Lower the bar to your mid-chest with controlled tempo",
      "Press in a slight arc back toward your face",
    ],
    commonMistakes: [
      "Flaring elbows out to 90 degrees",
      "Bouncing the bar off your chest",
      "Lifting hips off the bench",
    ],
  },
  {
    name: "Pull-Ups",
    category: "Upper Body",
    muscle: "Lats, Biceps",
    desc: "Essential vertical pulling pattern for back width and grip strength.",
    gifUrl: "https://media.giphy.com/media/lnlAifQdenMxW/giphy.gif",
    tips: [
      "Initiate the pull by depressing your shoulder blades — pull them down and back",
      "Drive your elbows toward your hips, not behind you",
      "Control the descent — the eccentric is just as important",
      "Full range of motion: dead hang to chin over bar",
    ],
    commonMistakes: [
      "Kipping or swinging to get over the bar",
      "Half reps — not going to full extension at the bottom",
      "Shrugging shoulders up to ears during the pull",
    ],
  },
  {
    name: "Romanian Deadlift",
    category: "Lower Body",
    muscle: "Hamstrings, Glutes",
    desc: "Hip-hinge pattern targeting the posterior chain with eccentric control.",
    gifUrl: "https://media.giphy.com/media/3o7btNDyBs5qkGBi7e/giphy.gif",
    tips: [
      "Keep a soft bend in the knees — this is a hinge, not a squat",
      "Push your hips back as if closing a car door with your glutes",
      "Feel the stretch in your hamstrings before reversing the movement",
      "Keep the bar or dumbbells glued to your legs",
    ],
    commonMistakes: [
      "Bending the knees too much, turning it into a squat",
      "Rounding the lower back",
      "Not hinging deep enough — cutting the range short",
    ],
  },
  {
    name: "Overhead Press",
    category: "Upper Body",
    muscle: "Shoulders, Triceps",
    desc: "Vertical pressing for shoulder strength and stability.",
    gifUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    tips: [
      "Brace your core and squeeze your glutes for a stable base",
      "Press the bar in a straight line — move your head out of the way",
      "Lock out overhead with the bar directly over your spine",
      "Controlled descent back to the front rack position",
    ],
    commonMistakes: [
      "Excessive back lean turning it into an incline press",
      "Not locking out fully overhead",
      "Pressing the bar forward instead of straight up",
    ],
  },
  {
    name: "Plank Variations",
    category: "Core",
    muscle: "Core",
    desc: "Anti-extension core training for trunk stability and endurance.",
    gifUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    tips: [
      "Maintain a straight line from head to heels — no sagging hips",
      "Actively push the floor away to engage your serratus",
      "Breathe steadily — don't hold your breath",
      "Squeeze your glutes and quads to create full-body tension",
    ],
    commonMistakes: [
      "Letting the hips sag or pike up",
      "Looking forward instead of down (straining the neck)",
      "Holding breath instead of breathing through the hold",
    ],
  },
  {
    name: "Hip 90/90 Stretch",
    category: "Mobility",
    muscle: "Hips",
    desc: "Internal and external hip rotation mobility drill.",
    gifUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    tips: [
      "Sit tall — don't slouch or lean back",
      "Both legs at 90-degree angles on the floor",
      "Rotate slowly between sides, keeping contact with the ground",
      "Breathe deeply into tight spots — don't force it",
    ],
    commonMistakes: [
      "Rounding the spine to compensate for tight hips",
      "Rushing through transitions",
      "Lifting the knee off the ground during rotation",
    ],
  },
  {
    name: "Rowing Machine Intervals",
    category: "Conditioning",
    muscle: "Full Body",
    desc: "High-output cardiovascular conditioning with full-body engagement.",
    gifUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    tips: [
      "Sequence: legs → lean back → arms pull (then reverse on return)",
      "Drive hard through the legs — power comes from the lower body",
      "Keep your stroke rate controlled — power over speed",
      "Maintain a tall posture, don't hunch over",
    ],
    commonMistakes: [
      "Pulling with arms first instead of driving with legs",
      "Hunching the back during the pull",
      "Stroke rate too high with no power behind it",
    ],
  },
  {
    name: "Bulgarian Split Squat",
    category: "Lower Body",
    muscle: "Quads, Glutes",
    desc: "Unilateral leg strength for balance and athletic performance.",
    gifUrl: "https://media.giphy.com/media/1qfKN8Dt0CRdCRxz9q/giphy.gif",
    tips: [
      "Keep your torso upright — slight forward lean is okay",
      "Front shin should stay relatively vertical",
      "Lower until your back knee nearly touches the floor",
      "Drive up through the heel of the front foot",
    ],
    commonMistakes: [
      "Front foot too close to the bench",
      "Letting the front knee cave inward",
      "Rushing the reps — control the eccentric",
    ],
  },
  {
    name: "Dumbbell Rows",
    category: "Upper Body",
    muscle: "Back, Biceps",
    desc: "Unilateral pulling for back thickness and posture correction.",
    gifUrl: "https://media.giphy.com/media/lnlAifQdenMxW/giphy.gif",
    tips: [
      "Keep your back flat — think 'proud chest'",
      "Pull the dumbbell toward your hip, not your shoulder",
      "Squeeze your shoulder blade at the top for a full contraction",
      "Control the weight on the way down",
    ],
    commonMistakes: [
      "Using momentum to swing the weight up",
      "Rounding the upper back",
      "Rotating the torso to cheat the rep",
    ],
  },
  {
    name: "Turkish Get-Up",
    category: "Full Body",
    muscle: "Full Body",
    desc: "Complex movement pattern for stability, mobility, and strength.",
    gifUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    tips: [
      "Keep your eyes on the weight overhead at all times",
      "Move slowly and deliberately through each position",
      "Master each step before adding weight",
      "The arm holding the weight should stay vertical throughout",
    ],
    commonMistakes: [
      "Rushing through the movement",
      "Taking eyes off the weight",
      "Skipping positions — each step matters",
    ],
  },
  {
    name: "Pallof Press",
    category: "Core",
    muscle: "Core",
    desc: "Anti-rotation core exercise for functional stability.",
    gifUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    tips: [
      "Stand with feet shoulder-width apart, knees slightly bent",
      "Press the cable/band straight out from your chest",
      "Resist the pull — don't let your torso rotate",
      "Hold the extended position for 2-3 seconds per rep",
    ],
    commonMistakes: [
      "Standing too close to the anchor point",
      "Allowing the torso to rotate toward the cable",
      "Using too much weight and compensating with your arms",
    ],
  },
  {
    name: "Thoracic Spine Rotation",
    category: "Mobility",
    muscle: "Thoracic Spine",
    desc: "Rotation mobility for improved overhead position and posture.",
    gifUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    tips: [
      "Start on all fours or side-lying for best results",
      "Rotate through the mid-back — keep the lower back stable",
      "Follow your hand with your eyes as you rotate",
      "Exhale as you rotate to increase range of motion",
    ],
    commonMistakes: [
      "Rotating from the lower back instead of the thoracic spine",
      "Moving too fast without control",
      "Not breathing into the stretch",
    ],
  },
  {
    name: "Assault Bike Sprints",
    category: "Conditioning",
    muscle: "Full Body",
    desc: "Maximum intensity conditioning for anaerobic capacity.",
    gifUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    tips: [
      "Go all-out for 15-30 seconds, then rest fully",
      "Use both arms and legs — push and pull the handles",
      "Keep your core tight to transfer power efficiently",
      "Maintain a consistent cadence during each sprint",
    ],
    commonMistakes: [
      "Pacing yourself — these should be max effort",
      "Only using legs and neglecting arm drive",
      "Not resting long enough between intervals",
    ],
  },
  {
    name: "Front Squat",
    category: "Lower Body",
    muscle: "Quads, Core",
    desc: "Anterior-loaded squat for quad dominance and core bracing.",
    gifUrl: "https://media.giphy.com/media/1qfKN8Dt0CRdCRxz9q/giphy.gif",
    tips: [
      "Keep your elbows high — upper arms parallel to the floor",
      "Stay upright — this requires more thoracic extension than a back squat",
      "Brace your core harder than a back squat",
      "Drive your elbows up as you stand out of the hole",
    ],
    commonMistakes: [
      "Dropping the elbows and losing the bar",
      "Leaning too far forward",
      "Not bracing the core hard enough",
    ],
  },
  {
    name: "Kettlebell Swing",
    category: "Conditioning",
    muscle: "Posterior Chain",
    desc: "Ballistic hip hinge for power endurance and conditioning.",
    gifUrl: "https://media.giphy.com/media/3o7btNDyBs5qkGBi7e/giphy.gif",
    tips: [
      "This is a hip hinge — NOT a squat. Snap the hips forward",
      "Arms are just along for the ride — power comes from the hips",
      "Keep a flat back during the backswing",
      "Squeeze glutes hard at the top — stand tall",
    ],
    commonMistakes: [
      "Squatting the swing instead of hinging",
      "Using arms to lift the kettlebell",
      "Hyperextending the back at the top",
    ],
  },
  {
    name: "Face Pulls",
    category: "Upper Body",
    muscle: "Rear Delts, Rotator Cuff",
    desc: "Shoulder health and postural correction exercise.",
    gifUrl: "https://media.giphy.com/media/7YCC7NnSgAx9nQKoCz/giphy.gif",
    tips: [
      "Pull toward your forehead, not your chest",
      "Externally rotate at the end — hands finish beside your ears",
      "Squeeze your rear delts at the top for 1-2 seconds",
      "Use a rope attachment for best range of motion",
    ],
    commonMistakes: [
      "Using too much weight and turning it into a row",
      "Not externally rotating at the end",
      "Leaning back excessively",
    ],
  },
];

const ExerciseDetail = ({ exercise, onClose }: { exercise: Exercise; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-card border border-border rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">{exercise.name}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-sm font-medium">{exercise.category}</span>
              <span className="text-xs text-muted-foreground">{exercise.muscle}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-sm transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* GIF */}
          <div className="aspect-video bg-muted rounded-sm overflow-hidden border border-border">
            <img
              src={exercise.gifUrl}
              alt={`${exercise.name} demonstration`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">{exercise.desc}</p>

          {/* Tips */}
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
              <CheckCircle className="w-5 h-5 text-primary" />
              Form Tips
            </h3>
            <ul className="space-y-2">
              {exercise.tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Common Mistakes */}
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              Common Mistakes
            </h3>
            <ul className="space-y-2">
              {exercise.commonMistakes.map((mistake, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                  {mistake}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ExerciseLibrary = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const navigate = useNavigate();

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
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Performance Exercise Library
            </h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Browse our curated collection of performance-focused exercises. Click any exercise for detailed form tips.
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
                onClick={() => setSelectedExercise(ex)}
                className="group bg-card rounded-sm p-6 border border-border hover:border-primary/40 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-display text-lg font-semibold text-foreground">{ex.name}</h3>
                  <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-sm shrink-0 ml-2">
                    {ex.category}
                  </span>
                </div>
                <p className="text-xs text-primary font-medium mb-2">{ex.muscle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{ex.desc}</p>
                <p className="mt-3 text-xs text-primary/70 group-hover:text-primary transition-colors">
                  Click for details →
                </p>
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

      {/* Exercise Detail Modal */}
      <AnimatePresence>
        {selectedExercise && (
          <ExerciseDetail exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default ExerciseLibrary;
