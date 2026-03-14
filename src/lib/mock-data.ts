// Mock data for the application
export interface MockPost {
  id: string;
  instagram_post_id: string;
  caption: string;
  media_url: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL";
  like_count: number;
  comment_count: number;
  timestamp: string;
  engagement_rate: number;
  hook_score: number;
  caption_score: number;
  ai_feedback?: string;
}

export const mockPosts: MockPost[] = [
  {
    id: "1",
    instagram_post_id: "ig_001",
    caption: "Just launched my new course on building SaaS products 🚀 Link in bio! #saas #startup #entrepreneur",
    media_url: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop",
    media_type: "IMAGE",
    like_count: 1245,
    comment_count: 89,
    timestamp: "2026-03-10T14:30:00Z",
    engagement_rate: 6.8,
    hook_score: 7,
    caption_score: 6,
    ai_feedback: "Good announcement post but lacks a strong hook. Consider leading with the transformation your course offers rather than the launch itself.",
  },
  {
    id: "2",
    instagram_post_id: "ig_002",
    caption: "POV: You finally automated your entire workflow and gained 3 hours back every day ⏰✨",
    media_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
    media_type: "IMAGE",
    like_count: 2340,
    comment_count: 156,
    timestamp: "2026-03-08T10:15:00Z",
    engagement_rate: 12.4,
    hook_score: 9,
    caption_score: 8,
    ai_feedback: "Excellent hook using POV format. The relatability factor is high. Consider adding a carousel showing the before/after workflow.",
  },
  {
    id: "3",
    instagram_post_id: "ig_003",
    caption: "Monday motivation 💪 Keep grinding! #motivation #hustle",
    media_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop",
    media_type: "IMAGE",
    like_count: 320,
    comment_count: 12,
    timestamp: "2026-03-06T08:00:00Z",
    engagement_rate: 1.7,
    hook_score: 2,
    caption_score: 2,
    ai_feedback: "Generic motivational content underperforms. Your audience follows you for specific expertise. Replace with actionable tips related to your niche.",
  },
  {
    id: "4",
    instagram_post_id: "ig_004",
    caption: "5 tools I use every day that 10x'd my productivity (save this for later) 🧵👇",
    media_url: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop",
    media_type: "CAROUSEL",
    like_count: 3120,
    comment_count: 234,
    timestamp: "2026-03-04T16:45:00Z",
    engagement_rate: 16.2,
    hook_score: 9,
    caption_score: 9,
    ai_feedback: "Top performer! The listicle format with 'save this' CTA drives high engagement. Replicate this format with different tool categories.",
  },
  {
    id: "5",
    instagram_post_id: "ig_005",
    caption: "Behind the scenes of building my app 👨‍💻 Sometimes it's messy and that's okay",
    media_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop",
    media_type: "VIDEO",
    like_count: 1890,
    comment_count: 145,
    timestamp: "2026-03-02T12:00:00Z",
    engagement_rate: 10.1,
    hook_score: 7,
    caption_score: 7,
    ai_feedback: "Authenticity content performs well. Add a specific lesson or takeaway to transform this from a vlog moment into valuable content.",
  },
  {
    id: "6",
    instagram_post_id: "ig_006",
    caption: "The #1 mistake I see new creators make (and how to fix it in 30 seconds)",
    media_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop",
    media_type: "VIDEO",
    like_count: 2780,
    comment_count: 198,
    timestamp: "2026-02-28T09:30:00Z",
    engagement_rate: 14.8,
    hook_score: 10,
    caption_score: 8,
    ai_feedback: "Perfect hook formula: specific number + common pain point + quick fix promise. The curiosity gap is strong.",
  },
];

export const mockEngagementTrend = [
  { date: "Feb 20", engagement: 4.2 },
  { date: "Feb 22", engagement: 6.1 },
  { date: "Feb 24", engagement: 5.8 },
  { date: "Feb 26", engagement: 8.3 },
  { date: "Feb 28", engagement: 14.8 },
  { date: "Mar 02", engagement: 10.1 },
  { date: "Mar 04", engagement: 16.2 },
  { date: "Mar 06", engagement: 1.7 },
  { date: "Mar 08", engagement: 12.4 },
  { date: "Mar 10", engagement: 6.8 },
];

export const mockLikesPerPost = [
  { post: "Post 1", likes: 1245 },
  { post: "Post 2", likes: 2340 },
  { post: "Post 3", likes: 320 },
  { post: "Post 4", likes: 3120 },
  { post: "Post 5", likes: 1890 },
  { post: "Post 6", likes: 2780 },
];

