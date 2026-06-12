import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import path from 'path';

// Load env from multiple possible locations to avoid any config load failure in monorepos
dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });
dotenv.config({ path: path.resolve(process.cwd(), 'backend', '.env'), override: true });
dotenv.config({ path: path.resolve(__dirname, '../.env'), override: true });
dotenv.config({ path: path.resolve(__dirname, '../../.env'), override: true });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*', // Allow all origins for local testing and deployment flexibility
}));
app.use(express.json());

// Initialize Prisma
let prisma: PrismaClient | null = null;
let isMockMode = false;

// Mock database in case database connection fails or is not provided
const mockDb = {
  messages: [] as Array<{ id: string; name: string; email: string; message: string; createdAt: Date }>,
  visitorCount: 184,
  projects: [
    {
      id: "traynix",
      title: "TRAYNIX",
      category: "AI-Powered Cybersecurity Platform",
      description: "An intelligent cybersecurity framework focused on Detect → Deceive → Learn → Protect → Block. It leverages behavior monitoring and adaptive defense mechanisms to thwart complex network-level threats.",
      features: [
        "Threat detection & real-time monitoring",
        "AI-assisted risk and pattern analysis",
        "Continuous behavior monitoring",
        "Advanced fraud prevention algorithms",
        "Adaptive defense and dynamic response mechanisms"
      ],
      link: "#"
    },
    {
      id: "feedbox-digital",
      title: "Feedbox Digital Ecosystem",
      category: "Community Management SaaS",
      description: "A complete club management platform designed for university communities featuring event management, member engagement, communication systems, and detailed analytics.",
      features: [
        "Interactive event planning and tracking",
        "Centralized member engagement portal",
        "Automated cross-channel communication",
        "Real-time analytics and attendance metrics",
        "Multi-role permissions for club admins"
      ],
      link: "#"
    }
  ],
  blogPosts: [
    {
      id: "future-of-ai-communities",
      title: "Building the Future: AI-Driven Student Communities",
      summary: "How artificial intelligence and prompt engineering are reshaping how student clubs build products, collaborate, and scale their impact.",
      content: "Student communities are the breeding grounds for the next generation of innovators. As we move into 2026, the intersection of AI tools and student leadership is enabling teams to build MVPs in days instead of months. At Feedbox Club, we are implementing AI-assisted workflows to optimize our operations, automate member communications, and design engaging tech-cultural experiences. By adopting these technologies early, students gain hands-on experience in prompt engineering, full-stack prototyping, and agile project delivery.",
      date: "June 10, 2026",
      readTime: "4 min read"
    },
    {
      id: "cybersecurity-adaptive-defense",
      title: "Adaptive Defense: Shifting from Reactive to Proactive Cybersecurity",
      summary: "An introduction to the concepts behind TRAYNIX: using AI to deceive attackers and study threats in real-time.",
      content: "Traditional cybersecurity frameworks focus on setting up firewalls and waiting for alerts. However, modern threats require an active, adaptive stance. The 'Detect -> Deceive -> Learn -> Protect -> Block' pipeline implements active deception (like automated honeypots) to analyze malicious actors in a sandboxed environment before they can cause damage. By learning from their behaviors, the system dynamically generates protective rules to shield the core network.",
      date: "May 28, 2026",
      readTime: "6 min read"
    },
    {
      id: "event-management-scale",
      title: "The Art of Scaling Events: Impacting Thousands of Students",
      summary: "Key lessons learned from organizing large-scale university festivals like SolVIT Hackathon and Summer Fest.",
      content: "Organizing large university events requires bridging technology, logistics, and human relationships. From coordinating sponsorships to managing public relations, the secret lies in building a resilient team structure. By creating digital platforms like the Feedbox Digital Ecosystem, we can streamline registration, automate check-ins, and gather analytical insights, ensuring every student has a smooth, memorable experience.",
      date: "April 15, 2026",
      readTime: "5 min read"
    }
  ]
};

if (!process.env.DATABASE_URL) {
  console.warn("⚠️ DATABASE_URL environment variable is not defined. Running in MOCK DATABASE mode.");
  isMockMode = true;
} else {
  try {
    prisma = new PrismaClient();
    // Verify connection
    prisma.$connect()
      .then(() => {
        console.log("✅ Successfully connected to PostgreSQL Database via Prisma.");
      })
      .catch((err) => {
        console.error("❌ Prisma database connection failed. Falling back to MOCK DATABASE mode.", err);
        isMockMode = true;
      });
  } catch (err) {
    console.error("❌ Failed to initialize Prisma. Falling back to MOCK DATABASE mode.", err);
    isMockMode = true;
  }
}

// Routes
// 1. Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', databaseMode: isMockMode ? 'Mock (In-Memory)' : 'PostgreSQL (Prisma)' });
});

