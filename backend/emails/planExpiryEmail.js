export const planExpiryEmail = ({
    name,
    planName,
    expiresAt,
}) => {
    return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>⏰ Your Plan is Expiring Soon</h2>

      <p>Hi <strong>${name}</strong>,</p>

      <p>
        Your advertising plan 
        <strong>${planName}</strong> will expire on 
        <strong>${new Date(expiresAt).toDateString()}</strong>.
      </p>

      <p>
        To continue receiving visibility and bookings, please renew your plan
        before it expires.
      </p>

      <a href="${process.env.FRONTEND_URL}/pricing"
        style="
          display:inline-block;
          padding:10px 16px;
          background:#000;
          color:#fff;
          text-decoration:none;
          border-radius:4px;
        ">
        Renew Plan
      </a>

      <p style="margin-top:20px;">
        Regards,<br/>
        <strong>DubaiSociete Team</strong>
      </p>
    </div>
  `;
};
