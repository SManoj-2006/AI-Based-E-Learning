import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { 
  HelpCircle, 
  Clock, 
  Zap, 
  CheckCircle2, 
  XCircle,
  ArrowRight,
  Trophy,
  Target,
  Brain,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const mockQuizzes = [
  {
    id: '1',
    title: 'Machine Learning Basics',
    course: 'Machine Learning Fundamentals',
    questions: 10,
    duration: '15 min',
    xpReward: 100,
    difficulty: 'medium',
    completed: false,
  },
  {
    id: '2',
    title: 'React Components',
    course: 'Full-Stack Web Development',
    questions: 8,
    duration: '10 min',
    xpReward: 80,
    difficulty: 'easy',
    completed: true,
    score: 87,
  },
  {
    id: '3',
    title: 'Data Analysis with Pandas',
    course: 'Data Science with Python',
    questions: 12,
    duration: '20 min',
    xpReward: 120,
    difficulty: 'hard',
    completed: false,
  },
];

const sampleQuestions: Question[] = [
  {
    id: '1',
    text: 'What is the primary purpose of supervised learning?',
    options: [
      'To find patterns in unlabeled data',
      'To learn from labeled training data to make predictions',
      'To optimize reward through trial and error',
      'To reduce dimensionality of data'
    ],
    correctAnswer: 1,
    explanation: 'Supervised learning uses labeled training data where the correct output is known, allowing the model to learn the relationship between inputs and outputs.',
    difficulty: 'easy',
  },
  {
    id: '2',
    text: 'Which algorithm is commonly used for classification tasks?',
    options: [
      'K-Means Clustering',
      'Principal Component Analysis',
      'Random Forest',
      'DBSCAN'
    ],
    correctAnswer: 2,
    explanation: 'Random Forest is an ensemble learning method that creates multiple decision trees and combines their predictions for classification or regression.',
    difficulty: 'medium',
  },
];

const QuizzesAssessments = () => {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; correct: boolean }[]>([]);

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;

    const question = sampleQuestions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;
    
    setAnswers([...answers, { questionId: question.id, correct: isCorrect }]);
    if (isCorrect) setScore(score + 1);
    
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setActiveQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  const isLastQuestion = currentQuestion === sampleQuestions.length - 1;

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-5xl mx-auto">
          {!activeQuiz ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-display font-bold flex items-center gap-3">
                  <HelpCircle className="h-8 w-8 text-primary" />
                  Quizzes & Assessments
                </h1>
                <p className="text-muted-foreground mt-1">Test your knowledge and track your progress</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-card rounded-xl border p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">85%</p>
                      <p className="text-sm text-muted-foreground">Average Score</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-xl border p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Quizzes Completed</p>
                    </div>
                  </div>
                </div>
                <div className="bg-card rounded-xl border p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-achievement/10">
                      <Trophy className="h-5 w-5 text-achievement" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">Perfect Scores</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Available Quizzes */}
              <section className="mb-8">
                <h2 className="text-xl font-display font-semibold mb-4">Available Quizzes</h2>
                <div className="space-y-4">
                  {mockQuizzes.filter(q => !q.completed).map((quiz) => (
                    <div 
                      key={quiz.id}
                      className="bg-card rounded-xl border p-5 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{quiz.title}</h3>
                            <Badge variant={
                              quiz.difficulty === 'easy' ? 'accent' :
                              quiz.difficulty === 'medium' ? 'xp' : 'streak'
                            } className="capitalize">
                              {quiz.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{quiz.course}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <HelpCircle className="h-4 w-4" />
                              {quiz.questions} questions
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {quiz.duration}
                            </span>
                            <span className="flex items-center gap-1 text-achievement">
                              <Zap className="h-4 w-4" />
                              {quiz.xpReward} XP
                            </span>
                          </div>
                        </div>
                        <Button 
                          variant="gradient"
                          onClick={() => setActiveQuiz(quiz.id)}
                        >
                          Start Quiz
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Completed Quizzes */}
              <section>
                <h2 className="text-xl font-display font-semibold mb-4">Completed</h2>
                <div className="space-y-4">
                  {mockQuizzes.filter(q => q.completed).map((quiz) => (
                    <div 
                      key={quiz.id}
                      className="bg-card rounded-xl border p-5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CheckCircle2 className="h-5 w-5 text-accent" />
                            <h3 className="font-semibold">{quiz.title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{quiz.course}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-accent">{quiz.score}%</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Retake
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : (
            /* Active Quiz */
            <div className="max-w-3xl mx-auto">
              {/* Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestion + 1} of {sampleQuestions.length}
                  </span>
                  <span className="text-sm font-medium">Score: {score}/{answers.length}</span>
                </div>
                <Progress value={((currentQuestion + 1) / sampleQuestions.length) * 100} className="h-2" />
              </div>

              {/* Question */}
              <div className="bg-card rounded-2xl border p-8">
                <Badge 
                  variant={
                    sampleQuestions[currentQuestion].difficulty === 'easy' ? 'accent' :
                    sampleQuestions[currentQuestion].difficulty === 'medium' ? 'xp' : 'streak'
                  }
                  className="mb-4 capitalize"
                >
                  {sampleQuestions[currentQuestion].difficulty}
                </Badge>

                <h2 className="text-xl font-display font-semibold mb-6">
                  {sampleQuestions[currentQuestion].text}
                </h2>

                <RadioGroup 
                  value={selectedAnswer?.toString()} 
                  onValueChange={(v) => !showResult && setSelectedAnswer(parseInt(v))}
                  className="space-y-3"
                >
                  {sampleQuestions[currentQuestion].options.map((option, index) => {
                    const isCorrect = index === sampleQuestions[currentQuestion].correctAnswer;
                    const isSelected = selectedAnswer === index;
                    
                    return (
                      <div
                        key={index}
                        className={cn(
                          "flex items-center space-x-3 p-4 rounded-xl border transition-all",
                          showResult && isCorrect && "bg-accent/10 border-accent",
                          showResult && isSelected && !isCorrect && "bg-destructive/10 border-destructive",
                          !showResult && isSelected && "border-primary bg-primary/5",
                          !showResult && !isSelected && "hover:bg-secondary cursor-pointer"
                        )}
                      >
                        <RadioGroupItem 
                          value={index.toString()} 
                          id={`option-${index}`}
                          disabled={showResult}
                        />
                        <Label 
                          htmlFor={`option-${index}`} 
                          className="flex-1 cursor-pointer"
                        >
                          {option}
                        </Label>
                        {showResult && isCorrect && (
                          <CheckCircle2 className="h-5 w-5 text-accent" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                          <XCircle className="h-5 w-5 text-destructive" />
                        )}
                      </div>
                    );
                  })}
                </RadioGroup>

                {/* AI Explanation */}
                {showResult && (
                  <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-5 w-5 text-primary" />
                      <span className="font-semibold">AI Explanation</span>
                    </div>
                    <p className="text-muted-foreground">
                      {sampleQuestions[currentQuestion].explanation}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={resetQuiz}>
                    Exit Quiz
                  </Button>
                  
                  {!showResult ? (
                    <Button 
                      variant="gradient"
                      onClick={handleAnswerSubmit}
                      disabled={selectedAnswer === null}
                    >
                      Submit Answer
                    </Button>
                  ) : (
                    <Button 
                      variant="accent"
                      onClick={isLastQuestion ? resetQuiz : handleNextQuestion}
                    >
                      {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuizzesAssessments;