// 2. Submit Contact Message
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields (name, email, message) are required' });
    }

    if (isMockMode || !prisma) {
      const newMessage = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        message,
        createdAt: new Date()
      };
      mockDb.messages.push(newMessage);
      console.log("📩 [Mock DB] Contact Message Received:", newMessage);
      return res.status(201).json({ success: true, message: 'Message sent successfully (Mock DB)', data: newMessage });
    } else {
      const dbMessage = await prisma.contactMessage.create({
        data: { name, email, message }
      });
      console.log("📩 [PostgreSQL] Contact Message Saved:", dbMessage);
      return res.status(201).json({ success: true, message: 'Message sent successfully', data: dbMessage });
    }
  } catch (error: any) {
    console.error("Error processing contact submission:", error);
    res.status(500).json({ error: 'Internal server error processing message' });
  }
});

// 3. Stats Route with Visitor Count Incrementer
app.get('/api/stats', async (req: Request, res: Response) => {
  try {
    let currentVisitors = 0;

    if (isMockMode || !prisma) {
      mockDb.visitorCount += 1;
      currentVisitors = mockDb.visitorCount;
    } else {
      const stats = await prisma.visitorStat.upsert({
        where: { id: 'global' },
        update: { count: { increment: 1 } },
        create: { id: 'global', count: 185 }, // start at a premium looking number
      });
      currentVisitors = stats.count;
    }

    // Return the combined stats including static club numbers and active DB visitor counts
    res.json({
      studentsImpacted: 5000, // Matches the requested "5000+ Students Impacted"
      eventsOrganized: 10,   // Matches the requested "10+ Events Organized"
      leadershipRoles: 3,    // Matches the requested "3+ Leadership Roles"
      technicalProjects: 2,  // Traynix, Feedbox Digital
      visitors: currentVisitors
    });
  } catch (error) {
    console.error("Error processing stats:", error);
    res.status(500).json({ error: 'Internal server error fetching stats' });
  }
});

