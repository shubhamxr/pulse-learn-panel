interface Task {
  title: string;
  type: 'Study' | 'Health' | 'Exercise' | 'Break' | 'Other';
  duration: string;
  priority: 'high' | 'medium' | 'low';
  description?: string;
}

// Subject-specific task templates
const TASK_TEMPLATES: Record<string, Array<Partial<Task> & { title: string }>> = {
  math: [
    { 
      title: 'Solve practice problems from Chapter 5', 
      type: 'Study', 
      duration: '45 min', 
      priority: 'high',
      description: 'Complete the practice problems on page 45-50.'
    },
    { 
      title: 'Review formulas and theorems', 
      type: 'Study', 
      duration: '30 min', 
      priority: 'high',
      description: 'Go through all the important formulas from the last two chapters.'
    },
  ],
  science: [
    { 
      title: 'Read and summarize the next chapter', 
      type: 'Study', 
      duration: '40 min', 
      priority: 'high',
      description: 'Read chapter 7 and write a one-page summary.'
    },
    { 
      title: 'Conduct a small experiment', 
      type: 'Study', 
      duration: '60 min', 
      priority: 'medium',
      description: 'Perform the experiment described in the lab manual on page 32.'
    },
  ],
  english: [
    { 
      title: 'Read the assigned novel chapter', 
      type: 'Study', 
      duration: '30 min', 
      priority: 'high',
      description: 'Read chapter 4 and identify the main themes.'
    },
    { 
      title: 'Write an essay outline', 
      type: 'Study', 
      duration: '45 min', 
      priority: 'high',
      description: 'Create a detailed outline for your upcoming essay.'
    },
  ],
  default: [
    { 
      title: 'Review notes and summaries', 
      type: 'Study', 
      duration: '30 min', 
      priority: 'high',
      description: 'Go through your notes and create a summary of key points.'
    },
    { 
      title: 'Solvepractice questions', 
      type: 'Study', 
      duration: '45 min', 
      priority: 'high',
      description: 'Complete the practice questions from the textbook.'
    },
  ]
};

// Common health tasks
const COMMON_TASKS: Array<Partial<Task> & { title: string }> = [
  { 
    title: 'Take a short break and stretch', 
    type: 'Health', 
    duration: '5 min', 
    priority: 'low',
    description: 'Stand up, stretch your body, and rest your eyes.'
  },
  { 
    title: 'Drink water', 
    type: 'Health', 
    duration: '2 min', 
    priority: 'low',
    description: 'Stay hydrated by drinking a glass of water.'
  },
  { 
    title: 'Practice deep breathing', 
    type: 'Health', 
    duration: '3 min', 
    priority: 'low',
    description: 'Take deep breaths to relax and refocus.'
  },
];

export const fetchTasksFromGemini = async (subject: string = 'default'): Promise<Task[]> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get subject-specific tasks or default if subject not found
    const subjectTasks = TASK_TEMPLATES[subject.toLowerCase()] || TASK_TEMPLATES.default;
    
    // Combine subject tasks with common health tasks
    const allTasks = [...subjectTasks, ...COMMON_TASKS];
    
    // Add descriptions if not present and ensure all required fields exist
    return allTasks.map((task, index) => ({
      ...task,
      title: task.title || `Task ${index + 1}`,
      type: task.type || 'Study',
      duration: task.duration || '30 min',
      priority: task.priority || 'medium',
      description: task.description || `Complete: ${task.title} (${task.duration})`
    })) as Task[];
    
  } catch (error) {
    console.error('Error in fetchTasksFromGemini:', error);
    // Return default tasks in case of error
    return [
      {
        title: 'Review study materials',
        type: 'Study',
        duration: '30 min',
        priority: 'high',
        description: 'Go through your notes and textbooks.'
      },
      ...COMMON_TASKS
    ] as Task[];
  }
};
