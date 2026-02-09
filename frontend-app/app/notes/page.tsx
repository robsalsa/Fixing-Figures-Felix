import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="mb-6 text-muted-foreground">
          Have questions or feedback? Fill out the form and we'll get back to you.
        </p>

        <ContactForm />
      </div>
    </main>
  );
}