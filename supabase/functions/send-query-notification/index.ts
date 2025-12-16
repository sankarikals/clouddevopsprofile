import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QueryRequest {
  name: string;
  email: string;
  experience: string;
  aspirations: string;
  message: string;
  phone?: string;
  linkedin?: string;
  recommendedCourses: string[];
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const queryData: QueryRequest = await req.json();
    
    console.log("Processing query notification for:", queryData.email);

    // Send confirmation email to mentee
    const menteeEmailResponse = await resend.emails.send({
      from: "DevOps Mentor <onboarding@resend.dev>",
      to: [queryData.email],
      subject: "Query Registered Successfully - We'll Reach Out Soon!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Thank you for your query, ${queryData.name}!
          </h1>
          
          <p style="color: #555; font-size: 16px; line-height: 1.6;">
            We have successfully registered your query and concern. Our team will reach out to you within the next 24 hours to provide personalized guidance.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your Query Details:</h3>
            <p><strong>Experience Level:</strong> ${queryData.experience}</p>
            <p><strong>Career Aspirations:</strong> ${queryData.aspirations}</p>
            ${queryData.message ? `<p><strong>Additional Message:</strong> ${queryData.message}</p>` : ''}
            ${queryData.recommendedCourses.length > 0 ? `
              <p><strong>Recommended Courses:</strong></p>
              <ul style="margin: 10px 0;">
                ${queryData.recommendedCourses.map(course => `<li style="margin: 5px 0;">${course}</li>`).join('')}
              </ul>
            ` : ''}
          </div>
          
          <div style="background-color: #e7f3ff; padding: 15px; border-radius: 8px; border-left: 4px solid #007bff;">
            <h4 style="color: #007bff; margin-top: 0;">What's Next?</h4>
            <ul style="color: #333; margin: 0;">
              <li>Our mentor will review your profile and aspirations</li>
              <li>You'll receive a personalized call/email within 24 hours</li>
              <li>We'll discuss the best learning path for your goals</li>
              <li>Get recommendations for the most suitable courses</li>
            </ul>
          </div>
          
          <p style="color: #777; font-size: 14px; margin-top: 30px;">
            If you have any urgent questions, feel free to reach out to us directly.
          </p>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px; text-align: center;">
            <p style="color: #999; font-size: 12px;">
              Best regards,<br>
              <strong>DevOps Mentorship Team</strong><br>
              Transforming careers through expert guidance
            </p>
          </div>
        </div>
      `,
    });

    // Send notification to team
    const teamEmailResponse = await resend.emails.send({
      from: "DevOps Mentor <onboarding@resend.dev>",
      to: ["akhil.mittal@akhilops.dev"], // Replace with actual team email
      subject: `New Mentee Query from ${queryData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; border-bottom: 2px solid #dc3545; padding-bottom: 10px;">
            New Mentee Query Received
          </h1>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin: 20px 0;">
            <p style="color: #856404; margin: 0; font-weight: bold;">
              ⏰ Response Required: Within 24 hours
            </p>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Mentee Information:</h3>
            <p><strong>Name:</strong> ${queryData.name}</p>
            <p><strong>Email:</strong> ${queryData.email}</p>
            ${queryData.phone ? `<p><strong>Phone:</strong> ${queryData.phone}</p>` : ''}
            ${queryData.linkedin ? `<p><strong>LinkedIn:</strong> ${queryData.linkedin}</p>` : ''}
            <p><strong>Experience Level:</strong> ${queryData.experience}</p>
            <p><strong>Career Aspirations:</strong> ${queryData.aspirations}</p>
            ${queryData.message ? `<p><strong>Additional Message:</strong> ${queryData.message}</p>` : ''}
          </div>
          
          ${queryData.recommendedCourses.length > 0 ? `
            <div style="background-color: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="color: #007bff; margin-top: 0;">System Recommended Courses:</h4>
              <ul>
                ${queryData.recommendedCourses.map(course => `<li>${course}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${queryData.email}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
              Respond to Mentee
            </a>
          </div>
        </div>
      `,
    });

    console.log("Emails sent successfully:", { menteeEmailResponse, teamEmailResponse });

    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Query registered and notifications sent successfully"
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-query-notification function:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);