export const mockHooks = {
  curiosity: [
    "I made $10K in 30 days doing this one thing nobody talks about…",
    "The algorithm hack Instagram doesn't want you to know 👀",
    "I analyzed 1000 viral posts. Here's the pattern I found.",
    "Stop scrolling. This will change how you create content forever.",
  ],
  emotional: [
    "I almost gave up on content creation. Then this happened…",
    "The hardest lesson I learned after 2 years of creating content",
    "Nobody told me this would be the loneliest part of entrepreneurship",
    "I cried when I hit 10K followers. Here's why.",
  ],
  storytelling: [
    "3 years ago I was working a 9-5 I hated. Today I…",
    "My first post got 3 likes. My latest got 300K views. Here's what changed.",
    "A stranger DM'd me last week and said something that changed everything",
  ],
  controversial: [
    "Hustle culture is a lie. Here's what actually works.",
    "Your engagement rate doesn't matter. Here's what does.",
    "Stop posting Reels. Do this instead.",
  ],
};

export const mockCaptions = [
  "The secret to going viral isn't luck—it's understanding the psychology behind why people share content. Here are 3 frameworks I use for every post:\n\n1️⃣ The Curiosity Gap\n2️⃣ The Relatability Factor\n3️⃣ The Save-Worthy Structure\n\nSave this post and try one today 👇",
  "Everyone talks about 'providing value' but nobody explains HOW.\n\nHere's my exact framework:\n→ Start with a bold claim\n→ Back it up with proof\n→ Give ONE actionable step\n→ End with a question\n\nWhich tip resonated most? Comment below 💬",
];

export const mockHashtags = {
  highReach: ["#entrepreneurlife", "#digitalmarketing", "#socialmediatips", "#contentcreator", "#growthhacking", "#instagramgrowth", "#marketingstrategy"],
  mediumCompetition: ["#saasfounder", "#creatoreconomy", "#contentmarketing101", "#socialmediastrategy", "#buildingpublic", "#solopreneur", "#indiehacker"],
  lowCompetition: ["#instagrowai", "#contentanalysis", "#hookwriting", "#captionwriting", "#reelstrategy", "#engagementhacks"],
};

export const mockReelIdeas = [
  {
    hook: "Stop making this mistake with your Instagram captions",
    concept: "Quick talking-head reel showing the common mistake of writing long captions without a hook, then revealing the fix with a before/after example",
    caption: "Your captions are killing your engagement. Here's the fix 👆\n\nThe first line is everything. If you don't hook them in 1 second, they scroll past.\n\nSave this and fix your next caption ✅",
    hashtags: "#instagramtips #captionwriting #contentcreator",
    duration: "15-30 seconds",
  },
  {
    hook: "I grew 10K followers in 30 days. Here's my exact strategy.",
    concept: "Screen recording walkthrough of your content calendar, posting schedule, and engagement strategy with text overlays",
    caption: "My 30-day growth strategy breakdown 📈\n\nPosted 2x/day\nEngaged 30 min before & after posting\nUsed these 3 hook formats on repeat\n\nThe full strategy is in my bio link 🔗",
    hashtags: "#growthhacking #instagramgrowth #socialmedia",
    duration: "30-60 seconds",
  },
  {
    hook: "The algorithm changed again. Here's what's working NOW.",
    concept: "Fast-paced reel with screen grabs of analytics showing what content types are getting boosted, with text overlays for each insight",
    caption: "Algorithm update March 2026 📱\n\n✅ Carousel posts are back\n✅ Original audio > trending audio\n✅ Saves matter more than likes\n\nWhat changes have YOU noticed? 👇",
    hashtags: "#instagramalgorithm #socialmediatips #reelstips",
    duration: "15-30 seconds",
  },
  {
    hook: "POV: You finally understand why your posts flop",
    concept: "Comedic POV reel showing the 'aha moment' of realizing posting time, hook quality, and CTA matter more than aesthetics",
    caption: "It was never about the aesthetic 😅\n\nThe 3 things that actually matter:\n1. Your hook (first 1 second)\n2. Your CTA (last line)\n3. Your posting time\n\nDouble tap if this was your wake-up call 💡",
    hashtags: "#contentcreation #instagramreels #creatorlife",
    duration: "15 seconds",
  },
  {
    hook: "I analyzed my top 10 posts. They all had this in common.",
    concept: "Side-by-side comparison of top performing vs worst performing posts, highlighting the common elements in winners",
    caption: "The data doesn't lie 📊\n\nEvery single one of my top posts:\n→ Started with a number or bold claim\n→ Had a CTA in the caption\n→ Was posted between 8-10am\n\nCoincidence? I think not. Save this 📌",
    hashtags: "#datadriven #contentanalysis #instagramstrategy",
    duration: "30 seconds",
  },
];
