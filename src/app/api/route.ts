import { NextResponse } from "next/server";
import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

// Define Valentine-themed image prompts
const IMAGE_PROMPTS = {
  'heart-icon': 'Simple red heart icon, minimalist design, flat style, white background, high quality',
  'couple-heart': 'Romantic couple holding a heart, warm lighting, soft focus, pastel colors, romantic atmosphere',
  'love-letter': 'Handwritten love letter envelope, red seal, romantic lighting, soft shadows, elegant',
  'flowers': 'Beautiful red roses in a vase, soft natural lighting, romantic mood, high detail',
  'romantic-gift': 'Beautiful gift box with ribbon, romantic lighting, soft colors, elegant packaging',
  'couple-sunset': 'Silhouette of couple embracing at sunset, romantic atmosphere, warm colors, peaceful'
};

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}

export async function POST(request: Request) {
  try {
    const { action } = await request.json();

    if (action === 'generate-image') {
      const { imageType } = await request.json();

      if (!imageType || !IMAGE_PROMPTS[imageType]) {
        return NextResponse.json({
          success: false,
          error: 'Invalid or missing imageType'
        }, { status: 400 });
      }

      const prompt = IMAGE_PROMPTS[imageType];
      const zai = await ZAI.create();

      const response = await zai.images.generations.create({
        prompt: prompt,
        size: '1024x1024'
      });

      if (!response.data || !response.data[0] || !response.data[0].base64) {
        throw new Error('Invalid response from image generation API');
      }

      const imageBase64 = response.data[0].base64;
      const buffer = Buffer.from(imageBase64, 'base64');

      // Ensure public/images directory exists
      const publicDir = path.join(process.cwd(), 'public', 'images');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }

      // Generate unique filename
      const filename = `valentine-${imageType}-${Date.now()}.png`;
      const filepath = path.join(publicDir, filename);

      // Write image file
      fs.writeFileSync(filepath, buffer);

      return NextResponse.json({
        success: true,
        imageUrl: `/images/${filename}`,
        imageType: imageType,
        prompt: prompt
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid action'
    }, { status: 400 });

  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to process request'
    }, { status: 500 });
  }
}