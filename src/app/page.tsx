import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Generate Perfect Citations with AI
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  CiteMe helps you generate properly formatted citations for academic and professional documents, leveraging advanced AI to ensure accuracy.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/app"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Get Started
                </Link>
                <Link
                  href="/about"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-[350px] sm:h-[450px] sm:w-[450px] md:h-[550px] md:w-[550px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-[100px] opacity-20"></div>
                <div className="relative h-full w-full rounded-xl border bg-card p-4 shadow-lg">
                  <div className="space-y-2">
                    <div className="h-2 w-20 rounded-full bg-muted"></div>
                    <div className="h-2 w-10 rounded-full bg-muted"></div>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="h-3 w-3 rounded-full bg-muted mt-1"></div>
                        <div className="space-y-1 flex-1">
                          <div className="h-2 w-full rounded-full bg-muted"></div>
                          <div className="h-2 w-4/5 rounded-full bg-muted"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Everything You Need for Academic Citations
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our AI-powered citation tool provides everything you need to generate accurate and properly formatted citations.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="grid gap-1">
              <h3 className="text-xl font-bold">PDF Processing</h3>
              <p className="text-muted-foreground">
                Upload PDF files for both reference documents and your main document
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-xl font-bold">Text Comparison</h3>
              <p className="text-muted-foreground">
                Client-side text comparison with fuzzy matching and similarity scoring
              </p>
            </div>
            <div className="grid gap-1">
              <h3 className="text-xl font-bold">Citation Formatting</h3>
              <p className="text-muted-foreground">
                Generate properly formatted citations in multiple academic styles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of students and researchers who use CiteMe to save time and ensure properly formatted citations.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/app"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Try CiteMe Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
