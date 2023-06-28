<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mime\Email;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

class MailerController extends Controller
{
    public function composeEmail()
    {
        try {
            // Create the Twig environment and configure it
            $loader = new FilesystemLoader(base_path('resources/views'));

            $twig = new Environment($loader);

            // Render the email template
            $htmlContent = $twig->render('email.html.twig', [
                'title' => 'Hello',
                'content' => 'Your account created.',
            ]);

            // Create the Email object and configure it
            $email = (new Email())
                ->from('abhiravi889833@gmail.com')
                ->to('ananthuas119@gmail.com')
                ->subject('Hello')
                ->html($htmlContent);

            // Create the SMTP transport
            $transport = Transport::fromDsn('smtp://abhiravi889833@gmail.com:gcsmypoquyicuqst@smtp.gmail.com:587');

            // Create the Mailer instance and send the email
            $mailer = new Mailer($transport);
            $mailer->send($email);

            // Email sent successfully
            return response()->json(['message' => 'Form data saved successfully and email sent'], 200);
        } catch (\Exception $e) {
            // Failed to send email
            return response()->json(['error' => 'An error occurred while sending the email: ' . $e->getMessage()], 500);
        }
    }
}
