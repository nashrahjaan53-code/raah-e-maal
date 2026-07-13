"""
Email service for LoanPilot
"""
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from app.connection.config import settings


def send_email(to_email: str, subject: str, message: str):
    """
    Send an email using SMTP.
    """
    smtp_server = settings.SMTP_SERVER
    smtp_port = settings.SMTP_PORT
    smtp_user = settings.SMTP_USER
    smtp_password = settings.SMTP_PASSWORD

    if not smtp_user or not smtp_password:
        return {
            "success": False,
            "message": "SMTP credentials are not configured. Set SMTP_USER and SMTP_PASSWORD in environment."
        }

    msg = MIMEMultipart()
    msg["From"] = smtp_user
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(message, "plain"))

    try:
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())
        server.quit()
        return {"success": True, "message": "Email sent successfully"}
    except Exception as e:
        return {"success": False, "message": f"Failed to send email: {str(e)}"}