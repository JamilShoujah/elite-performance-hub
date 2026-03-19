import type { Exercise } from "../types";

export const exercises: Exercise[] = [
  {
    category: "Lower Body",
    commonMistakes: [
      "Letting knees cave inward",
      "Rounding the lower back at the bottom",
      "Rising on toes during the lift",
    ],
    demoUrl: "https://media.giphy.com/media/1qfKN8Dt0CRdCRxz9q/giphy.gif",
    description:
      "Fundamental compound movement for lower body strength and power.",
    name: "Barbell Back Squat",
    primaryMuscles: "Quads, Glutes",
    tips: [
      "Keep your chest up and core braced throughout the movement",
      "Push your knees out in line with your toes",
      "Aim for parallel or below — hip crease at or below knee level",
      "Drive through your full foot, not just your toes",
    ],
  },
  {
    category: "Full Body",
    commonMistakes: [
      "Rounding the back during the pull",
      "Starting with hips too high or too low",
      "Jerking the bar off the floor instead of building tension",
    ],
    demoUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    description:
      "The king of total-body strength. Builds raw power from the ground up.",
    name: "Deadlift",
    primaryMuscles: "Posterior Chain",
    tips: [
      "Set up with the bar over mid-foot, shins close to the bar",
      "Brace your core hard before pulling — think 'push the floor away'",
      "Keep the bar close to your body throughout the lift",
      "Lock out by squeezing glutes at the top, not hyperextending your back",
    ],
  },
  {
    category: "Upper Body",
    commonMistakes: [
      "Flaring elbows out to 90 degrees",
      "Bouncing the bar off your chest",
      "Lifting hips off the bench",
    ],
    demoUrl: "https://media.giphy.com/media/7YCC7NnSgAx9nQKoCz/giphy.gif",
    description:
      "Primary horizontal pressing movement for upper body development.",
    name: "Bench Press",
    primaryMuscles: "Chest, Triceps",
    tips: [
      "Retract and depress your shoulder blades — pinch them together",
      "Plant your feet firmly on the ground for leg drive",
      "Lower the bar to your mid-chest with controlled tempo",
      "Press in a slight arc back toward your face",
    ],
  },
  {
    category: "Upper Body",
    commonMistakes: [
      "Kipping or swinging to get over the bar",
      "Half reps — not going to full extension at the bottom",
      "Shrugging shoulders up to ears during the pull",
    ],
    demoUrl: "https://media.giphy.com/media/lnlAifQdenMxW/giphy.gif",
    description:
      "Essential vertical pulling pattern for back width and grip strength.",
    name: "Pull-Ups",
    primaryMuscles: "Lats, Biceps",
    tips: [
      "Initiate the pull by depressing your shoulder blades — pull them down and back",
      "Drive your elbows toward your hips, not behind you",
      "Control the descent — the eccentric is just as important",
      "Full range of motion: dead hang to chin over bar",
    ],
  },
  {
    category: "Lower Body",
    commonMistakes: [
      "Bending the knees too much, turning it into a squat",
      "Rounding the lower back",
      "Not hinging deep enough — cutting the range short",
    ],
    demoUrl: "https://media.giphy.com/media/3o7btNDyBs5qkGBi7e/giphy.gif",
    description:
      "Hip-hinge pattern targeting the posterior chain with eccentric control.",
    name: "Romanian Deadlift",
    primaryMuscles: "Hamstrings, Glutes",
    tips: [
      "Keep a soft bend in the knees — this is a hinge, not a squat",
      "Push your hips back as if closing a car door with your glutes",
      "Feel the stretch in your hamstrings before reversing the movement",
      "Keep the bar or dumbbells glued to your legs",
    ],
  },
  {
    category: "Upper Body",
    commonMistakes: [
      "Excessive back lean turning it into an incline press",
      "Not locking out fully overhead",
      "Pressing the bar forward instead of straight up",
    ],
    demoUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    description: "Vertical pressing for shoulder strength and stability.",
    name: "Overhead Press",
    primaryMuscles: "Shoulders, Triceps",
    tips: [
      "Brace your core and squeeze your glutes for a stable base",
      "Press the bar in a straight line — move your head out of the way",
      "Lock out overhead with the bar directly over your spine",
      "Controlled descent back to the front rack position",
    ],
  },
  {
    category: "Core",
    commonMistakes: [
      "Letting the hips sag or pike up",
      "Looking forward instead of down (straining the neck)",
      "Holding breath instead of breathing through the hold",
    ],
    demoUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    description:
      "Anti-extension core training for trunk stability and endurance.",
    name: "Plank Variations",
    primaryMuscles: "Core",
    tips: [
      "Maintain a straight line from head to heels — no sagging hips",
      "Actively push the floor away to engage your serratus",
      "Breathe steadily — don't hold your breath",
      "Squeeze your glutes and quads to create full-body tension",
    ],
  },
  {
    category: "Mobility",
    commonMistakes: [
      "Rounding the spine to compensate for tight hips",
      "Rushing through transitions",
      "Lifting the knee off the ground during rotation",
    ],
    demoUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    description: "Internal and external hip rotation mobility drill.",
    name: "Hip 90/90 Stretch",
    primaryMuscles: "Hips",
    tips: [
      "Sit tall — don't slouch or lean back",
      "Both legs at 90-degree angles on the floor",
      "Rotate slowly between sides, keeping contact with the ground",
      "Breathe deeply into tight spots — don't force it",
    ],
  },
  {
    category: "Conditioning",
    commonMistakes: [
      "Pulling with arms first instead of driving with legs",
      "Hunching the back during the pull",
      "Stroke rate too high with no power behind it",
    ],
    demoUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    description:
      "High-output cardiovascular conditioning with full-body engagement.",
    name: "Rowing Machine Intervals",
    primaryMuscles: "Full Body",
    tips: [
      "Sequence: legs → lean back → arms pull (then reverse on return)",
      "Drive hard through the legs — power comes from the lower body",
      "Keep your stroke rate controlled — power over speed",
      "Maintain a tall posture, don't hunch over",
    ],
  },
  {
    category: "Lower Body",
    commonMistakes: [
      "Front foot too close to the bench",
      "Letting the front knee cave inward",
      "Rushing the reps — control the eccentric",
    ],
    demoUrl: "https://media.giphy.com/media/1qfKN8Dt0CRdCRxz9q/giphy.gif",
    description:
      "Unilateral leg strength for balance and athletic performance.",
    name: "Bulgarian Split Squat",
    primaryMuscles: "Quads, Glutes",
    tips: [
      "Keep your torso upright — slight forward lean is okay",
      "Front shin should stay relatively vertical",
      "Lower until your back knee nearly touches the floor",
      "Drive up through the heel of the front foot",
    ],
  },
  {
    category: "Upper Body",
    commonMistakes: [
      "Using momentum to swing the weight up",
      "Rounding the upper back",
      "Rotating the torso to cheat the rep",
    ],
    demoUrl: "https://media.giphy.com/media/lnlAifQdenMxW/giphy.gif",
    description: "Unilateral pulling for back thickness and posture correction.",
    name: "Dumbbell Rows",
    primaryMuscles: "Back, Biceps",
    tips: [
      "Keep your back flat — think 'proud chest'",
      "Pull the dumbbell toward your hip, not your shoulder",
      "Squeeze your shoulder blade at the top for a full contraction",
      "Control the weight on the way down",
    ],
  },
  {
    category: "Full Body",
    commonMistakes: [
      "Rushing through the movement",
      "Taking eyes off the weight",
      "Skipping positions — each step matters",
    ],
    demoUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    description:
      "Complex movement pattern for stability, mobility, and strength.",
    name: "Turkish Get-Up",
    primaryMuscles: "Full Body",
    tips: [
      "Keep your eyes on the weight overhead at all times",
      "Move slowly and deliberately through each position",
      "Master each step before adding weight",
      "The arm holding the weight should stay vertical throughout",
    ],
  },
  {
    category: "Core",
    commonMistakes: [
      "Standing too close to the anchor point",
      "Allowing the torso to rotate toward the cable",
      "Using too much weight and compensating with your arms",
    ],
    demoUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    description: "Anti-rotation core exercise for functional stability.",
    name: "Pallof Press",
    primaryMuscles: "Core",
    tips: [
      "Stand with feet shoulder-width apart, knees slightly bent",
      "Press the cable/band straight out from your chest",
      "Resist the pull — don't let your torso rotate",
      "Hold the extended position for 2-3 seconds per rep",
    ],
  },
  {
    category: "Mobility",
    commonMistakes: [
      "Rotating from the lower back instead of the thoracic spine",
      "Moving too fast without control",
      "Not breathing into the stretch",
    ],
    demoUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    description:
      "Rotation mobility for improved overhead position and posture.",
    name: "Thoracic Spine Rotation",
    primaryMuscles: "Thoracic Spine",
    tips: [
      "Start on all fours or side-lying for best results",
      "Rotate through the mid-back — keep the lower back stable",
      "Follow your hand with your eyes as you rotate",
      "Exhale as you rotate to increase range of motion",
    ],
  },
  {
    category: "Conditioning",
    commonMistakes: [
      "Pacing yourself — these should be max effort",
      "Only using legs and neglecting arm drive",
      "Not resting long enough between intervals",
    ],
    demoUrl: "https://media.giphy.com/media/xT8qBvgKeMvMGSJNgA/giphy.gif",
    description:
      "Maximum intensity conditioning for anaerobic capacity.",
    name: "Assault Bike Sprints",
    primaryMuscles: "Full Body",
    tips: [
      "Go all-out for 15-30 seconds, then rest fully",
      "Use both arms and legs — push and pull the handles",
      "Keep your core tight to transfer power efficiently",
      "Maintain a consistent cadence during each sprint",
    ],
  },
  {
    category: "Lower Body",
    commonMistakes: [
      "Dropping the elbows and losing the bar",
      "Leaning too far forward",
      "Not bracing the core hard enough",
    ],
    demoUrl: "https://media.giphy.com/media/1qfKN8Dt0CRdCRxz9q/giphy.gif",
    description:
      "Anterior-loaded squat for quad dominance and core bracing.",
    name: "Front Squat",
    primaryMuscles: "Quads, Core",
    tips: [
      "Keep your elbows high — upper arms parallel to the floor",
      "Stay upright — this requires more thoracic extension than a back squat",
      "Brace your core harder than a back squat",
      "Drive your elbows up as you stand out of the hole",
    ],
  },
  {
    category: "Conditioning",
    commonMistakes: [
      "Squatting the swing instead of hinging",
      "Using arms to lift the kettlebell",
      "Hyperextending the back at the top",
    ],
    demoUrl: "https://media.giphy.com/media/3o7btNDyBs5qkGBi7e/giphy.gif",
    description:
      "Ballistic hip hinge for power endurance and conditioning.",
    name: "Kettlebell Swing",
    primaryMuscles: "Posterior Chain",
    tips: [
      "This is a hip hinge — NOT a squat. Snap the hips forward",
      "Arms are just along for the ride — power comes from the hips",
      "Keep a flat back during the backswing",
      "Squeeze glutes hard at the top — stand tall",
    ],
  },
  {
    category: "Upper Body",
    commonMistakes: [
      "Using too much weight and turning it into a row",
      "Not externally rotating at the end",
      "Leaning back excessively",
    ],
    demoUrl: "https://media.giphy.com/media/7YCC7NnSgAx9nQKoCz/giphy.gif",
    description: "Shoulder health and postural correction exercise.",
    name: "Face Pulls",
    primaryMuscles: "Rear Delts, Rotator Cuff",
    tips: [
      "Pull toward your forehead, not your chest",
      "Externally rotate at the end — hands finish beside your ears",
      "Squeeze your rear delts at the top for 1-2 seconds",
      "Use a rope attachment for best range of motion",
    ],
  },
];
