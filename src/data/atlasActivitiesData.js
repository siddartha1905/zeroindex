/**
 * Centralized Atlas Learning Activities Data Configuration (Pillar 02)
 *
 * Defines structured learning activities built on the START -> TRY -> NEXT framework.
 * Authored under faculty direction for learners aged 10 and above.
 * British English spelling standard throughout.
 *
 * Strict Zero-Dash Standard: Zero em-dashes and zero en-dashes across all strings.
 */

export const ENGLISH_COMMUNICATION_PATH = {
  id: 'english-communication',
  registryId: 'atlas-english-communication',
  title: 'English Communication',
  subtitle: 'Practical communication skills for everyday situations.',
  targetAudience: 'Suitable for beginners of all ages, including school students, college students and adult learners.',
  progressionSummary: 'Speak clearly -> Respond thoughtfully -> Express opinions -> Participate in conversations',
  progressionSteps: [
    { stepNumber: '01', title: 'Speak clearly' },
    { stepNumber: '02', title: 'Respond thoughtfully' },
    { stepNumber: '03', title: 'Express opinions' },
    { stepNumber: '04', title: 'Participate in conversations' }
  ],
  activities: [
    {
      number: '01',
      id: 'speak-clearly',
      activityKey: 'speak-clearly-60s',
      title: 'Speak Clearly',
      objective: 'Organise thoughts and express one idea confidently in 60 seconds.',
      status: 'ready',
      statusLabel: 'Available',
      isInteractive: true,
      route: 'atlas/activity/speak-clearly'
    },
    {
      number: '02',
      id: 'listen-respond',
      activityKey: 'listen-respond',
      title: 'Listen & Respond',
      objective: 'Understand a question and give a clear, relevant response.',
      status: 'ready',
      statusLabel: 'Available',
      isInteractive: true,
      route: 'atlas/activity/listen-respond'
    },
    {
      number: '03',
      id: 'express-your-opinion',
      activityKey: 'express-your-opinion',
      title: 'Express Your Opinion',
      objective: 'Share a viewpoint supported by simple reasons and examples.',
      status: 'ready',
      statusLabel: 'Available',
      isInteractive: true,
      route: 'atlas/activity/express-your-opinion'
    },
    {
      number: '04',
      id: 'everyday-conversations',
      activityKey: 'everyday-conversations',
      title: 'Everyday Conversations',
      objective: 'Start, continue and conclude natural conversations appropriately.',
      status: 'ready',
      statusLabel: 'Available',
      isInteractive: true,
      route: 'atlas/activity/everyday-conversations'
    }
  ]
};

