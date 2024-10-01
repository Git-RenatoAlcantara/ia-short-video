const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Write a script to generate 30 seconds video on topic: interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "imagePrompt": "A bustling medieval marketplace with colorful stalls, merchants haggling, and people in period clothing. Focus on a young woman with a curious expression, holding a small, intricately carved wooden box.",\n    "ContentText": "In the heart of 14th century London, a young woman named Eleanor stumbled upon a curious object. While browsing a bustling marketplace, she noticed a small, intricately carved wooden box nestled amongst the wares of a traveling merchant."\n  },\n  {\n    "imagePrompt": "Close-up on the wooden box, showing detailed carvings of fantastical creatures and strange symbols. Eleanor\'s fingers trace the carvings with a mixture of awe and apprehension.",\n    "ContentText": "The box was unlike anything she had ever seen. Intricate carvings of fantastical creatures and strange symbols adorned its surface, their meaning shrouded in mystery."\n  },\n  {\n    "imagePrompt": "Eleanor opens the box to reveal a small, intricately folded piece of parchment, revealing a map of a hidden passageway with cryptic symbols and markings.",\n    "ContentText": "Driven by an insatiable curiosity, Eleanor opened the box. Inside, nestled amongst velvet lining, lay a small, intricately folded piece of parchment."\n  },\n  {\n    "imagePrompt": "Eleanor unfolds the parchment, revealing a map of a hidden passageway with cryptic symbols and markings. Her eyes widen in wonder and excitement.",\n    "ContentText": "As she carefully unfolded the parchment, a map of a hidden passageway was revealed. The map was filled with cryptic symbols and markings, leading to a place unknown."\n  },\n  {\n    "imagePrompt": "Eleanor sets off on a journey, venturing into the shadowy depths of a hidden passageway, illuminated by a flickering torch. The walls are covered in ancient carvings.",\n    "ContentText": "Fueled by a sense of adventure, Eleanor set out to uncover the secrets hidden within the map. She ventured into the shadowy depths of the passageway, her only light a flickering torch."\n  },\n  {\n    "imagePrompt": "Eleanor arrives at a hidden chamber, dimly lit by glowing stones, filled with ancient artifacts, scrolls, and mysterious objects.  The air is thick with the scent of incense and the whisper of forgotten secrets.",\n    "ContentText": "After traversing a winding path through the passage, Eleanor emerged into a hidden chamber. The chamber was dimly lit by glowing stones and filled with ancient artifacts, scrolls, and mysterious objects."\n  },\n  {\n    "imagePrompt": "Eleanor touches a glowing orb, revealing a hidden message projected onto the chamber wall, revealing a forgotten story of a powerful artifact and its connection to the future.",\n    "ContentText": "Eleanor\'s heart raced as she touched a glowing orb nestled amongst the artifacts. Suddenly, a message appeared on the chamber wall, revealing a forgotten story."\n  }\n]\n```\n\n**Explanation:**\n\nThis JSON structure provides a framework for creating a 30-second video with AI-generated images and narration.  \n\n* **imagePrompt:** This field contains the text prompt for the AI image generator (e.g., DALL-E, Midjourney, Stable Diffusion).  Each prompt describes a specific scene from the story.\n* **ContentText:** This field contains the text narration that accompanies each scene, creating a coherent narrative flow.\n\n**How to Use:**\n\n1. **Choose an AI image generator:** Select a generator capable of producing realistic images from text prompts.\n2. **Input the prompts:** Feed each "imagePrompt" into the AI generator.\n3. **Generate images:** The AI will generate corresponding images based on the prompts.\n4. **Combine images and narration:** Use video editing software to sequence the images and add the corresponding "ContentText" as narration.\n\n**Note:**\n\n* The length of the narration and the image generation time will influence the overall video duration. Adjust the prompts and narration to achieve a 30-second timeframe. \n* Experiment with different AI image generators and image styles for a diverse and visually appealing video. \n* Consider adding background music and sound effects to enhance the narrative and create a more immersive experience. \n',
        },
      ],
    },
  ],
});