// 4. Projects Route
app.get('/api/projects', async (req: Request, res: Response) => {
  try {
    if (isMockMode || !prisma) {
      res.json(mockDb.projects);
    } else {
      const dbProjects = await prisma.project.findMany();
      if (dbProjects.length === 0) {
        // Seed if empty
        for (const p of mockDb.projects) {
          await prisma.project.create({ data: p });
        }
        res.json(mockDb.projects);
      } else {
        res.json(dbProjects);
      }
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.json(mockDb.projects); // Fallback to mock on db errors
  }
});

// 5. Blog Posts Route
app.get('/api/blog', async (req: Request, res: Response) => {
  try {
    if (isMockMode || !prisma) {
      res.json(mockDb.blogPosts);
    } else {
      const dbBlogPosts = await prisma.blogPost.findMany({
        orderBy: { createdAt: 'desc' }
      });
      if (dbBlogPosts.length === 0) {
        // Seed if empty
        for (const b of mockDb.blogPosts) {
          await prisma.blogPost.create({ data: b });
        }
        res.json(mockDb.blogPosts);
      } else {
        res.json(dbBlogPosts);
      }
    }
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.json(mockDb.blogPosts); // Fallback to mock on db errors
  }
});

// 6. Request Code Access Route
app.post('/api/request-code', async (req: Request, res: Response) => {
  try {
    const { name, email, contact, reason } = req.body;
    if (!name || !email || !contact || !reason) {
      return res.status(400).json({ error: 'All fields (name, email, contact, reason) are required' });
    }
    
    console.log(`\n📧 [EMAIL DISPATCH SIMULATED]`);
    console.log(`From: system@portfolio.nirmalyadas.com`);
    console.log(`To: dasnirmalya486@gmail.com`);
    console.log(`Subject: New Code Access Request from ${name}`);
    console.log(`Body:`);
    console.log(`  Name: ${name}`);
    console.log(`  Email: ${email}`);
    console.log(`  Contact Number: ${contact}`);
    console.log(`  Reason for requesting code: ${reason}`);
    console.log(`==========================================\n`);

    res.status(200).json({ success: true, message: 'Request submitted successfully' });
  } catch (error) {
    console.error("Error processing code request:", error);
    res.status(500).json({ error: 'Internal server error processing code request' });
  }
});

// 7. Join LiveHouse Route
app.post('/api/join-livehouse', async (req: Request, res: Response) => {
  try {
    const { name, email, contact, skills, team, fitReason } = req.body;
    if (!name || !email || !contact || !skills || !team || !fitReason) {
      return res.status(400).json({ error: 'All fields are required to process application' });
    }

    console.log(`\n📧 [EMAIL DISPATCH SIMULATED]`);
    console.log(`From: recruitment@livehouse.social`);
    console.log(`To: dasnirmalya486@gmail.com`);
    console.log(`Subject: New LiveHouse Application: ${name} (${team})`);
    console.log(`Body:`);
    console.log(`  Name: ${name}`);
    console.log(`  Email ID: ${email}`);
    console.log(`  Contact Number: ${contact}`);
    console.log(`  Skills: ${skills}`);
    console.log(`  Selected Team: ${team}`);
    console.log(`  Why fit for the team: ${fitReason}`);
    console.log(`==========================================\n`);

    res.status(200).json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error("Error processing LiveHouse application:", error);
    res.status(500).json({ error: 'Internal server error processing application' });
  }
});

// 8. Strategic Event Planner Route
app.post('/api/plan-event', async (req: Request, res: Response) => {
  try {
    const { name, email, contact, eventType, scale, budget, proposedDate, goals } = req.body;
    if (!name || !email || !contact || !proposedDate || !goals) {
      return res.status(400).json({ error: 'All fields are required to submit event plan' });
    }

    console.log(`\n📧 [EMAIL DISPATCH SIMULATED]`);
    console.log(`From: eventplanner@livehouse.social`);
    console.log(`To: dasnirmalya486@gmail.com`);
    console.log(`Subject: Strategic Event Proposal: ${name} & LiveHouse Social`);
    console.log(`Body:`);
    console.log(`  Organizer: ${name}`);
    console.log(`  Email ID: ${email}`);
    console.log(`  Contact: ${contact}`);
    console.log(`  Event Type: ${eventType}`);
    console.log(`  Scale: ${scale}`);
    console.log(`  Budget Model: ${budget}`);
    console.log(`  Proposed Date: ${proposedDate}`);
    console.log(`  Goals: ${goals}`);
    console.log(`==========================================\n`);

    res.status(200).json({ success: true, message: 'Event plan submitted successfully' });
  } catch (error) {
    console.error("Error processing event plan:", error);
    res.status(500).json({ error: 'Internal server error processing event plan' });
  }
});

// 9. Emergency Red Alert Twilio Dispatch Route
app.post('/api/emergency', async (req: Request, res: Response) => {
  try {
    const { name, contact, reason, message, location } = req.body;
    if (!name || !contact || !reason || !message) {
      return res.status(400).json({ error: 'All fields (name, contact, reason, message) are required' });
    }

    const spokeText = `WAKE UP BITCH! This is an emergency alert. An urgent inquiry was submitted by ${name} at contact number ${contact} regarding ${reason}. The location is ${location || 'unknown'}. Message details: ${message}`;
    const smsText = `🚨 RED ALERT: Emergency inquiry from ${name} (${contact}). Location: ${location || 'unknown'}. Subject: ${reason}. Message: ${message}`;

    console.log(`\n🚨🚨🚨 [RED ALERT EMERGENCY DISPATCH] 🚨🚨🚨`);
    console.log(`Client IP Location: ${location || 'unknown'}`);
    console.log(`Client Mobile: ${contact}`);
    console.log(`Subject Reason: ${reason}`);
    console.log(`Details: ${message}`);
    console.log(`------------------------------------------`);
    console.log(`🗣️  [VOICE CALL SPEECH PLAYLOAD]:`);
    console.log(`  "${spokeText}"`);
    console.log(`💬  [SMS & WHATSAPP PAYLOAD]:`);
    console.log(`  "${smsText}"`);
    console.log(`==========================================\n`);

    // Dynamically reload env with override to capture on-the-fly updates to .env file
    dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });
    dotenv.config({ path: path.resolve(process.cwd(), 'backend', '.env'), override: true });
    dotenv.config({ path: path.resolve(__dirname, '../.env'), override: true });
    dotenv.config({ path: path.resolve(__dirname, '../../.env'), override: true });

    // Dynamic Twilio API Call if config exists in env
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const fromPhone = process.env.TWILIO_FROM_PHONE;
    const toPhone = process.env.TWILIO_TO_PHONE || '+917008494849';

    const isConfigured = 
      sid && sid !== 'your_twilio_account_sid_here' && 
      token && token !== 'your_twilio_auth_token_here' && 
      fromPhone && fromPhone !== 'your_twilio_phone_number_here';

    if (isConfigured) {
      try {
        const twilio = require('twilio');
        const client = twilio(sid, token);

        // 1. Send SMS
        await client.messages.create({
          body: smsText,
          from: fromPhone,
          to: toPhone
        });
        console.log(`⚡ [Twilio] SMS alert dispatched to ${toPhone}`);

        // 2. Send WhatsApp (if Twilio WhatsApp setup is active)
        try {
          await client.messages.create({
            body: `Hey this is urgent! Please be available. Details: ${smsText}`,
            from: `whatsapp:${fromPhone}`,
            to: `whatsapp:${toPhone}`
          });
          console.log(`⚡ [Twilio] WhatsApp alert dispatched to ${toPhone}`);
        } catch (waErr) {
          console.warn(`⚡ [Twilio] WhatsApp dispatch skipped or failed:`, waErr);
        }

      } catch (twilioErr: any) {
        console.error(`❌ Twilio SMS dispatch failed:`, twilioErr.message);
      }
    } else {
      console.log(`ℹ️  [Twilio Simulation] Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_PHONE in .env to activate real SMS alerts.`);
    }

    res.status(200).json({ success: true, message: 'Emergency alert dispatched successfully' });
  } catch (error) {
    console.error("Error processing emergency dispatch:", error);
    res.status(500).json({ error: 'Internal server error processing emergency alert' });
  }
});

// Start Express App
app.listen(PORT, () => {
  console.log(`🚀 Express API server running on http://localhost:${PORT}`);
});
