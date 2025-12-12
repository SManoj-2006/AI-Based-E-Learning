import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Sidebar } from '@/components/Sidebar';
import { Scene3D } from '@/components/3d/Scene3D';
import { ChemistryLab } from '@/components/3d/ChemistryLab';
import { PhysicsLab } from '@/components/3d/PhysicsLab';
import { BiologyLab } from '@/components/3d/BiologyLab';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Beaker, 
  Atom, 
  Dna, 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize2,
  VolumeX,
  Volume2,
  Settings,
  BookOpen,
  Trophy,
  Clock,
  Users
} from 'lucide-react';

type LabType = 'chemistry' | 'physics' | 'biology';

const labs = [
  {
    id: 'chemistry' as LabType,
    name: 'Chemistry Lab',
    description: 'Explore chemical reactions, molecular structures, and laboratory equipment in an immersive 3D environment.',
    icon: Beaker,
    color: 'from-emerald-500 to-teal-600',
    experiments: 12,
    duration: '2-4 hours',
    difficulty: 'Intermediate',
    users: '2.4k active'
  },
  {
    id: 'physics' as LabType,
    name: 'Physics Lab',
    description: 'Discover the laws of physics through interactive simulations including mechanics, optics, and electromagnetism.',
    icon: Atom,
    color: 'from-blue-500 to-indigo-600',
    experiments: 15,
    duration: '3-5 hours',
    difficulty: 'Advanced',
    users: '1.8k active'
  },
  {
    id: 'biology' as LabType,
    name: 'Biology Lab',
    description: 'Dive into cellular biology, DNA structures, and microbiology with detailed 3D models and simulations.',
    icon: Dna,
    color: 'from-pink-500 to-rose-600',
    experiments: 10,
    duration: '2-3 hours',
    difficulty: 'Beginner',
    users: '3.1k active'
  }
];

