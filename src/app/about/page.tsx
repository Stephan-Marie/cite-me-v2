export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
          About CiteMe
        </h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="lead">
            CiteMe is a web application designed to help users generate properly formatted citations 
            for academic and professional documents, leveraging client-side processing for text comparison 
            and the OpenAI API for citation formatting.
          </p>
          
          <h2>Our Mission</h2>
          <p>
            Our mission is to make accurate citation generation accessible to all students and researchers,
            providing a free tool that helps ensure academic integrity and proper attribution.
          </p>
          
          <h2>How It Works</h2>
          <p>
            CiteMe uses advanced technology to analyze your text against reference documents:
          </p>
          <ol>
            <li><strong>Upload your documents</strong> - Add your main document and reference PDFs</li>
            <li><strong>Text Comparison</strong> - Our client-side algorithms identify potential citation needs</li>
            <li><strong>AI-Powered Formatting</strong> - OpenAI helps generate properly formatted citations</li>
            <li><strong>Review and Export</strong> - Review the citations and export them for use in your work</li>
          </ol>
          
          <h2>Technology</h2>
          <p>
            CiteMe is built using modern web technologies:
          </p>
          <ul>
            <li>Next.js and TypeScript for a responsive, efficient frontend</li>
            <li>PDF.js for client-side PDF processing</li>
            <li>Fuse.js with Web Workers for parallel text comparison</li>
            <li>OpenAI API for citation formatting</li>
          </ul>
          
          <h2>Our Team</h2>
          <p>
            CiteMe was developed by a team of developers passionate about education and technology,
            with the goal of making academic citation easier and more accessible for everyone.
          </p>
        </div>
      </div>
    </div>
  );
} 