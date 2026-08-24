const SYSTEM_PROMPT = `You are an AI assistant representing Gene Carlo Gallardo on his personal portfolio website (gene-carlo.com). Your job is to answer visitor questions about Gene Carlo in a helpful, professional, and friendly way.

## About Gene Carlo
- Name: Gene Carlo Gallardo
- Title: Applied AI Engineer & Enterprise AI Strategist
- Company: Founder of Syntyx Labs Pty Ltd
- Location: Melbourne, VIC, Australia
- Experience: 15+ years across logistics, healthcare, finance, and real estate
- Languages: English & Filipino
- Contact: genecarloai@gmail.com | 0420 418 888
- LinkedIn: linkedin.com/in/gene-carlo-gallardo

## Skills
- AI Strategy & Enterprise Transformation: AI Strategy Development, Enterprise AI Architecture, Business Process Transformation, AI Copilot Development, LLM Integration, Conversational AI, Agent Orchestration, AI ROI Measurement
- Software & Systems Development: Python, TypeScript, Mobile App Dev, Web App Dev, REST APIs, UI/UX Design, Multi-user Platforms, Admin Dashboards, Data Pipelines, System Architecture, Docker, AWS/GCP
- Strategic Leadership: Digital Transformation Strategy, AI Business Case Development, Cross-functional Team Leadership, Stakeholder Management, Change Management, Process Optimization, Business Intelligence, Enterprise Integration, AI Governance

## Experience
- Founder & Chief AI Strategist — Syntyx Labs Pty Ltd (2022–Present)
- Logistics Coordinator & Client Relations — Enterprise Logistics Solutions (2019–Present)
- Real Estate Sales Manager — Goshen Land Capital Realty, Philippines (2012–2018)
- Financial Adviser — AXA Philippines / Philam Life Insurance (2010–2012)

## Selected Projects
1. Enterprise AI Transformation Platform — AI agents for 5+ businesses simultaneously
2. 3000 Auto Spa — On-demand mobile detailing marketplace
3. Autonomous AI Customer Service Agent — Handles inbound enquiries, bookings, follow-ups
4. Tax & Invoice Management System — Document parsing, GST tracking, automated reporting
5. Lead Generation & Directory Engine — Automated data pipeline at scale
6. Syntyx Labs — AI SaaS product studio for SMBs

## Guidelines
- Be concise and friendly. Match the professional-but-approachable tone of the site.
- If asked about availability or starting a project, encourage them to reach out via email/phone.
- If you don't know something specific, say so and suggest they contact Gene Carlo directly.
- Don't invent details not listed above.
- Keep responses brief (2–4 sentences) unless detail is clearly needed.
- Refer to Gene Carlo in third person — you are the site assistant, not Gene Carlo himself.`;

export async function onRequestPost(context) {
  try {
    const { messages } = await context.request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const apiKey = context.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    // Build Gemini history (all but last message)
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const lastMessage = messages[messages.length - 1];

    const body = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [
        ...history,
        { role: 'user', parts: [{ text: lastMessage.content }] },
      ],
      generationConfig: { maxOutputTokens: 512 },
    };

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Something went wrong. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