export const SPEAK_CLEARLY_ACTIVITY = {
  id: 'speak-clearly-60s',
  roadmapId: 'english-communication',
  roadmapTitle: 'English Communication',
  title: 'Speak Clearly',
  subtitle: 'One Minute. One Clear Thought.',
  estimatedTime: '5 to 10 minutes',
  objective: 'Learn to organise your ideas, express them in simple English and speak confidently for 60 seconds.',
  
  // ---------------------------------------------------------------------------
  // STEP 1: START (Understand)
  // ---------------------------------------------------------------------------
  start: {
    title: 'The 3-Step Speaking Sequence',
    description: 'When speaking on any topic, whether in school, college, or daily conversation, avoid speaking without a plan. Organise your thoughts into three simple steps:',
    steps: [
      {
        number: '01',
        label: 'State the Idea',
        thinkAbout: 'What is the single most important point you want to share?',
        whatToSay: 'State your main topic directly in one clear, simple sentence.',
        beginWith: 'I would like to talk about... / One habit I really enjoy is...',
        example: 'One small habit that really helps me each day is going for a short evening walk.'
      },
      {
        number: '02',
        label: 'Explain Simply',
        thinkAbout: 'How would you describe this to a friend using everyday words?',
        whatToSay: 'Describe what happens, how you do it, or why it is enjoyable.',
        beginWith: 'Every evening, I usually... / What makes this special is...',
        example: 'After studying indoors, I step outside for fifteen minutes without checking my phone, walking at a relaxed pace to let my mind unwind.'
      },
      {
        number: '03',
        label: 'Explain Why It Matters',
        thinkAbout: 'Why is this meaningful to you, or what benefit does it bring?',
        whatToSay: 'Share the positive feeling, lesson, or reason you care about it.',
        beginWith: 'It matters to me because... / In short, it helps me...',
        example: 'It matters because that short walk gives me a break from screens, clears my thoughts, and helps me sleep well.'
      }
    ],

    // 60-Second Speaking Plan (4 Timing Blocks)
    timingPlan: {
      title: 'A Simple 60-Second Speaking Plan',
      note: 'This timing plan is a gentle guide, not a rigid rule. It helps you pace your thoughts naturally across one minute.',
      blocks: [
        {
          id: 'opening',
          label: 'Opening',
          duration: '10 sec',
          seconds: 10,
          color: 'blue',
          accentBg: 'bg-[#E1EAF2]',
          accentText: 'text-[#496D91]',
          borderColor: 'border-[#496D91]',
          purpose: 'Hook the listener and introduce your main topic clearly.'
        },
        {
          id: 'main-idea',
          label: 'Main Idea',
          duration: '20 sec',
          seconds: 20,
          color: 'green',
          accentBg: 'bg-[#DDEADD]',
          accentText: 'text-[#285C49]',
          borderColor: 'border-[#285C49]',
          purpose: 'Explain the core idea using plain, natural words.'
        },
        {
          id: 'example',
          label: 'Example / Reason',
          duration: '20 sec',
          seconds: 20,
          color: 'amber',
          accentBg: 'bg-[#F5EBE1]',
          accentText: 'text-[#956A43]',
          borderColor: 'border-[#956A43]',
          purpose: 'Share a personal detail, analogy, or reason that brings it alive.'
        },
        {
          id: 'conclusion',
          label: 'Conclusion',
          duration: '10 sec',
          seconds: 10,
          color: 'purple',
          accentBg: 'bg-[#EBE5F0]',
          accentText: 'text-[#765C90]',
          borderColor: 'border-[#765C90]',
          purpose: 'End with one simple sentence that summarises your thought.'
        }
      ]
    },

    // Beginner-friendly Everyday Worked Example (Evening Walk)
    example: {
      topic: 'A Small Habit I Enjoy',
      context: 'Everyday Spoken Example (approx. 60 seconds with comfortable pauses)',
      parts: [
        {
          blockId: 'opening',
          label: 'Opening (10 seconds)',
          color: 'blue',
          text: 'One small habit that really helps me each day is going for a short evening walk around our neighbourhood.'
        },
        {
          blockId: 'main-idea',
          label: 'Main Idea (20 seconds)',
          color: 'green',
          text: 'After working or studying indoors for most of the day, stepping outside feels like pressing a reset button. I leave my phone in my pocket and stroll at a relaxed pace without any hurry.'
        },
        {
          blockId: 'example',
          label: 'Example or Reason (20 seconds)',
          color: 'amber',
          text: 'For example, yesterday evening the breeze was cool, and walking for just fifteen minutes helped me let go of the day\'s tiredness. Even a short walk outdoors makes a noticeable difference to how calm I feel.'
        },
        {
          blockId: 'conclusion',
          label: 'Conclusion (10 seconds)',
          color: 'purple',
          text: 'In short, this small daily habit clears my thoughts and helps me end the day feeling refreshed.'
        }
      ]
    },

    // Preparation Sequence (THINK -> PLAN -> SPEAK)
    prepSequence: {
      title: 'How to Prepare in 60 Seconds',
      steps: [
        {
          tag: 'THINK',
          label: 'Think First',
          desc: 'Choose one main idea. Do not try to say everything at once.'
        },
        {
          tag: 'PLAN',
          label: 'Plan Keywords',
          desc: 'Jot down two or three keywords, plus an opening and closing line.'
        },
        {
          tag: 'SPEAK',
          label: 'Speak Naturally',
          desc: 'Speak using your keywords rather than memorising a long script.'
        }
      ]
    }
  },

  // ---------------------------------------------------------------------------
  // STEP 2: TRY (Practise)
  // ---------------------------------------------------------------------------
  try: {
    title: 'Choose a Topic and Practise',
    instructions: 'Pick one topic below, prepare three or four quick keywords in your notes, and speak aloud with the 60-second timer.',
    privacyNote: 'Practice is completely private. No microphone access, audio recording, or data upload is used.',
    prepGuide: [
      'Choose your topic from the five cards below.',
      'Think quietly for a few moments.',
      'Write two or three keywords in the outline box.',
      'Decide on your first sentence.',
      'Start the timer and speak aloud at an easy pace.'
    ],
    prompts: [
      {
        id: 'introduce-yourself',
        title: 'Introduce Yourself',
        category: 'Personal',
        question: 'Introduce yourself in one minute by sharing who you are and what you enjoy.',
        guidingQuestions: [
          'What would you like people to know about you?',
          'What do you enjoy doing in your free time?',
          'What is one strength or interest you would like to share?'
        ],
        sampleKeywords: 'Name and location, reading and sketching, curious about how things work'
      },
      {
        id: 'favourite-activity',
        title: 'My Favourite Activity',
        category: 'Interests',
        question: 'Describe an activity or hobby that you genuinely look forward to.',
        guidingQuestions: [
          'What activity do you enjoy most?',
          'When and how do you usually do it?',
          'Why does it make you feel happy, relaxed, or interested?'
        ],
        sampleKeywords: 'Cycling on weekends, fresh morning air, feels refreshing and energising'
      },
      {
        id: 'memorable-moment',
        title: 'A Memorable Moment',
        category: 'Experience',
        question: 'Share a memorable moment or day that taught you something meaningful.',
        guidingQuestions: [
          'What happened on that day?',
          'Why do you remember it so clearly?',
          'What did you feel or learn from the experience?'
        ],
        sampleKeywords: 'First science exhibition, nervous at the start, learned that trying matters'
      },
      {
        id: 'useful-daily-item',
        title: 'Something Useful in Daily Life',
        category: 'Observation',
        question: 'Talk about an everyday object or simple tool that makes life easier.',
        guidingQuestions: [
          'What is the object or tool?',
          'How do you or your family use it regularly?',
          'Why is it practical or helpful to have around?'
        ],
        sampleKeywords: 'Stainless steel water bottle, keeps water cool, avoids plastic waste'
      },
      {
        id: 'my-choice',
        title: 'My Choice',
        category: 'Open Topic',
        question: 'Speak on any subject you care about: a book, a person, a place, a sport, or an idea.',
        guidingQuestions: [
          'What topic have you chosen and why does it interest you?',
          'What are two key points you want the listener to understand?',
          'What is the main takeaway you want to finish with?'
        ],
        sampleKeywords: 'Your chosen topic, key detail or story, why it matters to you'
      }
    ],
    templateOutline: {
      openingPlaceholder: 'Opening (10s): State what you are talking about in one simple sentence.',
      mainIdeaPlaceholder: 'Main Idea (20s): Explain the core thought with two or three keywords.',
      examplePlaceholder: 'Example / Reason (20s): Give one clear example, story, or reason.',
      conclusionPlaceholder: 'Conclusion (10s): One closing sentence that wraps up your thought.'
    }
  },

  // ---------------------------------------------------------------------------
  // STEP 3: NEXT (Improve)
  // ---------------------------------------------------------------------------
  next: {
    title: 'Review and Improve',
    subtitle: 'Reflect on your attempt, choose one improvement, and practise again.',
    disclaimer: 'This self-check is an informal reflective tool to help you build speaking confidence. It does not claim to objectively evaluate or certify your spoken English proficiency.',
    
    // 4-Point Self-Check
    selfCheckQuestions: [
      {
        id: 'understandable',
        question: 'Was the explanation understandable?',
        description: 'Did you use simple, natural words that were easy for anyone to follow?'
      },
      {
        id: 'organized',
        question: 'Were the ideas organised?',
        description: 'Did you have a clear opening, middle, and closing sentence?'
      },
      {
        id: 'clear-delivery',
        question: 'Was the delivery calm and paced?',
        description: 'Did you speak at a steady pace without rushing or trailing off?'
      },
      {
        id: 'time-awareness',
        question: 'Did you finish on time?',
        description: 'Did you reach your concluding sentence close to the 60-second mark?'
      }
    ],

    // Common Speaking Difficulties with Advice
    commonDifficulties: [
      {
        id: 'forgot',
        situation: 'I forgot what to say next.',
        advice: 'Use three simple keywords and return to your main idea instead of attempting to memorise every sentence.'
      },
      {
        id: 'fillers',
        situation: 'I used too many fillers (um, actually, like).',
        advice: 'Pause briefly when thinking. A short silence is often clearer than repeating filler words.'
      },
      {
        id: 'too-fast',
        situation: 'I spoke too fast.',
        advice: 'Slow down slightly, finish one thought before beginning another, and leave natural pauses.'
      },
      {
        id: 'no-finish',
        situation: 'I could not finish properly.',
        advice: 'Prepare one simple closing sentence before you start so you know exactly how to end.'
      }
    ],

    // Simple Useful Connecting Expressions
    connectingExpressions: [
      {
        word: 'First',
        purpose: 'Introduce your opening thought',
        example: 'First, I would like to explain what this habit is.'
      },
      {
        word: 'For example',
        purpose: 'Share a concrete detail or personal memory',
        example: 'For example, yesterday evening I noticed how quiet the park was.'
      },
      {
        word: 'Because',
        purpose: 'Give the reason why something matters',
        example: 'It matters because it gives my mind time to rest.'
      },
      {
        word: 'In short',
        purpose: 'Summarise cleanly in your conclusion',
        example: 'In short, this small habit helps me start each evening peacefully.'
      }
    ],

    // One Improvement Selection for Next Attempt
    improvementChoices: [
      { id: 'clearer-opening', label: 'Give a clearer opening sentence' },
      { id: 'specific-example', label: 'Include one specific example or detail' },
      { id: 'fewer-fillers', label: 'Pause quietly instead of using filler words' },
      { id: 'calmer-pace', label: 'Speak at a steadier, calmer pace' },
      { id: 'clean-conclusion', label: 'Finish with a clean concluding sentence' }
    ],

    // Single Independent Practice Challenge
    nextExercise: {
      title: 'Practise Again with One Improvement',
      instruction: 'Try the same topic once more. Keep your main idea, focus on your one selected improvement, and notice the difference in your flow.'
    }
  }
};

