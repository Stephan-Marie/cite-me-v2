# CiteMe Product Requirement Document

# Background

CiteMe is a web application designed to help users generate citations for academic and professional documents. The app leverages client-side processing for text comparison and OpenAI API for citation formatting. 

# **Strategic Fit**

Platforms like OpenAI are very general purpose, resulting in too much friction for students who want just want AI to inspect their work for uncited or improperly cited lines. There is also the processing power demanding nature of the task, and how long it takes the gpt4o model to generate a satisfactory answer.

On the other side of the spectrum, we have platforms like Grammarly and Quillbot which have auto-citation capabilities and high-end features like real-time citation format suggestions. Unfortunately these are offered at a premium price; too high for most students.

CiteMe seeks footing somewhere between these extremes. A platform 

- with basic AI powered auto-citation features
- built for speed using optimization techniques like smart batching of OpenAI requests and client-side text comparison
- doesn’t compare your work against a plagiarism database (- too expensive!). Rather, against a user-uploaded batch of reference PDFs
- is free to use.

# Target User

**Primary End Users**:

- University and College students: After many sleepless nights, you’re finally done writing your dissertation. You were in such a rush - ahem, “flow state” - that at some point you gave up entirely on keeping track of all the paragraphs where you might have played fast and loose with intellectual property laws. You feel like you’ve been thorough but, you’d like to be sure. That’s what Cite Me is for.

# User Stories

1. **As a law student in Ghana**, I want to plug in my work and have it properly cited in OSCOLA format at the click of a button. A generated bibliography of all my sources would be a sweet addition.
    - *Acceptance Criteria*: Users have a choice between multiple citation styles; users should have the option of either using an uploaded PDF or a textbox as the source or main document; a bibliography section added at the end of every output containing all cited sources in their proper citation format style.
    
2. **As a final year philosophy student**, I want to be able to properly cite my work using references from a variety of sources, not just uploaded documents.
    - *Acceptance Criteria*: A section where users can post as many links to online sources as they’d like, to be used as part of the reference PDFs.

# **Product Value Proposition**

**For Students**:

- **Time saving**: Cite paragraphs at the click of a button. Set it and forget it.
- Bibliography/Appendix generator: Get a properly formatted bibliography appended to the end of your document. The appendix arrangement and punctuation should conform to the citation style selected by the user.

# **Feature Requirements**

### Performance

| Feature | Priority | Description |
| --- | --- | --- |
| PDF processing |  Must Have  | text extraction using pdf.js |
| Client-Side text comparison |  Must Have  | comparison using fuse.js + web workers |
| OpenAI integration |  Must Have  | generating in-text citations and bibliographies |

### Security

| Feature | Priority | Description |
| --- | --- | --- |
|  |  Must Have  |  |
|  |  Must Have  |  |

### **Ease-of-Use**

| Feature | Priority | Description |
| --- | --- | --- |
| Clean UI |  Should Have  | small-sized, clearly labelled and distinctive UI for drop-zones for original uncited pdf and reference docs and links; spacious, minimal rich text area powered by TinyMCE API for output of text. |

# **Non-Functional Requirements**

- **Security**:
    - Only PDF and DOCX files can be uploaded as original and reference docs.
    - Limit number of online links users can add as reference to six.
- **Performance**:
    - Optimize for speedy output using lazy-loading of results.
    - Minimize the amount of time spent waiting for an output from openAI models.

-