import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  businessName: string;
  websiteUrl?: string;
  email: string;
  phone: string;
  businessType: string;
  challenges: string[];
  goals: string;
  services: string[];
  budget: string;
  timeline: string;
  additionalInfo?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: ContactFormData = await req.json();
    console.log("Received contact form submission:", data);

    // Validate required fields
    if (!data.email || !data.businessName || !data.phone) {
      throw new Error("Missing required fields");
    }

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #8B5CF6, #D946EF); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px; }
    .section { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e5e7eb; }
    .section-title { font-size: 14px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
    .section-title::before { content: ''; width: 4px; height: 16px; background: #8B5CF6; border-radius: 2px; }
    .field { margin-bottom: 12px; }
    .label { font-weight: 600; color: #374151; font-size: 13px; }
    .value { color: #111827; margin-top: 4px; }
    .tag { display: inline-block; background: #f3e8ff; color: #7c3aed; padding: 4px 12px; border-radius: 20px; font-size: 13px; margin: 4px 4px 4px 0; }
    .goals-box { background: #fef3c7; border: 1px solid #fcd34d; padding: 16px; border-radius: 8px; margin-top: 8px; }
    .additional-box { background: #f0fdf4; border: 1px solid #86efac; padding: 16px; border-radius: 8px; margin-top: 8px; }
    .cta { text-align: center; margin-top: 24px; }
    .cta a { display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    .footer { text-align: center; margin-top: 24px; color: #6b7280; font-size: 13px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🚀 New Lead Inquiry</h1>
    <p style="margin: 8px 0 0; opacity: 0.9;">A potential client has submitted the contact form</p>
  </div>
  
  <div class="content">
    <div class="section">
      <div class="section-title">Business Information</div>
      <div class="field">
        <div class="label">Business Name</div>
        <div class="value">${data.businessName}</div>
      </div>
      ${data.websiteUrl ? `
      <div class="field">
        <div class="label">Website</div>
        <div class="value"><a href="${data.websiteUrl}">${data.websiteUrl}</a></div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">Business Type</div>
        <div class="value">${data.businessType}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Contact Details</div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone / WhatsApp</div>
        <div class="value">${data.phone}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Challenges</div>
      <div>
        ${data.challenges.map(c => `<span class="tag">${c}</span>`).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-title">Goals</div>
      <div class="goals-box">
        ${data.goals}
      </div>
    </div>

    <div class="section">
      <div class="section-title">Services Interested In</div>
      <div>
        ${data.services.map(s => `<span class="tag">${s}</span>`).join('')}
      </div>
    </div>

    <div class="section">
      <div class="section-title">Budget & Timeline</div>
      <div class="field">
        <div class="label">Monthly Budget</div>
        <div class="value">${data.budget}</div>
      </div>
      <div class="field">
        <div class="label">Timeline</div>
        <div class="value">${data.timeline}</div>
      </div>
    </div>

    ${data.additionalInfo ? `
    <div class="section">
      <div class="section-title">Additional Information</div>
      <div class="additional-box">
        ${data.additionalInfo}
      </div>
    </div>
    ` : ''}

    <div class="cta">
      <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}">💬 Reply on WhatsApp</a>
    </div>

    <div class="footer">
      <p>This lead was submitted from your portfolio website contact form.</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send email using Resend API directly
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Contact Form <onboarding@resend.dev>",
        to: ["usamamalikk@outlook.com"],
        subject: `🚀 New Lead: ${data.businessName} - ${data.businessType}`,
        html: emailHtml,
        reply_to: data.email,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const emailResponse = await res.json();
    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-form function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