export const LISTEN_RESPOND_ACTIVITY = {
  id: 'listen-respond',
  roadmapId: 'english-communication',
  roadmapTitle: 'English Communication',
  title: 'Listen & Respond',
  subtitle: 'Listen carefully. Understand the message. Give a thoughtful response.',
  targetAudience: 'Suitable for beginners aged approximately 10 and above, including school students, college students and adults.',
  estimatedTime: '5 to 10 minutes',
  objective: 'Understand everyday spoken questions and respond naturally, clearly and appropriately.',
  
  // ---------------------------------------------------------------------------
  // STEP 1: START (Understand)
  // ---------------------------------------------------------------------------
  start: {
    title: 'The 3-Step Listening Sequence',
    description: 'In everyday conversations, college, or work, giving a good response begins with active listening. Listen to understand, not just to reply. Follow this simple three-step method:',
    sequence: 'LISTEN -> THINK -> RESPOND',
    steps: [
      {
        number: '01',
        label: 'LISTEN',
        heading: 'Pay Attention to the Message',
        thinkAbout: 'What does the other person really want to know?',
        action: 'Pay attention to the main question or message. Notice what the other person wants to know.',
        focus: 'Notice question words such as what, why, when, where or how, along with the main topic.',
        keyPrompt: 'Listen to the whole question before deciding your response.'
      },
      {
        number: '02',
        label: 'THINK',
        heading: 'Pause and Decide',
        thinkAbout: 'What is the most important point you want to share?',
        action: 'Identify the important point and decide what you want to say.',
        focus: 'Take a calm pause. You do not need to rush into an answer the instant someone finishes speaking.',
        keyPrompt: 'A two-second pause to organise your thought makes your answer much clearer.'
      },
      {
        number: '03',
        label: 'RESPOND',
        heading: 'Answer Directly and Add a Detail',
        thinkAbout: 'How can you answer directly and add one helpful detail?',
        action: 'Answer the question directly, then add a useful detail if appropriate.',
        focus: 'Answer the core question in your opening sentence, then share one reason, example, or feeling.',
        keyPrompt: 'A good response need not be long. Direct plus one detail is ideal.'
      }
    ],

    workedExample: {
      question: 'What do you enjoy doing in your free time?',
      incompleteResponse: {
        text: 'Watching films.',
        critique: 'This is too brief. While technically factual, it gives no context or feeling and closes down natural conversation.'
      },
      clearerResponse: {
        text: 'In my free time, I really enjoy watching comedy films because they help me relax after classes.',
        critique: 'This response answers directly ("I really enjoy watching comedy films"), adds a helpful detail ("comedy films"), and gives a clear reason ("they help me relax after classes"). It sounds friendly, natural and easy to follow.'
      },
      summaryNote: 'A good response need not be long. A direct answer followed by one useful detail is natural, friendly and clear.'
    }
  },

  // ---------------------------------------------------------------------------
  // STEP 2: TRY (Practise)
  // ---------------------------------------------------------------------------
  try: {
    title: 'Four Everyday Listening Situations',
    instruction: 'Select a situation, listen to the spoken question, and prepare your response before saying it aloud.',
    guidance: [
      'Listen to the whole question before deciding your answer.',
      'Identify what is being asked (what, why, when, how).',
      'Think of one clear answer.',
      'Add a reason or example when useful.',
      'Respond in your own words.'
    ],
    situations: [
      {
        id: 'after-school-work',
        number: '01',
        category: 'Personal Question',
        title: 'After School or Work Routine',
        spokenText: 'What is something you enjoy doing after school or work?',
        context: 'A classmate or colleague asks about your routine after the day finishes.',
        hint: 'Name one specific activity you do, and mention why you enjoy it or how it makes you feel.',
        modelResponse: 'After work, I enjoy cooking dinner with quiet music playing, because it helps me switch off from the day.'
      },
      {
        id: 'place-you-like',
        number: '02',
        category: 'Describing an Experience',
        title: 'A Place You Like Visiting',
        spokenText: 'Can you tell me about a place you like visiting?',
        context: 'A friend is curious about a place you find pleasant or memorable.',
        hint: 'Mention the name or type of place, and share one specific feature that makes it special to you.',
        modelResponse: 'I really like visiting the local botanical garden. It has quiet shaded benches and beautiful trees where I can read in peace.'
      },
      {
        id: 'running-late',
        number: '03',
        category: 'Responding to a Situation',
        title: 'Running Late for an Appointment',
        spokenText: 'What would you do if you were running late for an appointment?',
        context: 'A practical everyday scenario where an unexpected delay happens.',
        hint: 'State how you would contact the person, apologise politely, and give an updated arrival time.',
        modelResponse: 'If I was running late, I would send a quick message right away, apologise politely, and give an honest estimate of when I will arrive.'
      },
      {
        id: 'friend-difficult-day',
        number: '04',
        category: 'Responding to Another Person',
        title: 'Supporting a Friend',
        spokenText: 'A friend tells you they had a difficult day. What would you say?',
        context: 'A social situation calling for empathy, patience and active listening.',
        hint: 'Acknowledge their feeling with warmth, and offer to listen or ask how you can help.',
        modelResponse: 'I would say, "I am so sorry to hear that. Do you want to talk about what happened, or would you prefer some quiet time?"'
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // STEP 3: NEXT (Improve)
  // ---------------------------------------------------------------------------
  next: {
    title: 'Recognising Common Difficulties and Improving',
    description: 'Everyone encounters moments of hesitation when listening and responding. Here is how to handle four common situations with confidence:',
    commonDifficulties: [
      {
        id: 'did-not-understand',
        letter: 'A',
        situation: 'I did not understand the question.',
        advice: 'Listen again, identify the important words and avoid guessing too quickly. Focus on the main topic word first.'
      },
      {
        id: 'knew-answer-stuck',
        letter: 'B',
        situation: 'I knew the answer but could not say it.',
        advice: 'Begin with one simple sentence, then add another useful detail. You do not need to plan a complex paragraph.'
      },
      {
        id: 'unrelated-answer',
        letter: 'C',
        situation: 'My answer was unrelated to the question.',
        advice: 'Pause and identify whether the person asked about what, why, when, where or how before answering.'
      },
      {
        id: 'afraid-to-repeat',
        letter: 'D',
        situation: 'I was afraid to ask someone to repeat.',
        advice: 'Use polite clarification phrases. Confident communicators ask for repetition whenever needed.'
      }
    ],

    politePhrases: [
      {
        phrase: 'Could you please repeat that?',
        context: 'Polite, simple and universally understood in any formal or informal situation.'
      },
      {
        phrase: 'Could you explain what you mean?',
        context: 'Helpful when you heard the words clearly, but want to clarify the speaker intent.'
      },
      {
        phrase: 'Just to be sure I understood, do you mean...?',
        context: 'Active listening confirmation that shows you are genuinely engaged in the conversation.'
      },
      {
        phrase: 'Would you mind saying that once more a little slower?',
        context: 'Friendly and natural when someone speaks quickly or in noisy surroundings.'
      }
    ],

    selfReflectionQuestions: [
      {
        id: 'understood-question',
        question: 'Did I understand the main question before trying to speak?'
      },
      {
        id: 'response-relevant',
        question: 'Was my response directly relevant to what the person asked?'
      },
      {
        id: 'expressed-clearly',
        question: 'Did I express myself clearly with one direct answer and one detail?'
      }
    ],

    modelResponseNote: 'Multiple responses can be appropriate. What matters is answering directly and adding one thoughtful detail.'
  }
};

export const EXPRESS_YOUR_OPINION_ACTIVITY = {
  id: 'express-your-opinion',
  roadmapId: 'english-communication',
  roadmapTitle: 'English Communication',
  title: 'Express Your Opinion',
  subtitle: 'Think independently. Share your viewpoint. Explain your reasons. Respect other perspectives.',
  targetAudience: 'Suitable for beginners aged approximately 10 and above, including school students, college students and adults.',
  estimatedTime: '5 to 10 minutes',
  objective: 'Express personal opinions in simple English, justify them with relevant reasons and respond respectfully when others disagree.',
  
  // ---------------------------------------------------------------------------
  // STEP 1: START (Understand)
  // ---------------------------------------------------------------------------
  start: {
    title: 'The 4-Part Opinion Structure',
    description: 'In school, university, work and everyday conversations, sharing an opinion is more than simply stating what you like or dislike. An opinion becomes meaningful when you support it with a reason and an example while respecting other viewpoints.',
    flowDiagram: {
      title: 'How to Build and Share a Thoughtful Opinion',
      steps: [
        {
          tag: 'OPINION',
          number: '01',
          label: 'State Your Opinion',
          summary: 'State your viewpoint clearly and directly.',
          sentenceStarters: ['I think...', 'In my opinion...', 'From my perspective...', 'I believe...'],
          guidance: 'Choose one clear viewpoint. You do not need to overcomplicate your opening sentence.'
        },
        {
          tag: 'REASON',
          number: '02',
          label: 'Give a Reason',
          summary: 'Explain why you hold this viewpoint.',
          sentenceStarters: ['One reason is...', 'This is because...', 'The main reason I feel this way is...'],
          guidance: 'Connect your viewpoint with "because" or "one reason is" so listeners understand your thinking.'
        },
        {
          tag: 'EXAMPLE',
          number: '03',
          label: 'Share an Example',
          summary: 'Provide a concrete situation or experience.',
          sentenceStarters: ['For example...', 'For instance...', 'In my own experience...'],
          guidance: 'A single real-world detail or personal observation makes your reason memorable and convincing.'
        },
        {
          tag: 'RESPECT',
          number: '04',
          label: 'Respect Another Perspective',
          summary: 'Acknowledge other viewpoints when appropriate.',
          sentenceStarters: ['I understand your point, but...', 'That may be true, although...', 'While others might prefer...'],
          guidance: 'Respectful disagreement does not mean automatically agreeing with others. It means acknowledging their point while calmly explaining your own.'
        }
      ]
    },
    contrastExample: {
      title: 'Stating vs Supporting an Opinion',
      basicStatement: {
        text: 'I think studying with a friend is better.',
        critique: 'This states a preference, but gives no explanation for why you hold that view. The listener does not understand your thinking or why you feel this way.'
      },
      improvedStatement: {
        text: 'I prefer studying with a friend because we can discuss difficult questions and help each other understand them.',
        critique: 'Adding a clear reason makes your opinion meaningful, persuasive and easier for others to engage with in a conversation.'
      },
      takeaway: 'An opinion without a reason is just a claim. Adding a reason and an example turns it into a thoughtful contribution.'
    },
    workedExample: {
      topic: 'Is it better to study alone or with a friend?',
      explanation: 'Both viewpoints on this question are completely reasonable. What matters is explaining your reasons clearly and respectfully.',
      viewpointA: {
        stance: 'Studying with a Friend',
        opinion: 'In my opinion, studying with a friend is very helpful.',
        reason: 'One reason is that we can test each other on difficult topics and explain concepts in different ways.',
        example: 'For example, when preparing for an exam last term, my friend helped me understand a challenging maths problem in just ten minutes.',
        respect: 'While I know some people focus better in silence, discussing ideas together helps me remember them much better.'
      },
      viewpointB: {
        stance: 'Studying Alone',
        opinion: 'I usually prefer studying alone in a quiet room.',
        reason: 'This is because I can concentrate deeply without getting distracted by conversation.',
        example: 'For instance, when I have reading to complete, working by myself lets me take notes at my own pace.',
        respect: 'I understand that studying in pairs works well for many people, but quiet study fits my learning style best.'
      },
      keyRule: 'Neither viewpoint is wrong. Respectful disagreement means sharing your viewpoint with reasons, not claiming that everyone else must agree with you.'
    }
  },

  // ---------------------------------------------------------------------------
  // STEP 2: TRY (Practise)
  // ---------------------------------------------------------------------------
  try: {
    title: 'Four Everyday Opinion Situations',
    instruction: 'Choose an everyday topic, select your viewpoint if helpful, and prepare your structured response using the outline helper before speaking aloud.',
    privacyNote: 'Practice is completely private. No microphone access, audio recording, or data upload is used.',
    guidance: [
      'Choose one topic from the cards below.',
      'Decide your viewpoint: Agree, Disagree, or It Depends.',
      'Think of one primary reason that supports your view.',
      'Add a simple personal example or observation.',
      'Say your opinion aloud at a calm, natural pace.'
    ],
    outlineTemplate: {
      opinionPrompt: 'My opinion: ',
      reasonPrompt: 'My reason: ',
      examplePrompt: 'My example: ',
      respectPrompt: 'Another viewpoint I can acknowledge (optional): '
    },
    disagreementComparison: {
      title: 'Disagreeing with Confidence and Respect',
      unhelpful: {
        quote: 'You are wrong. That is a bad idea.',
        note: 'Dismissive, attacks the person, and shuts down natural discussion.'
      },
      better: {
        quote: 'I see your point, but I think differently because...',
        note: 'Respects the other person, challenges the idea calmly, and keeps conversation open.'
      },
      insight: 'Respectful disagreement does not mean passive agreement. You can hold your ground firmly while speaking politely.'
    },
    topics: [
      {
        id: 'study-alone-or-friend',
        number: '01',
        title: 'Studying Alone or with a Friend',
        question: 'Is it better to study alone or with a friend?',
        category: 'Learning Habits',
        context: 'Consider how you concentrate best and how conversation impacts your study time.',
        guidingQuestions: [
          'How do you concentrate best when learning something new?',
          'What is one advantage of having a friend to study with?',
          'What might be a drawback if a study session becomes noisy?'
        ],
        sampleStances: ['Study Alone', 'With a Friend', 'It Depends on the Subject'],
        exampleResponse: 'In my opinion, studying alone is usually better for deep revision because it allows you to focus without distractions. For example, when reading challenging chapters, I need total quiet to take proper notes. While studying with friends is great for quick quiz practice, quiet solo study gives me the best concentration.',
        whyItWorks: 'Directly answers the question, connects the reason with "because", provides a concrete textbook reading example, and politely acknowledges when group study can also be useful.'
      },
      {
        id: 'phones-at-meals',
        number: '02',
        title: 'Phones Away During Meals',
        question: 'Should people keep their phones away during meals?',
        category: 'Daily Habits',
        context: 'Think about how screens affect family and social relationships when eating together.',
        guidingQuestions: [
          'How does it feel when someone checks their phone while you are speaking to them?',
          'Could keeping phones away help people have better conversations?',
          'Are there rare situations where having a phone nearby during a meal is necessary?'
        ],
        sampleStances: ['Keep Phones Away', 'Allow Phones at Meals', 'It Depends on the Setting'],
        exampleResponse: 'I believe people should keep their phones away during meals because eating together is a valuable time to talk. For instance, in our home, dinner is the only time everyone sits together to share how their day went. That may be true that someone might expect an urgent call, but in most cases, messages can wait until after eating.',
        whyItWorks: 'Clear opening, strong personal rationale, relatable family example, and balanced acknowledgement of urgent exceptions.'
      },
      {
        id: 'outdoors-vs-screens',
        number: '03',
        title: 'Time Outdoors vs Screen Time',
        question: 'Is spending time outdoors better than spending all your free time on screens?',
        category: 'Health and Well-being',
        context: 'Balance the benefits of fresh air and physical activity with what we enjoy or learn on computers and phones.',
        guidingQuestions: [
          'How does your body and mood feel after being outside in the fresh air?',
          'What are some positive things you can learn or do using digital screens?',
          'What happens when someone spends an entire weekend looking at screens without going outdoors?'
        ],
        sampleStances: ['Outdoors is Better', 'Screens Offer More Value', 'A Balanced Approach is Best'],
        exampleResponse: 'From my perspective, spending time outdoors is definitely healthier than spending all our free time on screens. Fresh air and gentle movement give our eyes and minds a rest. For example, going for a short walk after school always leaves me feeling refreshed. I appreciate that screens can be informative and fun, but our health benefits greatly from stepping outside.',
        whyItWorks: 'Directly answers the prompt, explains physical and mental benefits, gives a concrete daily habit, and acknowledges the value of digital technology without losing the central argument.'
      },
      {
        id: 'trying-new-things',
        number: '04',
        title: 'Trying New Things and Making Mistakes',
        question: 'Is it better to try something new even if you might make mistakes?',
        category: 'Personal Growth',
        context: 'Consider how learning happens and whether the fear of mistakes stops us from discovering new abilities.',
        guidingQuestions: [
          'Have you ever learnt an important lesson after making a mistake?',
          'What happens if we only do things we are already good at?',
          'How can we encourage ourselves when trying something unfamiliar?'
        ],
        sampleStances: ['Always Try New Things', 'Stick to What You Know', 'It Depends on the Risk'],
        exampleResponse: 'I strongly think it is better to try new things even if we make mistakes, because making mistakes is how we genuinely learn. For example, when I first started learning to ride a bicycle, I fell several times before getting my balance right. It may feel uncomfortable at first, but avoiding new activities entirely prevents us from discovering what we can achieve.',
        whyItWorks: 'Confident opening, sound growth-mindset reasoning, vivid personal learning example, and reassuring recognition that initial discomfort is normal.'
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // STEP 3: NEXT (Improve)
  // ---------------------------------------------------------------------------
  next: {
    title: 'Recognising Common Difficulties and Improving',
    description: 'Expressing opinions with confidence develops through regular practice. Here is how to handle four common speaking difficulties:',
    commonDifficulties: [
      {
        id: 'no-reason',
        letter: 'A',
        situation: 'I shared my opinion but gave no reason.',
        advice: 'Add one sentence beginning with "because" to explain your thinking. Even a short reason gives your opinion real weight.'
      },
      {
        id: 'too-many-points',
        letter: 'B',
        situation: 'I gave too many unrelated points.',
        advice: 'Choose one main reason and one useful example. It is much easier for a listener to remember two clear points than five scattered thoughts.'
      },
      {
        id: 'disagreed-too-strongly',
        letter: 'C',
        situation: 'I disagreed too strongly.',
        advice: 'Challenge the idea rather than attacking the person. Use respectful language such as "I see your point, but..." instead of "You are wrong".'
      },
      {
        id: 'afraid-wrong',
        letter: 'D',
        situation: 'I was afraid my opinion might be wrong.',
        advice: 'Express your viewpoint calmly, remain open to new information and be willing to revise it. An opinion is an invitation to converse, not an exam.'
      }
    ],
    selfReflectionQuestions: [
      {
        id: 'stated-clearly',
        question: 'Did I state my opinion clearly at the beginning?'
      },
      {
        id: 'relevant-reason',
        question: 'Did I support it with at least one relevant reason?'
      },
      {
        id: 'useful-example',
        question: 'Did I give a concrete example where useful?'
      },
      {
        id: 'respected-viewpoints',
        question: 'Did I respect different viewpoints and avoid attacking others?'
      }
    ],
    improvementChoices: [
      { id: 'clearer-opinion', label: 'State the opinion more clearly' },
      { id: 'stronger-reason', label: 'Give a stronger reason' },
      { id: 'useful-example', label: 'Add a useful example' },
      { id: 'reduce-unrelated', label: 'Reduce unrelated details' },
      { id: 'disagree-respectfully', label: 'Disagree more respectfully' }
    ]
  }
};

export const EVERYDAY_CONVERSATIONS_ACTIVITY = {
  id: 'everyday-conversations',
  roadmapId: 'english-communication',
  roadmapTitle: 'English Communication',
  title: 'Everyday Conversations',
  subtitle: 'Start naturally. Keep the conversation going. End politely.',
  targetAudience: 'Suitable for beginners aged approximately 10 and above, including school students, college students and adults.',
  estimatedTime: '5 to 10 minutes',
  objective: 'Participate naturally in short everyday conversations by starting appropriately, listening, responding, asking follow-up questions and ending politely.',

  // ---------------------------------------------------------------------------
  // STEP 1: START (Understand)
  // ---------------------------------------------------------------------------
  start: {
    title: 'The 3-Part Conversation Method',
    description: 'Natural conversations are not long monologues or formal speeches. They are friendly, two-way exchanges built on turn-taking, listening and simple polite habits.',
    sequence: 'OPEN -> CONNECT -> CLOSE',
    methodSteps: [
      {
        tag: 'OPEN',
        number: '01',
        title: 'Begin Naturally',
        heading: 'Start with a suitable greeting, friendly question, or simple observation.',
        summary: 'The opening should suit the person and situation. You do not need a dramatic opening line; warmth and relevance matter most.',
        guidance: 'Look at the setting, make eye contact with a gentle smile, and begin with an easy question that does not put pressure on the other person.',
        examples: [
          'Hi, how are you?',
          'Is this your first time here?',
          'What did you think of the film?'
        ]
      },
      {
        tag: 'CONNECT',
        number: '02',
        title: 'Keep the Conversation Going',
        heading: 'Listen, respond to the main point, add a small detail, and ask a follow-up question.',
        summary: 'Conversations work through turn-taking rather than one person talking continuously. Balance speaking and listening.',
        guidance: 'When the other person finishes speaking, acknowledge their thought, share one related experience or feeling, and ask another natural question to pass the turn back.',
        examples: [
          'Listen to what the other person says rather than planning your next sentence.',
          'Answer their question directly before adding your own detail.',
          'Ask open follow-up questions like "What made you choose that?" to invite more sharing.'
        ]
      },
      {
        tag: 'CLOSE',
        number: '03',
        title: 'Finish Politely',
        heading: 'Acknowledge the conversation, thank the person if appropriate, and use a natural closing.',
        summary: 'A natural ending depends on the situation. Wrap up warmly without abruptly cutting the conversation off.',
        guidance: 'Notice natural pauses or cues (such as a session starting or someone needing to leave), express appreciation for the chat, and say goodbye with a pleasant parting sentence.',
        examples: [
          'It was nice talking to you.',
          'Thanks for your help.',
          'I will see you later.',
          'Let us talk again soon.'
        ]
      }
    ],

    workedExample: {
      title: 'Meeting Someone New at a Community Workshop',
      context: 'Alex and Sam meet while waiting before a weekend design workshop begins.',
      takeaway: 'Notice how this dialogue works like a game of catch: one person speaks, the other catches the idea, adds a detail, and throws it back with a question.',
      turns: [
        {
          speaker: 'Alex',
          speakerRole: 'Fellow participant',
          speech: 'Hi! Is this your first time at this weekend workshop?',
          phase: 'OPEN',
          badgeText: 'Step 1: OPEN',
          annotation: 'Started with a warm greeting and an easy, situational question.'
        },
        {
          speaker: 'Sam',
          speakerRole: 'New neighbour',
          speech: 'Yes, it is! I recently moved to this neighbourhood and wanted to learn something new. Have you been before?',
          phase: 'CONNECT',
          badgeText: 'Step 2: CONNECT',
          annotation: 'Answered directly, shared one personal detail, and invited Alex to speak.'
        },
        {
          speaker: 'Alex',
          speakerRole: 'Fellow participant',
          speech: 'I came once last month. The sessions are very friendly and hands-on. What kind of projects are you interested in?',
          phase: 'CONNECT',
          badgeText: 'Step 2: CONNECT',
          annotation: 'Responded to Sam, shared encouragement, and asked about Sam interests.'
        },
        {
          speaker: 'Sam',
          speakerRole: 'New neighbour',
          speech: 'Mostly digital sketching! Oh, look, the session is about to begin. It was really nice meeting you, Alex.',
          phase: 'CLOSE',
          badgeText: 'Step 3: CLOSE',
          annotation: 'Answered the question briefly and noticed the natural moment to wrap up.'
        },
        {
          speaker: 'Alex',
          speakerRole: 'Fellow participant',
          speech: 'Nice meeting you too, Sam! Enjoy the workshop, let us catch up at the break.',
          phase: 'CLOSE',
          badgeText: 'Step 3: CLOSE',
          annotation: 'Finished politely and looked forward to connecting again later.'
        }
      ]
    }
  },

  // ---------------------------------------------------------------------------
  // STEP 2: TRY (Practise Real Conversations)
  // ---------------------------------------------------------------------------
  try: {
    title: 'Four Everyday Conversation Situations',
    instruction: 'Choose a situation, read or hear each conversational turn, and select or write a thoughtful reply to guide the exchange.',
    privacyNote: 'Practice is completely private. No microphone access, audio recording, or data upload is used.',
    guidance: [
      'Choose one conversation scenario below.',
      'Read or hear what the other person says.',
      'Select a guided reply or write your own words in the notes box.',
      'Notice how your choice helps the conversation flow forward.',
      'Say each response aloud with a natural, friendly tone.'
    ],

    situations: [
      {
        id: 'meeting-someone-new',
        number: '01',
        title: 'Meeting Someone New',
        category: 'Social Introductions',
        context: 'You are waiting before a community seminar or club meeting and sit next to someone you have not met before.',
        stages: [
          {
            stageNumber: 1,
            phase: 'OPEN',
            phaseLabel: 'Turn 1 · OPEN (Greeting & Question)',
            promptDescription: 'The other person sits down next to you and looks up with a friendly smile.',
            partnerName: 'Rohan',
            partnerRole: 'Fellow Attendee',
            partnerSpeech: 'Hello! Mind if I sit here?',
            options: [
              {
                id: 'opt-1a',
                text: 'Not at all, please go ahead! Are you here for the weekend seminar?',
                quality: 'Welcoming & Engaging',
                isRecommended: true,
                feedback: 'Warm and welcoming! Answering politely and adding a simple situational question starts the conversation naturally.'
              },
              {
                id: 'opt-1b',
                text: 'Sure.',
                quality: 'Too Brief',
                isRecommended: false,
                feedback: 'While technically polite, a one-word answer does not invite the other person into conversation.'
              }
            ],
            freeTextPlaceholder: 'Or write your own welcoming greeting and question...'
          },
          {
            stageNumber: 2,
            phase: 'CONNECT',
            phaseLabel: 'Turn 2 · CONNECT (Listening & Follow-up)',
            promptDescription: 'Rohan sets down their notebook and nods cheerfully.',
            partnerName: 'Rohan',
            partnerRole: 'Fellow Attendee',
            partnerSpeech: 'Yes, I am! I heard the speaker is really helpful on communication confidence. Have you heard them speak before?',
            options: [
              {
                id: 'opt-2a',
                text: 'No, this is my first time too. I am hoping to feel calmer when presenting. What made you choose this session?',
                quality: 'Turn-taking & Curious',
                isRecommended: true,
                feedback: 'Great response! You answered honestly, added a personal reason, and asked a thoughtful follow-up question.'
              },
              {
                id: 'opt-2b',
                text: 'I do tons of presentations myself and I usually find them very easy because I talk a lot.',
                quality: 'One-sided',
                isRecommended: false,
                feedback: 'Talking only about yourself without asking about the other person shuts down true conversational turn-taking.'
              }
            ],
            freeTextPlaceholder: 'Or write your own response and follow-up question...'
          },
          {
            stageNumber: 3,
            phase: 'CLOSE',
            phaseLabel: 'Turn 3 · CLOSE (Finishing Politely)',
            promptDescription: 'The speaker walks up to the front table and the room quiets down.',
            partnerName: 'Rohan',
            partnerRole: 'Fellow Attendee',
            partnerSpeech: 'I want to improve my confidence for group projects! Oh, look, the session is starting now.',
            options: [
              {
                id: 'opt-3a',
                text: 'It was really nice meeting you! Let us compare notes during the break.',
                quality: 'Polite & Forward-looking',
                isRecommended: true,
                feedback: 'Good closing! Acknowledges the timing, wraps up politely, and suggests continuing later.'
              },
              {
                id: 'opt-3b',
                text: 'Quiet now, the talk is on.',
                quality: 'Abrupt',
                isRecommended: false,
                feedback: 'A little too blunt. A brief, warm sentence takes only a few seconds and leaves a friendly impression.'
              }
            ],
            freeTextPlaceholder: 'Or write your own polite closing sentence...'
          }
        ]
      },

      {
        id: 'asking-for-help',
        number: '02',
        title: 'Asking for Help',
        category: 'Everyday Requests',
        context: 'You are in a large library or campus building and need to find the quiet study rooms on the second floor.',
        stages: [
          {
            stageNumber: 1,
            phase: 'OPEN',
            phaseLabel: 'Turn 1 · OPEN (Polite Request)',
            promptDescription: 'You approach the information desk where a staff member looks up with a smile.',
            partnerName: 'Library Staff',
            partnerRole: 'Library Staff',
            partnerSpeech: 'Hello, can I help you find something today?',
            options: [
              {
                id: 'opt-1a',
                text: 'Excuse me, yes please. Could you tell me where the quiet study rooms are located?',
                quality: 'Courteous & Specific',
                isRecommended: true,
                feedback: 'Clear and courteous! Beginning with "Excuse me" and stating your need clearly helps the other person assist you immediately.'
              },
              {
                id: 'opt-1b',
                text: 'Where are the study rooms?',
                quality: 'Blunt',
                isRecommended: false,
                feedback: 'This gets the question across, but sounds demanding. Adding "Excuse me" or "Could you tell me" makes it much friendlier.'
              }
            ],
            freeTextPlaceholder: 'Or write your own polite opening request...'
          },
          {
            stageNumber: 2,
            phase: 'CONNECT',
            phaseLabel: 'Turn 2 · CONNECT (Clarifying Instructions)',
            promptDescription: 'The assistant points toward the central staircase.',
            partnerName: 'Library Staff',
            partnerRole: 'Library Staff',
            partnerSpeech: 'Certainly! Take the stairs on your left up to the second floor, turn right past the computer lab, and you will see the rooms at the end of the hall.',
            options: [
              {
                id: 'opt-2a',
                text: 'Thank you! Just to make sure I understood, turn right past the computer lab on the second floor?',
                quality: 'Active Clarification',
                isRecommended: true,
                feedback: 'Great active listening! Repeating the key direction confirms you have understood correctly before walking away.'
              },
              {
                id: 'opt-2b',
                text: 'Okay.',
                quality: 'Passive',
                isRecommended: false,
                feedback: '"Okay" works, but quickly confirming key details prevents walking to the wrong wing of the building.'
              }
            ],
            freeTextPlaceholder: 'Or write your own confirmation or follow-up question...'
          },
          {
            stageNumber: 3,
            phase: 'CLOSE',
            phaseLabel: 'Turn 3 · CLOSE (Expressing Gratitude)',
            promptDescription: 'The assistant nods and offers a small building map.',
            partnerName: 'Library Staff',
            partnerRole: 'Library Staff',
            partnerSpeech: 'That is right, right past the lab. You cannot miss them!',
            options: [
              {
                id: 'opt-3a',
                text: 'Thanks so much for your help, I really appreciate it! Have a good day.',
                quality: 'Warm & Grateful',
                isRecommended: true,
                feedback: 'Polite and warm! A quick thank-you acknowledges their assistance and ends the interaction on a cheerful note.'
              },
              {
                id: 'opt-3b',
                text: 'Right.',
                quality: 'Curt',
                isRecommended: false,
                feedback: 'Walking away without a thank-you can feel dismissive after someone has helped you.'
              }
            ],
            freeTextPlaceholder: 'Or write your own polite thank-you closing...'
          }
        ]
      },

      {
        id: 'shared-interest',
        number: '03',
        title: 'Talking About a Shared Interest',
        category: 'Interests & Hobbies',
        context: 'During a break, a classmate notices you looking at a photography book or pictures of nature walks.',
        stages: [
          {
            stageNumber: 1,
            phase: 'OPEN',
            phaseLabel: 'Turn 1 · OPEN (Sharing Curiosity)',
            promptDescription: 'A classmate looks over with friendly interest.',
            partnerName: 'Karthik',
            partnerRole: 'Classmate',
            partnerSpeech: 'Hey! Are you interested in photography? I have been trying to get into landscape photos recently.',
            options: [
              {
                id: 'opt-1a',
                text: 'Yes, I am! I love taking nature photos during morning walks. How long have you been taking landscapes?',
                quality: 'Enthusiastic & Reciprocal',
                isRecommended: true,
                feedback: 'Good opening! You shared your own interest and immediately asked about theirs.'
              },
              {
                id: 'opt-1b',
                text: 'Yes, I like photography.',
                quality: 'Closed',
                isRecommended: false,
                feedback: 'This answers the question, but leaves no opening for the conversation to continue smoothly.'
              }
            ],
            freeTextPlaceholder: 'Or write your own opening response and question...'
          },
          {
            stageNumber: 2,
            phase: 'CONNECT',
            phaseLabel: 'Turn 2 · CONNECT (Exchanging Details)',
            promptDescription: 'Karthik smiles warmly as they share their experience.',
            partnerName: 'Karthik',
            partnerRole: 'Classmate',
            partnerSpeech: 'Just since last summer! I bought a basic second-hand camera and went hiking in the hills. The sunset lighting was incredible.',
            options: [
              {
                id: 'opt-2a',
                text: 'Sunset lighting makes such a difference! Do you prefer hiking in the hills or taking photos around the city?',
                quality: 'Engaged & Curious',
                isRecommended: true,
                feedback: 'Great turn-taking! You picked up on their detail about sunsets and asked an easy choice question.'
              },
              {
                id: 'opt-2b',
                text: 'Second-hand cameras are usually low quality. You should buy the newest professional model.',
                quality: 'Discouraging',
                isRecommended: false,
                feedback: 'Criticising someone gear discourages friendly sharing. Focus on shared enjoyment rather than gear prestige.'
              }
            ],
            freeTextPlaceholder: 'Or write your own response and follow-up question...'
          },
          {
            stageNumber: 3,
            phase: 'CLOSE',
            phaseLabel: 'Turn 3 · CLOSE (Natural Transition)',
            promptDescription: 'The corridor bell rings, signaling that the break has concluded.',
            partnerName: 'Karthik',
            partnerRole: 'Classmate',
            partnerSpeech: 'Hills for sure, it is so peaceful. Oh, the bell just rang, our break is over!',
            options: [
              {
                id: 'opt-3a',
                text: 'It was really great chatting about photography! Let us talk more about your camera setup later.',
                quality: 'Friendly & Natural',
                isRecommended: true,
                feedback: 'Ideal closing! Acknowledges the shared chat, respects the bell, and creates an easy connection for next time.'
              },
              {
                id: 'opt-3b',
                text: 'Bye.',
                quality: 'Rushed',
                isRecommended: false,
                feedback: 'A little too quick; even a simple "Nice chatting with you" adds warmth.'
              }
            ],
            freeTextPlaceholder: 'Or write your own natural closing sentence...'
          }
        ]
      },

      {
        id: 'clearing-misunderstanding',
        number: '04',
        title: 'Clearing Up a Misunderstanding',
        category: 'Everyday Situations',
        context: 'You and a project partner arranged to meet at a campus cafe, but there was confusion about whether to meet at 3:00 PM or 4:00 PM.',
        stages: [
          {
            stageNumber: 1,
            phase: 'OPEN',
            phaseLabel: 'Turn 1 · OPEN (Calm Clarification)',
            promptDescription: 'Your partner spots you arriving and waves with slight confusion.',
            partnerName: 'Ananya',
            partnerRole: 'Project Partner',
            partnerSpeech: 'Hey! I was waiting for you at 3:00 PM at the cafe, but did not see you. Did we miss each other?',
            options: [
              {
                id: 'opt-1a',
                text: 'Oh no, I am so sorry! I thought our message said 4:00 PM, but I must have misunderstood. Are you still nearby?',
                quality: 'Calm & Courteous',
                isRecommended: true,
                feedback: 'Calm and polite! You apologised without getting defensive and asked where they are.'
              },
              {
                id: 'opt-1b',
                text: 'I told you 4:00 PM! You never check your messages properly.',
                quality: 'Defensive & Blaming',
                isRecommended: false,
                feedback: 'Blaming the other person creates unnecessary tension. Misunderstandings happen; calm clarification resolves things much faster.'
              }
            ],
            freeTextPlaceholder: 'Or write your own calm clarification...'
          },
          {
            stageNumber: 2,
            phase: 'CONNECT',
            phaseLabel: 'Turn 2 · CONNECT (Finding the Solution)',
            promptDescription: 'Ananya checks their message screen and nods with understanding.',
            partnerName: 'Ananya',
            partnerRole: 'Project Partner',
            partnerSpeech: 'I see what happened! I sent a second message proposing 3:00 PM, but my network was patchy so it might not have delivered. I am still at the cafe reading.',
            options: [
              {
                id: 'opt-2a',
                text: 'That explains it! I am just five minutes away. Would it suit you if I head over right now so we can finish our plan?',
                quality: 'Constructive & Friendly',
                isRecommended: true,
                feedback: 'Great problem solving! You found the reason, kept things cheerful, and offered an immediate practical next step.'
              },
              {
                id: 'opt-2b',
                text: 'I am so careless, I ruin everything.',
                quality: 'Over-apologetic',
                isRecommended: false,
                feedback: 'No need to be harsh on yourself. Minor schedule mix-ups happen to everyone.'
              }
            ],
            freeTextPlaceholder: 'Or write your own solution-oriented message...'
          },
          {
            stageNumber: 3,
            phase: 'CLOSE',
            phaseLabel: 'Turn 3 · CLOSE (Reassuring Agreement)',
            promptDescription: 'Ananya smiles and sends an affirmative thumbs-up.',
            partnerName: 'Ananya',
            partnerRole: 'Project Partner',
            partnerSpeech: 'That sounds great! I have a table by the window. Take your time, see you in five minutes.',
            options: [
              {
                id: 'opt-3a',
                text: 'Perfect, thanks for your patience! See you in a few minutes.',
                quality: 'Reassuring & Polite',
                isRecommended: true,
                feedback: 'Warm closing! Appreciative, pleasant, and confirms your arrival clearly.'
              },
              {
                id: 'opt-3b',
                text: 'Okay.',
                quality: 'Minimal',
                isRecommended: false,
                feedback: 'Leaving the other person with a one-word reply is fine, but adding a short reassurance confirms your arrival warmly.'
              }
            ],
            freeTextPlaceholder: 'Or write your own confirming close...'
          }
        ]
      }
    ]
  },

  // ---------------------------------------------------------------------------
  // STEP 3: NEXT (Improve)
  // ---------------------------------------------------------------------------
  next: {
    title: 'Recognising Common Difficulties and Improving',
    description: 'Natural conversational flow develops with small daily habits. Here is how to handle four common conversation challenges:',
    commonDifficulties: [
      {
        id: 'start-trouble',
        letter: 'A',
        situation: 'I do not know how to start.',
        advice: 'Begin with a simple greeting or a relevant question about the surroundings. You do not need an impressive opening line.'
      },
      {
        id: 'one-answer-stop',
        letter: 'B',
        situation: 'The conversation ends after one answer.',
        advice: 'Add one useful detail to your answer or ask a related follow-up question. Give the other person something to respond to.'
      },
      {
        id: 'interrupting-too-much',
        letter: 'C',
        situation: 'I talk too much or interrupt.',
        advice: 'Allow the other person to finish their thought completely. Listen before responding, and leave comfortable room for their ideas.'
      },
      {
        id: 'awkward-ending',
        letter: 'D',
        situation: 'I do not know how to end politely.',
        advice: 'Acknowledge the conversation, thank the person where appropriate, and use a natural closing sentence such as "It was nice talking to you."'
      }
    ],

    toolkitCategories: [
      {
        title: 'Starting Naturally',
        phrases: [
          'Hi, how are you today?',
          'Is this your first time here?',
          'Excuse me, could you help me with something?'
        ]
      },
      {
        title: 'Showing Interest',
        phrases: [
          'That is really interesting!',
          'Really? What was that like?',
          'I see what you mean.'
        ]
      },
      {
        title: 'Asking Follow-up Questions',
        phrases: [
          'What made you choose that?',
          'What happened next?',
          'Do you do that often?'
        ]
      },
      {
        title: 'Clarifying Politely',
        phrases: [
          'Just to be sure, do you mean...?',
          'Could you explain a little more about...?',
          'I thought we agreed on..., is that right?'
        ]
      },
      {
        title: 'Ending Politely',
        phrases: [
          'It was really nice talking to you.',
          'Thanks so much for your help!',
          'Let us catch up again soon.'
        ]
      }
    ],

    selfReflectionQuestions: [
      {
        id: 'started-appropriately',
        question: 'Did I begin the conversation appropriately for the situation?'
      },
      {
        id: 'listened-and-responded',
        question: 'Did I listen carefully and respond to the other person point?'
      },
      {
        id: 'helped-continue',
        question: 'Did I help the conversation continue with a detail or follow-up question?'
      },
      {
        id: 'finished-politely',
        question: 'Did I finish politely and acknowledge the conversation?'
      }
    ],

    improvementChoices: [
      { id: 'start-more-naturally', label: 'Start more naturally' },
      { id: 'better-follow-up', label: 'Ask a better follow-up question' },
      { id: 'more-relevant-responses', label: 'Give more relevant responses' },
      { id: 'better-turn-taking', label: 'Allow better turn-taking' },
      { id: 'end-more-politely', label: 'End more politely' }
    ]
  }
};



