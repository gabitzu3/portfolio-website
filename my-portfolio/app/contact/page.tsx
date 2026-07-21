import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Link2, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
export default function ContactPage() {
  return (
    <main className="flex-1 p-6">
      <PageHeader
        title="Contact"
        description="Get in touch with me through various channels."
      />
      <div className="max-w-4xl mx-auto mt-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Feel free to reach out through any of the following channels. I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <a href={`mailto:${siteConfig.links.email || 'contact@example.com'}`} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent transition-colors">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{siteConfig.links.email || 'contact@example.com'}</p>
                </div>
              </a>
              <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent transition-colors">
                <Link2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">GitHub</p>
                  <p className="text-sm text-muted-foreground">View my projects</p>
                </div>
              </a>
              <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 border rounded-lg hover:bg-accent transition-colors">
                <Link2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">LinkedIn</p>
                  <p className="text-sm text-muted-foreground">Connect professionally</p>
                </div>
              </a>
              <div className="flex items-center gap-3 p-4 border rounded-lg">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{siteConfig.links.location || 'Available for remote work'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Send a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please use the email link above to send a message.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}