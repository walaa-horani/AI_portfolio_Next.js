"use client"

import type { Skill } from "@/sanity.types"

type SkillChartProps = {
  skills: Pick<Skill, 'name' | 'category' | 'proficiency' | 'percentage' | 'color'>[]
}

// Map proficiency levels to numeric values for sorting
const proficiencyOrder = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
}

// Category display names
const categoryLabels: Record<string, string> = {
  'frontend': 'Frontend',
  'backend': 'Backend',
  'ai-ml': 'AI/ML',
  'database': 'Database',
  'mobile': 'Mobile',
  'testing': 'Testing',
  'design': 'Design',
  'tools': 'Tools',
  'other': 'Other',
}

// Get skill color - use custom color or generate from category/skill name
const getSkillColor = (skill: SkillChartProps['skills'][0], index: number, categoryIndex: number): string => {
  if (skill.color) return skill.color
  
  // Generate consistent colors based on category and skill index
  const categoryColors: Record<string, string[]> = {
    'frontend': ['#61DAFB', '#3178C6', '#F7DF1E', '#00D8FF', '#FF6B6B'],
    'backend': ['#339933', '#3776AB', '#E34F26', '#000000', '#808080'],
    'ai-ml': ['#FF6F00', '#9333EA', '#00A86B', '#0066CC', '#FF1493'],
    'database': ['#336791', '#47A248', '#DC382D', '#1E88E5', '#00BCD4'],
    'mobile': ['#007AFF', '#34C759', '#FF9500', '#AF52DE', '#FF3B30'],
    'testing': ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'],
    'design': ['#000000', '#808080', '#F24E1E', '#A259FF', '#0ACF83'],
    'tools': ['#2088FF', '#F05032', '#F7B801', '#00D4AA', '#7B68EE'],
    'other': ['#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'],
  }
  
  const colors = categoryColors[skill.category || 'other'] || categoryColors['other']
  return colors[index % colors.length]
}

export default function SkillChart({ skills }: SkillChartProps) {
  if (!skills || skills.length === 0) {
    return null
  }

  // Filter and prepare skills data - keep original skill reference for color
  const chartData = skills
    .filter((skill) => skill.percentage !== undefined && skill.percentage !== null)
    .map((skill) => ({
      name: skill.name || 'Unknown',
      proficiency: skill.percentage || 0,
      category: skill.category || 'other',
      proficiencyLevel: skill.proficiency || 'beginner',
      originalSkill: skill, // Keep reference to original for color lookup
    }))

  // Group skills by category
  const skillsByCategory = chartData.reduce((acc, skill) => {
    const category = skill.category || 'other'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(skill)
    return acc
  }, {} as Record<string, typeof chartData>)

  // Sort categories and skills within each category
  const sortedCategories = Object.entries(skillsByCategory)
    .map(([category, categorySkills]) => {
      const sorted = categorySkills.sort((a, b) => {
        const proficiencyCompare = 
          (proficiencyOrder[b.proficiencyLevel as keyof typeof proficiencyOrder] || 0) - 
          (proficiencyOrder[a.proficiencyLevel as keyof typeof proficiencyOrder] || 0)
        if (proficiencyCompare !== 0) return proficiencyCompare
        return (b.proficiency || 0) - (a.proficiency || 0)
      })
      return [category, sorted] as [string, typeof categorySkills]
    })
    .sort(([a], [b]) => a.localeCompare(b))

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sortedCategories.map(([category, categorySkills], categoryIndex) => (
        <div
          key={category}
          className="rounded-lg border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <h3 className="mb-6 text-xl font-semibold capitalize text-foreground">
            {categoryLabels[category] || category.replace(/-/g, ' ')}
          </h3>
          <div className="space-y-4">
            {categorySkills.map((skill, skillIndex) => {
              const skillColor = getSkillColor(
                skill.originalSkill,
                skillIndex,
                categoryIndex
              )
              
              return (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">
                      {skill.name}
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground">
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${skill.proficiency}%`,
                        backgroundColor: skillColor,
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
