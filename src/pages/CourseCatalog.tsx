import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { CourseCard } from '@/components/CourseCard';
import { useCourses, useEnrollments } from '@/hooks/useCourses';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const categories = [
  'All',
  'Artificial Intelligence',
  'Web Development',
  'Data Science',
  'Cloud Computing',
  'Design',
  'Security',
];

const CourseCatalog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const { data: courses, isLoading } = useCourses();
  const { data: enrollments } = useEnrollments();

  const enrolledCourseIds = enrollments?.map(e => e.course_id) || [];
  const levels = ['beginner', 'intermediate', 'advanced'];

  const filteredCourses = courses?.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (course.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesLevel = !selectedLevel || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  }) || [];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-display font-bold">Course Catalog</h1>
            <p className="text-muted-foreground mt-1">Discover courses tailored to your learning goals</p>
          </div>

          {/* Search & Filters */}
          <div className="bg-card rounded-xl border p-4 space-y-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses, topics, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Level Pills */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Level:</span>
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedLevel(selectedLevel === level ? null : level)}
                  className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium capitalize transition-all",
                    selectedLevel === level
                      ? level === 'beginner' ? "bg-accent text-accent-foreground" 
                      : level === 'intermediate' ? "bg-xp text-xp-foreground"
                      : "bg-streak text-streak-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          <div>
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard 
                      key={course.id} 
                      course={{
                        ...course,
                        lessons: [],
                        rating: course.rating || 0,
                        enrolledCount: course.enrolled_count || 0,
                        tags: course.tags || [],
                        xpReward: course.xp_reward || 100,
                      }}
                      enrolled={enrolledCourseIds.includes(course.id)}
                      onClick={() => navigate(`/course/${course.id}`)}
                    />
                  ))}
                </div>

                {filteredCourses.length === 0 && (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                      <Search className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">No courses found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filters</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseCatalog;