const ARVRLabs = () => {
  const [activeLab, setActiveLab] = useState<LabType>('chemistry');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const renderLab = () => {
    switch (activeLab) {
      case 'chemistry':
        return <ChemistryLab />;
      case 'physics':
        return <PhysicsLab />;
      case 'biology':
        return <BiologyLab />;
      default:
        return <ChemistryLab />;
    }
  };

  const currentLab = labs.find(l => l.id === activeLab)!;

  return (
    <div className="min-h-screen bg-background flex">
      <Helmet>
        <title>AR/VR Labs - Immersive Learning</title>
        <meta name="description" content="Experience immersive 3D lab environments with interactive simulations for chemistry, physics, and biology." />
      </Helmet>

      <Sidebar />

      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20">
              <Atom className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">AR/VR Learning Labs</h1>
            <Badge variant="secondary" className="ml-2">Beta</Badge>
          </div>
          <p className="text-muted-foreground">
            Immersive 3D environments for hands-on scientific exploration. Rotate, zoom, and interact with virtual experiments.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main 3D Viewer */}
          <div className="xl:col-span-2 space-y-4">
            {/* Lab Selector Tabs */}
            <div className="flex gap-2 p-1 bg-muted/50 rounded-xl">
              {labs.map((lab) => (
                <button
                  key={lab.id}
                  onClick={() => setActiveLab(lab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeLab === lab.id
                      ? 'bg-background shadow-lg text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  <lab.icon className="h-5 w-5" />
                  <span className="font-medium">{lab.name}</span>
                </button>
              ))}
            </div>

            {/* 3D Scene Container */}
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/50 bg-gradient-to-br from-background via-background to-muted/20">
              {/* VR Overlay Elements */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                <Badge className={`bg-gradient-to-r ${currentLab.color} text-white border-0`}>
                  <currentLab.icon className="h-3 w-3 mr-1" />
                  {currentLab.name}
                </Badge>
                <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                  <Users className="h-3 w-3 mr-1" />
                  {currentLab.users}
                </Badge>
              </div>

              {/* Controls Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 p-2 bg-background/80 backdrop-blur-md rounded-xl border border-border/50">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="h-10 w-10"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <RotateCcw className="h-5 w-5" />
                </Button>
                <div className="w-px h-6 bg-border" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMuted(!isMuted)}
                  className="h-10 w-10"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Settings className="h-5 w-5" />
                </Button>
                <div className="w-px h-6 bg-border" />
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Maximize2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Instructions Overlay */}
              <div className="absolute top-4 right-4 z-10 p-3 bg-background/80 backdrop-blur-md rounded-xl border border-border/50 text-xs text-muted-foreground">
                <p>🖱️ Drag to rotate</p>
                <p>🔍 Scroll to zoom</p>
              </div>

              {/* 3D Scene */}
              <Scene3D>
                {renderLab()}
              </Scene3D>
            </div>

            {/* Lab Description */}
            <Card className="bg-gradient-to-br from-muted/30 to-transparent border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${currentLab.color}`}>
                    <currentLab.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{currentLab.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{currentLab.description}</p>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>{currentLab.experiments} experiments</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{currentLab.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Trophy className="h-4 w-4" />
                        <span>{currentLab.difficulty}</span>
                      </div>
                    </div>
                  </div>
                  <Button className={`bg-gradient-to-r ${currentLab.color} hover:opacity-90`}>
                    Start Lab
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Experiments List */}
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Available Experiments</CardTitle>
                <CardDescription>Select an experiment to begin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {activeLab === 'chemistry' && (
                  <>
                    <ExperimentItem title="Acid-Base Titration" xp={150} difficulty="Medium" locked={false} />
                    <ExperimentItem title="Crystallization Process" xp={200} difficulty="Hard" locked={false} />
                    <ExperimentItem title="Combustion Reactions" xp={100} difficulty="Easy" locked={false} />
                    <ExperimentItem title="Electrochemistry" xp={250} difficulty="Advanced" locked={true} />
                  </>
                )}
                {activeLab === 'physics' && (
                  <>
                    <ExperimentItem title="Pendulum Motion" xp={100} difficulty="Easy" locked={false} />
                    <ExperimentItem title="Light Refraction" xp={150} difficulty="Medium" locked={false} />
                    <ExperimentItem title="Electromagnetic Fields" xp={200} difficulty="Hard" locked={false} />
                    <ExperimentItem title="Quantum Particles" xp={300} difficulty="Expert" locked={true} />
                  </>
                )}
                {activeLab === 'biology' && (
                  <>
                    <ExperimentItem title="Cell Division" xp={120} difficulty="Medium" locked={false} />
                    <ExperimentItem title="DNA Extraction" xp={180} difficulty="Hard" locked={false} />
                    <ExperimentItem title="Microscopy Basics" xp={80} difficulty="Easy" locked={false} />
                    <ExperimentItem title="Gene Editing" xp={280} difficulty="Expert" locked={true} />
                  </>
                )}
              </CardContent>
            </Card>

            {/* VR Device Info */}
            <Card className="border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 10a4 4 0 014-4h10a4 4 0 014 4v4a4 4 0 01-4 4H7a4 4 0 01-4-4v-4z" />
                      <circle cx="8.5" cy="12" r="1.5" />
                      <circle cx="15.5" cy="12" r="1.5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">VR Mode Available</h4>
                    <p className="text-xs text-muted-foreground">Connect your headset for full immersion</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Badge variant="outline" className="justify-center py-1.5">Meta Quest</Badge>
                  <Badge variant="outline" className="justify-center py-1.5">Valve Index</Badge>
                  <Badge variant="outline" className="justify-center py-1.5">HTC Vive</Badge>
                  <Badge variant="outline" className="justify-center py-1.5">Pico 4</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Progress Stats */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Experiments Completed</span>
                  <span className="font-semibold text-foreground">12/37</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[32%] bg-gradient-to-r from-primary to-accent rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">8</p>
                    <p className="text-xs text-muted-foreground">Chemistry</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">3</p>
                    <p className="text-xs text-muted-foreground">Physics</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">1</p>
                    <p className="text-xs text-muted-foreground">Biology</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

interface ExperimentItemProps {
  title: string;
  xp: number;
  difficulty: string;
  locked: boolean;
}

const ExperimentItem = ({ title, xp, difficulty, locked }: ExperimentItemProps) => {
  const difficultyColor = {
    Easy: 'text-emerald-500',
    Medium: 'text-amber-500',
    Hard: 'text-orange-500',
    Advanced: 'text-red-500',
    Expert: 'text-purple-500'
  }[difficulty] || 'text-muted-foreground';

  return (
    <div className={`p-3 rounded-lg border transition-all ${
      locked 
        ? 'border-border/30 bg-muted/20 opacity-60' 
        : 'border-border/50 bg-muted/30 hover:border-primary/50 hover:bg-muted/50 cursor-pointer'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`font-medium text-sm ${locked ? 'text-muted-foreground' : 'text-foreground'}`}>
            {locked && '🔒 '}{title}
          </p>
          <p className={`text-xs ${difficultyColor}`}>{difficulty}</p>
        </div>
        <Badge variant="secondary" className="text-xs">
          +{xp} XP
        </Badge>
      </div>
    </div>
  );
};

export default ARVRLabs;
